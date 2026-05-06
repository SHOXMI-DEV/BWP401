document.addEventListener("DOMContentLoaded", () => {
  initializeEventFilters();
  initializeContactFormValidation();
  initializeScrollTopButton();
});

function initializeEventFilters() {
  const categoryEl = document.getElementById("filterCategory");
  const locationEl = document.getElementById("filterLocation");
  const dateEl = document.getElementById("filterDate");
  const cards = document.querySelectorAll(".event-card");
  const emptyState = document.getElementById("emptyState");

  if (!categoryEl || !locationEl || !dateEl || cards.length === 0) {
    return;
  }

  // Restores the selected category for better user continuity.
  const savedCategory = localStorage.getItem("preferredCategory");
  if (savedCategory) {
    categoryEl.value = savedCategory;
  }

  const applyFilters = () => {
    const selectedCategory = categoryEl.value;
    const selectedLocation = locationEl.value;
    const selectedDate = dateEl.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category;
      const location = card.dataset.location;
      const date = card.dataset.date;

      const categoryMatch = selectedCategory === "all" || selectedCategory === category;
      const locationMatch = selectedLocation === "all" || selectedLocation === location;
      const dateMatch = !selectedDate || selectedDate === date;

      if (categoryMatch && locationMatch && dateMatch) {
        card.classList.remove("d-none");
        visibleCount += 1;
      } else {
        card.classList.add("d-none");
      }
    });

    if (visibleCount === 0) {
      emptyState.classList.remove("d-none");
    } else {
      emptyState.classList.add("d-none");
    }

    localStorage.setItem("preferredCategory", selectedCategory);
  };

  categoryEl.addEventListener("change", applyFilters);
  locationEl.addEventListener("change", applyFilters);
  dateEl.addEventListener("change", applyFilters);
  applyFilters();
}

function initializeContactFormValidation() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");
  if (!form || !alertBox) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = name.length > 1 && emailPattern.test(email) && message.length >= 10;

    if (isValid) {
      showAlert(alertBox, "success", "تم إرسال رسالتك بنجاح. شكرا لتواصلك معنا.");
      form.reset();
    } else {
      showAlert(alertBox, "danger", "يرجى إدخال بيانات صحيحة. الرسالة يجب ألا تقل عن 10 أحرف.");
    }
  });
}

function showAlert(element, type, message) {
  element.className = `alert alert-${type}`;
  element.textContent = message;
  element.classList.remove("d-none");
}

function initializeScrollTopButton() {
  const button = document.getElementById("scrollTopBtn");
  if (!button) {
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
