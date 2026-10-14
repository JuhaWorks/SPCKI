const oracledb = require('oracledb');
const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin'
};

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  const res = await conn.execute(
    `SELECT w.page_id, r.sort_column_1, r.sort_direction_1, r.sort_column_2, r.sort_direction_2, r.report_columns
     FROM apex_200100.wwv_flow_worksheets w
     JOIN apex_200100.wwv_flow_worksheet_rpts r ON r.worksheet_id = w.id
     WHERE w.flow_id = 100 AND w.page_id BETWEEN 2 AND 7
     ORDER BY w.page_id`
  );
  console.log('Worksheet sorting:');
  res.rows.forEach(r => console.log(`Page ${r[0]}: Sort 1=${r[1]} (${r[2]}), Sort 2=${r[3]} (${r[4]}) | Cols=${r[5]}`));
  await conn.close();
}

main().catch(console.error);
