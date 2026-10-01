// Generate a quiet field of stars
const sky = document.getElementById("sky");
if (sky) {
  for (let i = 0; i < 95; i++) {
    const s = document.createElement("span");
    s.className = "sky-star";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 4}s`;
    s.style.opacity = `${0.18 + Math.random() * 0.45}`;
    sky.appendChild(s);
  }
}

// Star interactions
const starNotes = {
  samia: "somewhere in England, thinking of you.",
  omar: "somewhere in Italy, hopefully thinking of me too."
};

document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    const person = star.dataset.person;
    const note = starNotes[person];
    const noteEl = star.querySelector(".star-note");
    if (noteEl) {
      noteEl.textContent = note;
      star.classList.add("visited");
      setTimeout(() => {
        noteEl.textContent = person === "samia" ? "England" : "Italy";
      }, 3800);
    }
  });
});

// Carousel Gallery Logic
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const counter = document.getElementById("carouselCounter");
let currentSlide = 0;

function updateCarousel() {
  if (!slides.length) return;
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });
  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Renewal Subscription Button
const chooseBtn = document.getElementById("chooseBtn");
if (chooseBtn) {
  chooseBtn.addEventListener("click", () => {
    const result = document.getElementById("choiceResult");
    const choice = document.getElementById("choice");
    if (result) result.classList.add("show");
    if (choice) choice.scrollIntoView({ behavior: "smooth", block: "center" });
    burstStars();
  });
}

function burstStars() {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("span");
    p.textContent = Math.random() > .5 ? "✦" : "·";
    p.style.position = "fixed";
    p.style.left = "50%";
    p.style.top = "50%";
    p.style.zIndex = "40";
    p.style.pointerEvents = "none";
    p.style.color = Math.random() > .5 ? "#e8c98c" : "#dba9b6";
    p.style.fontSize = `${8 + Math.random() * 12}px`;
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 220;
    p.animate([
      { transform: "translate(-50%,-50%) scale(.5)", opacity: 0 },
      { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(1)`, opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle)*dist*1.35}px), calc(-50% + ${Math.sin(angle)*dist*1.35}px)) scale(.2)`, opacity: 0 }
    ], { duration: 1200 + Math.random()*500, easing: "cubic-bezier(.2,.7,.2,1)" });
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1900);
  }
}

// Secret star
const secretStar = document.getElementById("secretStar");
if (secretStar) {
  secretStar.addEventListener("click", () => {
    const msg = document.getElementById("secretMessage");
    if (msg) msg.classList.add("show");
  });
}

// Detail hover interactions
const detailMessage = document.getElementById("detailMessage");
if (detailMessage) {
  const detailMessageText = detailMessage.querySelector("span");
  const defaultMessage = "hover over a line.";

  document.querySelectorAll(".detail").forEach(btn => {
    const showDetail = () => {
      if (detailMessageText) {
        detailMessageText.textContent = btn.dataset.detail;
        detailMessageText.style.opacity = "1";
      }
    };

    const resetDetail = () => {
      if (detailMessageText) {
        detailMessageText.textContent = defaultMessage;
        detailMessageText.style.opacity = ".45";
      }
    };

    btn.addEventListener("mouseenter", showDetail);
    btn.addEventListener("focus", showDetail);
    btn.addEventListener("mouseleave", resetDetail);
    btn.addEventListener("blur", resetDetail);
    
    btn.addEventListener("touchstart", showDetail, { passive: true });
  });
}

// Local Clocks Logic
function updateClocks() {
  const ukElement = document.getElementById("ukTime");
  const italyElement = document.getElementById("italyTime");
  const diffElement = document.getElementById("timeDiff");

  if (!ukElement || !italyElement) return;

  const now = new Date();

  const timeFormatter = (timeZone) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timeZone,
      hour12: false
    });

  ukElement.textContent = timeFormatter("Europe/London").format(now);
  italyElement.textContent = timeFormatter("Europe/Rome").format(now);

  const getHour = (tz) =>
    parseInt(
      new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        timeZone: tz,
        hourCycle: "h23"
      }).format(now),
      10
    );

  const hourDiff = getHour("Europe/Rome") - getHour("Europe/London");
  if (diffElement) {
    diffElement.textContent = hourDiff > 0 ? `+${hourDiff}h` : `${hourDiff}h`;
  }
}

updateClocks();
setInterval(updateClocks, 1000);

// Weather Logic
function getWeatherDescription(code) {
  if (code === 0) return "clear sky";
  if (code >= 1 && code <= 3) return "partly cloudy";
  if (code >= 45 && code <= 48) return "foggy";
  if (code >= 51 && code <= 67) return "light rain";
  if (code >= 71 && code <= 77) return "snowing";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 95) return "thunderstorm";
  return "overcast";
}

async function fetchWeather() {
  const ukWeather = document.getElementById("ukWeather");
  const italyWeather = document.getElementById("italyWeather");

  if (!ukWeather || !italyWeather) return;

  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.5074,41.9028&longitude=-0.1278,12.4964&current_weather=true";
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.length === 2) {
      ukWeather.textContent = getWeatherDescription(data[0].current_weather.weathercode);
      italyWeather.textContent = getWeatherDescription(data[1].current_weather.weathercode);
    }
  } catch (err) {
    console.error("Could not load weather data:", err);
  }
}

fetchWeather();
