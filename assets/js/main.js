gsap.registerPlugin(ScrollTrigger);

// ------------------------
// Loader seguro + ola + colores llamativos
// ------------------------
const loaderSpans = document.querySelectorAll(".loader-text span");

// Animación de color llamativa (una sola vez)
gsap.fromTo(
  loaderSpans,
  { color: "#777", y: 0 },
  {
    color: ["#ff3c3c", "#ffae3c", "#3cff8b", "#3cb0ff", "#d43cff", "#ff3cbf"],
    y: -15,
    stagger: 0.05,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
  }
);

// Ola ligera (infinita) para cada letra
loaderSpans.forEach((span, i) => {
  gsap.to(span, {
    y: 10,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    delay: i * 0.05,
    ease: "sine.inOut",
  });
});

// Desaparecer loader tras 2.5s
setTimeout(() => {
  gsap.to("#loader", { opacity: 0, duration: 0.8, pointerEvents: "none" });
}, 2500);

// ------------------------
// Hero animation
// ------------------------
gsap.from("#hero h1", { opacity: 0, y: 50, duration: 1 });
gsap.from("#hero p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });

// ------------------------
// Cursor interactivo en Hero (solo desktop)
// ------------------------
const cursor = document.querySelector(".cursor");

if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const hero = document.getElementById("hero");
  hero.addEventListener("mouseenter", () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
  });
  hero.addEventListener("mouseleave", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  });
} else {
  cursor.style.display = "none";
}

// ------------------------
// About section animations (responsive)
// ------------------------
gsap.from("#about h2", {
  scrollTrigger: "#about",
  opacity: 0,
  x: -100,
  duration: 1,
});
gsap.from("#about p", {
  scrollTrigger: "#about",
  opacity: 0,
  x: 100,
  duration: 1,
  delay: 0.3,
});
gsap.from("#about .flex.space-x-4", {
  scrollTrigger: "#about",
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.6,
});

// ------------------------
// Projects section animations
// ------------------------
gsap.from("#projects h2", {
  scrollTrigger: "#projects",
  opacity: 0,
  y: 50,
  duration: 1,
});
gsap.from(".project-card", {
  scrollTrigger: ".project-card",
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
});

// Project filter click
const filters = document.querySelectorAll(".project-filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    cards.forEach((card) => {
      if (type === "all" || card.dataset.type === type) {
        gsap.to(card, { opacity: 1, display: "block", duration: 0.5 });
      } else {
        gsap.to(card, { opacity: 0, display: "none", duration: 0.5 });
      }
    });
  });
});

// ------------------------
// Contact section animations
// ------------------------
gsap.from("#contact h2", {
  scrollTrigger: "#contact",
  opacity: 0,
  y: 50,
  duration: 1,
});
gsap.from("#contact p", {
  scrollTrigger: "#contact",
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.3,
});
gsap.from("#contact .flex.space-x-4", {
  scrollTrigger: "#contact",
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.6,
});

// ------------------------
// Scroll Marker animation
// ------------------------
gsap.to(".scroll-marker", {
  y: () => window.innerHeight - 100,
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

// Ajuste tamaño en móviles
if (window.innerWidth <= 640) {
  const marker = document.querySelector(".scroll-marker svg");
  marker.style.width = "25px";
  marker.style.height = "25px";
  document.querySelector(".scroll-marker").style.left = "1rem";
  document.querySelector(".scroll-marker").style.bottom = "1rem";
}

// ------------------------
// Theme toggle
// ------------------------
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("bg-black");
  document.body.classList.toggle("text-white");
  document.body.classList.toggle("bg-white");
  document.body.classList.toggle("text-black");
});
