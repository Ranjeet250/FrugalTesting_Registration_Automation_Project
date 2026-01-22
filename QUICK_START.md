# ⚡ Quick Start Commands & Reference

## 🚀 One-Time Setup

```bash
# Navigate to project directory
cd C:\Users\ranje\Desktop\FrugalTesting_Registration_Automation_Project

# Install all dependencies
npm install

# Install Cypress
npm install --save-dev cypress

# Install http-server (for serving files)
npm install -g http-server
```

---

## 🎯 Daily Workflow Commands

### Start the Web Server

```bash
# Option 1: Using http-server (Recommended)
npm run serve

# Option 2: Using Python 3
cd from
python -m http.server 3000
cd ..

# Option 3: Using Python 2
cd from
python -m SimpleHTTPServer 3000
cd ..

# Option 4: Direct file access (No server needed)
# Just open in browser: file:///C:/Users/ranje/Desktop/FrugalTesting_Registration_Automation_Project/from/index.html
```

**Result**: Form available at `http://localhost:3000`

---

## 🧪 Testing Commands

### Run Tests (Headless)

```bash
# All tests
npx cypress run

# Specific test file
npx cypress run --spec "automation/test.js"

# Specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Interactive Testing

```bash
# Opens Cypress Test Runner (Recommended for development)
npx cypress open

# Then select "E2E Testing" → Click "Start E2E Testing in Chrome"
```

### Custom NPM Scripts

```bash
# From package.json - use these shortcuts:
npm run test              # Runs all tests in headless
npm run test:open        # Opens Cypress runner
npm run test:specific    # Runs automation/test.js only
npm run test:chrome      # Runs with Chrome
npm run test:firefox     # Runs with Firefox
npm run test:headless    # Headless Chrome
```

---

## 📁 Directory Structure Reference

```
Project Root/
├── from/
│   ├── index.html         ← Main form (updated)
│   ├── script.js          ← Form logic (updated)
│   └── style.css          ← Styling (updated)
├── automation/
│   └── test.js            ← Cypress tests (COMPLETE)
├── cypress/               ← Created after first run
│   ├── screenshots/       ← Test screenshots
│   ├── videos/           ← Test recordings
│   ├── support/
│   └── e2e/
├── node_modules/          ← Dependencies (npm install)
├── package.json           ← Updated with scripts
├── cypress.config.js      ← Cypress configuration (new)
├── README.md              ← Documentation
├── PROJECT_ANALYSIS.md    ← Analysis & improvements
└── IMPLEMENTATION_GUIDE.md ← This detailed guide
```

---

## 🔍 Test Scenarios Quick Reference

### Scenario A: Negative Test (Missing Last Name)

```bash
npx cypress run --spec "automation/test.js" --browser chrome
# Then click: "Scenario A: Negative Test - Missing Last Name"
```

**What it tests:**

- Omitting Last Name field
- Attempting form submission
- Error message appears
- Field highlighted in red
- Screenshot: error-state.png

**Expected**: ✅ Error shown, form not submitted

---

### Scenario B: Positive Test (Successful Registration)

```bash
# Same command as above, select Scenario B
```

**What it tests:**

- Fill all fields with valid data
- Submit form
- Success message appears
- Form resets
- Screenshot: success-state.png

**Expected**: ✅ Success message shown, form cleared

---

### Scenario C: Form Logic Tests

```bash
# Same command, select Scenario C
```

**What it tests:**

1. Country → State dropdown updates
2. State → City dropdown updates
3. Password strength meter (weak/medium/strong)
4. Confirm password mismatch detection
5. Submit button enable/disable logic
6. Disposable email blocking
7. Phone number country validation
8. Age minimum (18+) validation
9. Name format validation
10. Terms & Conditions requirement

**Expected**: ✅ All form logic working correctly

---

## 📊 File Changes Summary

### HTML (index.html)

- **Before**: 8 form fields
- **After**: 13 form fields
- **Added**: Age, Address, Country, State, City
- **Lines**: 50 → 150+ (with better structure)

### CSS (style.css)

- **Before**: Basic styling, 30 lines
- **After**: Professional design, 300+ lines
- **Added**: Responsive grid, animations, gradient background
- **Features**: Mobile breakpoints, password strength colors

### JavaScript (script.js)

- **Before**: 60 lines, basic validation on submit
- **After**: 500+ lines, real-time validation
- **Added**: Dynamic dropdowns, email domain checking, phone validation
- **Features**: Password strength meter, comprehensive error handling

### Automation (test.js)

- **Before**: Empty file (0 lines)
- **After**: 400+ lines of Cypress tests
- **Added**: 3 main scenarios + 10+ additional tests
- **Coverage**: Negative, positive, and form logic testing

---

## 🛠️ Troubleshooting Commands

### Port Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
http-server from -p 8000
```

### Clear npm Cache

```bash
npm cache clean --force
npm install
```

### Reinstall Cypress

```bash
npm uninstall cypress
npm install --save-dev cypress
```

### Check Cypress Version

```bash
npx cypress --version
```

### Run Cypress in Debug Mode

```bash
DEBUG=cypress:* npx cypress run
```

### Force Quit Cypress

```bash
# In another terminal while tests running
npx cypress kill
```

---

## 📸 Screenshot & Video Capture

### Screenshots (Automatic)

```bash
# Automatically captured during cypress run
# Location: cypress/screenshots/

# Captured at:
# - error-state.png (Scenario A)
# - success-state.png (Scenario B)
```

### Videos (Automatic)

```bash
# Automatically recorded during cypress run
# Location: cypress/videos/

# Configuration in cypress.config.js:
video: true
videoCompression: 32
```

### Manual Recording (OBS Studio)

```
1. Download OBS Studio (free)
2. Add "Display Capture" source
3. Start recording
4. Run: npx cypress run
5. Stop recording when tests complete
6. Save as: registration_automation.mp4
```

---

## ✅ Pre-Submission Checklist Commands

```bash
# 1. Verify all files exist
dir from\
dir automation\
dir cypress\

# 2. Run all tests
npm run test

# 3. Verify screenshots exist
dir cypress\screenshots\

# 4. Check for errors
npm run test 2>&1 | findstr ERROR

# 5. Verify documentation
type README.md
type PROJECT_ANALYSIS.md
type IMPLEMENTATION_GUIDE.md
```

---

## 🎯 Common Use Cases

### I just cloned the project

```bash
npm install
npm run serve
# Open: http://localhost:3000
```

### I want to test the form manually

```bash
npm run serve
# Open http://localhost:3000 in browser
# Interact with form
```

### I want to run automated tests

```bash
npm run test:open
# Select test and run manually
# OR
npm run test:specific
# Run all tests in headless mode
```

### I want to see tests in action

```bash
npm run serve
# In new terminal:
npm run test:open
# Watch tests execute with live browser
```

### I want to record video of tests

```bash
npm run test
# Video automatically saved to cypress/videos/
```

### I want to debug a specific test

```bash
npx cypress open
# Find and click specific test
# Use browser dev tools
```

---

## 📱 Browser Testing

### Test in Different Browsers

```bash
# Chrome (Chromium-based)
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npx cypress run --browser edge

# All browsers
npm run test:chrome && npm run test:firefox
```

### Test Different Screen Sizes

```bash
# The form automatically responds to:
# - Desktop: 1280x720 (default)
# - Tablet: 768px width
# - Mobile: 480px width

# Cypress automatically tests desktop
# For mobile testing, edit cypress.config.js:
viewportWidth: 375,   // iPhone width
viewportHeight: 667,  // iPhone height
```

---

## 📝 Key Files to Review

### For Understanding Form Logic

1. [from/script.js](from/script.js) - All validation & logic
2. [from/index.html](from/index.html) - Form structure
3. [from/style.css](from/style.css) - Visual styling

### For Understanding Tests

1. [automation/test.js](automation/test.js) - All 13+ test cases
2. [cypress.config.js](cypress.config.js) - Cypress configuration

### For Documentation

1. [README.md](README.md) - Complete project guide
2. [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) - Detailed analysis
3. [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - This guide

---

## 🆘 Need Help?

### Check Logs

```bash
# Cypress logs (during test run)
# Console output shows:
# - Each test: PASS or FAIL
# - Duration of each test
# - Error details if failed

# Browser console (F12 in browser)
# Form logs:
console.log('Registration Data:', formData)
```

### Common Issues

**Issue**: Tests timeout

```bash
# Solution: Increase timeout in cypress.config.js
defaultCommandTimeout: 10000  // 10 seconds
```

**Issue**: Cannot find module 'cypress'

```bash
# Solution: Reinstall
npm install --save-dev cypress
```

**Issue**: Port 3000 in use

```bash
# Solution: Use different port
http-server from -p 8000
```

**Issue**: Form not validating

```bash
# Solution: Check browser console (F12)
# Check if JavaScript enabled
# Check browser version (use latest)
```

---

## 🎓 Learning Commands

### View Package Dependencies

```bash
npm list
npm list --depth=0
```

### View Available Scripts

```bash
npm run
# Shows all available scripts from package.json
```

### Check npm Version

```bash
npm --version
node --version
```

### Update Dependencies

```bash
npm update
npm audit fix
```

---

## 📊 Test Report Example Output

```
(Run starting)
  automation/test.js                                      (1 of 1)

Registration Form Automation Tests
  ✓ Scenario A: Negative Test (2.5s)
    ✓ Should display error when Last Name is missing (2.5s)
  ✓ Scenario B: Positive Test (3.1s)
    ✓ Should successfully submit form with all valid data (3.1s)
  ✓ Scenario C: Form Logic Validation (5.2s)
    ✓ Should update states dropdown when country changes (1.2s)
    ✓ Should update cities dropdown when state changes (1.1s)
    ✓ Should validate password strength (1.0s)
    ✓ Should show error when confirm password does not match (0.9s)
    ✓ Should disable submit button when required fields are empty (1.0s)

11 passing (13.5s)

Spec                    Tests  Pass  Fail  Duration
automation/test.js      11     11    0     13.5s
```

---

## 🎉 You're Ready!

Everything is set up and ready to use:

✅ Form complete with all fields  
✅ Validations implemented  
✅ Tests written and passing  
✅ Documentation comprehensive  
✅ Ready for submission

### Next Steps:

1. Run: `npm install`
2. Run: `npm run serve`
3. Run: `npm run test`
4. Capture screenshots
5. Record video
6. Submit project

**Happy testing! 🚀**
