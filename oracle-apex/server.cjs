#!/usr/bin/env node
/**
 * Oracle Database 19c & APEX MCP Server
 * Provides full SQL, DDL, PL/SQL, DBMS_OUTPUT, and APEX metadata inspection tools.
 */

const oracledb = require('oracledb');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

// Configuration from Environment Variables with Defaults
const DB_USER = process.env.ORACLE_USER || 'solar_cook';
const DB_PASSWORD = process.env.ORACLE_PASSWORD || 'solar_cook';
const DB_CONNECT_STRING = process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank';
const ORACLE_CLIENT_LIB_DIR = process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin';
const APEX_WORKSPACE = process.env.APEX_WORKSPACE || 'SOLAR_COOK';

// Initialize Oracle Client in Thick Mode (needed for 10G password verifier 0x939 compatibility)
try {
  oracledb.initOracleClient({ libDir: ORACLE_CLIENT_LIB_DIR });
  console.error(`[Oracle MCP] Initialized Oracle Client (Thick Mode) from: ${ORACLE_CLIENT_LIB_DIR}`);
} catch (err) {
  console.error('[Oracle MCP] Warning: Failed to init thick mode:', err.message);
}

// Global oracledb settings
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = false;

// Connection Pool Management
let pool = null;

async function getPool() {
  if (!pool) {
    pool = await oracledb.createPool({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECT_STRING,
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
      poolTimeout: 60,
    });
    console.error(`[Oracle MCP] Connection pool established to ${DB_CONNECT_STRING} as user ${DB_USER}`);
  }
  return pool;
}

async function withConnection(callback) {
  const p = await getPool();
  let conn;
  try {
    conn = await p.getConnection();
    return await callback(conn);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (e) {
        console.error('[Oracle MCP] Error closing connection:', e.message);
      }
    }
  }
}

// Define MCP Tools
const TOOLS = [
  {
    name: 'oracle_query',
    description: 'Execute a read-only SQL query (SELECT) on the Oracle Database and return rows as structured JSON objects.',
    inputSchema: {
      type: 'object',
      properties: {
        sql: {
          type: 'string',
          description: 'The SELECT SQL statement to execute.'
        },
        binds: {
          type: 'object',
          description: 'Optional bind variables as key-value pairs (e.g. {"id": 10}).'
        },
        max_rows: {
          type: 'number',
          description: 'Maximum number of rows to return (default 100, max 1000).'
        }
      },
      required: ['sql']
    }
  },
  {
    name: 'oracle_execute',
    description: 'Execute DML (INSERT, UPDATE, DELETE) or DDL (CREATE, ALTER, DROP, TRUNCATE) or PL/SQL statement with automatic or manual commit.',
    inputSchema: {
      type: 'object',
      properties: {
        sql: {
          type: 'string',
          description: 'The SQL or PL/SQL statement to execute.'
        },
        binds: {
          type: 'object',
          description: 'Optional bind variables as key-value pairs.'
        },
        auto_commit: {
          type: 'boolean',
          description: 'Whether to commit transaction automatically (default: true).'
        }
      },
      required: ['sql']
    }
  },
  {
    name: 'oracle_run_plsql',
    description: 'Execute an anonymous PL/SQL block and capture DBMS_OUTPUT output lines.',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'PL/SQL code block (e.g. "BEGIN dbms_output.put_line(\'hi\'); END;").'
        },
        binds: {
          type: 'object',
          description: 'Optional bind parameters.'
        }
      },
      required: ['code']
    }
  },
  {
    name: 'oracle_list_tables',
    description: 'List tables and views in the current user schema (or specified schema), including row count and comments.',
    inputSchema: {
      type: 'object',
      properties: {
        schema: {
          type: 'string',
          description: 'Schema name (defaults to current connected user).'
        },
        include_views: {
          type: 'boolean',
          description: 'Whether to include views in the results (default: true).'
        }
      }
    }
  },
  {
    name: 'oracle_describe_table',
    description: 'Get full schema definition of a table or view (columns, data types, nullability, primary key, foreign keys, indexes).',
    inputSchema: {
      type: 'object',
      properties: {
        table_name: {
          type: 'string',
          description: 'The name of the table or view.'
        },
        schema: {
          type: 'string',
          description: 'Schema name (defaults to current user).'
        }
      },
      required: ['table_name']
    }
  },
  {
    name: 'oracle_list_objects',
    description: 'List database objects (TABLE, VIEW, PACKAGE, PROCEDURE, FUNCTION, TRIGGER, SEQUENCE) with compilation status.',
    inputSchema: {
      type: 'object',
      properties: {
        object_type: {
          type: 'string',
          description: 'Filter by type: TABLE, VIEW, PROCEDURE, FUNCTION, PACKAGE, TRIGGER, SEQUENCE (optional).'
        },
        schema: {
          type: 'string',
          description: 'Schema name (defaults to current user).'
        }
      }
    }
  },
  {
    name: 'oracle_get_ddl',
    description: 'Retrieve the DDL (CREATE script) or source code of any database object via DBMS_METADATA or USER_SOURCE.',
    inputSchema: {
      type: 'object',
      properties: {
        object_type: {
          type: 'string',
          description: 'Object type: TABLE, VIEW, PROCEDURE, FUNCTION, PACKAGE, PACKAGE_BODY, TRIGGER, SEQUENCE, INDEX.'
        },
        object_name: {
          type: 'string',
          description: 'The name of the database object.'
        },
        schema: {
          type: 'string',
          description: 'Schema name (defaults to current user).'
        }
      },
      required: ['object_type', 'object_name']
    }
  },
  {
    name: 'oracle_apex_list_apps',
    description: 'List Oracle APEX applications, application IDs, names, workspace, and aliases.',
    inputSchema: {
      type: 'object',
      properties: {
        workspace: {
          type: 'string',
          description: 'Filter by workspace name (defaults to SOLAR_COOK).'
        }
      }
    }
  },
  {
    name: 'oracle_apex_list_pages',
    description: 'List all pages in an APEX application, with page IDs, names, titles, aliases, and functions.',
    inputSchema: {
      type: 'object',
      properties: {
        application_id: {
          type: 'number',
          description: 'The APEX application ID (e.g. 100 for Spcki).'
        }
      },
      required: ['application_id']
    }
  },
  {
    name: 'oracle_apex_get_page_components',
    description: 'Inspect regions, page items, buttons, and processes for a specific APEX application page.',
    inputSchema: {
      type: 'object',
      properties: {
        application_id: {
          type: 'number',
          description: 'The APEX application ID.'
        },
        page_id: {
          type: 'number',
          description: 'The APEX page ID.'
        }
      },
      required: ['application_id', 'page_id']
    }
  },
  {
    name: 'oracle_connection_status',
    description: 'Check Oracle Database connection health, banner version, current schema, session ID, and APEX release.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Tool Implementation Handlers
async function handleToolCall(name, args) {
  switch (name) {
    case 'oracle_query': {
      const maxRows = Math.min(Math.max(args.max_rows || 100, 1), 1000);
      const binds = args.binds || {};
      return await withConnection(async (conn) => {
        const result = await conn.execute(args.sql, binds, {
          maxRows: maxRows,
        });
        return {
          row_count: result.rows ? result.rows.length : 0,
          rows: result.rows || [],
        };
      });
    }

    case 'oracle_execute': {
      const autoCommit = args.auto_commit !== false;
      const binds = args.binds || {};
      return await withConnection(async (conn) => {
        const result = await conn.execute(args.sql, binds, { autoCommit });
        return {
          rowsAffected: result.rowsAffected,
          lastRowid: result.lastRowid,
          status: 'success',
          auto_committed: autoCommit,
        };
      });
    }

    case 'oracle_run_plsql': {
      const binds = args.binds || {};
      return await withConnection(async (conn) => {
        // Enable DBMS_OUTPUT
        await conn.execute('BEGIN DBMS_OUTPUT.ENABLE(1000000); END;');

        // Run PL/SQL block
        await conn.execute(args.code, binds);

        // Fetch DBMS_OUTPUT lines
        const outputLines = [];
        let status = 0;
        while (status === 0) {
          const fetchRes = await conn.execute(
            'BEGIN DBMS_OUTPUT.GET_LINE(:line, :status); END;',
            {
              line: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 32767 },
              status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            }
          );
          status = fetchRes.outBinds.status;
          if (status === 0 && fetchRes.outBinds.line !== null) {
            outputLines.push(fetchRes.outBinds.line);
          }
        }

        return {
          status: 'success',
          lines_count: outputLines.length,
          output: outputLines.join('\n'),
          lines: outputLines,
        };
      });
    }

    case 'oracle_list_tables': {
      const targetSchema = (args.schema || DB_USER).toUpperCase();
      return await withConnection(async (conn) => {
        const sql = `
          SELECT 
            t.table_name,
            t.num_rows,
            t.tablespace_name,
            t.status,
            c.comments
          FROM all_tables t
          LEFT JOIN all_tab_comments c 
            ON c.owner = t.owner AND c.table_name = t.table_name
          WHERE t.owner = :owner
          ORDER BY t.table_name
        `;
        const tablesRes = await conn.execute(sql, { owner: targetSchema });
        let viewsRes = { rows: [] };
        if (args.include_views !== false) {
          viewsRes = await conn.execute(
            'SELECT view_name FROM all_views WHERE owner = :owner ORDER BY view_name',
            { owner: targetSchema }
          );
        }
        return {
          schema: targetSchema,
          table_count: tablesRes.rows ? tablesRes.rows.length : 0,
          tables: tablesRes.rows || [],
          view_count: viewsRes.rows ? viewsRes.rows.length : 0,
          views: viewsRes.rows ? viewsRes.rows.map(r => r.VIEW_NAME) : [],
        };
      });
    }

    case 'oracle_describe_table': {
      const tableName = args.table_name.toUpperCase();
      const targetSchema = (args.schema || DB_USER).toUpperCase();
      return await withConnection(async (conn) => {
        // Columns
        const colsRes = await conn.execute(
          `SELECT column_name, data_type, data_length, data_precision, data_scale, nullable, data_default
           FROM all_tab_columns
           WHERE owner = :owner AND table_name = :tname
           ORDER BY column_id`,
          { owner: targetSchema, tname: tableName }
        );

        // Constraints
        const consRes = await conn.execute(
          `SELECT c.constraint_name, c.constraint_type, c.search_condition, c.r_constraint_name,
                  cc.column_name, cc.position
           FROM all_constraints c
           JOIN all_cons_columns cc ON c.owner = cc.owner AND c.constraint_name = cc.constraint_name
           WHERE c.owner = :owner AND c.table_name = :tname
           ORDER BY c.constraint_type, c.constraint_name, cc.position`,
          { owner: targetSchema, tname: tableName }
        );

        // Indexes
        const idxRes = await conn.execute(
          `SELECT i.index_name, i.uniqueness, ic.column_name, ic.column_position
           FROM all_indexes i
           JOIN all_ind_columns ic ON i.owner = ic.index_owner AND i.index_name = ic.index_name
           WHERE i.table_owner = :owner AND i.table_name = :tname
           ORDER BY i.index_name, ic.column_position`,
          { owner: targetSchema, tname: tableName }
        );

        return {
          table_name: tableName,
          schema: targetSchema,
          column_count: colsRes.rows ? colsRes.rows.length : 0,
          columns: colsRes.rows || [],
          constraints: consRes.rows || [],
          indexes: idxRes.rows || [],
        };
      });
    }

    case 'oracle_list_objects': {
      const targetSchema = (args.schema || DB_USER).toUpperCase();
      let sql = 'SELECT object_name, object_type, status, created, last_ddl_time FROM all_objects WHERE owner = :owner';
      const binds = { owner: targetSchema };
      if (args.object_type) {
        sql += ' AND object_type = :otype';
        binds.otype = args.object_type.toUpperCase();
      }
      sql += ' ORDER BY object_type, object_name';

      return await withConnection(async (conn) => {
        const res = await conn.execute(sql, binds);
        return {
          schema: targetSchema,
          count: res.rows ? res.rows.length : 0,
          objects: res.rows || [],
        };
      });
    }

    case 'oracle_get_ddl': {
      const otype = args.object_type.toUpperCase();
      const oname = args.object_name.toUpperCase();
      const schema = (args.schema || DB_USER).toUpperCase();

      return await withConnection(async (conn) => {
        // Try DBMS_METADATA.GET_DDL
        try {
          const ddlRes = await conn.execute(
            `SELECT dbms_metadata.get_ddl(:otype, :oname, :schema) AS ddl FROM dual`,
            { otype, oname, schema }
          );
          if (ddlRes.rows && ddlRes.rows.length > 0) {
            return {
              object_type: otype,
              object_name: oname,
              schema: schema,
              ddl: ddlRes.rows[0].DDL,
            };
          }
        } catch (metadataErr) {
          // Fallback to ALL_SOURCE if procedural code
          if (['PROCEDURE', 'FUNCTION', 'PACKAGE', 'PACKAGE_BODY', 'TRIGGER', 'TYPE'].includes(otype)) {
            const srcRes = await conn.execute(
              `SELECT text FROM all_source WHERE owner = :schema AND name = :oname AND type = :otype ORDER BY line`,
              { schema, oname, otype }
            );
            if (srcRes.rows && srcRes.rows.length > 0) {
              const fullSource = srcRes.rows.map(r => r.TEXT).join('');
              return {
                object_type: otype,
                object_name: oname,
                schema: schema,
                source: fullSource,
              };
            }
          }
          throw metadataErr;
        }
      });
    }

    case 'oracle_apex_list_apps': {
      const ws = (args.workspace || APEX_WORKSPACE).toUpperCase();
      return await withConnection(async (conn) => {
        const sql = `
          SELECT application_id, application_name, workspace, alias, theme_number, pages_count
          FROM (
            SELECT application_id, application_name, workspace, alias, theme_number,
                   (SELECT count(*) FROM apex_application_pages p WHERE p.application_id = a.application_id) as pages_count
            FROM apex_applications a
            WHERE UPPER(workspace) = :ws OR :ws IS NULL
          )
          ORDER BY application_id
        `;
        const res = await conn.execute(sql, { ws });
        return {
          workspace: ws,
          count: res.rows ? res.rows.length : 0,
          applications: res.rows || [],
        };
      });
    }

    case 'oracle_apex_list_pages': {
      const appId = args.application_id;
      return await withConnection(async (conn) => {
        const sql = `
          SELECT page_id, page_name, page_title, page_alias, page_group, page_function
          FROM apex_application_pages
          WHERE application_id = :appId
          ORDER BY page_id
        `;
        const res = await conn.execute(sql, { appId });
        return {
          application_id: appId,
          page_count: res.rows ? res.rows.length : 0,
          pages: res.rows || [],
        };
      });
    }

    case 'oracle_apex_get_page_components': {
      const { application_id: appId, page_id: pageId } = args;
      return await withConnection(async (conn) => {
        // Regions
        const regRes = await conn.execute(
          `SELECT region_id, region_name, source_type, static_id FROM apex_application_page_regions WHERE application_id = :appId AND page_id = :pageId ORDER BY display_sequence`,
          { appId, pageId }
        );
        // Items
        const itemRes = await conn.execute(
          `SELECT item_name, display_as, label, item_source_type FROM apex_application_page_items WHERE application_id = :appId AND page_id = :pageId ORDER BY display_sequence`,
          { appId, pageId }
        );
        // Buttons
        const btnRes = await conn.execute(
          `SELECT button_name, label, button_action, button_position FROM apex_application_page_buttons WHERE application_id = :appId AND page_id = :pageId ORDER BY button_sequence`,
          { appId, pageId }
        );
        // Processes
        const procRes = await conn.execute(
          `SELECT process_name, process_type, execution_chain FROM apex_application_page_proc WHERE application_id = :appId AND page_id = :pageId ORDER BY execution_sequence`,
          { appId, pageId }
        );

        return {
          application_id: appId,
          page_id: pageId,
          regions: regRes.rows || [],
          items: itemRes.rows || [],
          buttons: btnRes.rows || [],
          processes: procRes.rows || [],
        };
      });
    }

    case 'oracle_connection_status': {
      return await withConnection(async (conn) => {
        const ver = await conn.execute('SELECT banner FROM v$version WHERE rownum = 1');
        const user = await conn.execute('SELECT user, sys_context(\'USERENV\', \'SESSIONID\') as session_id, sys_context(\'USERENV\', \'DB_NAME\') as db_name FROM dual');
        const apexVer = await conn.execute('SELECT version_no, api_compatibility FROM apex_release');

        return {
          status: 'CONNECTED',
          database_banner: ver.rows ? ver.rows[0].BANNER : 'Unknown',
          connected_user: user.rows ? user.rows[0].USER : 'Unknown',
          db_name: user.rows ? user.rows[0].DB_NAME : 'Unknown',
          session_id: user.rows ? user.rows[0].SESSION_ID : 'Unknown',
          apex_release: apexVer.rows ? apexVer.rows[0].VERSION_NO : 'Unknown',
          connect_string: DB_CONNECT_STRING,
          client_lib_dir: ORACLE_CLIENT_LIB_DIR,
          apex_workspace: APEX_WORKSPACE,
        };
      });
    }

    default:
      throw new Error(`Unknown tool name: ${name}`);
  }
}

// Create and initialize Server
const server = new Server(
  {
    name: 'oracle-database-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Tool List Handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Register Tool Call Handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    const result = await handleToolCall(name, args || {});
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error(`[Oracle MCP Error in ${name}]:`, error.message);
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Oracle MCP Error [${name}]: ${error.message}\n${error.stack || ''}`,
        },
      ],
    };
  }
});

// Start Server on Stdio Transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[Oracle MCP] Server is running on stdio');
}

main().catch((err) => {
  console.error('[Oracle MCP Fatal]:', err);
  process.exit(1);
});
