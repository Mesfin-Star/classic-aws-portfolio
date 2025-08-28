
// ====== main.js — AWS Portfolio 2025 ======

// 1) Floating "AWS bubbles" background (HTML must include <canvas id="bubbles"></canvas>)
(function bubbleBackground(){
  const c = document.getElementById('bubbles');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize(){
    W = c.clientWidth = window.innerWidth;
    H = c.clientHeight = window.innerHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  const colors = ['#4cc9f0','#80ffea','#a0f0ff','#e6e9f5'];
  const services = ['EC2','S3','RDS','Lambda','VPC','CF','IAM','DDB','EKS','R53','CW'];
  const bubbles = Array.from({length: 28}).map(()=>spawn());

  function spawn(){
    const size = Math.random()*28 + 12;
    return {
      x: Math.random()*W,
      y: H + Math.random()*H*0.4,
      r: size,
      vy: - (size*0.08 + Math.random()*0.6),
      vx: (Math.random()-0.5) * 0.6,
      c: colors[(Math.random()*colors.length)|0],
      label: Math.random() < 0.45 ? services[(Math.random()*services.length)|0] : ''
    };
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    for(const b of bubbles){
      b.x += b.vx;
      b.y += b.vy;
      if(b.y < -50 || b.x < -50 || b.x > W+50){
        Object.assign(b, spawn(), { y: H+40, x: Math.random()*W });
      }
      // glow
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r+8, 0, Math.PI*2);
      ctx.fillStyle = b.c + '33';
      ctx.fill();
      // core
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fillStyle = b.c + 'aa';
      ctx.fill();
      // label
      if(b.label){
        ctx.fillStyle = '#0b1020';
        ctx.font = 'bold 11px system-ui, -apple-system, Segoe UI, Roboto';
        const tw = ctx.measureText(b.label).width;
        ctx.fillText(b.label, b.x - tw/2, b.y + 3);
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

// 2) Clickable circular photo: navigate to "home.html" or an anchor
(function hotspot(){
  const el = document.querySelector('.photo-wrap');
  if(!el) return;
  el.addEventListener('click', () => {
    // Change target as you like:
    const target = document.querySelector('#projects') || document.body;
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
})();

// 3) Smooth scroll for in-page links
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  const target = document.querySelector(id);
  if(target){
    e.preventDefault();
    target.scrollIntoView({ behavior:'smooth' });
  }
});

// 4) Utility to set current year in footer
(function year(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
