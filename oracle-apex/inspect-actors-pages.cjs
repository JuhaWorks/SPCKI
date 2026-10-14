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
  try {
    const users = await conn.execute(`SELECT id, username, role FROM users ORDER BY id`);
    console.log('Users in database:', users.rows);

    const pages = await conn.execute(
      `SELECT id, name, step_title FROM apex_200100.wwv_flow_steps WHERE flow_id = 100 ORDER BY id`
    );
    console.log('\nPages in Application 100:');
    for (const p of pages.rows) {
      console.log(`Page ${p[0]}: ${p[1]} (${p[2]})`);
    }

    const delBtns = await conn.execute(
      `SELECT flow_step_id, button_name, button_image_alt, button_action 
         FROM apex_200100.wwv_flow_step_buttons 
        WHERE flow_id = 100 AND LOWER(button_name) LIKE '%del%'`
    );
    console.log('\nDelete buttons in flow 100:', delBtns.rows);

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
