(function () {
  const roles = [
    "AI Infrastructure Engineer",
    "Multimodal Researcher",
    "CUDA/Triton Developer",
    "AI Product Manager"
  ];
  const target = document.getElementById("typed-role");
  if (!target) return;

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function step() {
    const word = roles[roleIdx];
    if (!deleting) {
      charIdx += 1;
      target.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(step, 1100);
        return;
      }
    } else {
      charIdx -= 1;
      target.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    const speed = deleting ? 45 : 70;
    setTimeout(step, speed);
  }

  step();
})();
