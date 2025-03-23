/**
 * analytics.js - JavaScript functionality for BOSCH CMS analytics page
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts
  initCharts();

  // Initialize interactive elements
  initInteractions();

  // Initialize modals
  initModals();
});

// Function to initialize all charts
function initCharts() {
  // Revenue Trend Chart
  const revenueTrendCtx = document
    .getElementById("revenueTrendChart")
    .getContext("2d");
  const revenueTrendChart = new Chart(revenueTrendCtx, {
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

  // Client Distribution Chart
  const clientDistributionCtx = document
    .getElementById("clientDistributionChart")
    .getContext("2d");
  const clientDistributionChart = new Chart(clientDistributionCtx, {
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

  // Region Performance Chart
  const regionPerformanceCtx = document
    .getElementById("regionPerformanceChart")
    .getContext("2d");
  const regionPerformanceChart = new Chart(regionPerformanceCtx, {
    type: "bar",
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
          label: "Revenue (in millions €)",
          data: [105.2, 57.2, 44.8, 22.4, 18.9],
          backgroundColor: [
            "rgba(226, 0, 21, 0.7)",
            "rgba(226, 0, 21, 0.6)",
            "rgba(226, 0, 21, 0.5)",
            "rgba(226, 0, 21, 0.4)",
            "rgba(226, 0, 21, 0.3)",
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
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return "Revenue: €" + context.raw + "M";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "€" + value + "M";
            },
          },
        },
      },
    },
  });

  // Year Comparison Chart
  const yearComparisonCtx = document
    .getElementById("yearComparisonChart")
    .getContext("2d");
  const yearComparisonChart = new Chart(yearComparisonCtx, {
    type: "bar",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "2024",
          data: [48.6, 59.6, 64.5, 68.8],
          backgroundColor: "rgba(83, 86, 90, 0.7)",
          borderWidth: 0,
        },
        {
          label: "2025",
          data: [58.5, 69.5, 72.4, 78.6],
          backgroundColor: "rgba(226, 0, 21, 0.7)",
          borderWidth: 0,
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
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": €" + context.raw + "M";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "€" + value + "M";
            },
          },
        },
      },
    },
  });

  // Revenue Forecast Chart
  const revenueForecastCtx = document
    .getElementById("revenueForecastChart")
    .getContext("2d");
  const revenueForecastChart = new Chart(revenueForecastCtx, {
    type: "line",
    data: {
      labels: [
        "Q1 2025",
        "Q2 2025",
        "Q3 2025",
        "Q4 2025",
        "Q1 2026",
        "Q2 2026",
      ],
      datasets: [
        {
          label: "Actual",
          data: [58.5, 69.5, null, null, null, null],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#E20015",
        },
        {
          label: "Forecast",
          data: [58.5, 69.5, 72.4, 78.6, 65.2, 76.3],
          borderColor: "#53565A",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          pointBackgroundColor: "#53565A",
          fill: false,
        },
        {
          label: "Upper Bound",
          data: [58.5, 69.5, 75.8, 83.2, 70.8, 83.1],
          borderColor: "rgba(83, 86, 90, 0.3)",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 1,
          pointRadius: 0,
          fill: "+1",
        },
        {
          label: "Lower Bound",
          data: [58.5, 69.5, 69.0, 74.0, 59.6, 69.5],
          borderColor: "rgba(83, 86, 90, 0.3)",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            filter: function (legendItem, data) {
              return (
                legendItem.text !== "Upper Bound" &&
                legendItem.text !== "Lower Bound"
              );
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              if (
                context.dataset.label === "Upper Bound" ||
                context.dataset.label === "Lower Bound"
              ) {
                return null;
              }
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
        },
      },
    },
  });

  // Seasonal Trends Chart
  const seasonalTrendsCtx = document
    .getElementById("seasonalTrendsChart")
    .getContext("2d");
  const seasonalTrendsChart = new Chart(seasonalTrendsCtx, {
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
          label: "2023",
          data: [
            15.2, 14.8, 16.5, 18.4, 18.9, 19.3, 17.2, 16.8, 18.6, 20.1, 22.8,
            23.2,
          ],
          borderColor: "#53565A",
          borderWidth: 1,
          pointRadius: 2,
          fill: false,
        },
        {
          label: "2024",
          data: [
            15.2, 16.1, 17.3, 18.2, 19.5, 20.1, 20.8, 21.2, 21.7, 22.3, 22.9,
            23.6,
          ],
          borderColor: "#F7941D",
          borderWidth: 1,
          pointRadius: 2,
          fill: false,
        },
        {
          label: "2025",
          data: [
            18.5, 19.2, 20.8, 21.3, 22.7, 23.5, 24.1, 23.8, 24.5, 25.2, 26.1,
            27.3,
          ],
          borderColor: "#E20015",
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
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
        },
      },
    },
  });

  // Custom Analysis Chart - Initialize with empty data, will be updated when analysis is run
  const customAnalysisCtx = document.getElementById("customAnalysisChart");
  if (customAnalysisCtx) {
    const customAnalysisChart = new Chart(customAnalysisCtx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Correlation Data",
            data: [],
            backgroundColor: "rgba(226, 0, 21, 0.7)",
            borderColor: "#E20015",
            pointRadius: 5,
            pointHoverRadius: 7,
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
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time Period",
            },
          },
          y: {
            title: {
              display: true,
              text: "Revenue (€M)",
            },
          },
        },
      },
    });

    // Store chart reference for later use
    window.customAnalysisChart = customAnalysisChart;
  }

  // Store chart references for later use
  window.dashboardCharts = {
    revenueTrend: revenueTrendChart,
    clientDistribution: clientDistributionChart,
    regionPerformance: regionPerformanceChart,
    yearComparison: yearComparisonChart,
    revenueForecast: revenueForecastChart,
    seasonalTrends: seasonalTrendsChart,
  };
}

// Function to initialize all interactive elements
function initInteractions() {
  // Date Range Presets
  const datePresets = document.querySelectorAll(".date-preset");
  const dateRangeCustom = document.querySelector(".date-range-custom");

  if (datePresets.length > 0) {
    datePresets.forEach((preset) => {
      preset.addEventListener("click", function () {
        // Update active state
        datePresets.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");

        // Show/hide custom date inputs
        if (dateRangeCustom && this.getAttribute("data-range") === "custom") {
          dateRangeCustom.style.display = "flex";
        } else if (dateRangeCustom) {
          dateRangeCustom.style.display = "none";

          // Update charts based on selected range
          updateChartsForDateRange(this.getAttribute("data-range"));
        }
      });
    });
  }

  // Apply custom date range
  const applyDateRangeBtn = document.getElementById("applyDateRange");
  if (applyDateRangeBtn) {
    applyDateRangeBtn.addEventListener("click", function () {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;

      if (startDate && endDate) {
        // Update charts based on custom date range
        updateChartsForCustomDateRange(startDate, endDate);
      } else {
        alert("Please select both start and end dates.");
      }
    });
  }

  // Card refresh buttons
  const refreshButtons = document.querySelectorAll(
    '.card-actions .btn-icon[title="Refresh"]'
  );
  if (refreshButtons.length > 0) {
    refreshButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".analytics-card");
        const chartContainer = card.querySelector(".chart-container");
        const chartCanvas = chartContainer.querySelector("canvas");

        if (chartCanvas) {
          // Show loading state
          this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

          // Simulate refresh (in a real app, this would fetch new data)
          setTimeout(() => {
            // Reset button
            this.innerHTML = '<i class="fas fa-sync-alt"></i>';

            // Find the chart instance and update with slight variations
            const chartId = chartCanvas.id;
            if (
              window.dashboardCharts &&
              window.dashboardCharts[getChartKeyFromId(chartId)]
            ) {
              const chart = window.dashboardCharts[getChartKeyFromId(chartId)];

              // Update chart with slight random variations
              randomlyUpdateChartData(chart);
              chart.update();
            }
          }, 1000);
        }
      });
    });
  }

  // More options buttons
  const moreOptionsButtons = document.querySelectorAll(
    '.card-actions .btn-icon[title="More Options"]'
  );
  if (moreOptionsButtons.length > 0) {
    moreOptionsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".analytics-card");

        // Create and show options menu
        showOptionsMenu(this, card);
      });
    });
  }

  // Export Analytics button
  const exportAnalyticsBtn = document.getElementById("exportAnalyticsBtn");
  if (exportAnalyticsBtn) {
    exportAnalyticsBtn.addEventListener("click", function () {
      openModal(document.getElementById("exportModal"));
    });
  }

  // Custom Analysis button
  const customAnalyticsBtn = document.getElementById("customAnalyticsBtn");
  const runAnalysisBtn = document.getElementById("runAnalysisBtn");
  const closeAnalysisBtn = document.getElementById("closeAnalysisBtn");

  if (customAnalyticsBtn) {
    customAnalyticsBtn.addEventListener("click", function () {
      // Scroll to custom analysis form
      document
        .querySelector(".custom-analysis-form")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  if (runAnalysisBtn) {
    runAnalysisBtn.addEventListener("click", function () {
      runCustomAnalysis();
    });
  }

  if (closeAnalysisBtn) {
    closeAnalysisBtn.addEventListener("click", function () {
      document.querySelector(".advanced-analytics-result").style.display =
        "none";
    });
  }
}

// Function to initialize all modals
function initModals() {
  // Export Modal
  const exportModal = document.getElementById("exportModal");
  const exportModalCloseBtn = exportModal?.querySelector(".modal-close");
  const cancelExportBtn = document.getElementById("cancelExportBtn");
  const confirmExportBtn = document.getElementById("confirmExportBtn");

  if (exportModal && exportModalCloseBtn) {
    exportModalCloseBtn.addEventListener("click", function () {
      closeModal(exportModal);
    });
  }

  if (cancelExportBtn) {
    cancelExportBtn.addEventListener("click", function () {
      closeModal(exportModal);
    });
  }

  if (confirmExportBtn) {
    confirmExportBtn.addEventListener("click", function () {
      // Show loading state
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
      this.disabled = true;

      // Simulate export process
      setTimeout(() => {
        // Get form values
        const format = document.getElementById("exportFormat").value;

        // Success message
        alert(
          `Analytics data exported successfully in ${format.toUpperCase()} format!`
        );

        // Close modal
        closeModal(exportModal);

        // Reset button
        this.innerHTML = "Export Data";
        this.disabled = false;
      }, 2000);
    });
  }

  // Close modals when clicking outside content
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });
}

// Function to open a modal
function openModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Function to close a modal
function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Function to update charts based on selected date range
function updateChartsForDateRange(range) {
  // In a real app, this would fetch new data based on the range
  console.log(`Updating charts for range: ${range} days`);

  // For demo purposes, simulate data updates with slight variations
  Object.values(window.dashboardCharts).forEach((chart) => {
    randomlyUpdateChartData(chart);
    chart.update();
  });

  // Update KPI values with small variations
  updateKPIValues();
}

// Function to update charts based on custom date range
function updateChartsForCustomDateRange(startDate, endDate) {
  // In a real app, this would fetch new data based on the custom date range
  console.log(`Updating charts for custom range: ${startDate} to ${endDate}`);

  // For demo purposes, simulate data updates with slight variations
  Object.values(window.dashboardCharts).forEach((chart) => {
    randomlyUpdateChartData(chart);
    chart.update();
  });

  // Update KPI values with small variations
  updateKPIValues();
}

// Function to update KPI values with slight variations
function updateKPIValues() {
  const kpiValues = document.querySelectorAll(".kpi-value");
  const kpiTrends = document.querySelectorAll(".kpi-trend");

  kpiValues.forEach((value, index) => {
    // Get current value
    let currentValue = value.textContent;

    // Parse the value
    if (currentValue.includes("€")) {
      // Handle currency format
      const numValue = parseFloat(
        currentValue.replace("€", "").replace("M", "")
      );
      const variation = (Math.random() * 2 - 1) * 0.5; // Random variation between -0.5 and 0.5
      const newValue = (numValue + variation).toFixed(1);
      value.textContent = `€${newValue}M`;

      // Update trend
      if (kpiTrends[index]) {
        const trendValue = ((variation / numValue) * 100).toFixed(1);
        if (variation > 0) {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-up"></i> ${trendValue}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend positive";
        } else {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(
            trendValue
          )}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend negative";
        }
      }
    } else if (currentValue.includes("%")) {
      // Handle percentage format
      const numValue = parseFloat(currentValue.replace("%", ""));
      const variation = Math.random() * 2 - 1; // Random variation between -1 and 1
      const newValue = (numValue + variation).toFixed(1);
      value.textContent = `${newValue}%`;

      // Update trend
      if (kpiTrends[index]) {
        const trendValue = ((variation / numValue) * 100).toFixed(1);
        if (variation > 0) {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-up"></i> ${trendValue}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend positive";
        } else {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(
            trendValue
          )}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend negative";
        }
      }
    } else if (currentValue.startsWith("+")) {
      // Handle growth format
      const numValue = parseFloat(
        currentValue.replace("+", "").replace("%", "")
      );
      const variation = Math.random() * 2 - 1; // Random variation between -1 and 1
      const newValue = (numValue + variation).toFixed(1);
      value.textContent = `+${newValue}%`;

      // Update trend
      if (kpiTrends[index]) {
        const trendValue = ((variation / numValue) * 100).toFixed(1);
        if (variation > 0) {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-up"></i> ${trendValue}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend positive";
        } else {
          kpiTrends[
            index
          ].innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(
            trendValue
          )}%<span>vs previous period</span>`;
          kpiTrends[index].className = "kpi-trend negative";
        }
      }
    }
  });
}

// Function to show options menu for cards
function showOptionsMenu(triggerElement, card) {
  // Remove any existing menus
  const existingMenu = document.querySelector(".options-menu");
  if (existingMenu) {
    document.body.removeChild(existingMenu);
  }

  // Create new menu
  const menu = document.createElement("div");
  menu.className = "options-menu";
  menu.innerHTML = `
        <ul>
            <li><a href="#" data-action="export">Export Chart</a></li>
            <li><a href="#" data-action="fullscreen">View Fullscreen</a></li>
            <li><a href="#" data-action="customize">Customize Chart</a></li>
            <li><a href="#" data-action="schedule">Schedule Report</a></li>
        </ul>
    `;

  // Style the menu
  menu.style.position = "absolute";
  menu.style.backgroundColor = "white";
  menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  menu.style.borderRadius = "4px";
  menu.style.padding = "0.5rem 0";
  menu.style.zIndex = "1000";
  menu.style.minWidth = "180px";

  menu.querySelectorAll("ul li a").forEach((item) => {
    item.style.display = "block";
    item.style.padding = "0.75rem 1rem";
    item.style.color = "#53565A";
    item.style.textDecoration = "none";
  });

  // Position menu near the trigger element
  const rect = triggerElement.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY}px`;
  menu.style.left = `${rect.left + window.scrollX - 150}px`;

  // Add to DOM
  document.body.appendChild(menu);

  // Add event listeners for menu items
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const action = this.getAttribute("data-action");
      const chartContainer = card.querySelector(".chart-container");
      const chartCanvas = chartContainer.querySelector("canvas");

      switch (action) {
        case "export":
          // Simulate export functionality
          alert("Chart exported successfully!");
          break;
        case "fullscreen":
          // Simulate fullscreen view
          alert("Fullscreen view would open here.");
          break;
        case "customize":
          // Simulate chart customization
          alert("Chart customization options would open here.");
          break;
        case "schedule":
          // Simulate scheduling
          alert("Report scheduling options would open here.");
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

// Function to run custom analysis based on selected options
function runCustomAnalysis() {
  const analysisType = document.getElementById("analysisType").value;
  const primaryMetric = document.getElementById("analysisPrimary").value;
  const secondaryMetric = document.getElementById("analysisSecondary").value;

  // Show loading state on button
  const runBtn = document.getElementById("runAnalysisBtn");
  if (runBtn) {
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
    runBtn.disabled = true;
  }

  // Show result container after a delay to simulate processing
  setTimeout(() => {
    const resultContainer = document.querySelector(
      ".advanced-analytics-result"
    );
    if (resultContainer) {
      resultContainer.style.display = "block";

      // Scroll to result
      resultContainer.scrollIntoView({ behavior: "smooth" });
    }

    // Update result title
    const resultTitle = document.getElementById("analysisResultTitle");
    if (resultTitle) {
      resultTitle.textContent = `${capitalizeFirstLetter(
        analysisType
      )} Analysis: ${capitalizeFirstLetter(
        primaryMetric
      )} vs ${capitalizeFirstLetter(secondaryMetric)}`;
    }

    // Generate and update the chart with appropriate data
    generateAnalysisData(analysisType, primaryMetric, secondaryMetric);

    // Reset button
    if (runBtn) {
      runBtn.innerHTML = "Run Analysis";
      runBtn.disabled = false;
    }
  }, 2000);
}

// Function to generate analysis chart data based on analysis type and metrics
function generateAnalysisData(analysisType, primaryMetric, secondaryMetric) {
  if (!window.customAnalysisChart) return;

  // Clear existing data
  window.customAnalysisChart.data.datasets = [];
  switch (analysisType) {
    case "correlation":
      // Generate correlation data points
      const correlationData = [];
      for (let i = 1; i <= 30; i++) {
        correlationData.push({
          x: i,
          y: 20 + i * 0.7 + (Math.random() * 4 - 2),
        });
      }

      window.customAnalysisChart.data.datasets = [
        {
          label: `${capitalizeFirstLetter(primaryMetric)} Data`,
          data: correlationData,
          backgroundColor: "rgba(226, 0, 21, 0.7)",
          borderColor: "#E20015",
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ];

      // Update axis labels
      window.customAnalysisChart.options.scales.x.title.text =
        secondaryMetric === "time"
          ? "Time Period"
          : capitalizeFirstLetter(secondaryMetric);
      window.customAnalysisChart.options.scales.y.title.text = `${capitalizeFirstLetter(
        primaryMetric
      )} (€M)`;

      // Change chart type to scatter
      window.customAnalysisChart.config.type = "scatter";

      // Add trend line
      const trendLineData = calculateTrendLine(correlationData);
      window.customAnalysisChart.data.datasets.push({
        label: "Trend Line",
        data: trendLineData,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "#53565A",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
      });

      break;

    case "regression":
      // Generate regression data with more points
      const regressionData = [];
      for (let i = 1; i <= 24; i++) {
        regressionData.push({
          x: i,
          y: 15 + i * 0.5 + (Math.random() * 3 - 1.5) + Math.sin(i / 3) * 2,
        });
      }

      window.customAnalysisChart.data.datasets = [
        {
          label: "Actual Data",
          data: regressionData,
          backgroundColor: "rgba(226, 0, 21, 0.7)",
          borderColor: "#E20015",
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
        },
      ];

      // Add regression model
      const regressionLine = calculateRegressionLine(regressionData);
      window.customAnalysisChart.data.datasets.push({
        label: "Regression Model",
        data: regressionLine,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "#53565A",
        borderWidth: 2,
        pointRadius: 0,
      });

      // Prediction points
      const predictions = [];
      for (let i = 25; i <= 30; i++) {
        const predictedY =
          regressionLine[regressionLine.length - 1].y + 0.5 * (i - 24);
        predictions.push({
          x: i,
          y: predictedY,
        });
      }

      window.customAnalysisChart.data.datasets.push({
        label: "Predictions",
        data: predictions,
        backgroundColor: "rgba(0, 166, 81, 0.7)",
        borderColor: "#00A651",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointHoverRadius: 6,
      });

      // Change chart type to line
      window.customAnalysisChart.config.type = "line";

      // Update axis labels
      window.customAnalysisChart.options.scales.x.title.text =
        "Time Period (Months)";
      window.customAnalysisChart.options.scales.y.title.text = `${capitalizeFirstLetter(
        primaryMetric
      )} (€M)`;

      break;

    case "segment":
      // Create segment analysis as a bar chart
      window.customAnalysisChart.config.type = "bar";

      const segmentLabels = [
        "Automotive",
        "Electronics",
        "Industrial",
        "Energy",
        "Consumer",
      ];

      window.customAnalysisChart.data.labels = segmentLabels;
      window.customAnalysisChart.data.datasets = [
        {
          label: "Revenue (€M)",
          data: [82.4, 65.7, 48.3, 32.6, 19.5],
          backgroundColor: [
            "rgba(226, 0, 21, 0.7)",
            "rgba(226, 0, 21, 0.6)",
            "rgba(226, 0, 21, 0.5)",
            "rgba(226, 0, 21, 0.4)",
            "rgba(226, 0, 21, 0.3)",
          ],
          borderWidth: 0,
        },
        {
          label: "Growth Rate (%)",
          data: [12.3, 9.6, 7.2, 5.8, 3.4],
          backgroundColor: [
            "rgba(0, 166, 81, 0.7)",
            "rgba(0, 166, 81, 0.6)",
            "rgba(0, 166, 81, 0.5)",
            "rgba(0, 166, 81, 0.4)",
            "rgba(0, 166, 81, 0.3)",
          ],
          borderWidth: 0,
        },
      ];

      // Update chart options for dual y-axis
      window.customAnalysisChart.options.scales = {
        x: {
          title: {
            display: true,
            text: "Client Segments",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Revenue (€M)",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Growth Rate (%)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      };

      break;

    case "forecast":
      // Create forecast as a line chart with confidence intervals
      window.customAnalysisChart.config.type = "line";

      const forecastLabels = [
        "Q1 2025",
        "Q2 2025",
        "Q3 2025",
        "Q4 2025",
        "Q1 2026",
        "Q2 2026",
        "Q3 2026",
        "Q4 2026",
      ];

      window.customAnalysisChart.data.labels = forecastLabels;
      window.customAnalysisChart.data.datasets = [
        {
          label: "Historical",
          data: [58.5, 69.5, null, null, null, null, null, null],
          borderColor: "#E20015",
          backgroundColor: "rgba(226, 0, 21, 0.1)",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#E20015",
          fill: false,
        },
        {
          label: "Forecast",
          data: [58.5, 69.5, 72.4, 78.6, 65.2, 76.3, 79.8, 85.3],
          borderColor: "#53565A",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          pointBackgroundColor: "#53565A",
          fill: false,
        },
        {
          label: "Upper Bound (95% CI)",
          data: [58.5, 69.5, 75.8, 83.2, 70.8, 83.1, 87.2, 93.5],
          borderColor: "rgba(83, 86, 90, 0.3)",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 1,
          pointRadius: 0,
          fill: "+1",
        },
        {
          label: "Lower Bound (95% CI)",
          data: [58.5, 69.5, 69.0, 74.0, 59.6, 69.5, 72.4, 77.1],
          borderColor: "rgba(83, 86, 90, 0.3)",
          backgroundColor: "rgba(83, 86, 90, 0.1)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
        },
      ];

      // Update chart options
      window.customAnalysisChart.options.scales = {
        x: {
          title: {
            display: true,
            text: "Time Period",
          },
        },
        y: {
          title: {
            display: true,
            text: `${capitalizeFirstLetter(primaryMetric)} (€M)`,
          },
          ticks: {
            callback: function (value) {
              return "€" + value + "M";
            },
          },
        },
      };

      window.customAnalysisChart.options.plugins.legend.labels = {
        filter: function (legendItem, data) {
          return (
            legendItem.text !== "Upper Bound (95% CI)" &&
            legendItem.text !== "Lower Bound (95% CI)"
          );
        },
      };

      break;
  }

  // Update chart
  window.customAnalysisChart.update();
}

// Helper function to calculate a simple linear trend line
function calculateTrendLine(data) {
  if (data.length === 0) return [];

  // Calculate averages
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;
  for (let point of data) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumX2 += point.x * point.x;
  }

  const n = data.length;
  const avgX = sumX / n;
  const avgY = sumY / n;

  // Calculate slope and y-intercept
  const slope = (sumXY - n * avgX * avgY) / (sumX2 - n * avgX * avgX);
  const intercept = avgY - slope * avgX;

  // Generate trend line data points
  const trendLine = [];
  const minX = Math.min(...data.map((point) => point.x));
  const maxX = Math.max(...data.map((point) => point.x));

  trendLine.push({
    x: minX,
    y: slope * minX + intercept,
  });

  trendLine.push({
    x: maxX,
    y: slope * maxX + intercept,
  });

  return trendLine;
}

// Helper function to calculate a more detailed regression line
function calculateRegressionLine(data) {
  if (data.length === 0) return [];

  // Same as trend line calculation but with more points
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;
  for (let point of data) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumX2 += point.x * point.x;
  }

  const n = data.length;
  const avgX = sumX / n;
  const avgY = sumY / n;

  const slope = (sumXY - n * avgX * avgY) / (sumX2 - n * avgX * avgX);
  const intercept = avgY - slope * avgX;

  // Generate regression line data points
  const regressionLine = [];
  const minX = Math.min(...data.map((point) => point.x));
  const maxX = Math.max(...data.map((point) => point.x));

  for (let x = minX; x <= maxX; x++) {
    regressionLine.push({
      x: x,
      y: slope * x + intercept,
    });
  }

  return regressionLine;
}

// Helper function to randomly update chart data for simulation
function randomlyUpdateChartData(chart) {
  // Skip if chart is not valid
  if (!chart || !chart.data || !chart.data.datasets) return;

  // Apply small random variations to each dataset
  chart.data.datasets.forEach((dataset) => {
    if (dataset.data && Array.isArray(dataset.data)) {
      // For scatter charts (x,y data points)
      if (
        dataset.data[0] &&
        typeof dataset.data[0] === "object" &&
        "x" in dataset.data[0] &&
        "y" in dataset.data[0]
      ) {
        dataset.data.forEach((point) => {
          if (point && "y" in point) {
            point.y = point.y * (1 + (Math.random() * 0.06 - 0.03)); // ±3% variation
          }
        });
      }
      // For regular charts (array of values)
      else {
        for (let i = 0; i < dataset.data.length; i++) {
          if (dataset.data[i] !== null) {
            dataset.data[i] =
              dataset.data[i] * (1 + (Math.random() * 0.06 - 0.03)); // ±3% variation
          }
        }
      }
    }
  });
}

// Helper function to get chart key from canvas ID
function getChartKeyFromId(id) {
  // Map canvas IDs to chart keys
  const mapping = {
    revenueTrendChart: "revenueTrend",
    clientDistributionChart: "clientDistribution",
    regionPerformanceChart: "regionPerformance",
    yearComparisonChart: "yearComparison",
    revenueForecastChart: "revenueForecast",
    seasonalTrendsChart: "seasonalTrends",
  };

  return mapping[id] || null;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
