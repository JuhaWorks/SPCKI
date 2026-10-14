const oracledb = require('oracledb');
try { oracledb.initOracleClient({ libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin' }); } catch (e) {}

(async () => {
  const conn = await oracledb.getConnection({
    user: 'solar_cook',
    password: 'solar_cook',
    connectString: '202.84.45.58:1521/bexibank',
  });
  try {
    oracledb.fetchAsString = [oracledb.CLOB];
    const r = await conn.execute(
      `SELECT region_source
       FROM apex_application_page_regions
       WHERE application_id = 100 AND page_id = 1 AND region_name = 'Operational Analytics & Performance Visualizations'`
    );
    const src = r.rows[0][0];

    const plsql = `
    DECLARE
      l_nm owa.vc_arr;
      l_vl owa.vc_arr;
      l_lines htp.htbuf_arr;
      l_numlines INTEGER := 99999;
      l_res CLOB;
    BEGIN
      l_nm(1) := 'REQUEST_METHOD';
      l_vl(1) := 'GET';
      owa.init_cgi_env(1, l_nm, l_vl);
      
      -- Execute the region source
      ${src}
      
      owa.get_page(l_lines, l_numlines);
      dbms_output.put_line('Got ' || l_numlines || ' lines from HTP buffer.');
      FOR i IN 1..LEAST(l_numlines, 20) LOOP
        dbms_output.put_line(SUBSTR(l_lines(i), 1, 100));
      END LOOP;
    EXCEPTION WHEN OTHERS THEN
      dbms_output.put_line('ERROR: ' || DBMS_UTILITY.FORMAT_ERROR_BACKTRACE || ' -- ' || SQLERRM);
    END;
    `;
    await conn.execute("BEGIN dbms_output.enable(100000); END;");
    await conn.execute(plsql);
    let more = true;
    while (more) {
      const dbmsOut = await conn.execute(
        `DECLARE
           l_line VARCHAR2(32767);
           l_status INTEGER;
         BEGIN
           dbms_output.get_line(l_line, l_status);
           :line := l_line;
           :status := l_status;
         END;`,
        {
          line: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        }
      );
      if (dbmsOut.outBinds.status === 0) {
        console.log(dbmsOut.outBinds.line);
      } else {
        more = false;
      }
    }
  } finally {
    await conn.close();
  }
})().catch(console.error);
