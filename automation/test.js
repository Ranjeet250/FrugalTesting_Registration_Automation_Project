/**
 * REGISTRATION FORM AUTOMATION TEST SUITE
 * Using Cypress for UI Automation
 *
 * This test suite covers:
 * - Negative Scenario: Missing required fields
 * - Positive Scenario: Successful registration
 * - Form Logic Validation: Dynamic fields and validations
 */

describe("Registration Form Automation Tests", () => {
  // Base URL - adjust based on your local server
  const BASE_URL = "http://localhost:3000/index.html";
  // Or use: file:///c:/Users/ranje/Desktop/FrugalTesting_Registration_Automation_Project/from/index.html

  beforeEach(() => {
    // Visit the registration form page before each test
    cy.visit(BASE_URL);

    // Verify page loaded successfully
    cy.get("h1").should("contain", "Registration Form");
  });

  // ============================================
  // TEST SCENARIO A: NEGATIVE SCENARIO
  // ============================================
  describe("Scenario A: Negative Test - Missing Last Name", () => {
    it("Should display error when Last Name is missing", () => {
      // Print page URL and title
      cy.url().then((url) => {
        cy.log(`Page URL: ${url}`);
      });

      cy.title().then((title) => {
        cy.log(`Page Title: ${title}`);
      });

      // Fill First Name
      cy.get("#fname").type("John");

      // Skip Last Name (intentionally)
      // cy.get('#lname').type('Doe'); // SKIPPED

      // Fill Email
      cy.get("#email").type("john.doe@example.com");

      // Fill Phone Number
      cy.get("#phone").type("5551234567");

      // Select Gender
      cy.get("#gender").select("Male");

      // Fill Age
      cy.get("#age").type("28");

      // Select Country
      cy.get("#country").select("USA");

      // Wait for states to populate
      cy.get("#state").should("not.be.disabled");

      // Select State
      cy.get("#state").select("California");

      // Wait for cities to populate
      cy.get("#city").should("not.be.disabled");

      // Select City
      cy.get("#city").select("Los Angeles");

      // Fill Password
      cy.get("#pass").type("SecurePass@123");

      // Confirm Password
      cy.get("#cpass").type("SecurePass@123");

      // Accept Terms
      cy.get("#terms").check();

      // Attempt to Submit
      cy.get("#submitBtn").click();

      // Verify Error Message for Last Name
      cy.get("#lnameErr")
        .should("be.visible")
        .and("contain", "Last name is required");

      // Verify Last Name field is highlighted in red
      cy.get("#lname").should("have.class", "invalid");

      // Verify error alert appears at top
      cy.get("#errorContainer")
        .should("be.visible")
        .and("contain", "Please fix the errors");

      // Take Screenshot: error-state.png
      cy.screenshot("error-state", { capture: "viewport" });

      cy.log("✓ Negative test passed: Error displayed for missing Last Name");
    });
  });

  // ============================================
  // TEST SCENARIO B: POSITIVE SCENARIO
  // ============================================
  describe("Scenario B: Positive Test - Successful Registration", () => {
    it("Should successfully submit form with all valid data", () => {
      // Print page info
      cy.url().then((url) => {
        cy.log(`Page URL: ${url}`);
      });

      cy.title().then((title) => {
        cy.log(`Page Title: ${title}`);
      });

      // Fill First Name
      cy.get("#fname").type("Jane");

      // Fill Last Name
      cy.get("#lname").type("Smith");

      // Fill Email
      cy.get("#email").type("jane.smith@example.com");

      // Fill Phone Number
      cy.get("#phone").type("5559876543");

      // Fill Age
      cy.get("#age").type("32");

      // Select Gender
      cy.get("#gender").select("Female");

      // Fill Address
      cy.get("#address").type("123 Main Street, Apartment 4B");

      // Select Country
      cy.get("#country").select("USA");

      // Wait and select State
      cy.get("#state").should("not.be.disabled");
      cy.get("#state").select("Texas");

      // Wait and select City
      cy.get("#city").should("not.be.disabled");
      cy.get("#city").select("Austin");

      // Fill Password (Strong password)
      cy.get("#pass").type("StrongPass@2024");

      // Verify password strength indicator appears
      cy.get("#passwordStrength").should("be.visible");

      // Fill Confirm Password (must match)
      cy.get("#cpass").type("StrongPass@2024");

      // Accept Terms and Conditions
      cy.get("#terms").check();

      // Verify Submit button is enabled
      cy.get("#submitBtn").should("not.be.disabled");

      // Submit the form
      cy.get("#submitBtn").click();

      // Verify Success Message appears
      cy.get("#successMsg")
        .should("be.visible")
        .and("contain", "Registration Successful!")
        .and("contain", "Your profile has been submitted successfully");

      // Verify success alert container
      cy.get("#successContainer")
        .should("be.visible")
        .and("contain", "Success!");

      // Verify form is reset (fields are empty)
      cy.get("#fname").should("have.value", "");
      cy.get("#lname").should("have.value", "");
      cy.get("#email").should("have.value", "");

      // Take Screenshot: success-state.png
      cy.screenshot("success-state", { capture: "viewport" });

      cy.log("✓ Positive test passed: Form submitted successfully");
    });
  });

  // ============================================
  // TEST SCENARIO C: FORM LOGIC VALIDATION
  // ============================================
  describe("Scenario C: Form Logic Validation Tests", () => {
    it("Should update states dropdown when country changes", () => {
      // Initially, state dropdown should be disabled
      cy.get("#state").should("be.disabled");

      // Select USA
      cy.get("#country").select("USA");

      // State dropdown should now be enabled
      cy.get("#state").should("not.be.disabled");

      // Verify USA states are populated
      cy.get("#state").find("option").should("have.length.greaterThan", 1);
      cy.get("#state").find("option").should("contain", "California");
      cy.get("#state").find("option").should("contain", "Texas");

      // Change to UK
      cy.get("#country").select("UK");

      // State dropdown should show UK states
      cy.get("#state").should("not.be.disabled");
      cy.get("#state").find("option").should("contain", "England");
      cy.get("#state").find("option").should("contain", "Scotland");

      cy.log("✓ Country to State mapping works correctly");
    });

    it("Should update cities dropdown when state changes", () => {
      // Select Country first
      cy.get("#country").select("USA");

      // Select State
      cy.get("#state").select("California");

      // Cities dropdown should be enabled and populated
      cy.get("#city").should("not.be.disabled");
      cy.get("#city").find("option").should("have.length.greaterThan", 1);
      cy.get("#city").find("option").should("contain", "Los Angeles");
      cy.get("#city").find("option").should("contain", "San Francisco");

      // Change state
      cy.get("#state").select("Texas");

      // Cities should update
      cy.get("#city").find("option").should("contain", "Houston");
      cy.get("#city").find("option").should("contain", "Dallas");

      cy.log("✓ State to City mapping works correctly");
    });

    it("Should validate password strength", () => {
      const passwordField = cy.get("#pass");
      const strengthMeter = cy.get("#passwordStrength");

      // Weak password (too short)
      passwordField.type("Pass1");
      strengthMeter.should("have.class", "weak");

      // Clear and try medium password
      passwordField.clear();
      passwordField.type("Password123");
      strengthMeter.should("have.class", "medium");

      // Clear and try strong password
      passwordField.clear();
      passwordField.type("StrongPass@2024#Secure");
      strengthMeter.should("have.class", "strong");

      cy.log("✓ Password strength meter works correctly");
    });

    it("Should show error when confirm password does not match", () => {
      // Fill password
      cy.get("#pass").type("SecurePass@123");

      // Fill mismatched confirm password
      cy.get("#cpass").type("DifferentPass@123");

      // Trigger validation
      cy.get("#cpass").blur();

      // Verify error message
      cy.get("#cpassErr")
        .should("be.visible")
        .and("contain", "Passwords do not match");

      // Verify field is highlighted
      cy.get("#cpass").should("have.class", "invalid");

      // Now type correct password
      cy.get("#cpass").clear().type("SecurePass@123");

      // Verify error is cleared
      cy.get("#cpassErr").should("have.text", "");
      cy.get("#cpass").should("not.have.class", "invalid");

      cy.log("✓ Confirm password validation works correctly");
    });

    it("Should disable submit button when required fields are empty", () => {
      // Submit button should be disabled initially
      cy.get("#submitBtn").should("be.disabled");

      // Fill First Name
      cy.get("#fname").type("John");
      cy.get("#submitBtn").should("be.disabled");

      // Fill Last Name
      cy.get("#lname").type("Doe");
      cy.get("#submitBtn").should("be.disabled");

      // Fill Email
      cy.get("#email").type("john@example.com");
      cy.get("#submitBtn").should("be.disabled");

      // Continue filling fields
      cy.get("#phone").type("5551234567");
      cy.get("#gender").select("Male");
      cy.get("#country").select("USA");
      cy.get("#state").select("California");
      cy.get("#city").select("Los Angeles");
      cy.get("#pass").type("SecurePass@123");
      cy.get("#cpass").type("SecurePass@123");
      cy.get("#terms").check();

      // Submit button should now be enabled
      cy.get("#submitBtn").should("not.be.disabled");

      cy.log("✓ Submit button enable/disable logic works correctly");
    });

    it("Should validate email does not contain disposable domains", () => {
      const emailField = cy.get("#email");
      const emailError = cy.get("#emailErr");

      // Try disposable email
      emailField.type("test@tempmail.com");
      emailField.blur();

      // Should show error
      emailError
        .should("be.visible")
        .and("contain", "Disposable email domains are not allowed");
      cy.get("#email").should("have.class", "invalid");

      // Try another disposable domain
      emailField.clear().type("user@10minutemail.com");
      emailField.blur();

      emailError.should("be.visible").and("contain", "Disposable email");

      // Try valid email
      emailField.clear().type("valid@example.com");
      emailField.blur();

      emailError.should("have.text", "");
      cy.get("#email").should("not.have.class", "invalid");

      cy.log("✓ Disposable email domain validation works correctly");
    });

    it("Should validate phone number format based on country", () => {
      const phoneField = cy.get("#phone");
      const phoneError = cy.get("#phoneErr");

      // Select USA
      cy.get("#country").select("USA");

      // Valid US phone (10 digits)
      phoneField.type("5551234567");
      phoneField.blur();
      phoneError.should("have.text", "");

      // Invalid US phone (too few digits)
      phoneField.clear().type("555123");
      phoneField.blur();
      phoneError.should("be.visible");

      cy.log("✓ Phone number validation by country works correctly");
    });

    it("Should require acceptance of Terms & Conditions", () => {
      // Try to submit without checking terms
      cy.get("#submitBtn").should("be.disabled");

      // Fill all other required fields
      cy.get("#fname").type("John");
      cy.get("#lname").type("Doe");
      cy.get("#email").type("john@example.com");
      cy.get("#phone").type("5551234567");
      cy.get("#gender").select("Male");
      cy.get("#country").select("USA");
      cy.get("#state").select("California");
      cy.get("#city").select("Los Angeles");
      cy.get("#pass").type("SecurePass@123");
      cy.get("#cpass").type("SecurePass@123");

      // Submit should still be disabled without terms
      cy.get("#submitBtn").should("be.disabled");

      // Check terms
      cy.get("#terms").check();

      // Now submit should be enabled
      cy.get("#submitBtn").should("not.be.disabled");

      cy.log("✓ Terms & Conditions requirement works correctly");
    });
  });

  // ============================================
  // ADDITIONAL VALIDATION TESTS
  // ============================================
  describe("Additional Validation Tests", () => {
    it("Should validate first name and last name format", () => {
      const fnameField = cy.get("#fname");
      const fnameError = cy.get("#fnameErr");

      // Try with numbers
      fnameField.type("John123");
      fnameField.blur();
      fnameError.should("be.visible");

      // Try with special characters
      fnameField.clear().type("John@#$");
      fnameField.blur();
      fnameError.should("be.visible");

      // Valid name
      fnameField.clear().type("John O'Brien");
      fnameField.blur();
      fnameError.should("have.text", "");

      cy.log("✓ Name format validation works correctly");
    });

    it("Should validate minimum age requirement", () => {
      const ageField = cy.get("#age");
      const ageError = cy.get("#ageErr");

      // Try age less than 18
      ageField.type("16");
      ageField.blur();
      ageError.should("be.visible").and("contain", "at least 18");

      // Valid age
      ageField.clear().type("25");
      ageField.blur();
      ageError.should("have.text", "");

      cy.log("✓ Age validation works correctly");
    });
  });

  // ============================================
  // ACCESSIBILITY & UX TESTS
  // ============================================
  describe("Accessibility & UX Tests", () => {
    it("Should show required field indicators", () => {
      // Check for required indicators on form
      cy.contains("label", "First Name").should("contain", "*");
      cy.contains("label", "Last Name").should("contain", "*");
      cy.contains("label", "Email").should("contain", "*");
      cy.contains("label", "Gender").should("contain", "*");

      // Check for optional indicators
      cy.contains("label", "Age").should("contain", "Optional");
      cy.contains("label", "Address").should("contain", "Optional");

      cy.log("✓ Required/Optional field indicators are visible");
    });

    it("Should have proper input labels and placeholders", () => {
      cy.get("#fname").should("have.attr", "placeholder");
      cy.get("#lname").should("have.attr", "placeholder");
      cy.get("#email").should("have.attr", "placeholder");
      cy.get("#phone").should("have.attr", "placeholder");

      cy.log("✓ All input fields have placeholders");
    });
  });
});
