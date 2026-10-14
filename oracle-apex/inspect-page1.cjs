const oracledb = require('oracledb');
const fs = require('fs');

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
    const res = await conn.execute(
      `SELECT id, plug_name, plug_source_type, plug_source 
         FROM apex_200100.wwv_flow_page_plugs 
        WHERE flow_id = 100 AND page_id = 1`
    );
    for (let i = 0; i < res.rows.length; i++) {
      const r = res.rows[i];
      let src = '';
      if (r[3]) {
        src = await r[3].getData();
      }
      console.log(`Plug [${r[1]}], ID: ${r[0]}, Source Len: ${src.length}`);
      fs.writeFileSync(`page1_plug_${i}_${r[1].replace(/[^a-zA-Z0-9]/g, '_')}.txt`, src);
    }

    const step = await conn.execute(
      `SELECT javascript_code, inline_css 
         FROM apex_200100.wwv_flow_steps 
        WHERE flow_id = 100 AND id = 1`
    );
    if (step.rows.length) {
      const js = step.rows[0][0] ? await step.rows[0][0].getData() : '';
      const css = step.rows[0][1] ? await step.rows[0][1].getData() : '';
      console.log(`Page 1 Step JS len: ${js.length}, CSS len: ${css.length}`);
      fs.writeFileSync('page1_step_js.txt', js);
      fs.writeFileSync('page1_step_css.txt', css);
    }
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
