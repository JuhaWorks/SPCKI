#!/usr/bin/env node
/**
 * Oracle & APEX Command Line Interface (CLI)
 * Interactive query runner and management CLI.
 */

const oracledb = require('oracledb');
const readline = require('readline');

const DB_USER = process.env.ORACLE_USER || 'solar_cook';
const DB_PASSWORD = process.env.ORACLE_PASSWORD || 'solar_cook';
const DB_CONNECT_STRING = process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank';
const ORACLE_CLIENT_LIB_DIR = process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin';
const APEX_WORKSPACE = process.env.APEX_WORKSPACE || 'SOLAR_COOK';

try {
  oracledb.initOracleClient({ libDir: ORACLE_CLIENT_LIB_DIR });
} catch (e) {}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

async function getConnection() {
  return await oracledb.getConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    connectString: DB_CONNECT_STRING,
  });
}

async function showStatus() {
  const conn = await getConnection();
  try {
    const ver = await conn.execute('SELECT banner FROM v$version WHERE rownum = 1');
    const user = await conn.execute('SELECT user, sys_context(\'USERENV\', \'DB_NAME\') as db FROM dual');
    const apex = await conn.execute('SELECT version_no FROM apex_release');

    console.log('\n================ Oracle Connection Status ================');
    console.log(`Host / Service : ${DB_CONNECT_STRING}`);
    console.log(`Database User  : ${user.rows[0].USER}`);
    console.log(`Database Name  : ${user.rows[0].DB}`);
    console.log(`APEX Release   : ${apex.rows[0].VERSION_NO}`);
    console.log(`APEX Workspace : ${APEX_WORKSPACE}`);
    console.log(`Oracle Banner  : ${ver.rows[0].BANNER}`);
    console.log('==========================================================\n');
  } finally {
    await conn.close();
  }
}

async function listTables() {
  const conn = await getConnection();
  try {
    const res = await conn.execute(
      'SELECT table_name, num_rows, status FROM user_tables ORDER BY table_name'
    );
    console.log('\nUser Tables:');
    console.table(res.rows);
  } finally {
    await conn.close();
  }
}

async function describeTable(tableName) {
  const conn = await getConnection();
  try {
    const res = await conn.execute(
      `SELECT column_name, data_type, data_length, nullable, data_default 
       FROM user_tab_columns 
       WHERE table_name = :tname 
       ORDER BY column_id`,
      { tname: tableName.toUpperCase() }
    );
    console.log(`\nTable Schema: ${tableName.toUpperCase()}`);
    console.table(res.rows);
  } finally {
    await conn.close();
  }
}

async function listApexApps() {
  const conn = await getConnection();
  try {
    const res = await conn.execute(
      `SELECT application_id, application_name, workspace, alias 
       FROM apex_applications 
       WHERE workspace = :ws 
       ORDER BY application_id`,
      { ws: APEX_WORKSPACE }
    );
    console.log(`\nAPEX Applications in Workspace "${APEX_WORKSPACE}":`);
    console.table(res.rows);
  } finally {
    await conn.close();
  }
}

async function listApexPages(appId) {
  const conn = await getConnection();
  try {
    const res = await conn.execute(
      `SELECT page_id, page_name, page_alias 
       FROM apex_application_pages 
       WHERE application_id = :appId 
       ORDER BY page_id`,
      { appId: Number(appId) }
    );
    console.log(`\nPages for Application ${appId}:`);
    console.table(res.rows);
  } finally {
    await conn.close();
  }
}

async function runQuery(sql) {
  const conn = await getConnection();
  try {
    const isSelect = sql.trim().match(/^(select|with)\s/i);
    const res = await conn.execute(sql, {}, { autoCommit: true });
    if (isSelect) {
      console.log(`\nQuery Results (${res.rows ? res.rows.length : 0} rows):`);
      console.table(res.rows);
    } else {
      console.log(`\nStatement executed successfully. Rows affected: ${res.rowsAffected || 0}`);
    }
  } catch (err) {
    console.error('SQL Error:', err.message);
  } finally {
    await conn.close();
  }
}

async function startRepl() {
  await showStatus();
  console.log('Enter SQL or commands (.tables, .apps, .pages <id>, .desc <table>, exit):');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'SQL> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      rl.prompt();
      return;
    }
    if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
      rl.close();
      return;
    }

    try {
      if (trimmed === '.status') {
        await showStatus();
      } else if (trimmed === '.tables') {
        await listTables();
      } else if (trimmed === '.apps') {
        await listApexApps();
      } else if (trimmed.startsWith('.pages')) {
        const parts = trimmed.split(/\s+/);
        await listApexPages(parts[1] || 100);
      } else if (trimmed.startsWith('.desc')) {
        const parts = trimmed.split(/\s+/);
        await describeTable(parts[1] || 'SPCKI');
      } else {
        await runQuery(trimmed.replace(/;$/, ''));
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
    rl.prompt();
  });
}

// Command router
const [,, cmd, ...rest] = process.argv;

(async () => {
  try {
    switch (cmd) {
      case 'status':
        await showStatus();
        break;
      case 'tables':
        await listTables();
        break;
      case 'desc':
        await describeTable(rest[0] || 'SPCKI');
        break;
      case 'apps':
        await listApexApps();
        break;
      case 'pages':
        await listApexPages(rest[0] || 100);
        break;
      case 'query':
      case 'sql':
        await runQuery(rest.join(' '));
        break;
      case 'repl':
      case undefined:
        await startRepl();
        break;
      default:
        console.log(`Unknown command: ${cmd}`);
        console.log('Usage:');
        console.log('  node oracle-cli.cjs status');
        console.log('  node oracle-cli.cjs tables');
        console.log('  node oracle-cli.cjs desc <table_name>');
        console.log('  node oracle-cli.cjs apps');
        console.log('  node oracle-cli.cjs pages <application_id>');
        console.log('  node oracle-cli.cjs sql "SELECT * FROM spcki WHERE ROWNUM <= 5"');
        console.log('  node oracle-cli.cjs repl');
        break;
    }
  } catch (err) {
    console.error('CLI Fatal Error:', err.message);
    process.exit(1);
  }
})();
