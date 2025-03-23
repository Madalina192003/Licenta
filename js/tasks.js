document.addEventListener("DOMContentLoaded", function () {
  // Elements for task creation
  const createTaskBtn = document.getElementById("createTaskBtn");
  const createTaskModal = document.getElementById("createTaskModal");
  const closeTaskModalBtn = createTaskModal?.querySelector(".close-btn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const taskForm = document.getElementById("createTaskForm");

  // Elements for task filtering
  const taskStatusFilter = document.getElementById("taskStatusFilter");

  // Task action buttons
  const taskActionButtons = document.querySelectorAll(
    ".task-actions .btn-icon"
  );

  // Initialize modal functionality
  if (createTaskBtn && createTaskModal) {
    // Open modal
    createTaskBtn.addEventListener("click", function () {
      createTaskModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });

    // Close modal
    [closeTaskModalBtn, cancelTaskBtn].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", closeModal);
      }
    });

    // Close modal when clicking outside
    createTaskModal.addEventListener("click", function (e) {
      if (e.target === createTaskModal) {
        closeModal();
      }
    });

    // Create task
    if (saveTaskBtn && taskForm) {
      saveTaskBtn.addEventListener("click", function () {
        // Validate form
        if (!validateTaskForm()) {
          return;
        }

        // Show loading state
        saveTaskBtn.disabled = true;
        saveTaskBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Simulate API call to save task
        setTimeout(function () {
          // Get form data
          const taskTitle = document.getElementById("taskTitle").value;
          const taskDescription =
            document.getElementById("taskDescription").value;
          const taskDue = document.getElementById("taskDue").value;
          const taskPriority = document.getElementById("taskPriority").value;
          const taskAssignee = document.getElementById("taskAssignee").value;

          // Create new task element
          createTaskElement(
            taskTitle,
            taskDescription,
            taskDue,
            taskPriority,
            taskAssignee
          );

          // Reset form
          taskForm.reset();

          // Close modal
          closeModal();

          // Show success message
          showMessage("Task created successfully!", "success");
        }, 1000);
      });
    }
  }

  // Filter tasks
  if (taskStatusFilter) {
    taskStatusFilter.addEventListener("change", function () {
      const status = this.value;
      const taskItems = document.querySelectorAll(".task-item");

      taskItems.forEach((task) => {
        if (status === "all" || task.querySelector(`.task-status.${status}`)) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    });
  }

  // Task actions
  if (taskActionButtons.length > 0) {
    taskActionButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();

        const action = this.getAttribute("title");
        const taskItem = this.closest(".task-item");

        if (action === "Edit Task") {
          // Open edit task modal
          alert("Edit task functionality would be implemented here");
        } else if (action === "Complete Task") {
          // Mark task as complete
          const statusIndicator = taskItem.querySelector(".task-status");
          statusIndicator.className = "task-status completed";
          showMessage("Task marked as complete!", "success");
        } else if (action === "Delete Task") {
          // Confirm delete
          if (confirm("Are you sure you want to delete this task?")) {
            // Remove task with fade out effect
            taskItem.style.opacity = "0";
            setTimeout(() => {
              taskItem.remove();
            }, 300);
            showMessage("Task deleted!", "success");
          }
        } else if (action === "Reopen Task") {
          // Reopen task
          const statusIndicator = taskItem.querySelector(".task-status");
          statusIndicator.className = "task-status in-progress";
          showMessage("Task reopened!", "success");
        }
      });
    });
  }

  // Helper functions
  function closeModal() {
    if (createTaskModal) {
      createTaskModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling
    }
  }

  function validateTaskForm() {
    const taskTitle = document.getElementById("taskTitle");
    const taskDue = document.getElementById("taskDue");

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".form-error").forEach((error) => error.remove());

    // Validate title
    if (!taskTitle.value.trim()) {
      showInputError(taskTitle, "Task title is required");
      isValid = false;
    }

    // Validate due date
    if (!taskDue.value) {
      showInputError(taskDue, "Due date is required");
      isValid = false;
    }

    return isValid;
  }

  function showInputError(input, message) {
    // Create error message
    const error = document.createElement("div");
    error.className = "form-error";
    error.textContent = message;
    error.style.color = "var(--bosch-red)";
    error.style.fontSize = "0.8rem";
    error.style.marginTop = "0.25rem";

    // Add error after input
    input.parentNode.appendChild(error);

    // Highlight input
    input.style.borderColor = "var(--bosch-red)";

    // Remove error on input change
    input.addEventListener(
      "input",
      function () {
        error.remove();
        input.style.borderColor = "";
      },
      { once: true }
    );
  }

  function createTaskElement(title, description, dueDate, priority, assignee) {
    // Format the date
    const dueDateObj = new Date(dueDate);
    const formattedDate = dueDateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Get priority class
    const priorityClass = priority.toLowerCase();

    // Get assignee name
    let assigneeName = "Me";
    if (assignee === "thomas") assigneeName = "Thomas Weber";
    if (assignee === "maria") assigneeName = "Maria Schmidt";
    if (assignee === "andreas") assigneeName = "Andreas Müller";

    // Create task element
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
            <div class="task-status pending"></div>
            <div class="task-content">
                <h3>${title}</h3>
                <p>${description || "No description provided."}</p>
                <div class="task-meta">
                    <span class="task-due"><i class="fas fa-calendar"></i> Due: ${formattedDate}</span>
                    <span class="task-priority ${priorityClass}"><i class="fas fa-flag"></i> ${priority} Priority</span>
                    <span class="task-assignee"><i class="fas fa-user"></i> Assigned to: ${assigneeName}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon" title="Edit Task"><i class="fas fa-edit"></i></button>
                <button class="btn-icon" title="Complete Task"><i class="fas fa-check"></i></button>
                <button class="btn-icon" title="Delete Task"><i class="fas fa-trash"></i></button>
            </div>
        `;

    // Add event listeners to new task action buttons
    const newActionButtons = taskItem.querySelectorAll(
      ".task-actions .btn-icon"
    );
    newActionButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();

        const action = this.getAttribute("title");
        const taskItem = this.closest(".task-item");

        if (action === "Edit Task") {
          // Open edit task modal
          alert("Edit task functionality would be implemented here");
        } else if (action === "Complete Task") {
          // Mark task as complete
          const statusIndicator = taskItem.querySelector(".task-status");
          statusIndicator.className = "task-status completed";
          showMessage("Task marked as complete!", "success");
        } else if (action === "Delete Task") {
          // Confirm delete
          if (confirm("Are you sure you want to delete this task?")) {
            // Remove task with fade out effect
            taskItem.style.opacity = "0";
            setTimeout(() => {
              taskItem.remove();
            }, 300);
            showMessage("Task deleted!", "success");
          }
        }
      });
    });

    // Add task to the task list
    const tasksList = document.querySelector(".tasks-list");
    if (tasksList) {
      tasksList.prepend(taskItem);

      // Add fade-in effect
      taskItem.style.opacity = "0";
      setTimeout(() => {
        taskItem.style.transition = "opacity 0.3s ease";
        taskItem.style.opacity = "1";
      }, 10);
    }
  }

  function showMessage(text, type = "info") {
    // Create message element
    const message = document.createElement("div");
    message.className = `toast-message ${type}`;
    message.textContent = text;

    // Add styles
    Object.assign(message.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "4px",
      color: "white",
      zIndex: "9999",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      opacity: "0",
      transform: "translateY(20px)",
    });

    // Set background color based on type
    if (type === "success") {
      message.style.backgroundColor = "var(--bosch-green)";
    } else if (type === "error") {
      message.style.backgroundColor = "var(--bosch-red)";
    } else {
      message.style.backgroundColor = "var(--bosch-blue)";
    }

    // Add to DOM
    document.body.appendChild(message);

    // Trigger animation
    setTimeout(() => {
      message.style.opacity = "1";
      message.style.transform = "translateY(0)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transform = "translateY(20px)";

      // Remove from DOM after animation
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }
});
