const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  if (!open) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '88px';
    nav.style.left = '18px';
    nav.style.right = '18px';
    nav.style.padding = '18px';
    nav.style.border = '1px solid rgba(255,255,255,.12)';
    nav.style.borderRadius = '18px';
    nav.style.background = 'rgba(5,10,20,.94)';
    nav.style.backdropFilter = 'blur(18px)';
    nav.style.flexDirection = 'column';
    nav.style.alignItems = 'stretch';
  } else {
    nav.removeAttribute('style');
  }
});

function demoDownload(event) {
  event.preventDefault();
  const notice = document.getElementById('downloadNotice');
  notice.textContent = 'Demo CTA — connect this button to your real download URL.';
}





/*
  3D mouse-follow effect for the product interface.
  Cursor position controls:
  - rotateY: left/right perspective
  - rotateX: up/down perspective
  - translate: tiny positional movement
*/
(() => {
  const mockup = document.querySelector('.mockup-wrap');
  if (!mockup) {
    console.warn('[Real Executor] .mockup-wrap not found');
    return;
  }

  let targetX = 0;
  let targetY = 0;
  let targetRX = 0;
  let targetRY = 0;

  let x = 0;
  let y = 0;
  let rx = 0;
  let ry = 0;

  window.addEventListener('mousemove', (event) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / cx));
    const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / cy));

    // Very small translation.
    targetX = nx * 7;
    targetY = ny * 5;

    // Main effect: subtle 3D tilt.
    // The CSS keeps a permanent -5deg base angle toward the text.
    // Mouse movement adds up to +/-7deg around that base angle.
    targetRY = nx * 7;
    targetRX = -ny * 5;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    targetRX = 0;
    targetRY = 0;
  });

  function animate() {
    x += (targetX - x) * 0.075;
    y += (targetY - y) * 0.075;
    rx += (targetRX - rx) * 0.075;
    ry += (targetRY - ry) * 0.075;

    mockup.style.setProperty('--mx', `${x.toFixed(2)}px`);
    mockup.style.setProperty('--my', `${y.toFixed(2)}px`);
    mockup.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    mockup.style.setProperty('--ry', `${ry.toFixed(2)}deg`);

    requestAnimationFrame(animate);
  }

  animate();

  console.log('[Real Executor] 3D mouse tilt initialized');
})();
