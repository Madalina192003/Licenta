/**
 * reports.js - JavaScript functionality for BOSCH CMS reports page
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize interactive elements
  initInteractions();

  // Initialize modals
  initModals();

  // Initialize form functionality
  initForms();
});

// Function to initialize all interactive elements
function initInteractions() {
  // View switcher (Card/List view)
  const viewButtons = document.querySelectorAll(".view-btn");
  const reportViews = document.querySelectorAll(".report-view");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button state
      viewButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding view
      const viewType = this.getAttribute("data-view");
      reportViews.forEach((view) => {
        view.classList.remove("active");
        if (view.classList.contains(`report-${viewType}-view`)) {
          view.classList.add("active");
        }
      });
    });
  });

  // Filter functionality
  const filterSelects = document.querySelectorAll(".filter-bar select");
  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      filterReports();
    });
  });

  // Clear filters
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function () {
      filterSelects.forEach((select) => {
        select.selectedIndex = 0;
      });
      filterReports();
    });
  }

  // Report search
  const reportSearch = document.getElementById("reportSearch");
  if (reportSearch) {
    reportSearch.addEventListener("keyup", function (e) {
      if (
        e.key === "Enter" ||
        this.value.length > 2 ||
        this.value.length === 0
      ) {
        searchReports(this.value.toLowerCase().trim());
      }
    });
  }

  // Report template buttons
  const templateButtons = document.querySelectorAll(".template-btn");
  templateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const templateCard = this.closest(".template-card");
      const reportType = templateCard.getAttribute("data-type");
      const templateTitle = templateCard.querySelector("h3").textContent;

      // Open create report modal with pre-filled template type
      openCreateReportModal(reportType, templateTitle);
    });
  });

  // Action buttons for reports
  initReportActions();

  // Scheduled report actions
  initScheduledReportActions();
}

// Initialize report action buttons
function initReportActions() {
  // Report action buttons (View, Download, Share)
  const cardButtons = document.querySelectorAll(".report-card-footer .btn");
  cardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const reportCard = this.closest(".report-card");
      const reportTitle = reportCard.querySelector("h3").textContent;
      const action = this.querySelector("i").classList.contains("fa-eye")
        ? "view"
        : this.querySelector("i").classList.contains("fa-download")
        ? "download"
        : "share";

      handleReportAction(reportTitle, action);
    });
  });

  // Table view action buttons
  const tableButtons = document.querySelectorAll(
    ".report-table .actions .btn-icon"
  );
  tableButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const reportTitle = row.querySelector(".report-name span").textContent;
      const action = this.getAttribute("title").toLowerCase();

      handleReportAction(reportTitle, action);
    });
  });

  // More options button (ellipsis) in cards
  const moreButtons = document.querySelectorAll(".report-actions .btn-icon");
  moreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const reportCard = this.closest(".report-card");
      const reportTitle = reportCard.querySelector("h3").textContent;

      // Create and show dropdown menu
      showActionMenu(this, reportTitle);
    });
  });
}

// Initialize scheduled report actions
function initScheduledReportActions() {
  const scheduleButtons = document.querySelectorAll(
    ".scheduled-report-actions .btn-icon"
  );
  scheduleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const reportCard = this.closest(".scheduled-report-card");
      const reportTitle = reportCard.querySelector("h3").textContent;
      const action = this.getAttribute("title");

      if (action.includes("Edit")) {
        // Open edit schedule modal
        alert(`Edit schedule for "${reportTitle}"`);
        // In a real app, this would open a modal pre-filled with schedule data
      } else if (action.includes("Pause")) {
        // Toggle pause state
        if (this.querySelector("i").classList.contains("fa-pause")) {
          this.querySelector("i").classList.remove("fa-pause");
          this.querySelector("i").classList.add("fa-play");
          this.setAttribute("title", "Resume Schedule");

          // Visual feedback
          reportCard.style.opacity = "0.6";
          alert(`Schedule paused for "${reportTitle}"`);
        } else {
          this.querySelector("i").classList.remove("fa-play");
          this.querySelector("i").classList.add("fa-pause");
          this.setAttribute("title", "Pause Schedule");

          // Visual feedback
          reportCard.style.opacity = "1";
          alert(`Schedule resumed for "${reportTitle}"`);
        }
      } else if (action.includes("Delete")) {
        if (
          confirm(
            `Are you sure you want to delete the schedule for "${reportTitle}"?`
          )
        ) {
          // Remove card with animation
          reportCard.style.opacity = "0";
          setTimeout(() => {
            reportCard.remove();
          }, 300);
        }
      }
    });
  });
}

// Function to handle report actions (view, download, share)
function handleReportAction(reportTitle, action) {
  switch (action) {
    case "view":
      // Open report preview modal
      openReportPreviewModal(reportTitle);
      break;
    case "download":
      // Show download options
      showDownloadOptions(reportTitle);
      break;
    case "share":
      // Show share options
      showShareOptions(reportTitle);
      break;
    case "more":
      // Show more options
      // This is handled separately by showActionMenu
      break;
  }
}

// Function to show action menu (more options)
function showActionMenu(triggerElement, reportTitle) {
  // Remove any existing menus
  const existingMenu = document.querySelector(".action-menu");
  if (existingMenu) {
    document.body.removeChild(existingMenu);
  }

  // Create new menu
  const menu = document.createElement("div");
  menu.className = "action-menu";
  menu.innerHTML = `
        <ul>
            <li><a href="#duplicate" data-action="duplicate">Duplicate</a></li>
            <li><a href="#schedule" data-action="schedule">Schedule</a></li>
            <li><a href="#edit" data-action="edit">Edit</a></li>
            <li><a href="#delete" data-action="delete">Delete</a></li>
        </ul>
    `;

  // Style the menu
  menu.style.position = "absolute";
  menu.style.backgroundColor = "white";
  menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  menu.style.borderRadius = "4px";
  menu.style.padding = "0.5rem 0";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "150px";

  menu.querySelectorAll("ul li a").forEach((item) => {
    item.style.display = "block";
    item.style.padding = "0.5rem 1rem";
    item.style.color = "#53565A";
    item.style.textDecoration = "none";
  });

  // Position menu near the trigger element
  const rect = triggerElement.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY}px`;
  menu.style.left = `${rect.left + window.scrollX - 120}px`;

  // Add to DOM
  document.body.appendChild(menu);

  // Add event listeners for menu items
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const action = this.getAttribute("data-action");

      switch (action) {
        case "duplicate":
          alert(`Duplicating report: "${reportTitle}"`);
          break;
        case "schedule":
          openScheduleModal(reportTitle);
          break;
        case "edit":
          alert(`Editing report: "${reportTitle}"`);
          break;
        case "delete":
          if (
            confirm(`Are you sure you want to delete report: "${reportTitle}"?`)
          ) {
            // In a real app, this would call an API to delete the report
            const cardOrRow =
              triggerElement.closest(".report-card") ||
              triggerElement.closest("tr");
            if (cardOrRow) {
              cardOrRow.style.opacity = "0";
              setTimeout(() => {
                cardOrRow.remove();
              }, 300);
            }
          }
          break;
      }

      // Remove menu
      document.body.removeChild(menu);
    });
  });

  // Close menu when clicking elsewhere
  document.addEventListener("click", function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== triggerElement) {
      if (document.body.contains(menu)) {
        document.body.removeChild(menu);
      }
      document.removeEventListener("click", closeMenu);
    }
  });
}

// Function to show download options
function showDownloadOptions(reportTitle) {
  // Create and show a dropdown with format options
  const menu = document.createElement("div");
  menu.className = "download-menu";
  menu.innerHTML = `
        <div class="download-header">Download Options</div>
        <ul>
            <li><a href="#pdf" data-format="pdf"><i class="fas fa-file-pdf"></i> PDF Document</a></li>
            <li><a href="#excel" data-format="excel"><i class="fas fa-file-excel"></i> Excel Spreadsheet</a></li>
            <li><a href="#csv" data-format="csv"><i class="fas fa-file-csv"></i> CSV File</a></li>
        </ul>
    `;

  // Style the menu
  menu.style.position = "fixed";
  menu.style.top = "50%";
  menu.style.left = "50%";
  menu.style.transform = "translate(-50%, -50%)";
  menu.style.backgroundColor = "white";
  menu.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  menu.style.borderRadius = "8px";
  menu.style.padding = "0";
  menu.style.zIndex = "2000";
  menu.style.minWidth = "250px";

  // Style the header
  const header = menu.querySelector(".download-header");
  header.style.padding = "1rem";
  header.style.borderBottom = "1px solid #eee";
  header.style.fontWeight = "bold";

  menu.querySelectorAll("ul li a").forEach((item) => {
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "0.5rem";
    item.style.padding = "0.75rem 1rem";
    item.style.color = "#53565A";
    item.style.textDecoration = "none";
  });

  // Add to DOM
  document.body.appendChild(menu);

  // Add event listeners for menu items
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const format = this.getAttribute("data-format");
      // In a real app, this would trigger a download
      alert(`Downloading "${reportTitle}" as ${format.toUpperCase()}`);

      // Remove menu
      document.body.removeChild(menu);
    });
  });

  // Add an overlay to close when clicking outside
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "1999";

  document.body.appendChild(overlay);

  overlay.addEventListener("click", function () {
    document.body.removeChild(menu);
    document.body.removeChild(overlay);
  });
}

// Function to show share options
function showShareOptions(reportTitle) {
  // Create and show a dropdown with sharing options
  const menu = document.createElement("div");
  menu.className = "share-menu";
  menu.innerHTML = `
        <div class="share-header">Share Options</div>
        <div class="share-body">
            <div class="share-input">
                <input type="text" value="cms.bosch.com/reports/shared/r3f7x9" readonly>
                <button class="copy-btn"><i class="fas fa-copy"></i></button>
            </div>
            <div class="share-options">
                <div class="share-option">
                    <input type="radio" id="share-view" name="share-permission" checked>
                    <label for="share-view">View only</label>
                </div>
                <div class="share-option">
                    <input type="radio" id="share-edit" name="share-permission">
                    <label for="share-edit">Can edit</label>
                </div>
            </div>
            <div class="share-email">
                <label for="share-emails">Email to:</label>
                <textarea id="share-emails" placeholder="Enter email addresses separated by commas"></textarea>
            </div>
        </div>
        <div class="share-footer">
            <button class="btn btn-outline">Cancel</button>
            <button class="btn btn-primary">Share</button>
        </div>
    `;

  // Style the menu
  menu.style.position = "fixed";
  menu.style.top = "50%";
  menu.style.left = "50%";
  menu.style.transform = "translate(-50%, -50%)";
  menu.style.backgroundColor = "white";
  menu.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  menu.style.borderRadius = "8px";
  menu.style.padding = "0";
  menu.style.zIndex = "2000";
  menu.style.width = "400px";
  menu.style.maxWidth = "90%";

  // Style the header
  const header = menu.querySelector(".share-header");
  header.style.padding = "1rem";
  header.style.borderBottom = "1px solid #eee";
  header.style.fontWeight = "bold";

  // Style the body
  const body = menu.querySelector(".share-body");
  body.style.padding = "1rem";

  // Style the input
  const inputContainer = menu.querySelector(".share-input");
  inputContainer.style.display = "flex";
  inputContainer.style.marginBottom = "1rem";

  const input = menu.querySelector(".share-input input");
  input.style.flex = "1";
  input.style.padding = "0.5rem";
  input.style.border = "1px solid #ddd";
  input.style.borderRadius = "4px 0 0 4px";

  const copyBtn = menu.querySelector(".copy-btn");
  copyBtn.style.padding = "0.5rem";
  copyBtn.style.backgroundColor = "#F2F2F2";
  copyBtn.style.border = "1px solid #ddd";
  copyBtn.style.borderLeft = "none";
  copyBtn.style.borderRadius = "0 4px 4px 0";
  copyBtn.style.cursor = "pointer";

  // Style the options
  const options = menu.querySelector(".share-options");
  options.style.marginBottom = "1rem";

  const shareOptions = menu.querySelectorAll(".share-option");
  shareOptions.forEach((option) => {
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.marginBottom = "0.5rem";
  });

  // Style the email area
  const emailArea = menu.querySelector(".share-email");
  emailArea.style.marginBottom = "1rem";

  const emailLabel = menu.querySelector(".share-email label");
  emailLabel.style.display = "block";
  emailLabel.style.marginBottom = "0.5rem";

  const textarea = menu.querySelector(".share-email textarea");
  textarea.style.width = "100%";
  textarea.style.padding = "0.5rem";
  textarea.style.border = "1px solid #ddd";
  textarea.style.borderRadius = "4px";
  textarea.style.height = "80px";

  // Style the footer
  const footer = menu.querySelector(".share-footer");
  footer.style.padding = "1rem";
  footer.style.borderTop = "1px solid #eee";
  footer.style.display = "flex";
  footer.style.justifyContent = "flex-end";
  footer.style.gap = "0.5rem";

  // Add to DOM
  document.body.appendChild(menu);

  // Add event listeners
  // Copy button
  copyBtn.addEventListener("click", function () {
    input.select();
    document.execCommand("copy");
    this.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
  });

  // Cancel button
  const cancelBtn = menu.querySelector(".btn-outline");
  cancelBtn.addEventListener("click", function () {
    document.body.removeChild(menu);
    document.body.removeChild(overlay);
  });

  // Share button
  const shareBtn = menu.querySelector(".btn-primary");
  shareBtn.addEventListener("click", function () {
    const emails = textarea.value;
    const permission = document.getElementById("share-edit").checked
      ? "edit"
      : "view";

    if (emails.trim()) {
      alert(
        `Report "${reportTitle}" shared with ${emails} (${permission} permission)`
      );
    } else {
      alert(
        `Link copied for sharing report "${reportTitle}" (${permission} permission)`
      );
    }

    document.body.removeChild(menu);
    document.body.removeChild(overlay);
  });

  // Add an overlay to close when clicking outside
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "1999";

  document.body.appendChild(overlay);

  overlay.addEventListener("click", function () {
    document.body.removeChild(menu);
    document.body.removeChild(overlay);
  });
}

// Function to filter reports based on selected filters
function filterReports() {
  const reportTypeFilter = document.getElementById("reportTypeFilter").value;
  const dateRangeFilter = document.getElementById("dateRangeFilter").value;
  const createdByFilter = document.getElementById("createdByFilter").value;

  console.log("Filtering reports:", {
    reportTypeFilter,
    dateRangeFilter,
    createdByFilter,
  });

  // Card view filtering
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    let showCard = true;

    // Type filtering
    if (
      reportTypeFilter &&
      card.querySelector(".report-type").getAttribute("data-type") !==
        reportTypeFilter
    ) {
      showCard = false;
    }

    // In a real app, other filters would be applied similarly
    // For this demo, we'll simulate it
    if (showCard) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  // List view filtering (similar logic)
  const tableRows = document.querySelectorAll(".report-table tbody tr");
  tableRows.forEach((row) => {
    let showRow = true;

    // Type filtering
    if (reportTypeFilter) {
      const rowType = row
        .querySelector(".report-icon")
        .getAttribute("data-type");
      if (rowType !== reportTypeFilter) {
        showRow = false;
      }
    }

    // In a real app, other filters would be applied similarly

    if (showRow) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Function to search reports
function searchReports(searchTerm) {
  if (!searchTerm) {
    // If search is cleared, show all and reset filters
    document
      .querySelectorAll(".report-card, .report-table tbody tr")
      .forEach((el) => {
        el.style.display = "";
      });
    return;
  }

  // Card view searching
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card
      .querySelector(".report-description")
      .textContent.toLowerCase();
    const type = card
      .querySelector(".report-type span")
      .textContent.toLowerCase();

    if (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      type.includes(searchTerm)
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  // List view searching
  const tableRows = document.querySelectorAll(".report-table tbody tr");
  tableRows.forEach((row) => {
    const title = row
      .querySelector(".report-name span")
      .textContent.toLowerCase();
    const type = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const author = row
      .querySelector("td:nth-child(4)")
      .textContent.toLowerCase();

    if (
      title.includes(searchTerm) ||
      type.includes(searchTerm) ||
      author.includes(searchTerm)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Function to initialize all modals
function initModals() {
  // Create Report Modal
  const createReportBtn = document.getElementById("createReportBtn");
  const createReportModal = document.getElementById("createReportModal");
  const createReportCloseBtn = createReportModal?.querySelector(".modal-close");
  const cancelReportBtn = document.getElementById("cancelReportBtn");

  if (createReportBtn && createReportModal) {
    createReportBtn.addEventListener("click", function () {
      openCreateReportModal();
    });

    createReportCloseBtn?.addEventListener("click", function () {
      closeModal(createReportModal);
    });

    cancelReportBtn?.addEventListener("click", function () {
      closeModal(createReportModal);
    });
  }

  // Schedule Report Modal
  const scheduleReportBtn = document.getElementById("scheduleReportBtn");
  const scheduleReportModal = document.getElementById("scheduleReportModal");
  const scheduleReportCloseBtn =
    scheduleReportModal?.querySelector(".modal-close");
  const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");

  if (scheduleReportBtn && scheduleReportModal) {
    scheduleReportBtn.addEventListener("click", function () {
      openScheduleModal();
    });

    scheduleReportCloseBtn?.addEventListener("click", function () {
      closeModal(scheduleReportModal);
    });

    cancelScheduleBtn?.addEventListener("click", function () {
      closeModal(scheduleReportModal);
    });
  }

  // View Report Modal
  const viewReportModal = document.getElementById("viewReportModal");
  const viewReportCloseBtn = viewReportModal?.querySelector(".modal-close");

  if (viewReportModal && viewReportCloseBtn) {
    viewReportCloseBtn.addEventListener("click", function () {
      closeModal(viewReportModal);
    });
  }

  // Close modals when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });
}

// Function to initialize form functionality
function initForms() {
  // Create Report Form
  const generateReportBtn = document.getElementById("generateReportBtn");
  const createReportForm = document.getElementById("createReportForm");

  if (generateReportBtn && createReportForm) {
    generateReportBtn.addEventListener("click", function () {
      if (createReportForm.checkValidity()) {
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        this.disabled = true;

        // Simulate processing
        setTimeout(() => {
          // Success message
          alert("Report generated successfully!");

          // Close modal
          closeModal(document.getElementById("createReportModal"));

          // Reset form
          createReportForm.reset();

          // Reset button
          this.innerHTML = "Generate Report";
          this.disabled = false;

          // Simulate adding a new report to the list
          addNewReport();
        }, 2000);
      } else {
        // Trigger form validation
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        createReportForm.appendChild(submitBtn);
        submitBtn.click();
        createReportForm.removeChild(submitBtn);
      }
    });
  }

  // Schedule Report Form
  const saveScheduleBtn = document.getElementById("saveScheduleBtn");
  const scheduleReportForm = document.getElementById("scheduleReportForm");

  if (saveScheduleBtn && scheduleReportForm) {
    saveScheduleBtn.addEventListener("click", function () {
      if (scheduleReportForm.checkValidity()) {
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        this.disabled = true;

        // Simulate processing
        setTimeout(() => {
          // Success message
          alert("Report schedule saved successfully!");

          // Close modal
          closeModal(document.getElementById("scheduleReportModal"));

          // Reset form
          scheduleReportForm.reset();

          // Reset button
          this.innerHTML = "Save Schedule";
          this.disabled = false;

          // Simulate adding a new scheduled report
          addNewScheduledReport();
        }, 1500);
      } else {
        // Trigger form validation
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        scheduleReportForm.appendChild(submitBtn);
        submitBtn.click();
        scheduleReportForm.removeChild(submitBtn);
      }
    });
  }

  // Frequency dependent fields in Schedule form
  const frequencySelect = document.getElementById("scheduleFrequency");
  const weeklyOptions = document.getElementById("weeklyOptions");
  const monthlyOptions = document.getElementById("monthlyOptions");

  if (frequencySelect && weeklyOptions && monthlyOptions) {
    frequencySelect.addEventListener("change", function () {
      const value = this.value;

      // Hide all optional sections
      weeklyOptions.style.display = "none";
      monthlyOptions.style.display = "none";

      // Show relevant section based on frequency
      if (value === "weekly" || value === "biweekly") {
        weeklyOptions.style.display = "block";
      } else if (value === "monthly" || value === "quarterly") {
        monthlyOptions.style.display = "block";
      }
    });
  }

  // Email delivery toggle
  const deliveryEmail = document.getElementById("deliveryEmail");
  const emailOptions = document.getElementById("emailOptions");

  if (deliveryEmail && emailOptions) {
    deliveryEmail.addEventListener("change", function () {
      emailOptions.style.display = this.checked ? "block" : "none";
    });
  }
}

// Function to open create report modal
function openCreateReportModal(reportType = "", templateTitle = "") {
  const modal = document.getElementById("createReportModal");
  if (!modal) return;

  // Pre-fill form if reportType is provided
  if (reportType) {
    const reportTypeSelect = document.getElementById("reportType");
    const reportNameInput = document.getElementById("reportName");

    // Set report type
    for (let i = 0; i < reportTypeSelect.options.length; i++) {
      if (reportTypeSelect.options[i].value === reportType) {
        reportTypeSelect.selectedIndex = i;
        break;
      }
    }

    // Suggest a name based on template
    reportNameInput.value = templateTitle;

    // Set default dates (current month)
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const startDateInput = document.getElementById("reportStartDate");
    const endDateInput = document.getElementById("reportEndDate");

    startDateInput.valueAsDate = firstDay;
    endDateInput.valueAsDate = lastDay;
  }

  // Open modal
  openModal(modal);
}

// Function to open schedule report modal
function openScheduleModal(reportTitle = "") {
  const modal = document.getElementById("scheduleReportModal");
  if (!modal) return;

  // Pre-fill form if reportTitle is provided
  if (reportTitle) {
    document.getElementById("scheduleReportName").value = reportTitle;

    // Extract report type from title (in a real app, this would come from the report data)
    if (reportTitle.includes("Financial")) {
      const select = document.getElementById("scheduleReportType");
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === "financial") {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }

  // Set default start date to today
  const startDateInput = document.getElementById("scheduleStartDate");
  startDateInput.valueAsDate = new Date();

  // Open modal
  openModal(modal);
}

// Function to open report preview modal
function openReportPreviewModal(reportTitle) {
  const modal = document.getElementById("viewReportModal");
  if (!modal) return;

  // Update modal content with report details
  document.getElementById("viewReportTitle").textContent = reportTitle;
  document.getElementById("viewReportTitle2").textContent = reportTitle;

  // In a real app, we would fetch and populate actual report data
  // For this demo, we'll use the existing preview content

  // Open modal
  openModal(modal);
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

// Function to add a new report to the list (for demo purposes)
function addNewReport() {
  const reportName =
    document.getElementById("reportName").value || "New Custom Report";
  const reportType = document.getElementById("reportType").value || "custom";
  const typeName = getReportTypeName(reportType);

  // Get the grid container
  const reportGrid = document.getElementById("reportGrid");
  if (!reportGrid) return;

  // Create a new report card
  const newReport = document.createElement("div");
  newReport.className = "report-card";
  newReport.innerHTML = `
        <div class="report-card-header">
            <div class="report-type" data-type="${reportType}">
                <i class="${getReportTypeIcon(reportType)}"></i>
                <span>${typeName}</span>
            </div>
            <div class="report-actions">
                <button class="btn-icon" title="More Options">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
        <div class="report-card-body">
            <h3>${reportName}</h3>
            <p class="report-description">Custom report created on ${new Date().toLocaleDateString()}</p>
            <div class="report-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Generated: Just now</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>By: Thomas Weber</span>
                </div>
            </div>
        </div>
        <div class="report-card-footer">
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-download"></i> Download
            </button>
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;

  // Add at the beginning of the grid
  reportGrid.insertBefore(newReport, reportGrid.firstChild);

  // Add event listeners to the new card's buttons
  initReportActions();
}

// Function to add a new scheduled report (for demo purposes)
function addNewScheduledReport() {
  const reportName =
    document.getElementById("scheduleReportName").value ||
    "New Scheduled Report";
  const reportType =
    document.getElementById("scheduleReportType").value || "custom";
  const frequency =
    document.getElementById("scheduleFrequency").value || "monthly";

  // Get the container
  const container = document.querySelector(".scheduled-reports");
  if (!container) return;

  // Create a new scheduled report card
  const newScheduledReport = document.createElement("div");
  newScheduledReport.className = "scheduled-report-card";
  newScheduledReport.innerHTML = `
        <div class="report-icon" data-type="${reportType}">
            <i class="${getReportTypeIcon(reportType)}"></i>
        </div>
        <div class="scheduled-report-content">
            <h3>${reportName}</h3>
            <p>Generated automatically based on your schedule</p>
            <div class="schedule-info">
                <span><i class="fas fa-calendar-alt"></i> ${capitalizeFirstLetter(
                  frequency
                )}</span>
                <span><i class="fas fa-clock"></i> ${getTimeString()}</span>
                <span><i class="fas fa-envelope"></i> Email to team</span>
            </div>
        </div>
        <div class="scheduled-report-actions">
            <button class="btn-icon" title="Edit Schedule">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" title="Pause Schedule">
                <i class="fas fa-pause"></i>
            </button>
            <button class="btn-icon" title="Delete Schedule">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

  // Add at the beginning of the container
  container.insertBefore(newScheduledReport, container.firstChild);

  // Add event listeners
  initScheduledReportActions();
}

// Helper function to get report type icon class
function getReportTypeIcon(type) {
  switch (type) {
    case "client":
      return "fas fa-users";
    case "financial":
      return "fas fa-euro-sign";
    case "activity":
      return "fas fa-chart-line";
    case "contract":
      return "fas fa-file-contract";
    case "custom":
    default:
      return "fas fa-cog";
  }
}

// Helper function to get report type display name
function getReportTypeName(type) {
  switch (type) {
    case "client":
      return "Client Performance";
    case "financial":
      return "Financial Summary";
    case "activity":
      return "Activity Log";
    case "contract":
      return "Contract Status";
    case "custom":
    default:
      return "Custom Report";
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to get current time string
function getTimeString() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}
