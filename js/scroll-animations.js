(function () {
  const revealItems = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => {
    item.style.transitionDelay = "0ms";
    io.observe(item);
  });

  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    canvas.remove();
    return;
  }

  let width = 0;
  let height = 0;
  let points = [];
  const POINT_COUNT = 42;

  function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    points = Array.from({ length: POINT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = "rgba(6, 182, 212, 0.55)";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < points.length; j += 1) {
        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.24 - dist / 600})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
})();
