# RIGSE-228: Remaining Cypress Test Issues

## Summary
Successfully fixed 6 out of 8 failing test files. The following 2 test files still have issues that need to be addressed:

## ✅ Successfully Fixed Tests (6/8)
1. **`automatedtestactivityplantgrowth_ap_spec.js`** - All 4 tests passing ✅
2. **`admin_materials_collections_filter.spec.js`** - All 1 test passing ✅  
3. **`user_login_logout_header_login.spec.js`** - All 7 tests passing ✅
4. **`multiple_teacher_classes.spec.js`** - All 9 tests passing ✅
5. **`student_joins_another_class.spec.js`** - All 5 tests passing ✅
6. **`student_registers_spec.js`** - All 2 tests passing ✅

## ❌ Remaining Issues (2/8)

### 1. `automatedtestsequence_hurricanemodule.spec.js`
**Status**: 5/7 tests passing, 2 failing

**Failing Tests:**
- `Verify teacher can verify reports and provide feedback`
- `Verify student can see the feedback from their teacher`

**Issues:**
1. **Report Loading Issue**: Reports show "Loading..." instead of actual answer content
   - **Location**: `cypress/support/helpers/genericReportHelper.js:verifyOpenResponseQuestionAnswer()`
   - **Problem**: Iframe content not loading properly in report view
   - **Attempted Fix**: Added wait logic for "Loading..." state, but may need additional iframe handling

2. **Navigation Issue**: Student feedback test can't find navigation elements
   - **Location**: Student feedback test after long activity player sessions
   - **Problem**: Session state inconsistent after returning from report pages
   - **Attempted Fix**: Added session refresh calls, but may need different navigation approach

### 2. `automatedtestsequence_wildfiremodule.spec.js`
**Status**: Likely similar issues to hurricane module (not fully tested)

**Expected Issues:**
- Same report loading and navigation issues as hurricane module
- Same session timeout problems during long activity player sessions

## 🔧 Applied Fixes
1. **Session Management**: Added `refreshSession()` command to handle authentication timeouts
2. **Dialog Content**: Updated iframe dialog selectors to be more robust
3. **Report Loading**: Added wait logic for "Loading..." states in reports
4. **Navigation**: Added session refresh calls at critical points
5. **Login/Logout**: Enhanced with force clicks and error handling

## 🚧 TODO: Remaining Work

### High Priority
1. **Fix Report Loading Issue**
   - Investigate iframe loading mechanism in report pages
   - Add proper wait conditions for iframe content
   - Consider using `cy.wait()` with specific network requests

2. **Fix Navigation After Reports**
   - Investigate why navigation elements are missing after report pages
   - Consider using `cy.visit()` instead of `cy.go('back')`
   - Add more robust session state checking

### Medium Priority
3. **Test Wildfire Module**
   - Run wildfire module tests to confirm they have same issues
   - Apply same fixes as hurricane module

4. **Optimize Session Management**
   - Consider reducing session timeout or adding periodic refresh
   - Investigate if activity player sessions can be shortened

### Low Priority
5. **Code Cleanup**
   - Remove debug logging
   - Optimize wait times
   - Add better error messages

## 📝 Notes
- The core authentication and navigation issues have been resolved for most tests
- The remaining issues are specific to long-running activity player sessions and report iframe loading
- These issues may require changes to the application itself (session timeouts, iframe loading)
- Consider testing with shorter activity sequences to isolate the problems 