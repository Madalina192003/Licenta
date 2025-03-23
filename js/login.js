document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const loginForm = document.querySelector(".login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.querySelector(".toggle-password");
  const rememberMeCheckbox = document.getElementById("remember");
  const loginButton = document.querySelector(".btn-login");
  const boschIdButton = document.querySelector(".btn-bosch-id");
  const microsoftButton = document.querySelector(".btn-microsoft");

  // Check for query parameters (for registration success message)
  const urlParams = new URLSearchParams(window.location.search);
  if (
    urlParams.has("registered") &&
    urlParams.get("registered") === "success"
  ) {
    showMessage(
      "success",
      "Account created successfully! Please sign in with your credentials."
    );
  }

  // Toggle password visibility
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.classList.remove("fa-eye-slash");
        togglePasswordBtn.classList.add("fa-eye");
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.classList.remove("fa-eye");
        togglePasswordBtn.classList.add("fa-eye-slash");
      }
    });
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      if (!emailInput.value || !passwordInput.value) {
        showMessage("error", "Please enter both email and password.");
        return;
      }

      // Email validation
      if (!isValidEmail(emailInput.value)) {
        showMessage("error", "Please enter a valid email address.");
        return;
      }

      // Show loading state
      loginButton.disabled = true;
      loginButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Signing in...';

      // Simulate authentication (would be an API call in a real application)
      setTimeout(function () {
        // Store login status in localStorage/sessionStorage for session management
        if (rememberMeCheckbox && rememberMeCheckbox.checked) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", emailInput.value);
        } else {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userEmail", emailInput.value);
        }

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      }, 1500);
    });
  }

  // SSO Login buttons
  if (boschIdButton) {
    boschIdButton.addEventListener("click", function () {
      // This would normally redirect to BOSCH identity provider
      simulateSSO("BOSCH ID");
    });
  }

  if (microsoftButton) {
    microsoftButton.addEventListener("click", function () {
      // This would normally redirect to Microsoft identity provider
      simulateSSO("Microsoft");
    });
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(type, text) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll(".login-message");
    existingMessages.forEach((msg) => msg.remove());

    // Create new message
    const messageEl = document.createElement("div");
    messageEl.className = `login-message ${type}-message`;
    messageEl.textContent = text;

    // Insert message before form
    loginForm.insertBefore(messageEl, loginForm.firstChild);

    // Add styles if not already defined
    if (!document.getElementById("message-styles")) {
      const style = document.createElement("style");
      style.id = "message-styles";
      style.textContent = `
                .login-message {
                    padding: 12px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    font-size: 14px;
                }
                .error-message {
                    background-color: rgba(226, 0, 21, 0.1);
                    color: var(--bosch-red);
                }
                .success-message {
                    background-color: rgba(0, 128, 0, 0.1);
                    color: green;
                }
            `;
      document.head.appendChild(style);
    }
  }

  function simulateSSO(provider) {
    alert(`Redirecting to ${provider} login...`);

    // Store login info in session storage
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loginMethod", provider);

    // Redirect after a short delay
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1000);
  }
});
