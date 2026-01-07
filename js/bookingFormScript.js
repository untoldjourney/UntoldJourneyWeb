// Elements
const tripSelect = document.querySelector('select[name="tripName"]');
const openDateSelect = document.getElementById("openDateSelect");
const privateDateGroup = document.getElementById("private-date-group");
const openDateGroup = document.getElementById("open-date-group");
const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
const bookingForm = document.getElementById("bookingForm");

// Available Dates
const openTripDates = {
  "Pronojiwo – Paradise Falls": ["14–16 June 2026", "28–30 June 2026"],
  "Banyuwangi – Eastern Edge of Java": ["15–17 June 2026", "6–8 July 2026"],
  "Lumajang – Foot of Semeru": ["21–23 June 2026"],
};

function updateOpenTripDates() {
  const selectedTrip = tripSelect.value;
  const dates = openTripDates[selectedTrip] || [];

  openDateSelect.innerHTML = '<option value="">Select a date</option>';

  dates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    openDateSelect.appendChild(option);
  });
}

// When trip changes
openDateSelect.disabled = true;

tripSelect.addEventListener("change", () => {
  openDateSelect.disabled = !tripSelect.value;
  updateOpenTripDates();
});

// When switching trip type
tripTypeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "open") {
      privateDateGroup.classList.add("hidden");
      openDateGroup.classList.remove("hidden");
      updateOpenTripDates();
    } else {
      openDateGroup.classList.add("hidden");
      privateDateGroup.classList.remove("hidden");
    }
  });
});

// Trip Select

function updateOpenTripDates() {
  const selectedTrip = tripSelect.value;
  const dates = openTripDates[selectedTrip] || [];

  // Reset dropdown
  openDateSelect.innerHTML = '<option value="">Select a date</option>';

  dates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    openDateSelect.appendChild(option);
  });
}

// URL trip Autofill
const params = new URLSearchParams(window.location.search);
const tripParam = params.get("trip");

if (tripParam) {
  const tripSelect = document.querySelector('select[name="tripName"]');

  Array.from(tripSelect.options).forEach((option) => {
    if (option.value.includes(tripParam)) {
      option.selected = true;
    }
  });
}

// Booking Form

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tripType =
      document.querySelector('input[name="tripType"]:checked')?.value || "";

    const privateDateInput = document.querySelector(
      'input[name="privateDate"]'
    );

    const tripDate =
      tripType === "open" ? openDateSelect.value : privateDateInput.value;

    if (tripType === "open" && !openDateSelect.value) {
      alert("Please select an available open trip date.");
      return;
    }

    const formData = {
      name: bookingForm.name.value,
      email: bookingForm.email.value,
      phone: bookingForm.phone.value,
      tripType,
      tripName: tripSelect.value,
      tripDate,
      referral: bookingForm.referral.value,
      notes: bookingForm.notes.value,
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbyiSCwqsgB-N8zv63F1ycU7IxMBPtNxtPodygeMHfGRy9rle1zIbj6XO_m7eKXrX2GS/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.text())
      .then(() => {
        alert("Thank you! We’ll contact you shortly.");
        bookingForm.reset();
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  });
}
