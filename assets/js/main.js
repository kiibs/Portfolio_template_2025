gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  /* =========================
     TEMAS – persistente y loader
  ========================= */
  const loader = document.getElementById("loader");
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  let savedTheme = localStorage.getItem("theme") || "dark";

  if (savedTheme === "dark") {
    document.body.classList.add("bg-black", "text-white");
    themeIcon.src = "assets/icons/sol.svg";
    loader.style.backgroundColor = "#000";
  } else {
    document.body.classList.add("bg-white", "text-black");
    themeIcon.src = "assets/icons/luna.svg";
    loader.style.backgroundColor = "#fff";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("bg-black");

    if (isDark) {
      document.body.classList.remove("bg-black", "text-white");
      document.body.classList.add("bg-white", "text-black");
      themeIcon.src = "assets/icons/luna.svg";
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("bg-white", "text-black");
      document.body.classList.add("bg-black", "text-white");
      themeIcon.src = "assets/icons/sol.svg";
      localStorage.setItem("theme", "dark");
    }

    gsap.fromTo(
      themeIcon,
      { rotation: -90, opacity: 0 },
      { rotation: 0, opacity: 1, duration: 0.4 }
    );
  });

  /* =========================
     LOADER – letras fluidas + ola
  ========================= */
  const loaderSpans = document.querySelectorAll(".loader-text span");
  const loaderColors = [
    "#ff3c3c",
    "#ffae3c",
    "#3cff8b",
    "#3cb0ff",
    "#d43cff",
    "#ff3cbf",
  ];

  loaderSpans.forEach((span, i) => {
    gsap.to(span, {
      y: 10,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.05,
    });

    gsap.to(
      {},
      {
        repeat: -1,
        duration: loaderColors.length * 3,
        onUpdate: function () {
          const t = Date.now() / 600 + i * 0.3;
          const index = Math.floor(t) % loaderColors.length;
          const nextIndex = (index + 1) % loaderColors.length;
          const progress = t % 1;

          function lerpColor(a, b, t) {
            const ah = parseInt(a.replace("#", ""), 16),
              ar = (ah >> 16) & 0xff,
              ag = (ah >> 8) & 0xff,
              ab = ah & 0xff;
            const bh = parseInt(b.replace("#", ""), 16),
              br = (bh >> 16) & 0xff,
              bg = (bh >> 8) & 0xff,
              bb = bh & 0xff;
            const rr = Math.round(ar + (br - ar) * progress),
              rg = Math.round(ag + (bg - ag) * progress),
              rb = Math.round(ab + (bb - ab) * progress);
            span.style.color = `rgb(${rr},${rg},${rb})`;
          }

          lerpColor(loaderColors[index], loaderColors[nextIndex], progress);
        },
      }
    );
  });

  setTimeout(() => {
    gsap.to("#loader", { opacity: 0, duration: 0.4, pointerEvents: "none" });
  }, 1500);

  /* =========================
     HERO TEXT
  ========================= */
  const heroTitle = document.querySelector("#hero h1");
  const heroSubtitle = document.querySelector("#hero p");

  gsap.from(heroTitle, { opacity: 0, y: 60, duration: 1.5 });
  gsap.from(heroSubtitle, { opacity: 0, y: 40, duration: 1.2, delay: 0.6 });

  [heroTitle, heroSubtitle].forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { y: -10, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { y: 0, duration: 0.3 });
    });
  });

  /* =========================
     CURSOR
  ========================= */
  const cursor = document.querySelector(".cursor");
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  } else cursor.style.display = "none";

  /* =========================
     ABOUT – SCROLL HORIZONTAL
  ========================= */
  const aboutInner = document.querySelector(".about-inner");
  const aboutSection = document.querySelector("#about");

  if (aboutInner && aboutSection) {
    const scrollWidth = aboutInner.scrollWidth - aboutSection.offsetWidth;

    gsap.to(aboutInner, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection,
        start: "top top",
        end: () => "+=" + scrollWidth,
        scrub: true,
        pin: true,
      },
    });
  }

  /* =========================
     SCROLL MARKER
  ========================= */
  gsap.to(".scroll-marker", {
    y: () => window.innerHeight - 120,
    rotation: 360,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
});
