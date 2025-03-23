/**
 * BOSCH Customer Management System
 * Authentication Module
 */

document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the login page
  const isLoginPage = window.location.pathname.includes("login.html");

  if (isLoginPage) {
    // Initialize login form
    initLoginForm();
  } else {
    // Check authentication for protected pages
    checkAuthentication();
  }
});

/**
 * Initialize login form
 */
function initLoginForm() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    // Validate form
    if (!username || !password) {
      showLoginError("Please enter both username and password");
      return;
    }

    // Show loading state
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="loading-spinner-sm"></span> Signing in...';

    // Call login API
    login(username, password, rememberMe)
      .then((response) => {
        // Redirect to dashboard on success
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Show error message
        showLoginError(
          error.message ||
            "Login failed. Please check your credentials and try again."
        );

        // Reset button
        submitButton.disabled = false;
        submitButton.innerText = "Sign in";
      });
  });

  // Handle "Forgot Password" link
  const forgotPasswordLink = document.getElementById("forgot-password");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      showForgotPasswordForm();
    });
  }
}

/**
 * Show login error
 * @param {string} message - Error message
 */
function showLoginError(message) {
  const errorContainer = document.getElementById("login-error");
  if (!errorContainer) return;

  // Show error message
  errorContainer.textContent = message;
  errorContainer.style.display = "block";

  // Hide error after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = "none";
  }, 5000);
}

/**
 * Show forgot password form
 */
function showForgotPasswordForm() {
  // Hide login form
  const loginForm = document.getElementById("login-form");
  const loginTitle = document.querySelector(".login-title");
  const loginSubtitle = document.querySelector(".login-subtitle");

  if (loginForm) loginForm.style.display = "none";
  if (loginTitle) loginTitle.textContent = "Reset Password";
  if (loginSubtitle)
    loginSubtitle.textContent =
      "Enter your email to receive a password reset link";

  // Create forgot password form if it doesn't exist
  let forgotPasswordForm = document.getElementById("forgot-password-form");

  if (!forgotPasswordForm) {
    forgotPasswordForm = document.createElement("form");
    forgotPasswordForm.id = "forgot-password-form";
    forgotPasswordForm.className = "space-y-6";

    forgotPasswordForm.innerHTML = `
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                    <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </div>
            
            <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send Reset Link
                </button>
            </div>
            
            <div class="text-center">
                <a href="#" id="back-to-login" class="text-sm text-indigo-600 hover:text-indigo-500">
                    Back to login
                </a>
            </div>
        `;

    // Add form to the container
    const loginContainer = loginForm.parentNode;
    loginContainer.appendChild(forgotPasswordForm);

    // Handle form submission
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get email
      const email = document.getElementById("email").value;

      // Validate email
      if (!email) {
        showForgotPasswordError("Please enter your email address");
        return;
      }

      // Show loading state
      const submitButton = forgotPasswordForm.querySelector(
        'button[type="submit"]'
      );
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="loading-spinner-sm"></span> Sending...';

      // Call forgot password API
      forgotPassword(email)
        .then((response) => {
          // Show success message
          showForgotPasswordSuccess(
            "Password reset link has been sent to your email"
          );

          // Reset button
          submitButton.disabled = false;
          submitButton.innerText = "Send Reset Link";
        })
        .catch((error) => {
          // Show error message
          showForgotPasswordError(
            error.message || "Failed to send reset link. Please try again."
          );

          // Reset button
          submitButton.disabled = false;
          submitButton.innerText = "Send Reset Link";
        });
    });

    // Handle "Back to Login" link
    const backToLoginLink = document.getElementById("back-to-login");
    if (backToLoginLink) {
      backToLoginLink.addEventListener("click", function (e) {
        e.preventDefault();
        forgotPasswordForm.style.display = "none";
        loginForm.style.display = "block";

        if (loginTitle) loginTitle.textContent = "Sign in to your account";
        if (loginSubtitle)
          loginSubtitle.textContent =
            "Enter your credentials to access your account";
      });
    }
  } else {
    // Show forgot password form if it already exists
    forgotPasswordForm.style.display = "block";
  }
}

/**
 * Show forgot password error
 * @param {string} message - Error message
 */
function showForgotPasswordError(message) {
  // Create error container if it doesn't exist
  let errorContainer = document.getElementById("forgot-password-error");

  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "forgot-password-error";
    errorContainer.className =
      "bg-red-100 text-red-800 p-3 rounded-md text-sm mt-4";

    // Add to form
    const form = document.getElementById("forgot-password-form");
    form.insertBefore(errorContainer, form.firstChild);
  }

  // Show error message
  errorContainer.textContent = message;
  errorContainer.style.display = "block";

  // Hide error after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = "none";
  }, 5000);
}

/**
 * Show forgot password success
 * @param {string} message - Success message
 */
function showForgotPasswordSuccess(message) {
  // Create success container if it doesn't exist
  let successContainer = document.getElementById("forgot-password-success");

  if (!successContainer) {
    successContainer = document.createElement("div");
    successContainer.id = "forgot-password-success";
    successContainer.className =
      "bg-green-100 text-green-800 p-3 rounded-md text-sm mt-4";

    // Add to form
    const form = document.getElementById("forgot-password-form");
    form.insertBefore(successContainer, form.firstChild);
  }

  // Show success message
  successContainer.textContent = message;
  successContainer.style.display = "block";
}

/**
 * API call for login
 * @param {string} username - Username
 * @param {string} password - Password
 * @param {boolean} rememberMe - Remember me option
 * @returns {Promise} Promise that resolves with user data
 */
function login(username, password, rememberMe) {
  // In a real application, this would be an API call
  // For demo purposes, we'll use a simulated API response

  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check credentials
      if (username === "admin" && password === "admin123") {
        // Create token
        const token = generateToken();

        // Save token to local storage
        const expirationTime = rememberMe
          ? 30 * 24 * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000; // 30 days or 1 day
        const expiration = Date.now() + expirationTime;

        const authData = {
          token: token,
          expiration: expiration,
          user: {
            id: 1,
            username: username,
            name: "Admin User",
            email: "admin@bosch.com",
            role: "admin",
          },
        };

        // Save to local storage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_expiration", expiration.toString());
        localStorage.setItem("user_data", JSON.stringify(authData.user));

        resolve(authData);
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });
}

/**
 * API call for forgot password
 * @param {string} email - Email address
 * @returns {Promise} Promise that resolves on success
 */
function forgotPassword(email) {
  // In a real application, this would be an API call
  // For demo purposes, we'll use a simulated API response

  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check if email is valid
      if (email && email.includes("@")) {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid email address"));
      }
    }, 1000);
  });
}

/**
 * Check authentication status
 */
function checkAuthentication() {
  const token = localStorage.getItem("auth_token");
  const expiration = localStorage.getItem("auth_expiration");

  // If no token or expiration, redirect to login
  if (!token || !expiration) {
    redirectToLogin();
    return;
  }

  // Check if token is expired
  if (Date.now() > parseInt(expiration)) {
    // Clear auth data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_expiration");
    localStorage.removeItem("user_data");

    // Redirect to login
    redirectToLogin();
    return;
  }

  // Token is valid, update user info in UI
  updateUserInfo();
}

/**
 * Redirect to login page
 */
function redirectToLogin() {
  // Don't redirect if already on login page
  if (window.location.pathname.includes("login.html")) return;

  // Get current path to redirect back after login
  const currentPath = window.location.pathname + window.location.search;

  // Set redirect URL
  localStorage.setItem("login_redirect", currentPath);

  // Redirect to login
  window.location.href = "login.html";
}

/**
 * Update user info in UI
 */
function updateUserInfo() {
  const userData = localStorage.getItem("user_data");
  if (!userData) return;

  try {
    const user = JSON.parse(userData);

    // Update user name in header
    const userNameElement = document.querySelector(".header-profile span");
    if (userNameElement) {
      userNameElement.textContent = user.name;
    }

    // Update user role
    const userRoleElement = document.querySelector(".user-role");
    if (userRoleElement) {
      userRoleElement.textContent =
        user.role.charAt(0).toUpperCase() + user.role.slice(1);
    }

    // Add logout event listener
    document.addEventListener("component:loaded", function (e) {
      if (e.detail.id === "header") {
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
          logoutButton.addEventListener("click", function () {
            logout();
          });
        }
      }
    });
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
}

/**
 * Log out user
 */
function logout() {
  // Show confirmation dialog
  confirmAction("Are you sure you want to log out?", () => {
    // Clear auth data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_expiration");
    localStorage.removeItem("user_data");

    // Redirect to login
    window.location.href = "login.html";
  });
}

/**
 * Generate random token
 * @returns {string} Random token
 */
function generateToken() {
  // In a real application, this would be handled by the server
  // For demo purposes, we'll generate a random string

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Format as JWT (for demo purposes)
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "1",
      name: "Admin User",
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    })
  );

  return `${header}.${payload}.${token}`;
}
