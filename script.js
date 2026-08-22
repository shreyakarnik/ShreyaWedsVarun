/* =========================================================
   Varun & Shreya — Wedding site interactions
   Mirrors the exact reaction timing built in the Figma prototype:
   Flow1 (tap/drag) -> Flow2 -> Flow3 -> Flow4 -> Postcard fly-in
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- Countdown plane flow (from Figma "Plane Flow" variants) ---------------- */
  // Each frame is a full 422x305.404 export with the plane pre-positioned/rotated, exactly
  // matching the Property 1=Default/Variant2..6 states of the Figma component.

  const PLANE_FRAMES = [
    "assets/images/plane/plane-1.svg",
    "assets/images/plane/plane-2.svg",
    "assets/images/plane/plane-3.svg",
    "assets/images/plane/plane-4.svg",
    "assets/images/plane/plane-5.svg",
    "assets/images/plane/plane-6.svg",
  ];
  const PLANE_STEP_MS = 450; // ms between each flight frame
  const PLANE_LOOP_PAUSE_MS = 2200; // pause once the plane has flown off before it repeats
  const planeImg = document.getElementById("plane-flow-img");
  let planeTimer = null;

  function planeTick(i) {
    if (!planeImg) return;
    planeImg.src = PLANE_FRAMES[i];
    const isLast = i >= PLANE_FRAMES.length - 1;
    planeTimer = setTimeout(() => planeTick(isLast ? 0 : i + 1), isLast ? PLANE_LOOP_PAUSE_MS : PLANE_STEP_MS);
  }
  function startPlaneLoop() {
    if (planeTimer || !planeImg) return;
    planeTick(0);
  }
  function stopPlaneLoop() {
    clearTimeout(planeTimer);
    planeTimer = null;
    if (planeImg) planeImg.src = PLANE_FRAMES[0];
  }

  /* ---------------- Screen switching ---------------- */
  const screens = {
    hero: document.getElementById("hero-screen"),
    countdown: document.getElementById("countdown-screen"),
    gallery: document.getElementById("gallery-screen"),
  };
  const postcardZone = document.getElementById("postcard-sticky-zone");
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-goto");
      const key = screens[target] ? target : "hero";
      Object.entries(screens).forEach(([name, el]) => {
        if (!el) return;
        const show = name === key;
        el.classList.toggle("hidden", !show);
        el.setAttribute("aria-hidden", show ? "false" : "true");
      });
      // the postcard lives outside both screens (sticky positioning needs it
      // out of their overflow:hidden) so it has to be toggled separately
      if (postcardZone) postcardZone.style.display = key === "hero" ? "" : "none";
      if (key === "countdown") startPlaneLoop();
      else stopPlaneLoop();
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
  });

  /* ---------------- Flow step data (from Figma variants) ---------------- */
  // inset: [top%, right%, bottom%, left%] relative to the flow's own box

  // FLOW1_BG intentionally omitted: it's a large torn-stamp/envelope-flap backing
  // graphic that Flow1 (unlike Flow2-4) has no opacity:0 to hide before interaction,
  // so it renders as a big beige shape behind the stamps at initial page load.
  const FLOW2_BG = "https://www.figma.com/api/mcp/asset/d098e499-ccd3-4118-a841-52d8fa7a4c0c.svg";
  const FLOW3_BG = "https://www.figma.com/api/mcp/asset/32a7b33b-4dc5-479a-b63a-cfed6bf4b6e2.svg";

  const FLOW1_STEPS = [
    { inset: [0, 84.95, 95.92, 6.97], img: "https://www.figma.com/api/mcp/asset/fcdca1c9-1f5c-4c32-af50-0e7ba42bdd52.png", w: 31.7, h: 24.5, rot: 0 },
    { inset: [0, 65.88, 95.62, 26.03], img: "https://www.figma.com/api/mcp/asset/6c570975-49c8-4995-b862-ba467ab0432e.png", w: 31.7, h: 26.2, rot: 0 },
    { inset: [-0.52, 50.37, 95.41, 39.32], img: "https://www.figma.com/api/mcp/asset/e0000a52-09e6-46f9-98c1-4ffac5bce47f.png", w: 36.6, h: 24.5, rot: 10.28 },
    { inset: [-0.37, 38.69, 94.62, 49.38], img: "https://www.figma.com/api/mcp/asset/3a401996-c6b0-408c-b250-ab2366ff15e9.png", w: 42.4, h: 27.2, rot: 10.28 },
    { inset: [0.93, 24.47, 92.37, 62.59], img: "https://www.figma.com/api/mcp/asset/254a9ef4-c3c2-44b9-a2db-6a03c1ff5446.png", w: 44.2, h: 25.7, rot: 21.02, opacity: 0.25 },
    { inset: [3.12, 11.43, 89.38, 75.47], img: "https://www.figma.com/api/mcp/asset/5aae3e4a-3d8a-495b-8e50-eef65c3a0c08.png", w: 44.2, h: 25.7, rot: 30.42 },
    { inset: [7.11, 0.02, 83.72, 85.2], img: "https://www.figma.com/api/mcp/asset/7f8452e5-07bc-4e3a-bf07-0d2a135fa851.png", w: 51.6, h: 27.9, rot: 39.17 },
    { inset: [13.79, -3.09, 77, 92.69], img: "https://www.figma.com/api/mcp/asset/0eb64aca-2ad4-4c87-b571-16a4eb1081fd.png", w: 48.3, h: 28.8, rot: 74.35 },
    { inset: [17.36, -3.25, 74.54, 93.62], img: "https://www.figma.com/api/mcp/asset/a4053f33-51ab-45ea-b4cb-f796fe914f68.png", w: 42.0, h: 27.6, rot: 74.35 },
    { inset: [31.07, 1.4, 60.47, 85.2], img: "https://www.figma.com/api/mcp/asset/1167208d-6b48-44f5-bf2e-31fca142db20.svg", fill: true, rot: -38.86 },
  ];

  const FLOW2_STEPS = [
    { inset: [31.07, 1.4, 60.47, 85.2], img: "https://www.figma.com/api/mcp/asset/b6ac8783-ddfd-488b-a62e-f2f1f0a822fd.svg", fill: true, rot: -38.86 },
    { inset: [27.8, 14.19, 59.86, 66.1], img: "https://www.figma.com/api/mcp/asset/4e9c41b9-aee1-4462-9c19-9d780579f2ec.svg", fill: true, rot: -38.86 },
    { inset: [32.52, 33.42, 57.82, 47.46], img: "https://www.figma.com/api/mcp/asset/8038fb89-3c9b-41e5-95be-2c11bf93f704.svg", fill: true, rot: -14.09 },
    { inset: [27.59, 55.63, 62.28, 23.63], img: "https://www.figma.com/api/mcp/asset/947cb28c-3789-4f74-8f3d-72f969513439.svg", fill: true, rot: -14.09 },
  ];

  const FLOW3_STEPS = [
    { inset: [48.31, 74.98, 39.76, 7.57], img: "https://www.figma.com/api/mcp/asset/6b867d69-b9c2-4603-b212-c6c99b4399ab.png", w: 80, h: 63, rot: 7.82 },
    { inset: [52.66, 54.48, 28.37, 21.72], img: "https://www.figma.com/api/mcp/asset/57c99570-d7eb-434e-a938-f1570e558da9.png", w: 94.78, h: 73.3, rot: -38.84 },
    { inset: [49.86, 26.14, 27.8, 45.56], img: "https://www.figma.com/api/mcp/asset/e54d3bf3-7a97-4262-beec-84c0985011fb.png", w: 116.66, h: 82.23, rot: -38.84 },
  ];

  const FLOW4_STEPS = [
    { inset: [65.31, 3.15, 13.43, 72.48], img: "https://www.figma.com/api/mcp/asset/aaddcd57-5bd4-48a3-ae1f-b5333a563039.png", w: 120, h: 95.8, rot: 19.63 },
    { inset: [92.18, -7.41, -12.74, 80.03], img: "https://www.figma.com/api/mcp/asset/1c2e9f6b-c8cf-401d-bca4-09fa294ddb4b.png", w: 143.7, h: 82.7, rot: 19.63 },
  ];

  function setupFlow(el, bgUrl) {
    if (bgUrl) {
      const bg = document.createElement("img");
      bg.className = "flow-bg";
      bg.src = bgUrl;
      bg.style.position = "absolute";
      bg.style.inset = "1.41% 0 0 0";
      bg.style.width = "100%";
      bg.style.height = "98.59%";
      el.appendChild(bg);
    }
    const img = document.createElement("img");
    img.className = "flow-vec";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    el.appendChild(img);
    // Cache the container's pixel box once so each step can be placed with a
    // transform: translate()/rotate() instead of animating top/left/right/
    // bottom — those are layout properties, and re-laying-out a large
    // fill:true icon (Flow2's SVGs cover most of their box) on every
    // animation frame is what made that one janky/lag behind the rest.
    // transform is compositor-only, so it stays smooth regardless of size.
    return { img, w: el.offsetWidth, h: el.offsetHeight };
  }

  // moveMs: how long to glide from the previous waypoint to this one. Passing
  // the actual interval between steps (instead of 0/instant) keeps the icon
  // continuously in motion rather than snapping to each spot and sitting
  // there for the "hold" — that dead pause read as "stopping in the middle."
  function renderFlowStep(refs, step, moveMs) {
    const glide = moveMs || 0;
    const [t, r, b, l] = step.inset;
    const leftPx = (l / 100) * refs.w;
    const rightPx = refs.w - (r / 100) * refs.w;
    const topPx = (t / 100) * refs.h;
    const bottomPx = refs.h - (b / 100) * refs.h;
    const boxW = rightPx - leftPx;
    const boxH = bottomPx - topPx;
    const w = step.fill ? boxW : step.w;
    const h = step.fill ? boxH : step.h;
    const cx = (leftPx + rightPx) / 2;
    const cy = (topPx + bottomPx) / 2;
    const tx = cx - w / 2;
    const ty = cy - h / 2;

    refs.img.style.width = w + "px";
    refs.img.style.height = h + "px";
    refs.img.src = step.img;
    refs.img.style.transition = glide
      ? `transform ${glide}ms ease-in-out, opacity ${glide}ms ease-in-out`
      : "none";
    refs.img.style.transform = `translate(${tx}px, ${ty}px) rotate(${step.rot}deg)`;
    refs.img.style.opacity = step.opacity != null ? step.opacity : 1;
  }

  const flow1El = document.getElementById("flow1");
  const flow2El = document.getElementById("flow2");
  const flow3El = document.getElementById("flow3");
  const flow4El = document.getElementById("flow4");

  const flow1Refs = setupFlow(flow1El, null);
  const flow2Refs = setupFlow(flow2El, FLOW2_BG);
  const flow3Refs = setupFlow(flow3El, FLOW3_BG);
  const flow4Refs = setupFlow(flow4El, null);

  renderFlowStep(flow1Refs, FLOW1_STEPS[0]); // Flow1 starts visible (Default)

  /* ---------------- Sequence timing (ms) — mirrors the Figma reactions ---------------- */

  let sequenceStarted = false;

  function playChain(refs, steps, el, opts) {
    // opts: {revealDuration, holdMs, stepDuration, hideAfter}
    let i = 0;
    renderFlowStep(refs, steps[i]);
    el.style.transition = `opacity ${opts.revealDuration}ms ease-out`;
    requestAnimationFrame(() => { el.style.opacity = "1"; });

    function next() {
      i++;
      if (i >= steps.length) {
        if (opts.hideAfter) {
          setTimeout(() => {
            el.style.transition = "opacity 300ms ease-in";
            el.style.opacity = "0";
          }, 10);
        }
        return;
      }
      el.style.transition = `opacity ${opts.stepDuration}ms ease-out`;
      renderFlowStep(refs, steps[i], opts.holdMs + opts.stepDuration);
      setTimeout(next, opts.holdMs + opts.stepDuration);
    }
    setTimeout(next, opts.revealDuration);
  }

  // Chain speed, further sped up on top of the earlier 2x pass. Durations for
  // each flow are derived from these constants (via chainDuration below)
  // instead of hand-computed magic numbers, so the handoff between flows
  // always lines up correctly.
  const FLOW1_REVEAL_MS = 70;
  const FLOW1_HOLD_MS = 0;
  const FLOW1_STEP_MS = 70;
  const FLOW2_OPTS = { revealDuration: 150, holdMs: 180, stepDuration: 150, hideAfter: true };
  const FLOW3_OPTS = { revealDuration: 150, holdMs: 180, stepDuration: 150, hideAfter: true };
  const FLOW4_OPTS = { revealDuration: 150, holdMs: 0, stepDuration: 150, hideAfter: true };

  function chainDuration(steps, opts) {
    return opts.revealDuration + Math.max(0, steps.length - 1) * (opts.holdMs + opts.stepDuration);
  }

  function startSequence() {
    if (sequenceStarted) return;
    sequenceStarted = true;

    // Flow 1: tap -> reveal step2, then step through the rest of FLOW1_STEPS
    flow1El.style.transition = `opacity ${FLOW1_REVEAL_MS}ms ease-out`;
    let i = 0;
    renderFlowStep(flow1Refs, FLOW1_STEPS[0]);
    function flow1Next() {
      i++;
      if (i >= FLOW1_STEPS.length) {
        setTimeout(() => {
          flow1El.style.transition = "opacity 150ms ease-in";
          flow1El.style.opacity = "0";
        }, 10);
        return;
      }
      renderFlowStep(flow1Refs, FLOW1_STEPS[i], FLOW1_HOLD_MS + FLOW1_STEP_MS);
      setTimeout(flow1Next, FLOW1_HOLD_MS + FLOW1_STEP_MS);
    }
    setTimeout(flow1Next, FLOW1_REVEAL_MS);

    // Flow1 tap -> its last step (i.e. FLOW1_STEPS.length - 1 transitions after
    // the initial reveal), which is when Flow2 should start overlapping in.
    const T1 = FLOW1_REVEAL_MS + (FLOW1_STEPS.length - 2) * (FLOW1_HOLD_MS + FLOW1_STEP_MS);

    setTimeout(() => {
      playChain(flow2Refs, FLOW2_STEPS, flow2El, FLOW2_OPTS);
    }, T1);
    const flow2End = T1 + chainDuration(FLOW2_STEPS, FLOW2_OPTS);

    setTimeout(() => {
      playChain(flow3Refs, FLOW3_STEPS, flow3El, FLOW3_OPTS);
    }, flow2End);
    const flow3End = flow2End + chainDuration(FLOW3_STEPS, FLOW3_OPTS);

    setTimeout(() => {
      playChain(flow4Refs, FLOW4_STEPS, flow4El, FLOW4_OPTS);
    }, flow3End);
    const flow4End = flow3End + chainDuration(FLOW4_STEPS, FLOW4_OPTS);

    setTimeout(() => {
      const entrance = document.getElementById("postcard-entrance");
      entrance.classList.add("revealed");
      // Auto-open the postcard itself a beat after it's done sliding into
      // place, instead of requiring a tap. startPostcardFlip is declared
      // further down (function declarations are hoisted), and by the time
      // this timeout actually fires the rest of the script has long since
      // run, so postcardCard/PC_STATES etc. are already set up.
      setTimeout(startPostcardFlip, POSTCARD_AUTO_OPEN_DELAY_MS);
    }, flow4End);
  }

  const heroFrame = document.getElementById("hero-frame");
  heroFrame.addEventListener("pointerdown", startSequence, { once: true });
  // Require an actual scroll past a small threshold, not just any "scroll" event —
  // some browsers fire one on load when restoring a previous scroll position, which
  // would otherwise kick off the whole flow1->4->postcard chain before the visitor
  // has done anything.
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 4) startSequence();
    },
    { passive: true }
  );

  /* ---------------- Postcard content card (8-state flip-through) ---------------- */
  /* Images supplied by user: Property 1=Default (1), Variant2 .. Variant8 */

  const PC_STATES = [
    { img: "assets/images/postcard/postcard-1.png", h: 208.8 },
    { img: "assets/images/postcard/postcard-2.png", h: 208.8 },
    { img: "assets/images/postcard/postcard-3.png", h: 337 },
    { img: "assets/images/postcard/postcard-4.png", h: 331 },
    { img: "assets/images/postcard/postcard-5.png", h: 606.5 },
    { img: "assets/images/postcard/postcard-6.png", h: 624.6 },
    { img: "assets/images/postcard/postcard-7.png", h: 606.5 },
    { img: "assets/images/postcard/postcard-8.png", h: 650 },
  ];

  const postcardCard = document.getElementById("postcard-card");
  const pcJoin = document.getElementById("pc-join");
  let pcIndex = 0;
  let pcTimers = [];

  // Crossfade each state change: the new frame is laid on top and faded in;
  // the old frame is only removed once the new one has fully faded in. This
  // avoids the blank-frame "blink" a straight innerHTML swap causes.
  const PC_CROSSFADE_MS = 130; // 2x faster than the original 260ms
  let pcRemoveTimer = null;

  function renderPcState(idx) {
    const state = PC_STATES[idx];

    // The "Join The Ceremony" button is baked into postcard-8.png itself —
    // only line it up as a real link once that's the state on screen, so
    // earlier frames (different art, different aspect ratio) don't expose a
    // stray clickable rectangle in the wrong spot.
    if (pcJoin) pcJoin.style.display = idx === PC_STATES.length - 1 ? "block" : "none";

    // Safety net: if a previous crossfade's removal hasn't fired yet (rapid
    // successive calls), collapse down to just the newest frame immediately
    // so layers never pile up.
    if (pcRemoveTimer) {
      clearTimeout(pcRemoveTimer);
      pcRemoveTimer = null;
    }
    const stale = Array.from(postcardCard.querySelectorAll(".pc-frame"));
    const oldImg = stale.length ? stale[stale.length - 1] : null;
    stale.slice(0, -1).forEach((n) => n.remove());

    const newImg = document.createElement("img");
    newImg.className = "pc-frame";
    newImg.alt = "";
    newImg.src = state.img;

    function swapIn() {
      postcardCard.style.height = state.h + "px";
      if (oldImg) {
        newImg.style.position = "absolute";
        newImg.style.left = "0";
        newImg.style.top = "0";
        newImg.style.opacity = "0";
        newImg.style.transition = `opacity ${PC_CROSSFADE_MS}ms ease`;
        postcardCard.appendChild(newImg);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { newImg.style.opacity = "1"; });
        });
        pcRemoveTimer = setTimeout(() => {
          oldImg.remove();
          newImg.style.position = "";
          newImg.style.left = "";
          newImg.style.top = "";
          newImg.style.opacity = "";
          newImg.style.transition = "";
          pcRemoveTimer = null;
        }, PC_CROSSFADE_MS + 40);
      } else {
        postcardCard.appendChild(newImg);
      }
    }

    if (newImg.complete) swapIn();
    else {
      newImg.addEventListener("load", swapIn, { once: true });
      newImg.addEventListener("error", swapIn, { once: true });
    }
  }
  renderPcState(0);

  const PC_DELAYS = [150, 200, 400, 200, 200, 200, 200]; // ms between each state — 2x faster than the original Figma AFTER_TIMEOUT chain (300,400,800,400,400,400,400)
  // How long after the postcard finishes sliding into place before it opens
  // itself: the entrance's own slide-in transition is 1.7s (see .postcard-
  // entrance.revealed in styles.css), plus a short pause so it doesn't look
  // like it's opening mid-motion.
  const POSTCARD_AUTO_OPEN_DELAY_MS = 1700 + 900;
  let pcStarted = false;

  // Advances the postcard through its remaining states on the PC_DELAYS
  // cadence. Called either automatically (see POSTCARD_AUTO_OPEN_DELAY_MS
  // above) or by a tap — whichever happens first; it's a no-op after that,
  // so a stray click once it's already auto-playing doesn't double it up.
  function startPostcardFlip() {
    if (pcStarted) return;
    if (pcIndex >= PC_STATES.length - 1) return;
    pcStarted = true;
    pcTimers.forEach(clearTimeout);
    pcTimers = [];
    let idx = pcIndex;
    function step() {
      idx++;
      renderPcState(idx);
      pcIndex = idx;
      if (idx < PC_STATES.length - 1) {
        pcTimers.push(setTimeout(step, PC_DELAYS[idx]));
      }
    }
    pcTimers.push(setTimeout(step, PC_DELAYS[idx] || 300));
  }

  postcardCard.addEventListener("click", (e) => {
    if (e.target.closest(".pc-join")) return; // let the join link behave normally (no-op destination)
    startPostcardFlip();
  });

  /* ---------------- Scroll parallax (stamps + clouds) ---------------- */

  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  const cloudsEl = document.getElementById("hero-clouds");
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax"));
        el.style.transform = `translateY(${-y * speed}px)`;
      });
      if (cloudsEl) {
        const shift = Math.min(y * 0.12, 40);
        cloudsEl.style.transform = `translateY(${-shift}px)`;
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- Countdown ---------------- */

  const CEREMONY_DATE = new Date("2026-09-14T15:00:00-07:00"); // 3:00pm PT, San Francisco City Hall

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickCountdown() {
    const el = document.getElementById("countdown-clock");
    if (!el) return;
    const diff = CEREMONY_DATE.getTime() - Date.now();
    if (diff <= 0) {
      el.textContent = "00:00:00";
      return;
    }
    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    el.textContent = `${pad(days)}:${pad(hours)}:${pad(minutes)}`;
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------------- Gallery carousel ---------------- */
  // Placeholder image used for every slot until real photos come in — the
  // array shape is what matters, so cycling in real files later is a
  // one-line change here.
  const GALLERY_IMAGES = [
    "assets/images/gallery/placeholder-1.webp",
  ];

  const galCurrent = document.getElementById("gal-slide-current");
  const galPrev = document.getElementById("gal-slide-prev");
  const galNext = document.getElementById("gal-slide-next");
  const galPrevBtn = document.getElementById("gal-prev");
  const galNextBtn = document.getElementById("gal-next");
  const galCarousel = document.getElementById("gal-carousel");
  let galIndex = 0;

  function renderGallery() {
    if (!galCurrent) return;
    const n = GALLERY_IMAGES.length;
    const prevIdx = (galIndex - 1 + n) % n;
    const nextIdx = (galIndex + 1) % n;
    galCurrent.src = GALLERY_IMAGES[galIndex];
    if (galPrev) galPrev.src = GALLERY_IMAGES[prevIdx];
    if (galNext) galNext.src = GALLERY_IMAGES[nextIdx];
  }
  renderGallery();

  function galShow(delta) {
    const n = GALLERY_IMAGES.length;
    galIndex = (galIndex + delta + n) % n;
    renderGallery();
  }
  if (galPrevBtn) galPrevBtn.addEventListener("click", () => galShow(-1));
  if (galNextBtn) galNextBtn.addEventListener("click", () => galShow(1));

  // Real drag-to-swipe: the whole filmstrip (prev/current/next) follows the
  // pointer 1:1 while dragging, then either snaps the rest of the way to the
  // next/prev photo or springs back — so it behaves like an actual photo
  // gallery even now, while every slot still shows the same placeholder.
  const galTrack = document.getElementById("gal-track");
  if (galCarousel && galTrack) {
    const SNAP_MS = 240;
    const THRESHOLD_PX = 50;
    // How far the track has to travel for the next/prev slide to land where
    // "current" rests — matches the (now symmetric, 20px-gap) offsets in the CSS.
    const NEXT_DISTANCE = 320; // gal-slide-next left(371) - gal-slide-current left(51)
    const PREV_DISTANCE = 320; // gal-slide-current left(51) - gal-slide-prev left(-269)

    let dragging = false;
    let startX = 0;
    let dragX = 0;
    let pointerId = null;

    function setTrackTransition(on) {
      galTrack.style.transition = on ? `transform ${SNAP_MS}ms ease-out` : "none";
    }

    function onPointerDown(e) {
      dragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      dragX = 0;
      setTrackTransition(false);
      galCarousel.classList.add("dragging");
      galCarousel.setPointerCapture(pointerId);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      dragX = e.clientX - startX;
      galTrack.style.transform = `translateX(${dragX}px)`;
    }

    function endDrag(commit) {
      if (!dragging) return;
      dragging = false;
      galCarousel.classList.remove("dragging");
      setTrackTransition(true);
      if (commit === "next") galTrack.style.transform = `translateX(${-NEXT_DISTANCE}px)`;
      else if (commit === "prev") galTrack.style.transform = `translateX(${PREV_DISTANCE}px)`;
      else galTrack.style.transform = "translateX(0px)";

      const finish = () => {
        galTrack.removeEventListener("transitionend", finish);
        setTrackTransition(false);
        galTrack.style.transform = "translateX(0px)";
        if (commit === "next") galShow(1);
        else if (commit === "prev") galShow(-1);
      };
      galTrack.addEventListener("transitionend", finish);
    }

    function onPointerUp(e) {
      if (!dragging) return;
      if (pointerId != null && galCarousel.hasPointerCapture(pointerId)) {
        galCarousel.releasePointerCapture(pointerId);
      }
      if (dragX <= -THRESHOLD_PX) endDrag("next");
      else if (dragX >= THRESHOLD_PX) endDrag("prev");
      else endDrag(null);
    }

    galCarousel.addEventListener("pointerdown", onPointerDown);
    galCarousel.addEventListener("pointermove", onPointerMove);
    galCarousel.addEventListener("pointerup", onPointerUp);
    galCarousel.addEventListener("pointercancel", () => endDrag(null));
  }
})();
