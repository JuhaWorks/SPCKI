const oracledb = require('oracledb');

const DB_USER = process.env.ORACLE_USER || 'solar_cook';
const DB_PASSWORD = process.env.ORACLE_PASSWORD || 'solar_cook';
const DB_CONNECT_STRING = process.env.ORACLE_CONNECT_STRING || '202.84.45.58:1521/bexibank';
const ORACLE_CLIENT_LIB_DIR = process.env.ORACLE_CLIENT_LIB_DIR || 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin';

try {
  oracledb.initOracleClient({ libDir: ORACLE_CLIENT_LIB_DIR });
} catch (e) {}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function inspectApexApp() {
  const conn = await oracledb.getConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    connectString: DB_CONNECT_STRING,
  });

  try {
    const wsRes = await conn.execute("SELECT apex_util.find_security_group_id('SOLAR_COOK') AS wsid FROM dual");
    const wsid = wsRes.rows[0].WSID;
    console.log('Workspace ID for SOLAR_COOK:', wsid);

    await conn.execute("BEGIN wwv_flow_api.set_security_group_id(:wsid); END;", { wsid });

    const pages = await conn.execute(
      "SELECT page_id, page_name, page_title, page_alias FROM apex_application_pages WHERE application_id = 100 ORDER BY page_id"
    );
    console.log('\nPages in App 100:');
    console.table(pages.rows);

    const regions = await conn.execute(
      "SELECT page_id, region_name, source_type, static_id FROM apex_application_page_regions WHERE application_id = 100 ORDER BY page_id, display_sequence"
    );
    console.log('\nRegions in App 100:');
    console.table(regions.rows);

    const items = await conn.execute(
      "SELECT page_id, item_name, display_as, label FROM apex_application_page_items WHERE application_id = 100 ORDER BY page_id, display_sequence"
    );
    console.log('\nPage Items in App 100:');
    console.table(items.rows);

    const nav = await conn.execute(
      "SELECT entry_text, entry_target FROM apex_application_list_entries WHERE application_id = 100"
    );
    console.log('\nNavigation List Entries:');
    console.table(nav.rows);

  } finally {
    await conn.close();
  }
}

inspectApexApp().catch(console.error);
