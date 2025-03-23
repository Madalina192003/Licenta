/**
 * dashboard.js - JavaScript functionality for BOSCH CMS dashboard page
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts
  initCharts();

  // Update current date
  updateDateTime();

  // Initialize interactive elements
  initInteractions();

  // Initialize modals
  initModals();

  // Set up real-time updates simulation
  setupRealTimeUpdates();

  // Initialize tips carousel
  initTipsCarousel();
});

// Function to initialize all dashboard charts
function initCharts() {
  // Revenue Trend Chart
  const revenueCtx = document.getElementById("revenueChart").getContext("2d");
  const revenueChart = new Chart(revenueCtx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue 2025",
          data: [
            18.5, 19.2, 20.8, 21.3, 22.7, 23.5, 24.1, 23.8, 24.5, 25.2, 26.1,
            27.3,
          ],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Revenue 2024",
          data: [
            15.2, 16.1, 17.3, 18.2, 19.5, 20.1, 20.8, 21.2, 21.7, 22.3, 22.9,
            23.6,
          ],
          borderColor: "#53565A",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": €" + context.raw + "M";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return "€" + value + "M";
            },
          },
          title: {
            display: true,
            text: "Revenue (Millions €)",
          },
        },
      },
    },
  });

  // Distribution Chart (Pie)
  const distributionCtx = document
    .getElementById("distributionChart")
    .getContext("2d");
  const distributionChart = new Chart(distributionCtx, {
    type: "pie",
    data: {
      labels: [
        "Europe",
        "North America",
        "Asia-Pacific",
        "Middle East",
        "South America",
      ],
      datasets: [
        {
          data: [42, 23, 18, 9, 8],
          backgroundColor: [
            "#E20015",
            "#53565A",
            "#F7941D",
            "#00A651",
            "#242424",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.raw + "%";
            },
          },
        },
      },
    },
  });

  // Status Chart (Doughnut)
  const statusCtx = document.getElementById("statusChart").getContext("2d");
  const statusChart = new Chart(statusCtx, {
    type: "doughnut",
    data: {
      labels: ["Active", "Pending", "Inactive"],
      datasets: [
        {
          data: [38, 3, 1],
          backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.raw;
            },
          },
        },
      },
    },
  });

  // Store chart instances globally for later access
  window.dashboardCharts = {
    revenue: revenueChart,
    distribution: distributionChart,
    status: statusChart,
  };

  // Handle period changes for revenue chart
  const periodLinks = document.querySelectorAll("#revenuePeriodMenu a");
  periodLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Update button text
      const periodBtn = document.getElementById("revenuePeriodBtn");
      periodBtn.innerHTML =
        this.textContent + ' <i class="fas fa-chevron-down"></i>';

      // Remove active class from all links
      periodLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Update chart data based on selected period
      updateRevenueChartByPeriod(this.getAttribute("data-period"));

      // Close dropdown
      document.getElementById("revenuePeriodMenu").style.display = "none";
    });
  });

  // Handle distribution type changes
  const distributionLinks = document.querySelectorAll(
    "#distributionTypeMenu a"
  );
  distributionLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Update button text
      const typeBtn = document.getElementById("distributionTypeBtn");
      typeBtn.innerHTML =
        this.textContent + ' <i class="fas fa-chevron-down"></i>';

      // Remove active class from all links
      distributionLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Update chart data based on selected type
      updateDistributionChartByType(this.getAttribute("data-type"));

      // Close dropdown
      document.getElementById("distributionTypeMenu").style.display = "none";
    });
  });
}

// Function to update revenue chart based on selected period
function updateRevenueChartByPeriod(period) {
  const chart = window.dashboardCharts.revenue;

  // Sample data for different periods
  const data = {
    daily: {
      labels: Array.from({ length: 30 }, (_, i) => `Mar ${i + 1}`),
      datasets: [
        {
          label: "Revenue (Daily)",
          data: Array.from({ length: 30 }, () =>
            (Math.random() * 2 + 0.5).toFixed(1)
          ),
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    weekly: {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
      ],
      datasets: [
        {
          label: "Revenue 2025",
          data: [4.2, 4.5, 5.1, 5.3, 5.6, 6.0, 6.2, 5.9, 6.2, 6.5, 6.7, 7.1],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Revenue 2024",
          data: [3.8, 4.0, 4.3, 4.5, 4.9, 5.1, 5.3, 5.4, 5.6, 5.8, 6.0, 6.2],
          borderColor: "#53565A",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    monthly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue 2025",
          data: [
            18.5, 19.2, 20.8, 21.3, 22.7, 23.5, 24.1, 23.8, 24.5, 25.2, 26.1,
            27.3,
          ],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Revenue 2024",
          data: [
            15.2, 16.1, 17.3, 18.2, 19.5, 20.1, 20.8, 21.2, 21.7, 22.3, 22.9,
            23.6,
          ],
          borderColor: "#53565A",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    quarterly: {
      labels: [
        "Q1 2024",
        "Q2 2024",
        "Q3 2024",
        "Q4 2024",
        "Q1 2025",
        "Q2 2025",
        "Q3 2025",
        "Q4 2025",
      ],
      datasets: [
        {
          label: "Quarterly Revenue",
          data: [58.5, 65.2, 72.7, 78.1, 68.9, 76.4, 84.2, 89.3],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    yearly: {
      labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
      datasets: [
        {
          label: "Yearly Revenue",
          data: [172.5, 189.3, 210.6, 235.8, 274.5, 310.2],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
  };

  // Update chart data
  if (data[period]) {
    chart.data.labels = data[period].labels;
    chart.data.datasets = data[period].datasets;
    chart.update();
  }
}

// Function to update distribution chart based on selected type
function updateDistributionChartByType(type) {
  const chart = window.dashboardCharts.distribution;

  // Sample data for different distribution types
  const data = {
    region: {
      labels: [
        "Europe",
        "North America",
        "Asia-Pacific",
        "Middle East",
        "South America",
      ],
      data: [42, 23, 18, 9, 8],
    },
    type: {
      labels: [
        "Manufacturing Plant",
        "Distribution Center",
        "Office",
        "Research Facility",
      ],
      data: [58, 22, 12, 8],
    },
    size: {
      labels: ["Large", "Medium", "Small"],
      data: [45, 35, 20],
    },
    industry: {
      labels: [
        "Automotive",
        "Electronics",
        "Energy",
        "Consumer Goods",
        "Industrial Tech",
      ],
      data: [38, 25, 15, 12, 10],
    },
  };

  // Update chart data
  if (data[type]) {
    chart.data.labels = data[type].labels;
    chart.data.datasets[0].data = data[type].data;
    chart.update();
  }
}

// Function to update date and time
function updateDateTime() {
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dateElement.textContent = now.toLocaleDateString("en-US", options);
  }
}

// Initialize all interactive elements
function initInteractions() {
  // Global search functionality
  const globalSearch = document.getElementById("globalSearch");
  if (globalSearch) {
    globalSearch.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          // In a real app, this would trigger a search API call
          alert(`Searching for: ${searchTerm}`);
          this.value = "";
        }
      }
    });
  }

  // Mark all notifications as read
  const markAllRead = document.getElementById("markAllRead");
  if (markAllRead) {
    markAllRead.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove unread class from all notifications
      document
        .querySelectorAll(".notification-list li.unread")
        .forEach((item) => {
          item.classList.remove("unread");
        });

      // Update notification badge
      const badge = document.querySelector(".notification-badge");
      badge.textContent = "0";

      // In a real app, this would call an API to mark notifications as read
    });
  }

  // Logout functionality
  const logoutButtons = document.querySelectorAll("#logoutBtn, #logoutBtnMenu");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      if (confirm("Are you sure you want to logout?")) {
        // Clear session storage
        sessionStorage.clear();
        localStorage.removeItem("auth_token");

        // Redirect to login page
        window.location.href = "login.html";
      }
    });
  });

  // Client action menu buttons
  const clientMenuButtons = document.querySelectorAll(".client-menu-btn");
  clientMenuButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get client info
      const clientRow = this.closest(".recent-client");
      const clientName = clientRow.querySelector("h4").textContent;

      // Create and show a dropdown menu
      let menu = document.querySelector(".client-action-menu");
      if (menu) {
        document.body.removeChild(menu);
      }

      // Create menu
      menu = document.createElement("div");
      menu.className = "client-action-menu";
      menu.innerHTML = `
                <ul>
                    <li><a href="#view" data-action="view">View Details</a></li>
                    <li><a href="#edit" data-action="edit">Edit Client</a></li>
                    <li><a href="#contact" data-action="contact">Contact</a></li>
                    <li><a href="#delete" data-action="delete">Delete</a></li>
                </ul>
            `;

      // Style menu
      menu.style.position = "absolute";
      menu.style.backgroundColor = "white";
      menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      menu.style.borderRadius = "4px";
      menu.style.padding = "0.5rem 0";
      menu.style.zIndex = "1000";

      // Position menu near button
      const rect = this.getBoundingClientRect();
      menu.style.top = `${rect.bottom + window.scrollY}px`;
      menu.style.left = `${rect.left + window.scrollX - 100}px`;

      // Add menu to DOM
      document.body.appendChild(menu);

      // Add event listeners for menu items
      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const action = this.getAttribute("data-action");

          // Handle different actions
          switch (action) {
            case "view":
              alert(`View details for ${clientName}`);
              break;
            case "edit":
              alert(`Edit ${clientName}`);
              break;
            case "contact":
              alert(`Contact ${clientName}`);
              break;
            case "delete":
              if (confirm(`Are you sure you want to delete ${clientName}?`)) {
                // In a real app, this would call an API to delete the client
                clientRow.remove();
              }
              break;
          }

          // Remove menu
          document.body.removeChild(menu);
        });
      });

      // Close menu when clicking elsewhere
      document.addEventListener("click", function closeMenu(e) {
        if (!menu.contains(e.target) && e.target !== button) {
          if (document.body.contains(menu)) {
            document.body.removeChild(menu);
          }
          document.removeEventListener("click", closeMenu);
        }
      });
    });
  });

  // Reminder action buttons
  const reminderActionButtons = document.querySelectorAll(
    ".reminder-actions .btn-icon"
  );
  reminderActionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("title");
      const reminderItem = this.closest(".reminder-item");
      const reminderTitle = reminderItem.querySelector("h4").textContent;

      if (action === "Edit") {
        alert(`Edit functionality for reminder: ${reminderTitle}`);
      } else if (action === "Delete") {
        if (
          confirm(`Are you sure you want to delete reminder: ${reminderTitle}?`)
        ) {
          // In a real app, this would call an API to delete the reminder
          reminderItem.remove();
        }
      }
    });
  });
}

// Initialize all modals
function initModals() {
  // Generic modal functionality
  const modals = document.querySelectorAll(".modal");
  const modalTriggers = {
    addClientBtn: "addClientModal",
    newTaskBtn: "addTaskModal",
    scheduleMeetingBtn: "scheduleMeetingModal",
    generateReportBtn: "generateReportModal",
  };

  // Set up modal triggers
  for (const [triggerID, modalID] of Object.entries(modalTriggers)) {
    const trigger = document.getElementById(triggerID);
    const modal = document.getElementById(modalID);

    if (trigger && modal) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(modal);
      });
    }
  }

  // Close buttons for all modals
  document
    .querySelectorAll('.modal-close, .btn-outline[id^="cancel"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".modal");
        closeModal(modal);
      });
    });

  // Close modal when clicking outside content
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Form submission handlers

  // Add Client form
  const saveClientBtn = document.getElementById("saveClientBtn");
  if (saveClientBtn) {
    saveClientBtn.addEventListener("click", function () {
      const form = document.getElementById("addClientForm");

      // Basic form validation
      if (form.checkValidity()) {
        const clientName = document.getElementById("clientName").value;

        // In a real app, this would submit data to an API
        alert(`Client ${clientName} added successfully!`);

        // Close modal
        closeModal(document.getElementById("addClientModal"));

        // Reset form
        form.reset();

        // Add to recent clients (for demo purposes)
        addNewClient(clientName);
      } else {
        // Trigger HTML5 validation
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        form.appendChild(submitButton);
        submitButton.click();
        form.removeChild(submitButton);
      }
    });
  }

  // Add Task form
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  if (saveTaskBtn) {
    saveTaskBtn.addEventListener("click", function () {
      const form = document.getElementById("addTaskForm");

      // Basic form validation
      if (form.checkValidity()) {
        const taskTitle = document.getElementById("taskTitle").value;

        // In a real app, this would submit data to an API
        alert(`Task "${taskTitle}" added successfully!`);

        // Close modal
        closeModal(document.getElementById("addTaskModal"));

        // Reset form
        form.reset();

        // Update pending tasks count (for demo purposes)
        updateTaskCount(1);
      } else {
        // Trigger HTML5 validation
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        form.appendChild(submitButton);
        submitButton.click();
        form.removeChild(submitButton);
      }
    });
  }

  // Schedule Meeting form
  const saveMeetingBtn = document.getElementById("saveMeetingBtn");
  if (saveMeetingBtn) {
    saveMeetingBtn.addEventListener("click", function () {
      const form = document.getElementById("scheduleMeetingForm");

      // Basic form validation
      if (form.checkValidity()) {
        const meetingTitle = document.getElementById("meetingTitle").value;

        // In a real app, this would submit data to an API
        alert(`Meeting "${meetingTitle}" scheduled successfully!`);

        // Close modal
        closeModal(document.getElementById("scheduleMeetingModal"));

        // Reset form
        form.reset();

        // Add to reminders list (for demo purposes)
        addNewReminder(meetingTitle);
      } else {
        // Trigger HTML5 validation
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        form.appendChild(submitButton);
        submitButton.click();
        form.removeChild(submitButton);
      }
    });
  }

  // Generate Report form
  const generateReportButton = document.getElementById("generateReportBtn");
  if (generateReportButton) {
    generateReportButton.addEventListener("click", function () {
      const form = document.getElementById("generateReportForm");

      // Basic form validation
      if (form.checkValidity()) {
        const reportType = document.getElementById("reportType").value;
        const reportFormat = document.getElementById("reportFormat").value;

        // Simulate report generation
        const modal = document.getElementById("generateReportModal");

        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        this.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
          // In a real app, this would call an API to generate the report
          alert(
            `${reportType} report generated successfully in ${reportFormat.toUpperCase()} format!`
          );

          // Close modal
          closeModal(modal);

          // Reset form
          form.reset();

          // Reset button
          this.innerHTML = "Generate Report";
          this.disabled = false;

          // Add to activity (for demo purposes)
          addNewActivity(
            "Report Generated",
            `${reportType} report was generated.`
          );
        }, 2000);
      } else {
        // Trigger HTML5 validation
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        form.appendChild(submitButton);
        submitButton.click();
        form.removeChild(submitButton);
      }
    });
  }
}

// Function to open a modal
function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Function to close a modal
function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Function to add a new client to the recent clients list (for demo purposes)
function addNewClient(clientName) {
  const clientsList = document.getElementById("recentClientsList");
  if (clientsList) {
    const newClient = document.createElement("div");
    newClient.className = "recent-client";
    newClient.innerHTML = `
            <img src="assets/client-logos/new-client.png" alt="${clientName}" class="client-logo">
            <div class="recent-client-info">
                <h4>${clientName}</h4>
                <p>New Client</p>
            </div>
            <span class="status status-active">Active</span>
            <a href="#" class="btn-icon client-menu-btn">
                <i class="fas fa-ellipsis-v"></i>
            </a>
        `;

    // Add at the beginning of the list
    clientsList.insertBefore(newClient, clientsList.firstChild);

    // Update total clients count
    updateClientCount(1);

    // Add to activity
    addNewActivity(
      "New Client Added",
      `${clientName} was added to your client list.`
    );

    // Add event listener to new menu button
    const menuBtn = newClient.querySelector(".client-menu-btn");
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Get client info
      const clientRow = this.closest(".recent-client");
      const clientName = clientRow.querySelector("h4").textContent;

      // Create and show a dropdown menu
      let menu = document.querySelector(".client-action-menu");
      if (menu) {
        document.body.removeChild(menu);
      }

      // Create menu
      menu = document.createElement("div");
      menu.className = "client-action-menu";
      menu.innerHTML = `
                <ul>
                    <li><a href="#view" data-action="view">View Details</a></li>
                    <li><a href="#edit" data-action="edit">Edit Client</a></li>
                    <li><a href="#contact" data-action="contact">Contact</a></li>
                    <li><a href="#delete" data-action="delete">Delete</a></li>
                </ul>
            `;

      // Style menu
      menu.style.position = "absolute";
      menu.style.backgroundColor = "white";
      menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      menu.style.borderRadius = "4px";
      menu.style.padding = "0.5rem 0";
      menu.style.zIndex = "1000";

      // Position menu near button
      const rect = this.getBoundingClientRect();
      menu.style.top = `${rect.bottom + window.scrollY}px`;
      menu.style.left = `${rect.left + window.scrollX - 100}px`;

      // Add menu to DOM
      document.body.appendChild(menu);

      // Add event listeners for menu items
      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const action = this.getAttribute("data-action");

          // Handle different actions
          switch (action) {
            case "view":
              alert(`View details for ${clientName}`);
              break;
            case "edit":
              alert(`Edit ${clientName}`);
              break;
            case "contact":
              alert(`Contact ${clientName}`);
              break;
            case "delete":
              if (confirm(`Are you sure you want to delete ${clientName}?`)) {
                // In a real app, this would call an API to delete the client
                clientRow.remove();
                updateClientCount(-1);
              }
              break;
          }

          // Remove menu
          document.body.removeChild(menu);
        });
      });

      // Close menu when clicking elsewhere
      document.addEventListener("click", function closeMenu(e) {
        if (!menu.contains(e.target) && e.target !== menuBtn) {
          if (document.body.contains(menu)) {
            document.body.removeChild(menu);
          }
          document.removeEventListener("click", closeMenu);
        }
      });
    });
  }
}

// Function to add a new reminder to the reminders list (for demo purposes)
function addNewReminder(title) {
  const reminderList = document.getElementById("reminderList");
  if (reminderList) {
    // Create a date object for two days in the future
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const day = futureDate.getDate();
    const month = futureDate.toLocaleString("en-US", { month: "short" });

    const newReminder = document.createElement("li");
    newReminder.className = "reminder-item";
    newReminder.innerHTML = `
            <div class="reminder-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="reminder-content">
                <h4>${title}</h4>
                <p>Newly scheduled meeting</p>
                <span class="reminder-time">2:00 PM - 3:00 PM</span>
            </div>
            <div class="reminder-actions">
                <button class="btn-icon" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

    // Add at the beginning of the list
    reminderList.insertBefore(newReminder, reminderList.firstChild);

    // Add event listeners to action buttons
    const actionButtons = newReminder.querySelectorAll(
      ".reminder-actions .btn-icon"
    );
    actionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const action = this.getAttribute("title");

        if (action === "Edit") {
          alert(`Edit functionality for reminder: ${title}`);
        } else if (action === "Delete") {
          if (confirm(`Are you sure you want to delete reminder: ${title}?`)) {
            newReminder.remove();
          }
        }
      });
    });
  }
}

// Function to add a new activity to the activity list (for demo purposes)
function addNewActivity(title, description) {
  const activityList = document.getElementById("activityList");
  if (activityList) {
    const newActivity = document.createElement("li");
    newActivity.className = "activity-item";

    // Determine icon based on activity type
    let iconClass = "fas fa-bell";
    if (title.includes("Client")) {
      iconClass = "fas fa-user-plus";
    } else if (title.includes("Report")) {
      iconClass = "fas fa-file-alt";
    } else if (title.includes("Task")) {
      iconClass = "fas fa-tasks";
    } else if (title.includes("Meeting")) {
      iconClass = "fas fa-calendar-alt";
    }

    newActivity.innerHTML = `
            <div class="activity-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="activity-content">
                <h4>${title}</h4>
                <p>${description}</p>
                <span class="activity-time">Just now</span>
            </div>
        `;

    // Add at the beginning of the list
    activityList.insertBefore(newActivity, activityList.firstChild);

    // Remove the last item if list gets too long
    if (activityList.children.length > 6) {
      activityList.removeChild(activityList.lastChild);
    }
  }
}

// Function to update client count in the stats
function updateClientCount(change) {
  const statElement = document.querySelector(
    "#totalClientsCard .stat-content h2"
  );
  if (statElement) {
    const currentCount = parseInt(statElement.textContent);
    const newCount = currentCount + change;
    statElement.textContent = newCount;

    // Update trend
    const trendElement = document.querySelector(
      "#totalClientsCard .stat-trend"
    );
    trendElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${Math.round(
      (change / currentCount) * 100
    )}% from last month`;
    trendElement.className = "stat-trend positive";

    // Update chart
    if (window.dashboardCharts && window.dashboardCharts.status) {
      window.dashboardCharts.status.data.datasets[0].data[0] += change;
      window.dashboardCharts.status.update();
    }
  }
}

// Function to update task count in the stats
function updateTaskCount(change) {
  const statElement = document.querySelector(
    "#pendingTasksCard .stat-content h2"
  );
  if (statElement) {
    const currentCount = parseInt(statElement.textContent);
    const newCount = currentCount + change;
    statElement.textContent = newCount;

    // Update trend
    const trendElement = document.querySelector(
      "#pendingTasksCard .stat-trend"
    );
    const trendValue = Math.round((change / currentCount) * 100);
    trendElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${trendValue}% from last month`;
    trendElement.className = "stat-trend negative";
  }
}

// Function to set up real-time updates simulation
function setupRealTimeUpdates() {
  // Simulate real-time revenue updates
  setInterval(() => {
    const revenueElement = document.querySelector(
      "#totalRevenueCard .stat-content h2"
    );
    if (revenueElement) {
      const currentRevenue = parseFloat(
        revenueElement.textContent.replace("€", "").replace("M", "")
      );
      const change = (Math.random() * 0.4 - 0.1).toFixed(1); // Random fluctuation between -0.1 and +0.3
      const newRevenue = currentRevenue + parseFloat(change);

      revenueElement.textContent = `€${newRevenue.toFixed(1)}M`;

      // Update trend
      const trendElement = document.querySelector(
        "#totalRevenueCard .stat-trend"
      );
      const trendValue = Math.round((change / currentRevenue) * 100);

      if (parseFloat(change) > 0) {
        trendElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${trendValue}% from last update`;
        trendElement.className = "stat-trend positive";
      } else {
        trendElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(
          trendValue
        )}% from last update`;
        trendElement.className = "stat-trend negative";
      }
    }
  }, 45000); // Every 45 seconds

  // Simulate new notifications
  setTimeout(() => {
    // Add a new notification
    const notificationList = document.querySelector(".notification-list");
    if (notificationList) {
      const newNotification = document.createElement("li");
      newNotification.className = "unread";
      newNotification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="notification-content">
                    <p>Revenue forecast for <strong>Q2 2025</strong> is now available</p>
                    <span class="notification-time">Just now</span>
                </div>
            `;

      // Add at the beginning of the list
      notificationList.insertBefore(
        newNotification,
        notificationList.firstChild
      );

      // Update badge count
      const badge = document.querySelector(".notification-badge");
      badge.textContent = parseInt(badge.textContent) + 1;
    }
  }, 60000); // After 1 minute
}

// Function to initialize the tips carousel
function initTipsCarousel() {
  // Sample tips data
  const tips = [
    {
      icon: "lightbulb",
      title: "Client Management Best Practices",
      content:
        "Learn how to optimize your client relationships with our latest guide.",
      link: "#best-practices",
    },
    {
      icon: "chart-line",
      title: "Data Analysis Techniques",
      content:
        "Discover advanced techniques for analyzing client performance data.",
      link: "#data-analysis",
    },
    {
      icon: "clipboard-check",
      title: "Compliance Guidelines Updated",
      content:
        "Review the latest compliance guidelines for client data management.",
      link: "#compliance",
    },
  ];

  let currentTipIndex = 0;
  const tipCarousel = document.getElementById("tipsCarousel");
  const indicators = document.querySelectorAll(
    ".carousel-indicators .indicator"
  );
  const prevButton = document.getElementById("prevTipBtn");
  const nextButton = document.getElementById("nextTipBtn");

  // Function to update the displayed tip
  function updateTip(index) {
    if (!tipCarousel) return;

    const tip = tips[index];

    tipCarousel.innerHTML = `
            <div class="tip-card">
                <div class="tip-icon">
                    <i class="fas fa-${tip.icon}"></i>
                </div>
                <div class="tip-content">
                    <h4>${tip.title}</h4>
                    <p>${tip.content}</p>
                    <a href="${tip.link}" class="tip-link">Read More</a>
                </div>
            </div>
        `;

    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    currentTipIndex = index;
  }

  // Initialize with the first tip
  updateTip(0);

  // Add event listeners for navigation buttons
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      const prevIndex = (currentTipIndex - 1 + tips.length) % tips.length;
      updateTip(prevIndex);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      const nextIndex = (currentTipIndex + 1) % tips.length;
      updateTip(nextIndex);
    });
  }

  // Add event listeners for indicator dots
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      updateTip(index);
    });
  });

  // Auto-rotate tips every 8 seconds
  setInterval(function () {
    const nextIndex = (currentTipIndex + 1) % tips.length;
    updateTip(nextIndex);
  }, 8000);
}
