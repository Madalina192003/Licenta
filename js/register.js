document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const registerForm = document.querySelector(".register-form");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const departmentSelect = document.getElementById("department");
  const termsCheckbox = document.getElementById("terms");
  const toggleButtons = document.querySelectorAll(".toggle-password");
  const createAccountBtn = document.querySelector(".create-account-btn");

  // Toggle password visibility
  if (toggleButtons) {
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordField = this.previousElementSibling;
        const passwordIcon = this.querySelector("i");

        if (passwordField.type === "password") {
          passwordField.type = "text";
          passwordIcon.classList.remove("fa-eye-slash");
          passwordIcon.classList.add("fa-eye");
        } else {
          passwordField.type = "password";
          passwordIcon.classList.remove("fa-eye");
          passwordIcon.classList.add("fa-eye-slash");
        }
      });
    });
  }

  // Form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear previous error messages
      clearErrors();

      // Validate form
      let isValid = true;

      // Full name validation
      if (!fullNameInput.value.trim()) {
        showFieldError(fullNameInput, "Please enter your full name");
        isValid = false;
      }

      // Email validation
      if (!isValidEmail(emailInput.value)) {
        showFieldError(emailInput, "Please enter a valid email address");
        isValid = false;
      }

      // Password validation (min 8 characters)
      if (passwordInput.value.length < 8) {
        showFieldError(
          passwordInput,
          "Password must be at least 8 characters long"
        );
        isValid = false;
      }

      // Confirm password validation
      if (passwordInput.value !== confirmPasswordInput.value) {
        showFieldError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
      }

      // Department validation
      if (!departmentSelect.value) {
        showFieldError(departmentSelect, "Please select your department");
        isValid = false;
      }

      // Terms agreement validation
      if (!termsCheckbox.checked) {
        showError("You must agree to the Terms of Service and Privacy Policy");
        isValid = false;
      }

      // If form is valid, submit it
      if (isValid) {
        // Show loading state
        createAccountBtn.disabled = true;
        createAccountBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        // Simulate API call (in real app, this would be an AJAX request)
        setTimeout(function () {
          // Store user information in localStorage (for demo purposes)
          const userData = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            department: departmentSelect.value,
            registeredOn: new Date().toISOString(),
          };
          localStorage.setItem("registeredUser", JSON.stringify(userData));

          // Redirect to login page with success message
          window.location.href = "login.html?registered=success";
        }, 2000);
      }
    });
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showFieldError(field, message) {
    // Add error class to field
    field.classList.add("error");

    // Create error message element
    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;

    // Add error message after field container
    const fieldContainer = field.closest(".input-with-icon");
    fieldContainer.insertAdjacentElement("afterend", errorElement);

    // Remove error when field is focused
    field.addEventListener(
      "focus",
      function () {
        field.classList.remove("error");
        errorElement.remove();
      },
      { once: true }
    );
  }

  function showError(message) {
    // Create error message container if it doesn't exist
    let errorContainer = document.querySelector(".register-message");
    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.className = "register-message error-message";
      registerForm.insertBefore(errorContainer, registerForm.firstChild);
    }

    errorContainer.textContent = message;
    errorContainer.style.display = "block";

    // Scroll to error message
    errorContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearErrors() {
    // Remove all error messages
    document
      .querySelectorAll(".field-error, .register-message")
      .forEach((el) => el.remove());

    // Remove error class from all fields
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
  }
});
