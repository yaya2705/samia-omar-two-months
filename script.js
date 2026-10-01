// Generate a quiet field of stars.
const sky = document.getElementById("sky");
for (let i = 0; i < 95; i++) {
  const s = document.createElement("span");
  s.className = "sky-star";
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.style.animationDelay = `${Math.random() * 4}s`;
  s.style.opacity = `${0.18 + Math.random() * 0.45}`;
  sky.appendChild(s);
}

// Star interactions: small, personal notes rather than a giant tooltip.
const starNotes = {
  samia: "somewhere in England, thinking of you.",
  omar: "somewhere in Italy, hopefully thinking of me too."
};
document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    const person = star.dataset.person;
    const note = starNotes[person];
    star.querySelector(".star-note").textContent = note;
    star.classList.add("visited");
    setTimeout(() => {
      star.querySelector(".star-note").textContent = person === "samia" ? "England" : "Italy";
    }, 3800);
  });
});

// Scroll reveal.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// The question.
document.getElementById("chooseBtn").addEventListener("click", () => {
  document.getElementById("choiceResult").classList.add("show");
  document.getElementById("choice").scrollIntoView({ behavior: "smooth", block: "center" });
  burstStars();
});

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

// Secret star.
document.getElementById("secretStar").addEventListener("click", () => {
  document.getElementById("secretMessage").classList.add("show");
});

const detailMessage = document.getElementById("detailMessage");
const detailMessageText = detailMessage.querySelector("span");
const defaultMessage = "hover over something.";

document.querySelectorAll(".detail").forEach(btn => {
  const showDetail = (e) => {
    detailMessageText.textContent = btn.dataset.detail;
    detailMessageText.style.opacity = "1";
  };

  btn.addEventListener("mouseenter", showDetail);
  btn.addEventListener("focus", showDetail);
  
  // Mobile tap handling
  btn.addEventListener("touchstart", (e) => {
    showDetail();
  }, { passive: true });
});

  // Reset back to default prompt
  const resetDetail = () => {
    detailMessageText.textContent = defaultMessage;
    detailMessageText.style.opacity = ".45";
  };

  btn.addEventListener("mouseenter", showDetail);
  btn.addEventListener("focus", showDetail);
  
  btn.addEventListener("mouseleave", resetDetail);
  btn.addEventListener("blur", resetDetail);
});

function updateClocks() {
  const ukElement = document.getElementById("ukTime");
  const italyElement = document.getElementById("italyTime");
  const diffElement = document.getElementById("timeDiff");

  if (!ukElement || !italyElement) return;

  const now = new Date();

  // Format hours and minutes for standard 24h clock display
  const timeFormatter = (timeZone) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timeZone,
      hour12: false
    });

  ukElement.textContent = timeFormatter("Europe/London").format(now);
  italyElement.textContent = timeFormatter("Europe/Rome").format(now);

  // Dynamically calculate the hour difference (handles DST adjustments)
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

// Start ticking
updateClocks();
setInterval(updateClocks, 1000);

// Map WMO Weather Codes to quiet, minimal phrases
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
    // London: 51.5074, -0.1278 | Rome: 41.9028, 12.4964
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.5074,41.9028&longitude=-0.1278,12.4964&current_weather=true";
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data) && data.length === 2) {
      const ukData = data[0].current_weather;
      const italyData = data[1].current_weather;

      ukWeather.textContent = `${Math.round(ukData.temperature)}°C · ${getWeatherDescription(ukData.weathercode)}`;
      italyWeather.textContent = `${Math.round(italyData.temperature)}°C · ${getWeatherDescription(italyData.weathercode)}`;
    }
  } catch (err) {
    // Quiet fallback if API fails
    ukWeather.textContent = "";
    italyWeather.textContent = "";
  }
}

// Fetch weather on load, then refresh every 15 minutes
fetchWeather();
setInterval(fetchWeather, 15 * 60 * 1000);
