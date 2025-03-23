document.addEventListener("DOMContentLoaded", function () {
  // Calendar elements
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthElement = document.getElementById("currentMonth");
  const calendarGrid = document.querySelector(".calendar-grid");
  const viewButtons = document.querySelectorAll(".view-controls button");

  // Add event modal elements
  const addEventBtn = document.getElementById("addEventBtn");
  const addEventModal = document.getElementById("addEventModal");
  const closeEventModalBtn = addEventModal?.querySelector(".close-btn");
  const cancelEventBtn = document.getElementById("cancelEventBtn");
  const saveEventBtn = document.getElementById("saveEventBtn");
  const eventForm = document.getElementById("addEventForm");

  // Current date
  let currentDate = new Date();
  let selectedDate = null;

  // Initialize calendar
  updateCalendar(currentDate);

  // Month navigation
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar(currentDate);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar(currentDate);
    });
  }

  // View switching
  if (viewButtons.length > 0) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        viewButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get view type
        const viewType = this.getAttribute("data-view");

        // Update calendar view based on type
        // This would typically switch between different views
        alert(`Switching to ${viewType} view`);
      });
    });
  }

  // Day click handlers
  if (calendarGrid) {
    calendarGrid.addEventListener("click", function (e) {
      const day = e.target.closest(".day");
      if (day) {
        // If the user clicks on an event, don't select the day
        if (e.target.classList.contains("event")) {
          // Handle event click
          alert(`Event clicked: ${e.target.textContent}`);
          return;
        }

        // Remove active class from all days
        document.querySelectorAll(".day").forEach((d) => {
          d.classList.remove("active-day");
        });

        // Add active class to clicked day
        day.classList.add("active-day");

        // Store selected date
        const dayNumber = day.querySelector("span").textContent;
        const isCurrentMonth = !day.classList.contains("other-month");

        if (isCurrentMonth) {
          selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            dayNumber
          );

          // Optional: Show day detail or quick add event
          if (confirm("Do you want to add an event for this day?")) {
            openAddEventModal();
          }
        }
      }
    });
  }

  // Add event functionality
  if (addEventBtn && addEventModal) {
    // Open modal
    addEventBtn.addEventListener("click", function () {
      openAddEventModal();
    });

    // Close modal
    [closeEventModalBtn, cancelEventBtn].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", closeEventModal);
      }
    });

    // Close modal when clicking outside
    addEventModal.addEventListener("click", function (e) {
      if (e.target === addEventModal) {
        closeEventModal();
      }
    });

    // Save event
    if (saveEventBtn && eventForm) {
      saveEventBtn.addEventListener("click", function () {
        // Validate form
        if (!validateEventForm()) {
          return;
        }

        // Show loading state
        saveEventBtn.disabled = true;
        saveEventBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Simulate API call to save event
        setTimeout(function () {
          // Get form data
          const eventTitle = document.getElementById("eventTitle").value;
          const eventDate = document.getElementById("eventDate").value;
          const eventType = document.getElementById("eventType").value;

          // Create new event
          addEventToCalendar(eventTitle, eventDate, eventType);

          // Reset form
          eventForm.reset();

          // Close modal
          closeEventModal();

          // Show success message
          showMessage("Event added successfully!", "success");
        }, 1000);
      });
    }
  }

  // Helper functions
  function updateCalendar(date) {
    if (!currentMonthElement || !calendarGrid) return;

    // Update month display
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    currentMonthElement.textContent = monthYear;

    // Clear grid
    calendarGrid.innerHTML = "";

    // Calculate first day of month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Calculate days from previous month
    const daysFromPrevMonth = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate last day of previous month
    const prevMonthLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const dayElement = createDayElement(prevMonthLastDay - i, true);
      calendarGrid.appendChild(dayElement);
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = isCurrentDay(date.getFullYear(), date.getMonth(), i);
      const dayElement = createDayElement(i, false, isToday);

      // Add sample events to specific days for demo
      if (i === 23) {
        const event = document.createElement("div");
        event.className = "event client-meeting";
        event.textContent = "Client Meeting: Stuttgart Plant";
        dayElement.appendChild(event);
        dayElement.classList.add("has-events");
      } else if (i === 25) {
        const event = document.createElement("div");
        event.className = "event deadline";
        event.textContent = "Contract Deadline: Berlin Plant";
        dayElement.appendChild(event);
        dayElement.classList.add("has-events");
      } else if (i === 27) {
        const event = document.createElement("div");
        event.className = "event team-meeting";
        event.textContent = "Team Meeting: Quarterly Review";
        dayElement.appendChild(event);
        dayElement.classList.add("has-events");
      }

      calendarGrid.appendChild(dayElement);
    }

    // Calculate days needed from next month to complete grid
    const totalCells = 42; // 6 rows of 7 days
    const daysFromNextMonth =
      totalCells - (daysFromPrevMonth + lastDay.getDate());

    // Add days from next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const dayElement = createDayElement(i, true);
      calendarGrid.appendChild(dayElement);
    }
  }

  function createDayElement(dayNumber, isOtherMonth, isToday = false) {
    const day = document.createElement("div");
    day.className = isOtherMonth ? "day other-month" : "day";

    if (isToday) {
      day.classList.add("active-day");
    }

    const daySpan = document.createElement("span");
    daySpan.textContent = dayNumber;
    day.appendChild(daySpan);

    return day;
  }

  function isCurrentDay(year, month, day) {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  }

  function openAddEventModal() {
    if (!addEventModal) return;

    // If a day is selected, set the date in the form
    if (selectedDate) {
      const eventDateInput = document.getElementById("eventDate");
      if (eventDateInput) {
        eventDateInput.valueAsDate = selectedDate;
      }
    }

    addEventModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeEventModal() {
    if (addEventModal) {
      addEventModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling

      // Reset form
      if (eventForm) {
        eventForm.reset();
      }
    }
  }

  function validateEventForm() {
    const eventTitle = document.getElementById("eventTitle");
    const eventDate = document.getElementById("eventDate");

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".form-error").forEach((error) => error.remove());

    // Validate title
    if (!eventTitle.value.trim()) {
      showInputError(eventTitle, "Event title is required");
      isValid = false;
    }

    // Validate date
    if (!eventDate.value) {
      showInputError(eventDate, "Date is required");
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

  function addEventToCalendar(title, dateString, eventType) {
    // Parse the date
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Check if the date is in the current month view
    if (
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      // Find the day element
      const dayElements = document.querySelectorAll(".day:not(.other-month)");
      const dayElement = Array.from(dayElements).find((el) => {
        return parseInt(el.querySelector("span").textContent) === day;
      });

      if (dayElement) {
        // Create event element
        const event = document.createElement("div");
        event.className = `event ${eventType}`;
        event.textContent = title;

        // Add event to day
        dayElement.appendChild(event);
        dayElement.classList.add("has-events");
      }
    } else {
      // If the date is not in the current view, show a message
      showMessage(
        `Event added for ${date.toLocaleDateString()}. Switch to that month to view it.`,
        "info"
      );
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
