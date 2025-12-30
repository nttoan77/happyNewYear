const scene = document.getElementById('envelopeScene');
const openSound = document.getElementById('openSound');
const music = document.getElementById('music');
const fireworksContainer = document.getElementById('fireworks');

// Màu sắc rực rỡ hơn
const colors = ['#ff0040', '#ff8c00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff1493', '#ffd700', '#ff4500'];

function createEpicFirework() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.7); // Nổ ngẫu nhiên trên 70% màn hình

  const color = colors[Math.floor(Math.random() * colors.length)];

  // Tạo trail (đuôi pháo)
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = x + 'px';
  trail.style.top = '100%';
  trail.style.setProperty('--color', color);
  fireworksContainer.appendChild(trail);

  // Tạo điểm nổ chính
  const firework = document.createElement('div');
  firework.classList.add('firework');
  firework.style.left = x + 'px';
  firework.style.top = (window.innerHeight - y) + 'px';
  firework.style.setProperty('--color', color);
  fireworksContainer.appendChild(firework);

  // Nổ sau khi bay lên
  setTimeout(() => {
    explodeEpic(x, window.innerHeight - y, color);
    trail.remove();
    firework.remove();
  }, 1400 + Math.random() * 300);
}

function explodeEpic(centerX, centerY, color) {
  const particleCount = 50 + Math.floor(Math.random() * 40); // 50–90 hạt mỗi chùm

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    let angle = (i / particleCount) * 360;
    // Thêm kiểu nổ ngẫu nhiên: tròn, hoa cúc, xoáy
    const burstType = Math.random();
    if (burstType > 0.7) angle += Math.random() * 30; // Xoáy nhẹ
    else if (burstType > 0.4) angle += 15; // Hoa cúc

    const distance = 150 + Math.random() * 250; // Bay xa hơn
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance;

    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.setProperty('--color', color);
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');

    fireworksContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 2500);
  }
}

// Khi mở thiệp
scene.addEventListener('click', function() {
  if (!scene.classList.contains('open')) {
    scene.classList.add('open');
    fireworksContainer.classList.add('active');

    openSound.currentTime = 0;
    openSound.play().catch(() => {});

    setTimeout(() => {
      music.play().catch(() => {});
    }, 800);

    // Nổ liên tục vĩnh viễn, hoành tráng hơn (mỗi 300–500ms một chùm)
    setInterval(createEpicFirework, 350 + Math.random() * 150);
  }
});

// Mở khóa âm thanh trên mobile
document.body.addEventListener('touchstart', function() {}, {once: true});
document.body.addEventListener('click', function() {}, {once: true});