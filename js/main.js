(function () {
  const docEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.getElementById("nav-list");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    docEl.setAttribute("data-theme", savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
    const next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    docEl.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const animateGraphicCounts = () => {
    document.querySelectorAll('.graphic-count').forEach((countEl) => {
      const target = Number(countEl.dataset.target ?? 0);
      const suffix = countEl.dataset.suffix ?? "";
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        countEl.textContent = `${current}${suffix}`;
      }, 18);
    });
  };

  animateGraphicCounts();
})();
