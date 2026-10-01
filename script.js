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
  
