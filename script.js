// گرفتن المان‌ها
const menuItems = document.querySelectorAll('#menu li');
let anim = null;

// تابع بارگذاری و پخش Lottie
function loadAnimation(name) {
  // در صورت وجود انیمیشن قبلی، نابودش کن
  if (anim) anim.destroy();

  anim = lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    path: `animations/${name}.json`,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
  });
}

// تنظیم انیمیشن پس‌زمینه Canvas (امواج ساده)
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  // ست ابریز متناسب
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // پارامترهای امواج
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // رسم آسمان
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#4DA6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // رسم امواج ساده
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    const A = 20, // دامنه
          k = 0.02; // فرکانس
    ctx.moveTo(0, canvas.height * 0.7);
    for (let x = 0; x < canvas.width; x += 10) {
      const y = canvas.height * 0.7 + A * Math.sin(k * x + t);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    t += 0.02;
    requestAnimationFrame(draw);
  }
  draw();
}

// راه‌اندازی اولیه
window.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  loadAnimation('initial');

  // تنظیم کلیک منوها
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      loadAnimation(action);
    });
  });
});
