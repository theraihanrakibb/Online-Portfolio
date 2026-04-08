(function () {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.getAttribute("data-counter")) || 0;
    const suffix = target === 3 || target === 70 || target === 173 ? "+" : "";
    const duration = 1000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => io.observe(counter));
})();
