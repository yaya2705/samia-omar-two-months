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

// The little "things I notice" interactions.
const detailCopy = {
  "your eyes": "The kind I can look at for a little too long.",
  "the way you speak": "I could probably recognise your voice anywhere.",
  "your fingers": "HEHEHHHEEEHE.",
  "your laugh": "And the face you make.",
  "your lips": "I'll leave this one between us.",
  "the way you think": "You see things in ways I don't always expect.",
  "the way you treat me": "This one matters more than the rest.",
  "how loving you are": "Even from far away, I feel it.",
  "how funny you are": "Unfortunately, you are very good at this."
};
document.querySelectorAll(".detail").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.firstChild.textContent.trim();
    document.getElementById("detailMessage").textContent = detailCopy[key] || "";
  });
});

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
