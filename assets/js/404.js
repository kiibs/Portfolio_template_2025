const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "dark") {
  document.body.classList.add("bg-black", "text-white");
} else {
  document.body.classList.add("bg-white", "text-black");
}

gsap.from(".error-card", {
  opacity: 0,
  y: 30,
  duration: 1.5,
  ease: "expo.out",
});

const animateBlob = (selector, xRange, yRange, duration) => {
  gsap.to(selector, {
    x: `random(-${xRange}, ${xRange})`,
    y: `random(-${yRange}, ${yRange})`,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    /* repeatRefresh prevents the animation from looping perfectly, ensuring a chaotic, organic movement */
    repeatRefresh: true,
  });
};

animateBlob(".blob-1", 100, 150, 8);
animateBlob(".blob-2", 150, 100, 10);
animateBlob(".blob-3", 200, 150, 12);
animateBlob(".blob-4", 120, 180, 9);

gsap.to(".error-card", {
  y: "-=10",
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
