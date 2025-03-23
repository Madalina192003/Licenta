document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Toggle icon between bars and times
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");

      // Reset icon
      const icon = mobileMenuToggle.querySelector("i");
      if (icon.classList.contains("fa-times")) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Testimonial slider
  const dots = document.querySelectorAll(".testimonial-dots .dot");
  const testimonials = document.querySelectorAll(".testimonial-card");
  let currentTestimonial = 0;

  if (dots.length > 0 && testimonials.length > 0) {
    // Show initial testimonial
    showTestimonial(0);

    // Set up dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showTestimonial(index);
      });
    });

    // Auto rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.style.display = "none";
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show selected testimonial and activate corresponding dot
    testimonials[index].style.display = "block";
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");

          // Reset icon
          const icon = mobileMenuToggle.querySelector("i");
          if (icon.classList.contains("fa-times")) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      }
    });
  });
});
