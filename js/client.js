/**
 * clients.js - JavaScript functionality for BOSCH CMS clients page
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Client details view handler
  const viewClientButtons = document.querySelectorAll(
    '.btn-icon[title="View Details"]'
  );
  const clientDetailsModal = document.querySelector(".client-details-modal");

  if (viewClientButtons.length > 0 && clientDetailsModal) {
    const closeButton = clientDetailsModal.querySelector(".modal-close");

    // Open modal when clicking view buttons
    viewClientButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        clientDetailsModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Here you would typically load client-specific data
        // For example: loadClientDetails(clientId);

        // For demonstration, we'll just show the hardcoded content
        console.log("Loading client details...");
      });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener("click", function () {
      clientDetailsModal.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close modal when clicking outside the content
    clientDetailsModal.addEventListener("click", function (event) {
      if (event.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Client search functionality
  const searchInput = document.querySelector(".search-container input");
  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      // If Enter key is pressed
      if (e.key === "Enter") {
        const searchTerm = this.value.trim().toLowerCase();

        // Simple client filtering logic
        if (searchTerm !== "") {
          filterClientTable(searchTerm);
        } else {
          // Reset the filter if search is empty
          resetClientFilter();
        }
      }
    });
  }

  // Advanced filter functionality
  const filterSelects = document.querySelectorAll(".filter-bar select");
  if (filterSelects.length > 0) {
    filterSelects.forEach((select) => {
      select.addEventListener("change", function () {
        applyFilters();
      });
    });
  }

  // Map marker interaction (for map view)
  const mapMarkers = document.querySelectorAll(".map-marker");
  if (mapMarkers.length > 0) {
    mapMarkers.forEach((marker) => {
      marker.addEventListener("click", function () {
        const clientName = this.getAttribute("data-client");
        console.log(`Map marker clicked for client: ${clientName}`);

        // Here you would typically show a popup or load client details
        // showClientPopup(clientName);
      });
    });
  }

  // Add new client button
  const addClientButton = document.querySelector(".btn-primary");
  if (
    addClientButton &&
    addClientButton.textContent.includes("Add New Client")
  ) {
    addClientButton.addEventListener("click", function () {
      console.log("Add new client button clicked");

      // Here you would typically show a form modal or redirect to a form page
      // showAddClientForm();
      alert("Add New Client functionality would open a form here");
    });
  }

  // Client action buttons (edit, delete)
  const actionButtons = document.querySelectorAll(".actions .btn-icon");
  if (actionButtons.length > 0) {
    actionButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const action = this.getAttribute("title");
        const clientRow = this.closest("tr");
        const clientName =
          clientRow.querySelector(".client-name h4").textContent;

        if (action === "Edit") {
          console.log(`Edit client: ${clientName}`);
          // editClient(clientId);
          alert(`Edit functionality for client: ${clientName}`);
        } else if (action === "Delete") {
          console.log(`Delete client: ${clientName}`);
          if (
            confirm(`Are you sure you want to delete client: ${clientName}?`)
          ) {
            // deleteClient(clientId);
            console.log(`Confirmed deletion of client: ${clientName}`);
          }
        }
      });
    });
  }

  // Pagination controls
  const paginationButtons = document.querySelectorAll(".pagination-btn");
  if (paginationButtons.length > 0) {
    paginationButtons.forEach((button) => {
      if (!button.disabled) {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          paginationButtons.forEach((btn) => btn.classList.remove("active"));

          // Add active class to the clicked button
          this.classList.add("active");

          // Here you would load the appropriate page of data
          const page = this.textContent;
          console.log(`Navigate to page: ${page}`);

          // loadPage(page);
        });
      }
    });
  }

  // Page size selector
  const pageSizeSelect = document.getElementById("pageSize");
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", function () {
      const pageSize = this.value;
      console.log(`Changed page size to: ${pageSize}`);

      // Here you would update the table with the new page size
      // updatePageSize(pageSize);
    });
  }
});

// Helper function to filter client table by search term
function filterClientTable(searchTerm) {
  const clientRows = document.querySelectorAll(".client-table tbody tr");

  clientRows.forEach((row) => {
    const clientName = row
      .querySelector(".client-info h4")
      .textContent.toLowerCase();
    const clientType = row
      .querySelector(".client-info span")
      .textContent.toLowerCase();
    const clientId = row
      .querySelector("td:nth-child(3)")
      .textContent.toLowerCase();

    if (
      clientName.includes(searchTerm) ||
      clientType.includes(searchTerm) ||
      clientId.includes(searchTerm)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Helper function to reset the client filter
function resetClientFilter() {
  const clientRows = document.querySelectorAll(".client-table tbody tr");

  clientRows.forEach((row) => {
    row.style.display = "";
  });
}

// Helper function to apply all filters
function applyFilters() {
  const typeFilter = document.getElementById("typeFilter").value;
  const regionFilter = document.getElementById("regionFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;
  const sortOrder = document.getElementById("sortOrder").value;

  console.log(
    `Applied filters - Type: ${typeFilter}, Region: ${regionFilter}, Status: ${statusFilter}, Sort: ${sortOrder}`
  );

  // Here you would typically make an API call with these filter parameters
  // or filter the client data that's already loaded in the page

  // Example of client filtering logic:
  const clientRows = document.querySelectorAll(".client-table tbody tr");

  clientRows.forEach((row) => {
    const rowType = row.querySelector("td:nth-child(4)").textContent;
    const rowLocation = row.querySelector("td:nth-child(5)").textContent;
    const rowStatus = row.querySelector(".status").textContent;

    let typeMatch = true;
    let regionMatch = true;
    let statusMatch = true;

    if (typeFilter && typeFilter !== "") {
      typeMatch = rowType.includes(typeFilter);
    }

    if (regionFilter && regionFilter !== "") {
      const regionName =
        regionFilter.charAt(0).toUpperCase() + regionFilter.slice(1);
      regionMatch = rowLocation.includes(regionName);
    }

    if (statusFilter && statusFilter !== "") {
      const statusName =
        statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);
      statusMatch = rowStatus.includes(statusName);
    }

    if (typeMatch && regionMatch && statusMatch) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // Sorting would be implemented here as well
  // For a real application, server-side sorting would be more efficient
}
