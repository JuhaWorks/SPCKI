const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin'
};

async function executeBlock(conn, title, sql, params = {}) {
  console.log(`\n=== [RUNNING] ${title} ===`);
  try {
    await conn.execute(sql, params);
    console.log(`[SUCCESS] ${title}`);
  } catch (err) {
    console.error(`[ERROR] ${title}:`, err.message);
    throw err;
  }
}

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);

  try {
    const cleanPlugHeader = `
<div class="spcki-login-brand">
  <div class="spcki-brand-icon">
    <span class="fa fa-sun-o"></span>
  </div>
  <h1 class="spcki-brand-title">SPCKI Monitoring Platform</h1>
  <p class="spcki-brand-subtitle">Solar Powered Community Kitchen Initiative</p>
</div>
`;

    await executeBlock(conn, 'Update Page 9999 Login Region', `
    BEGIN
      UPDATE apex_200100.wwv_flow_page_plugs
         SET plug_header = :hdr,
             plug_footer = NULL,
             icon_css_classes = NULL
       WHERE flow_id = 100 AND page_id = 9999 AND plug_name = 'SPCKI Monitoring Platform';
      COMMIT;
    END;
    `, { hdr: cleanPlugHeader });

    const loginCSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

html, body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  background: #f8fafc !important;
  color: #0f172a !important;
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100vh !important;
}

/* Background & Centering */
.t-PageBody--login {
  background: radial-gradient(circle at 50% 12%, #f1f5f9 0%, #f8fafc 100%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 100vh !important;
}

.t-Login-container {
  max-width: 420px !important;
  width: 100% !important;
  margin: auto !important;
  padding: 24px 16px !important;
}

.t-Login-containerBody {
  padding: 0 !important;
}

/* Pristine Minimalist Card */
.t-Login-region {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 18px !important;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02) !important;
  padding: 38px 34px 34px 34px !important;
  position: relative !important;
  overflow: hidden !important;
}

/* Hide APEX theme redundant header and rocket icon */
.t-Login-header,
.t-Login-logo,
.t-Login-title,
.app-icon {
  display: none !important;
}

.t-Login-subRegions {
  display: none !important;
}

/* Bespoke Unified Brand Header */
.spcki-login-brand {
  text-align: center;
  margin-bottom: 26px;
}

.spcki-brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: #0f172a;
  border-radius: 14px;
  color: #f59e0b;
  font-size: 24px;
  margin-bottom: 14px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.14);
}

.spcki-brand-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.spcki-brand-subtitle {
  margin: 5px 0 0 0;
  font-size: 0.86rem;
  color: #64748b;
  font-weight: 500;
}

/* Form Layout */
.t-Login-body {
  padding: 0 !important;
}

.t-Form-fieldContainer {
  margin-bottom: 16px !important;
  padding: 0 !important;
}

.t-Form-itemWrapper {
  position: relative !important;
  display: block !important;
  width: 100% !important;
}

/* Modern Input Controls */
.t-Form-inputContainer input.text_field,
.t-Form-inputContainer input.password {
  width: 100% !important;
  height: 46px !important;
  background-color: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 9px !important;
  padding-left: 42px !important;
  padding-right: 14px !important;
  font-size: 0.94rem !important;
  font-family: inherit !important;
  color: #0f172a !important;
  transition: all 0.15s ease-in-out !important;
  box-sizing: border-box !important;
}

.t-Form-inputContainer input.text_field:focus,
.t-Form-inputContainer input.password:focus {
  background-color: #ffffff !important;
  border-color: #0f172a !important;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08) !important;
  outline: none !important;
}

.t-Form-inputContainer input::placeholder {
  color: #9ca3af !important;
  font-size: 0.92rem !important;
}

/* Clean Input Icons */
.t-Form-itemWrapper .apex-item-icon {
  position: absolute !important;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #9ca3af !important;
  font-size: 15px !important;
  background: transparent !important;
  border: none !important;
  line-height: 1 !important;
  pointer-events: none !important;
  z-index: 10 !important;
  display: inline-block !important;
}

/* Remember username checkbox */
#P9999_REMEMBER_CONTAINER {
  margin-top: 4px !important;
  margin-bottom: 22px !important;
}

.t-Form-helpButton {
  display: none !important;
}

#P9999_REMEMBER_CONTAINER .apex-item-group--rc,
#P9999_REMEMBER_CONTAINER .apex-item-checkbox {
  display: flex !important;
  align-items: center !important;
}

#P9999_REMEMBER_CONTAINER .apex-item-option {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  margin: 0 !important;
  cursor: pointer !important;
}

#P9999_REMEMBER_CONTAINER .apex-item-option input[type="checkbox"] {
  order: 1 !important;
  position: static !important;
  opacity: 1 !important;
  width: 16px !important;
  height: 16px !important;
  margin: 0 !important;
  accent-color: #0f172a !important;
  cursor: pointer !important;
  border-radius: 4px !important;
  flex-shrink: 0 !important;
}

#P9999_REMEMBER_CONTAINER .apex-item-option label {
  order: 2 !important;
  font-size: 0.88rem !important;
  color: #475569 !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  padding-left: 8px !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}

#P9999_REMEMBER_CONTAINER .apex-item-option label::before,
#P9999_REMEMBER_CONTAINER .apex-item-option label::after {
  display: none !important;
}

/* Sign In Button */
.t-Login-buttons {
  margin-top: 4px !important;
  padding: 0 !important;
}

.t-Login-buttons .t-Button--hot,
#B472373807972945978 {
  width: 100% !important;
  height: 46px !important;
  background: #0f172a !important;
  border: 1px solid #0f172a !important;
  border-radius: 9px !important;
  color: #ffffff !important;
  font-size: 0.96rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12) !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.t-Login-buttons .t-Button--hot:hover,
#B472373807972945978:hover {
  background: #1e293b !important;
  border-color: #1e293b !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18) !important;
  transform: translateY(-1px) !important;
}

.t-Login-buttons .t-Button--hot:active,
#B472373807972945978:active {
  transform: translateY(0) !important;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12) !important;
}

/* Sub-note footer */
.spcki-login-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.78rem;
  color: #94a3b8;
  letter-spacing: 0.02em;
}
`;

    const loginJS = `
document.addEventListener('DOMContentLoaded', function() {
  var u = document.getElementById('P9999_USERNAME');
  var p = document.getElementById('P9999_PASSWORD');
  function handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      apex.submit({request: 'LOGIN', validate: true});
    }
  }
  if (u) u.addEventListener('keydown', handleEnter);
  if (p) p.addEventListener('keydown', handleEnter);
  if (u && !u.value) u.focus();
  else if (p) p.focus();

  var links = document.querySelector('.t-Login-links');
  if (links) {
    links.innerHTML = '<div class="spcki-login-footer">Enterprise Clean Energy Platform &bull; Secure Access</div>';
  }
});
`;

    await executeBlock(conn, 'Update Page 9999 step: Set Inline CSS and JavaScript', `
    BEGIN
      UPDATE apex_200100.wwv_flow_steps
         SET inline_css = :css,
             javascript_code = :js
       WHERE flow_id = 100 AND id = 9999;
      COMMIT;
    END;
    `, { css: loginCSS, js: loginJS });

  } finally {
    await conn.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
