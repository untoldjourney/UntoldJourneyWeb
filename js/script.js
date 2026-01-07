// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link"); //a link means anchor element that has link in it
// console.log(allLinks);

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // e stands for event
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href);
    // console.log(e);

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

const testimonialswiper = new Swiper(".testimonial-swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 800,
});

// Invitation Form
const form = document.getElementById("invitationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbwdPm7WS3C3LrRqSBekxHAsdCOWDIHfOnG6cl7TPQhgx1H0hrWQpKnwyIuGV0RbwTDIeA/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then(() => {
      form.innerHTML = `
        <p style="font-size:1.6rem; line-height:1.6;">
          Thank you.<br>
          If you’re among the twelve selected explorers,<br>
          you’ll hear from us soon.
        </p>
      `;
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
});
