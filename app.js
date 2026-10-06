/* =========================================================
   VMB — OWNER EXPERIENCE
   ATELIER NORTH
   PREMIUM VMB BRAND TRANSITION
   ========================================================= */

(() => {
  "use strict";

  const scenes = Array.from(
    document.querySelectorAll(".scene")
  );

  const progressBar =
    document.getElementById("bar");

  let currentScene = 0;
  let isTransitioning = false;

  const TRANSITION_TIME = 1050;
  const SCENE_SWAP_TIME = 430;


  /* =======================================================
     CREATE MINIMAL VMB TRANSITION
     ======================================================= */

  const transition =
    document.createElement("div");

  transition.className =
    "vmb-transition";

  transition.innerHTML = `
    <div class="vmb-transition-sweep"></div>
    <div class="vmb-transition-light"></div>
    <div class="vmb-transition-logo">VMB</div>
  `;

  document.body.appendChild(transition);


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const logo =
    transition.querySelector(
      ".vmb-transition-logo"
    );


  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateProgress(index) {

    if (!progressBar || !scenes.length) {
      return;
    }

    const progress =
      ((index + 1) / scenes.length) * 100;

    progressBar.style.width =
      `${progress}%`;
  }


  /* =======================================================
     CHANGE SCENE
     ======================================================= */

  function activateScene(index) {

    scenes.forEach((scene, i) => {

      scene.classList.toggle(
        "active",
        i === index
      );

    });

    currentScene = index;

    updateProgress(index);
  }


  /* =======================================================
     CINEMATIC VMB TRANSITION
     ======================================================= */

  function transitionTo(nextIndex) {

    if (isTransitioning) {
      return;
    }

    if (
      nextIndex < 0 ||
      nextIndex >= scenes.length ||
      nextIndex === currentScene
    ) {
      return;
    }

    isTransitioning = true;


    /* -----------------------------------------------
       HARD RESET
       ----------------------------------------------- */

    transition.classList.remove("active");

    /*
     * Forces browser to restart animation.
     */
    void transition.offsetWidth;


    /* -----------------------------------------------
       ALWAYS VMB
       ----------------------------------------------- */

    logo.textContent = "VMB";


    /* -----------------------------------------------
       START
       ----------------------------------------------- */

    transition.classList.add("active");


    /* -----------------------------------------------
       SWITCH SCENE WHILE VMB IS CENTERED
       ----------------------------------------------- */

    setTimeout(() => {

      activateScene(nextIndex);

    }, SCENE_SWAP_TIME);


    /* -----------------------------------------------
       END
       ----------------------------------------------- */

    setTimeout(() => {

      transition.classList.remove("active");

      isTransitioning = false;

    }, TRANSITION_TIME);

  }


  /* =======================================================
     BUTTONS
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-next]"
        );

      if (!button) {
        return;
      }

      event.preventDefault();

      const next =
        Number(
          button.dataset.next
        );

      if (
        Number.isNaN(next)
      ) {
        return;
      }

      transitionTo(next);

    }
  );


  /* =======================================================
     KEYBOARD
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (isTransitioning) {
        return;
      }


      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {

        const next =
          Math.min(
            currentScene + 1,
            scenes.length - 1
          );

        transitionTo(next);
      }


      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {

        const previous =
          Math.max(
            currentScene - 1,
            0
          );

        transitionTo(previous);
      }


      if (event.key === "Home") {
        transitionTo(0);
      }


      if (event.key === "End") {

        transitionTo(
          scenes.length - 1
        );

      }

    }
  );


  /* =======================================================
     TOUCH SWIPE
     ======================================================= */

  let touchStartY = 0;

  document.addEventListener(
    "touchstart",
    (event) => {

      if (!event.touches.length) {
        return;
      }

      touchStartY =
        event.touches[0].clientY;

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "touchend",
    (event) => {

      if (
        isTransitioning ||
        !event.changedTouches.length
      ) {
        return;
      }

      const touchEndY =
        event.changedTouches[0].clientY;

      const difference =
        touchStartY - touchEndY;


      if (
        Math.abs(difference) < 45
      ) {
        return;
      }


      if (difference > 0) {

        const next =
          Math.min(
            currentScene + 1,
            scenes.length - 1
          );

        transitionTo(next);

      } else {

        const previous =
          Math.max(
            currentScene - 1,
            0
          );

        transitionTo(previous);

      }

    },
    {
      passive: true
    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize() {

    if (!scenes.length) {
      return;
    }

    activateScene(0);

    transition.classList.remove(
      "active"
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );

  } else {

    initialize();

  }

})();