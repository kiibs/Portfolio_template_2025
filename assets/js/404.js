gsap.registerPlugin(MorphSVGPlugin);

// --- CONFIG ---------------------------------------------------------

const icons = [
  "assets/icons/svg1.svg",
  "assets/icons/svg2.svg",
  "assets/icons/svg3.svg",
];

const finalIcon = "assets/icons/final.svg";

// -------------------------------------------------------------------

// Cargar un SVG externo y devolver su <path>
async function loadSVG(url) {
  const response = await fetch(url);
  const text = await response.text();

  // Crear un DOM temporal
  const temp = document.createElement("div");
  temp.innerHTML = text;

  // Buscar el primer path dentro del SVG
  const path = temp.querySelector("path");

  if (!path) {
    console.error("El SVG no tiene un <path>: ", url);
    return null;
  }

  return path.getAttribute("d"); // devolvemos el atributo d
}

// Inicializar animación
(async function init() {
  const svgRow = document.getElementById("svg-row");

  const shapesD = [];
  for (let file of icons) {
    shapesD.push(await loadSVG(file));
  }

  const finalPathD = await loadSVG(finalIcon);

  // Crear 3 <svg> inline en la página
  const svgs = shapesD.map((d, i) => {
    const box = document.createElement("div");
    box.classList.add("morph-box");

    box.innerHTML = `
      <svg viewBox="0 0 100 100">
        <path d="${d}" />
      </svg>
    `;

    svgRow.appendChild(box);
    return box.querySelector("path");
  });

  // Animar secuencia
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });

  // svg1 → svg2
  tl.to(svgs[0], { morphSVG: shapesD[1] }, "+=0.2");

  // svg2 → svg3
  tl.to(svgs[1], { morphSVG: shapesD[2] }, "-=0.8");

  // svg3 → final
  tl.to(svgs[2], { morphSVG: finalPathD }, "-=0.8");

  // Todos a forma final
  tl.to(svgs[0], { morphSVG: finalPathD });
  tl.to(svgs[1], { morphSVG: finalPathD }, "-=1");
  tl.to(svgs[2], { morphSVG: finalPathD }, "-=1");

  // Mostrar texto 404
  tl.to("#error-text", { opacity: 1, scale: 1, duration: 1 });
})();
