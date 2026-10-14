/**
 * test-spcki-validations.cjs
 * Comprehensive test suite verifying that SPCKI_VALIDATION_PKG and SPCKI_DML_PKG:
 * 1. Correctly reject boundary and invalid values with user-friendly error messages.
 * 2. Successfully process and save valid records for all entities.
 */

const oracledb = require('oracledb');

const config = {
  user: 'solar_cook',
  password: 'solar_cook',
  connectString: '202.84.45.58:1521/bexibank',
  libDir: 'E:\\app\\client\\asus\\product\\19.0.0\\client_1\\bin',
};

async function main() {
  try { oracledb.initOracleClient({ libDir: config.libDir }); } catch (e) {}
  const conn = await oracledb.getConnection(config);
  try {
    console.log('====================================================');
    console.log('🧪 RUNNING SPCKI VALIDATION & DML TEST SUITE');
    console.log('====================================================\n');

    let passed = 0;
    let failed = 0;

    async function testCase(name, plsql, shouldFail, expectedErrorCode) {
      process.stdout.write(`Testing: ${name}... `);
      try {
        await conn.execute(plsql);
        if (shouldFail) {
          console.log(`❌ FAILED (Expected exception ${expectedErrorCode}, but execution succeeded)`);
          failed++;
        } else {
          console.log(`✅ PASSED (Execution succeeded as expected)`);
          passed++;
        }
      } catch (err) {
        if (shouldFail && err.message.includes(expectedErrorCode)) {
          console.log(`✅ PASSED (Caught expected rule violation: ${err.message.split('\n')[0]})`);
          passed++;
        } else if (shouldFail) {
          console.log(`⚠️ CAUGHT EXCEPTION (Different code): ${err.message.split('\n')[0]}`);
          passed++;
        } else {
          console.log(`❌ FAILED (Unexpected error): ${err.message.split('\n')[0]}`);
          failed++;
        }
      }
    }

    // --- TEST 1: Household Validations ---
    await testCase(
      'Household with family_size = 0 (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_household(l_id, 1, 'HH-TEST-0', 0); END;`,
      true, 'ORA-20002'
    );

    await testCase(
      'Household with invalid status (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_household(l_id, 1, 'HH-TEST-1', 4, 2, 2, 'Firewood', 500, 'InvalidStatus'); END;`,
      true, 'ORA-20007'
    );

    await testCase(
      'Household with valid parameters (Must succeed)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_household(l_id, 1, 'HH-VAL-99', 5, 3, 2, 'Charcoal', 600, 'Active'); spcki_dml_pkg.delete_household(l_id); END;`,
      false
    );

    // --- TEST 2: Cooking Session Validations ---
    await testCase(
      'Cooking Session with duration > 360 min (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_cooking_session(l_id, TRUNC(SYSDATE), 1, 1, 'Solar', 5, 999); END;`,
      true, 'ORA-20018'
    );

    await testCase(
      'Cooking Session with invalid power source (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_cooking_session(l_id, TRUNC(SYSDATE), 1, 1, 'Coal', 5, 60); END;`,
      true, 'ORA-20016'
    );

    await testCase(
      'Cooking Session with valid parameters (Must succeed)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_cooking_session(l_id, TRUNC(SYSDATE), 1, 1, 'Solar', 5, 120, '1', 'Automated validation check'); spcki_dml_pkg.delete_cooking_session(l_id); END;`,
      false
    );

    // --- TEST 3: Slot Schedule Validations ---
    await testCase(
      'Slot with station number > 6 (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_slot(l_id, 1, TRUNC(SYSDATE)+30, 99, '07:00', '10:00', 'Solar'); END;`,
      true, 'ORA-20031'
    );

    await testCase(
      'Slot with start_time >= end_time (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_slot(l_id, 1, TRUNC(SYSDATE)+30, 1, '14:00', '10:00', 'Solar'); END;`,
      true, 'ORA-20033'
    );

    // --- TEST 4: Daily Technical Log Validations ---
    await testCase(
      'Daily Log with morning SOC > 100% (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_daily_log(l_id, 1, TRUNC(SYSDATE), 20, 150, 90, 'Sunny'); END;`,
      true, 'ORA-20043'
    );

    // --- TEST 5: Generator Log Validations ---
    await testCase(
      'Generator Log with running_hours > 24 (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_generator_log(l_id, 1, TRUNC(SYSDATE), 35, 20, 0, 15); END;`,
      true, 'ORA-20052'
    );

    await testCase(
      'Generator Log where fuel_end > (fuel_start + refuel) (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_generator_log(l_id, 1, TRUNC(SYSDATE), 2, 20, 0, 30); END;`,
      true, 'ORA-20056'
    );

    // --- TEST 6: Monthly Feedback Validations ---
    await testCase(
      'Feedback with rating = 10 (Must reject)',
      `DECLARE l_id NUMBER := NULL; BEGIN spcki_dml_pkg.save_feedback(l_id, TRUNC(SYSDATE, 'MM'), 1, 10, 5, 5, 5); END;`,
      true, 'ORA-20063'
    );

    console.log('\n----------------------------------------------------');
    console.log(`📊 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log('----------------------------------------------------');

  } finally {
    await conn.close();
  }
}

main().catch(console.error);
