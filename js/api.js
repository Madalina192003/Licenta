/**
 * BOSCH Customer Management System
 * API Service Module
 */

// API configuration
const API_CONFIG = {
  baseUrl: "https://api.bosch-cms.example", // Replace with actual API URL in production
  apiKey: "sample-api-key", // Replace with actual API key in production
  timeout: 30000, // 30 seconds
};

/**
 * API Error class
 */
class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Client API Services
 */
class ClientService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Get all clients
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with clients data
   */
  getClients(params = {}) {
    return this.api.get("/clients", { params });
  }

  /**
   * Get client by ID
   * @param {number|string} id - Client ID
   * @returns {Promise} Promise that resolves with client data
   */
  getClient(id) {
    return this.api.get(`/clients/${id}`);
  }

  /**
   * Create new client
   * @param {Object} data - Client data
   * @returns {Promise} Promise that resolves with created client data
   */
  createClient(data) {
    return this.api.post("/clients", data);
  }

  /**
   * Update client
   * @param {number|string} id - Client ID
   * @param {Object} data - Client data
   * @returns {Promise} Promise that resolves with updated client data
   */
  updateClient(id, data) {
    return this.api.put(`/clients/${id}`, data);
  }

  /**
   * Delete client
   * @param {number|string} id - Client ID
   * @returns {Promise} Promise that resolves on successful deletion
   */
  deleteClient(id) {
    return this.api.delete(`/clients/${id}`);
  }
}

/**
 * Project API Services
 */
class ProjectService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Get all projects
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with projects data
   */
  getProjects(params = {}) {
    return this.api.get("/projects", { params });
  }

  /**
   * Get project by ID
   * @param {number|string} id - Project ID
   * @returns {Promise} Promise that resolves with project data
   */
  getProject(id) {
    return this.api.get(`/projects/${id}`);
  }

  /**
   * Create new project
   * @param {Object} data - Project data
   * @returns {Promise} Promise that resolves with created project data
   */
  createProject(data) {
    return this.api.post("/projects", data);
  }

  /**
   * Update project
   * @param {number|string} id - Project ID
   * @param {Object} data - Project data
   * @returns {Promise} Promise that resolves with updated project data
   */
  updateProject(id, data) {
    return this.api.put(`/projects/${id}`, data);
  }

  /**
   * Delete project
   * @param {number|string} id - Project ID
   * @returns {Promise} Promise that resolves on successful deletion
   */
  deleteProject(id) {
    return this.api.delete(`/projects/${id}`);
  }
}

/**
 * Report API Services
 */
class ReportService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Get reports
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with reports data
   */
  getReports(params = {}) {
    return this.api.get("/reports", { params });
  }

  /**
   * Generate report
   * @param {string} type - Report type
   * @param {Object} params - Report parameters
   * @returns {Promise} Promise that resolves with report data
   */
  generateReport(type, params = {}) {
    return this.api.post(`/reports/${type}`, params);
  }

  /**
   * Export report
   * @param {number|string} id - Report ID
   * @param {string} format - Export format (pdf, excel, csv)
   * @returns {Promise} Promise that resolves with export data
   */
  exportReport(id, format = "pdf") {
    return this.api.get(`/reports/${id}/export/${format}`, {
      responseType: "blob",
    });
  }
}

/**
 * Dashboard API Services
 */
class DashboardService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Get dashboard data
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with dashboard data
   */
  getDashboardData(params = {}) {
    return this.api.get("/dashboard", { params });
  }

  /**
   * Get KPI data
   * @param {string} period - Time period (day, week, month, quarter, year)
   * @returns {Promise} Promise that resolves with KPI data
   */
  getKpiData(period = "month") {
    return this.api.get(`/dashboard/kpi/${period}`);
  }

  /**
   * Get analytics data
   * @param {string} type - Analytics type
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with analytics data
   */
  getAnalyticsData(type, params = {}) {
    return this.api.get(`/dashboard/analytics/${type}`, { params });
  }
}

/**
 * User API Services
 */
class UserService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Get current user
   * @returns {Promise} Promise that resolves with user data
   */
  getCurrentUser() {
    return this.api.get("/users/me");
  }

  /**
   * Update user profile
   * @param {Object} data - User data
   * @returns {Promise} Promise that resolves with updated user data
   */
  updateProfile(data) {
    return this.api.put("/users/me", data);
  }

  /**
   * Change password
   * @param {Object} data - Password data
   * @returns {Promise} Promise that resolves on successful password change
   */
  changePassword(data) {
    return this.api.post("/users/me/change-password", data);
  }

  /**
   * Get user permissions
   * @returns {Promise} Promise that resolves with user permissions
   */
  getPermissions() {
    return this.api.get("/users/me/permissions");
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Create service instances
const clientService = new ClientService(apiClient);
const projectService = new ProjectService(apiClient);
const reportService = new ReportService(apiClient);
const dashboardService = new DashboardService(apiClient);
const userService = new UserService(apiClient);

// Export services
export {
  apiClient,
  clientService,
  projectService,
  reportService,
  dashboardService,
  userService,
};

/**
 * API Client for BOSCH CMS
 */
class ApiClient {
  constructor(config = {}) {
    this.config = { ...API_CONFIG, ...config };
    this.pendingRequests = new Map();
  }

  /**
   * Get authorization headers
   * @returns {Object} Headers object
   */
  getHeaders() {
    const token = localStorage.getItem("auth_token");

    return {
      "Content-Type": "application/json",
      "X-API-Key": this.config.apiKey,
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  /**
   * Make API request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  async request(endpoint, options = {}) {
    const url = this.config.baseUrl + endpoint;

    // Default options
    const defaultOptions = {
      method: "GET",
      headers: this.getHeaders(),
      timeout: this.config.timeout,
    };

    // Merge options
    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: { ...defaultOptions.headers, ...options.headers },
    };

    // Create request ID for cancellation
    const requestId = `${requestOptions.method}:${url}:${Date.now()}`;

    try {
      // Check for cancellation token
      if (options.cancelToken) {
        options.cancelToken.promise.then((reason) => {
          if (this.pendingRequests.has(requestId)) {
            const controller = this.pendingRequests.get(requestId);
            controller.abort(reason);
            this.pendingRequests.delete(requestId);
          }
        });
      }

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort("Request timeout");
        this.pendingRequests.delete(requestId);
      }, requestOptions.timeout);

      // Store controller for potential cancellation
      this.pendingRequests.set(requestId, controller);

      // Add signal to request options
      requestOptions.signal = controller.signal;

      // Convert body to JSON string if it's an object
      if (requestOptions.body && typeof requestOptions.body === "object") {
        requestOptions.body = JSON.stringify(requestOptions.body);
      }

      // Make request
      const response = await fetch(url, requestOptions);

      // Clear timeout
      clearTimeout(timeoutId);

      // Remove from pending requests
      this.pendingRequests.delete(requestId);

      // Parse response
      const data = await this.parseResponse(response);

      // Check for error status
      if (!response.ok) {
        throw new ApiError(
          data.message || `API error: ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      // Handle abort errors
      if (error.name === "AbortError") {
        throw new ApiError("Request was cancelled", 0, {
          reason: error.message,
        });
      }

      // Handle network errors
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new ApiError("Network error: Could not connect to API", 0, {
          originalError: error,
        });
      }

      // Rethrow API errors
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle other errors
      throw new ApiError("API request failed", 0, { originalError: error });
    }
  }

  /**
   * Parse API response
   * @param {Response} response - Fetch API response
   * @returns {Promise} Promise that resolves with parsed data
   */
  async parseResponse(response) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    if (contentType && contentType.includes("text/")) {
      return await response.text();
    }

    return await response.blob();
  }

  /**
   * Create cancellation token
   * @returns {Object} Cancellation token
   */
  createCancelToken() {
    let cancel;
    const promise = new Promise((resolve) => {
      cancel = resolve;
    });

    return { promise, cancel };
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: "POST", body: data });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: "PUT", body: data });
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: "PATCH", body: data });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} Promise that resolves with response data
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}
