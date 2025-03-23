/**
 * BOSCH Customer Management System
 * Charts and Data Visualization
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts if on dashboard page
  if (document.getElementById("performanceChart")) {
    initPerformanceChart();
  }

  if (document.getElementById("clientDistribution")) {
    initClientDistributionChart();
  }

  // Initialize other charts based on page
  if (document.getElementById("salesTrendChart")) {
    initSalesTrendChart();
  }

  if (document.getElementById("plantEfficiencyChart")) {
    initPlantEfficiencyChart();
  }

  if (document.getElementById("serviceRequestsChart")) {
    initServiceRequestsChart();
  }
});

/**
 * Initialize Plant Performance Overview Chart
 */
function initPerformanceChart() {
  const ctx = document.getElementById("performanceChart").getContext("2d");

  // Sample data - Replace with API call in production
  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Efficiency",
        data: [86, 89, 92, 88, 91, 93],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Productivity",
        data: [78, 81, 85, 86, 84, 88],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Quality",
        data: [92, 90, 93, 94, 95, 96],
        borderColor: "#E20015",
        backgroundColor: "rgba(226, 0, 21, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  new Chart(ctx, {
    type: "line",
    data: performanceData,
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
              return context.dataset.label + ": " + context.raw + "%";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 70,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

/**
 * Initialize Client Distribution Chart
 */
function initClientDistributionChart() {
  const ctx = document.getElementById("clientDistribution").getContext("2d");

  // Sample data - Replace with API call in production
  const distributionData = {
    labels: [
      "Automotive",
      "Manufacturing",
      "Industrial",
      "Energy",
      "Healthcare",
      "Consumer Goods",
    ],
    datasets: [
      {
        label: "Client Distribution",
        data: [38, 25, 15, 10, 7, 5],
        backgroundColor: [
          "#E20015", // BOSCH Red
          "#4F46E5",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EC4899",
        ],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  };

  new Chart(ctx, {
    type: "doughnut",
    data: distributionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 15,
            padding: 15,
          },
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
}

/**
 * Initialize Sales Trend Chart
 */
function initSalesTrendChart() {
  const ctx = document.getElementById("salesTrendChart").getContext("2d");

  // Sample data - Replace with API call in production
  const salesData = {
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
        label: "Last Year",
        data: [18, 22, 26, 28, 32, 34, 30, 28, 26, 30, 36, 42],
        borderColor: "rgba(156, 163, 175, 1)",
        backgroundColor: "rgba(156, 163, 175, 0.5)",
        type: "line",
        tension: 0.4,
        borderDash: [5, 5],
        pointRadius: 3,
      },
      {
        label: "Current Year",
        data: [24, 28, 32, 36, 42, 46, 42, 40, 44, 48, 52, 58],
        backgroundColor: "rgba(226, 0, 21, 0.7)",
        borderRadius: 4,
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: salesData,
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
}

/**
 * Initialize Plant Efficiency Chart
 */
function initPlantEfficiencyChart() {
  const ctx = document.getElementById("plantEfficiencyChart").getContext("2d");

  // Sample data - Replace with API call in production
  const efficiencyData = {
    labels: [
      "Stuttgart",
      "Munich",
      "Berlin",
      "Hamburg",
      "Frankfurt",
      "Cologne",
      "Leipzig",
      "Dresden",
    ],
    datasets: [
      {
        label: "Efficiency Score",
        data: [92, 88, 91, 86, 89, 85, 82, 87],
        backgroundColor: function (context) {
          const value = context.raw;
          if (value >= 90) return "rgba(16, 185, 129, 0.8)"; // Green
          if (value >= 85) return "rgba(245, 158, 11, 0.8)"; // Yellow
          return "rgba(239, 68, 68, 0.8)"; // Red
        },
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: efficiencyData,
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return "Efficiency: " + context.raw + "%";
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          min: 75,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

/**
 * Initialize Service Requests Chart
 */
function initServiceRequestsChart() {
  const ctx = document.getElementById("serviceRequestsChart").getContext("2d");

  // Sample data - Replace with API call in production
  const requestsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Resolved",
        data: [42, 38, 45, 40, 48, 52],
        backgroundColor: "rgba(16, 185, 129, 0.8)", // Green
        borderWidth: 0,
        borderRadius: 4,
        stack: "Stack 0",
      },
      {
        label: "Pending",
        data: [15, 18, 12, 16, 14, 11],
        backgroundColor: "rgba(245, 158, 11, 0.8)", // Yellow
        borderWidth: 0,
        borderRadius: 4,
        stack: "Stack 0",
      },
      {
        label: "Escalated",
        data: [5, 8, 6, 7, 4, 3],
        backgroundColor: "rgba(239, 68, 68, 0.8)", // Red
        borderWidth: 0,
        borderRadius: 4,
        stack: "Stack 0",
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: requestsData,
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
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
    },
  });
}
