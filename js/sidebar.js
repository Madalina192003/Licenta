document.addEventListener("DOMContentLoaded", function () {
  // Toggle sidebar
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event from bubbling to document

      // Toggle sidebar collapse state
      sidebar.classList.toggle("collapsed");

      // Adjust main content
      if (mainContent) {
        mainContent.classList.toggle("expanded");
      }

      // Toggle icon if it exists
      const icon = this.querySelector("i");
      if (icon) {
        if (icon.classList.contains("fa-bars")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }

      // Create and show the navigation popup
      createNavPopup();
    });
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtnMenu = document.getElementById("logoutBtnMenu");

  [logoutBtn, logoutBtnMenu].forEach(function (btn) {
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        if (confirm("Are you sure you want to log out?")) {
          // Clear login data
          localStorage.removeItem("isLoggedIn");
          sessionStorage.removeItem("isLoggedIn");

          // Redirect to login page
          window.location.href = "login.html";
        }
      });
    }
  });

  // Function to create navigation popup
  function createNavPopup() {
    // Remove any existing popups
    const existingPopup = document.getElementById("nav-popup");
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create popup container
    const popup = document.createElement("div");
    popup.id = "nav-popup";
    popup.className = "nav-popup";

    // Add content to popup
    popup.innerHTML = `
            <div class="popup-header">
                <h3>Navigation</h3>
                <button class="close-popup"><i class="fas fa-times"></i></button>
            </div>
            <div class="popup-content">
                <ul class="popup-links">
                    <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="clients.html"><i class="fas fa-users"></i> Clients</a></li>
                    <li><a href="reports.html"><i class="fas fa-chart-bar"></i> Reports</a></li>
                    <li><a href="analytics.html"><i class="fas fa-chart-line"></i> Analytics</a></li>
                    <li><a href="tasks.html"><i class="fas fa-tasks"></i> Tasks</a></li>
                    <li><a href="calendar.html"><i class="fas fa-calendar"></i> Calendar</a></li>
                    <li><a href="documents.html"><i class="fas fa-file"></i> Documents</a></li>
                </ul>
            </div>
        `;

    // Add popup to DOM
    document.body.appendChild(popup);

    // Add popup styles if not already defined
    if (!document.getElementById("popup-styles")) {
      const style = document.createElement("style");
      style.id = "popup-styles";
      style.textContent = `
                .nav-popup {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 400px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                    z-index: 1050;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -60%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                
                .popup-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #eee;
                }
                
                .popup-header h3 {
                    font-size: 1.2rem;
                    color: var(--bosch-dark);
                    margin: 0;
                }
                
                .close-popup {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    color: var(--bosch-gray);
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .close-popup:hover {
                    color: var(--bosch-red);
                }
                
                .popup-content {
                    padding: 1.5rem;
                }
                
                .popup-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .popup-links li {
                    margin-bottom: 1rem;
                }
                
                .popup-links li:last-child {
                    margin-bottom: 0;
                }.popup-links a {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    color: var(--bosch-gray);
                    text-decoration: none;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                
                .popup-links a:hover {
                    background-color: var(--bosch-light-gray);
                    color: var(--bosch-red);
                }
                
                .popup-links i {
                    font-size: 1.1rem;
                    width: 24px;
                    text-align: center;
                }
                
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1040;
                    animation: fadeInOverlay 0.3s ease;
                }
                
                @keyframes fadeInOverlay {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
      document.head.appendChild(style);
    }

    // Add overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Close popup when clicking close button or overlay
    const closeBtn = popup.querySelector(".close-popup");
    if (closeBtn) {
      closeBtn.addEventListener("click", closePopup);
    }

    overlay.addEventListener("click", closePopup);

    // Handle popup links
    const popupLinks = popup.querySelectorAll(".popup-links a");
    popupLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closePopup();
      });
    });

    function closePopup() {
      // Remove popup and overlay with fadeout effect
      popup.style.animation = "fadeOut 0.3s ease forwards";
      overlay.style.animation = "fadeOut 0.3s ease forwards";

      // Add fadeout keyframes if not already defined
      if (!document.getElementById("fadeout-styles")) {
        const fadeOutStyle = document.createElement("style");
        fadeOutStyle.id = "fadeout-styles";
        fadeOutStyle.textContent = `
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
        document.head.appendChild(fadeOutStyle);
      }

      // Remove elements after animation completes
      setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 300);
    }
  }

  // Make sidebar links active based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  sidebarLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.closest("li").classList.add("active");
    }

    // Add click handler to sidebar links
    link.addEventListener("click", function () {
      // Remove active class from all links
      sidebarLinks.forEach((l) => l.closest("li").classList.remove("active"));

      // Add active class to clicked link
      this.closest("li").classList.add("active");
    });
  });
});
