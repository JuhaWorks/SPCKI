/**
 * add-form-action-buttons.cjs
 * Updates the Buttons Container on all 6 form pages (12, 13, 14, 15, 16, 17)
 * with styled Universal Theme action buttons (Cancel, Delete, Save, Create).
 */
const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

const forms = [
  { page: 12, pk: 'P12_ID', name: 'Cooking Session' },
  { page: 13, pk: 'P13_ID', name: 'Household' },
  { page: 14, pk: 'P14_ID', name: 'Kitchen Slot' },
  { page: 15, pk: 'P15_ID', name: 'Daily Technical Log' },
  { page: 16, pk: 'P16_ID', name: 'Generator Log' },
  { page: 17, pk: 'P17_ID', name: 'Monthly Feedback' },
];

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  try {
    for (const f of forms) {
      const plsql = `
DECLARE
  l_plug_id NUMBER;
BEGIN
  SELECT region_id INTO l_plug_id
  FROM apex_application_page_regions
  WHERE application_id = 100 AND page_id = :p_page AND region_name = 'Buttons Container';

  UPDATE wwv_flow_page_plugs
  SET plug_source = q'[
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:14px 18px; border-top:1px solid #e2e8f0; background:#f8fafc; border-radius:0 0 8px 8px;">
  <div style="display:flex; gap:10px;">
    <button type="button" onclick="apex.navigation.dialog.close(true);" class="t-Button">Cancel</button>
    <button type="button" id="btn_delete_${f.page}" onclick="if(confirm('Are you sure you want to delete this ${f.name}?')){apex.submit('DELETE');}" class="t-Button t-Button--danger">
      <span class="fa fa-trash" aria-hidden="true"></span> Delete
    </button>
  </div>
  <div style="display:flex; gap:10px;">
    <button type="button" id="btn_save_${f.page}" onclick="apex.submit('SAVE');" class="t-Button t-Button--primary t-Button--hot">
      <span class="fa fa-check" aria-hidden="true"></span> Save Changes
    </button>
    <button type="button" id="btn_create_${f.page}" onclick="apex.submit('CREATE');" class="t-Button t-Button--primary t-Button--hot">
      <span class="fa fa-plus" aria-hidden="true"></span> Create ${f.name}
    </button>
  </div>
</div>
<script>
(function() {
  var pkVal = apex.item('${f.pk}').getValue();
  if (!pkVal) {
    var bDel = document.getElementById('btn_delete_${f.page}');
    var bSave = document.getElementById('btn_save_${f.page}');
    if (bDel) bDel.style.display = 'none';
    if (bSave) bSave.style.display = 'none';
  } else {
    var bCreate = document.getElementById('btn_create_${f.page}');
    if (bCreate) bCreate.style.display = 'none';
  }
})();
</script>
]'
  WHERE id = l_plug_id;
  COMMIT;
END;
`;
      await conn.execute(plsql, { p_page: f.page });
      console.log(`✓ Attached action buttons to Page ${f.page} (${f.name})`);
    }
    console.log('\n🎉 ALL FORM ACTION BUTTONS ATTACHED SUCCESSFULLY! 🎉');
  } finally {
    await conn.close();
  }
}

main().catch(console.error);
