/* =========================================
   BACKGROUND STARS
========================================= */

const sky = document.getElementById("sky");

if (sky) {
  for (let i = 0; i < 110; i++) {
    const star = document.createElement("span");

    star.className = "sky-star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    const size = Math.random() > 0.88 ? 3 : 2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${3 + Math.random() * 3}s`;
    star.style.opacity = `${0.2 + Math.random() * 0.5}`;

    sky.appendChild(star);
  }
}


/* =========================================
   HERO STARS
========================================= */

const starNotes = {
  samia: "somewhere in the UK, thinking of you.",
  omar: "somewhere in Italy, hopefully thinking of me too."
};

document.querySelectorAll(".star").forEach(star => {

  star.addEventListener("click", () => {

    const person = star.dataset.person;
    const note = starNotes[person];

    const noteElement = star.querySelector(".star-note");

    if (!noteElement) return;

    noteElement.textContent = note;

    star.classList.add("visited");

    setTimeout(() => {
      noteElement.textContent =
        person === "samia"
          ? "England"
          : "Italy";
    }, 3800);

  });

});


/* =========================================
   PHOTO CAROUSEL
========================================= */

const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const counter = document.getElementById("carouselCounter");

let currentSlide = 0;

function updateCarousel() {

  if (!slides.length) return;

  slides.forEach((slide, index) => {
    slide.classList.toggle(
      "active",
      index === currentSlide
    );
  });

  if (counter) {
    counter.textContent =
      `${currentSlide + 1} / ${slides.length}`;
  }
}

if (prevBtn) {

  prevBtn.addEventListener("click", () => {

    currentSlide =
      (currentSlide - 1 + slides.length) %
      slides.length;

    updateCarousel();

  });

}

if (nextBtn) {

  nextBtn.addEventListener("click", () => {

    currentSlide =
      (currentSlide + 1) %
      slides.length;

    updateCarousel();

  });

}

updateCarousel();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================
   SECTION 03 — DETAIL HOVER
========================================= */

const detailMessage =
  document.getElementById("detailMessage");

if (detailMessage) {

  const detailMessageText =
    detailMessage.querySelector("span");

  const defaultMessage =
    "hover over a line.";

  document.querySelectorAll(".detail").forEach(button => {

    const showDetail = () => {

      if (!detailMessageText) return;

      detailMessageText.textContent =
        button.dataset.detail || defaultMessage;

      detailMessageText.style.opacity = "1";

    };


    const resetDetail = () => {

      if (!detailMessageText) return;

      detailMessageText.textContent =
        defaultMessage;

      detailMessageText.style.opacity = ".45";

    };


    button.addEventListener(
      "mouseenter",
      showDetail
    );

    button.addEventListener(
      "mouseleave",
      resetDetail
    );

    button.addEventListener(
      "focus",
      showDetail
    );

    button.addEventListener(
      "blur",
      resetDetail
    );

    /*
      Useful on phones where there is
      no traditional hover.
    */
    button.addEventListener(
      "touchstart",
      showDetail,
      { passive: true }
    );

  });

}


/* =========================================
   SECTION 06 — RENEWAL BUTTON
========================================= */

const chooseBtn =
  document.getElementById("chooseBtn");

if (chooseBtn) {

  chooseBtn.addEventListener("click", () => {

    const result =
      document.getElementById("choiceResult");

    const choice =
      document.getElementById("choice");

    if (result) {
      result.classList.add("show");
    }

    if (choice) {

      choice.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

    burstStars();

  });

}


/* =========================================
   LITTLE STAR EXPLOSION
========================================= */

function burstStars() {

  for (let i = 0; i < 22; i++) {

    const particle =
      document.createElement("span");

    particle.textContent =
      Math.random() > .5
        ? "✦"
        : "·";

    particle.style.position = "fixed";
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.zIndex = "40";
    particle.style.pointerEvents = "none";

    particle.style.color =
      Math.random() > .5
        ? "#e8c98c"
        : "#dba9b6";

    particle.style.fontSize =
      `${8 + Math.random() * 12}px`;

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      90 + Math.random() * 220;

    particle.animate(

      [
        {
          transform:
            "translate(-50%,-50%) scale(.5)",
          opacity: 0
        },

        {
          transform:
            `translate(
              calc(-50% + ${Math.cos(angle) * distance}px),
              calc(-50% + ${Math.sin(angle) * distance}px)
            ) scale(1)`,
          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${Math.cos(angle) * distance * 1.35}px),
              calc(-50% + ${Math.sin(angle) * distance * 1.35}px)
            ) scale(.2)`,
          opacity: 0
        }
      ],

      {
        duration: 1200 + Math.random() * 500,
        easing: "cubic-bezier(.2,.7,.2,1)"
      }

    );

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1900);

  }

}


/* =========================================
   SECRET STAR
========================================= */

const secretStar =
  document.getElementById("secretStar");

if (secretStar) {

  secretStar.addEventListener("click", () => {

    const message =
      document.getElementById("secretMessage");

    if (message) {
      message.classList.add("show");
    }

  });

}


/* =========================================
   LOCAL CLOCKS
========================================= */

function updateClocks() {

  const ukElement =
    document.getElementById("ukTime");

  const italyElement =
    document.getElementById("italyTime");

  const diffElement =
    document.getElementById("timeDiff");

  if (!ukElement || !italyElement) {
    return;
  }

  const now = new Date();


  const formatTime = (timeZone) => {

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
        hour12: false
      }
    ).format(now);

  };


  ukElement.textContent =
    formatTime("Europe/London");

  italyElement.textContent =
    formatTime("Europe/Rome");


  const getHour = (timeZone) => {

    return parseInt(
      new Intl.DateTimeFormat(
        "en-GB",
        {
          hour: "numeric",
          timeZone: timeZone,
          hourCycle: "h23"
        }
      ).format(now),
      10
    );

  };


  /*
    Use the actual time-zone offsets rather
    than assuming the difference is always +1.
  */

  const getOffset = (timeZone) => {

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone,
          timeZoneName: "shortOffset"
        }
      ).formatToParts(now);

    const offset =
      parts.find(
        part => part.type === "timeZoneName"
      )?.value || "GMT";

    const match =
      offset.match(/GMT([+-]\d+(?::\d+)?)?/);

    if (!match || !match[1]) {
      return 0;
    }

    const value = match[1];

    if (!value.includes(":")) {
      return parseInt(value, 10);
    }

    const [hours, minutes] =
      value.replace("+", "").split(":");

    return (
      parseInt(hours, 10) +
      parseInt(minutes, 10) / 60
    );

  };


  if (diffElement) {

    const ukOffset =
      getOffset("Europe/London");

    const italyOffset =
      getOffset("Europe/Rome");

    const difference =
      italyOffset - ukOffset;

    diffElement.textContent =
      difference > 0
        ? `+${difference}h`
        : `${difference}h`;

  }

}


updateClocks();

setInterval(
  updateClocks,
  1000
);


/* =========================================
   WEATHER
========================================= */

function getWeatherDescription(code) {

  if (code === 0) {
    return "clear sky";
  }

  if (code >= 1 && code <= 3) {
    return "partly cloudy";
  }

  if (code >= 45 && code <= 48) {
    return "foggy";
  }

  if (code >= 51 && code <= 67) {
    return "light rain";
  }

  if (code >= 71 && code <= 77) {
    return "snowing";
  }

  if (code >= 80 && code <= 82) {
    return "showers";
  }

  if (code >= 95) {
    return "thunderstorm";
  }

  return "overcast";
}


async function fetchWeather() {

  const ukWeather =
    document.getElementById("ukWeather");

  const italyWeather =
    document.getElementById("italyWeather");

  if (!ukWeather || !italyWeather) {
    return;
  }


  try {

    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=51.5074,41.9028" +
      "&longitude=-0.1278,12.4964" +
      "&current_weather=true";


    const response =
      await fetch(url);


    if (!response.ok) {
      throw new Error(
        `Weather request failed: ${response.status}`
      );
    }


    const data =
      await response.json();


    if (
      Array.isArray(data) &&
      data.length >= 2
    ) {

      ukWeather.textContent =
        getWeatherDescription(
          data[0].current_weather.weathercode
        );

      italyWeather.textContent =
        getWeatherDescription(
          data[1].current_weather.weathercode
        );

    }

  } catch (error) {

    console.error(
      "Could not load weather data:",
      error
    );

  }

}


fetchWeather();

<p class="carousel-caption"></p>
