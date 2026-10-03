const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");
const navAs = navLinks.querySelectorAll("a");

function spyOnScroll() {
  const y = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    const bottom = top + sec.offsetHeight;
    if (y >= top && y < bottom) {
      navAs.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + sec.id);
      });
    }
  });
}

window.addEventListener("scroll", spyOnScroll);
spyOnScroll();

const revealEls = document.querySelectorAll(".now-box, .edu-item, .skill-row, .project-row, .contact-side");

revealEls.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

const form = document.getElementById("contactForm");
const formError = document.getElementById("formError");
const formOk = document.getElementById("formOk");

form.addEventListener("submit", e => {
  e.preventDefault();
  formError.textContent = "";
  formOk.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formError.textContent = "Fill all three fields first.";
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    formError.textContent = "That email doesn't look right.";
    return;
  }

  formOk.textContent = "Sent! I'll get back to you soon, " + name + ".";
  form.reset();
});

const clockEl = document.getElementById("clock");

function tickClock() {
  const t = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit"
  });
  clockEl.textContent = t + " IST";
}

tickClock();
setInterval(tickClock, 30000);
