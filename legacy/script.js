const root = document.documentElement;
const body = document.body;
const intro = document.querySelector(".intro");
const experience = document.querySelector("#experience");
const routeTrail = document.querySelector(".route-trail");
const panels = [...document.querySelectorAll(".project-panel")];
const backgrounds = [...document.querySelectorAll(".project-bg")];
const dots = [...document.querySelectorAll(".dot")];
const previousButton = document.querySelector(".project-arrow.prev");
const nextButton = document.querySelector(".project-arrow.next");

body.classList.add("intro-lock");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    intro.classList.add("done");
    body.classList.remove("intro-lock");
  }, 3600);
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function updateScrollMotion() {
  const rect = experience.getBoundingClientRect();
  const progress = clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight), 0, 1);
  const coinOpacity = progress > 0.06 && progress < 0.78 ? Math.min(1, progress * 4) : Math.max(0, 1 - (progress - 0.78) * 7);
  const driftX = Math.sin(progress * Math.PI * 1.35) * 40;
  const driftY = -260 * progress;
  const rotate = progress > 0.48 ? (progress - 0.48) * 980 : 0;

  root.style.setProperty("--coin-opacity", coinOpacity.toFixed(3));
  root.style.setProperty("--coin-x", `${driftX.toFixed(1)}px`);
  root.style.setProperty("--coin-y", `${driftY.toFixed(1)}px`);
  root.style.setProperty("--coin-rotate", `${rotate.toFixed(1)}deg`);

  if (routeTrail) {
    const pathLength = routeTrail.getTotalLength();
    const pathProgress = clamp((progress - 0.34) / 0.56, 0, 1);
    root.style.setProperty("--trail-offset", `${(pathLength * (1 - pathProgress)).toFixed(1)}`);
  }
}

let activeProject = 0;

function setProject(index) {
  activeProject = (index + panels.length) % panels.length;
  panels.forEach((panel, panelIndex) => panel.classList.toggle("active", panelIndex === activeProject));
  backgrounds.forEach((background, backgroundIndex) => background.classList.toggle("active", backgroundIndex === activeProject));
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === activeProject));
}

previousButton.addEventListener("click", () => setProject(activeProject - 1));
nextButton.addEventListener("click", () => setProject(activeProject + 1));

window.addEventListener("keydown", (event) => {
  const projectsRect = document.querySelector("#projects").getBoundingClientRect();
  const projectsVisible = projectsRect.top < window.innerHeight * 0.55 && projectsRect.bottom > window.innerHeight * 0.45;
  if (!projectsVisible) return;

  if (event.key === "ArrowLeft") setProject(activeProject - 1);
  if (event.key === "ArrowRight") setProject(activeProject + 1);
});

let dragStart = null;
const projectTrack = document.querySelector(".project-track");

projectTrack.addEventListener("pointerdown", (event) => {
  dragStart = event.clientX;
  projectTrack.setPointerCapture(event.pointerId);
});

projectTrack.addEventListener("pointerup", (event) => {
  if (dragStart === null) return;
  const distance = event.clientX - dragStart;
  if (Math.abs(distance) > 50) {
    setProject(activeProject + (distance < 0 ? 1 : -1));
  }
  dragStart = null;
});

window.addEventListener("scroll", updateScrollMotion, { passive: true });
window.addEventListener("resize", updateScrollMotion);
updateScrollMotion();
