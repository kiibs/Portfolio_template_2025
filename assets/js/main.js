gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
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

  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");
  let cols = 30,
    rows = 20,
    points = [],
    spacingX,
    spacingY,
    mouse = { x: 0, y: 0 };

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    spacingX = canvas.width / (cols - 1);
    spacingY = canvas.height / (rows - 1);
    points = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          x: x * spacingX,
          y: y * spacingY,
          originX: x * spacingX,
          originY: y * spacingY,
          vx: 0,
          vy: 0,
        });
      }
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function getPointColor() {
    return document.body.classList.contains("bg-black") ? "#9c9c9c" : "#888888";
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((p) => {
      const dx = mouse.x - p.x,
        dy = mouse.y - p.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      p.vx += dx * 0.03 * (dist < 150 ? 0.5 : 0);
      p.vy += dy * 0.03 * (dist < 150 ? 0.5 : 0);
      p.vx += (p.originX - p.x) * 0.02;
      p.vy += (p.originY - p.y) * 0.02;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.x += p.vx;
      p.y += p.vy;
    });

    ctx.strokeStyle = getPointColor();
    ctx.lineWidth = 1;
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const i = y * cols + x,
          p = points[i],
          right = points[i + 1],
          bottom = points[i + cols];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(bottom.x, bottom.y);
        ctx.stroke();
      }
    }
  });

  const cursor = document.querySelector(".cursor");
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  } else cursor.style.display = "none";

  const aboutInner = document.querySelector(".about-inner");
  const aboutSection = document.querySelector("#about");

  if (aboutInner && aboutSection) {
    /* "invalidateOnRefresh" is crucial here to recalculate the width if the user 
       resizes the browser, preventing the scroll from breaking or stopping early. */
    gsap.to(aboutInner, {
      x: () => -(aboutInner.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection,
        start: "top top",
        end: () => "+=" + aboutInner.scrollWidth,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }

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

  const modal = document.getElementById("project-modal");
  const cards = document.querySelectorAll(".project-card");
  const closeBtn = document.getElementById("close-modal");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modal.classList.remove("hidden");
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 }
      );
    });
  });

  closeBtn.addEventListener("click", () => {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => modal.classList.add("hidden"),
    });
  });

  const filterBtns = document.querySelectorAll(".project-filters button");
  const projectCards = document.querySelectorAll(".project-card");
  let currentFilter = null;

  function filterProjects(type) {
    if (currentFilter === type) {
      projectCards.forEach((card) => (card.style.display = "block"));
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      currentFilter = null;
      return;
    }

    projectCards.forEach((card) => {
      card.style.display = card.dataset.type === type ? "block" : "none";
    });

    filterBtns.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(
      `.project-filters button[data-type="${type}"]`
    );
    if (activeBtn) activeBtn.classList.add("active");

    currentFilter = type;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => filterProjects(btn.dataset.type));
  });

  projectCards.forEach((card) => (card.style.display = "block"));
});
