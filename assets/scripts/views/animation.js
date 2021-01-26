export const backgroundRicknillo = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  class Ricknillo {
    constructor(x) {
      this.positonX = x;
      this.positonY = -200;
    }
  }
  class Star {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  }

  let allRickinillo = [];
  const starsArray = [];
  const cWidth = window.innerWidth;
  const cHeight = window.innerHeight;
  for (let i = 0; i < 100; i++) {
    starsArray.push(
      new Star(
        Math.random() * cWidth,
        Math.random() * cHeight,
        Math.random() * 2,
      ),
    );
  }
  setInterval(() => {
    canvas.width = cWidth;
    canvas.height = cHeight;
    const rickinilloSprite = new Image();
    rickinilloSprite.src = './assets/src/img/ricknillo.png';
    ctx.fillRect(0, 0, cWidth, cHeight);
    starsArray.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
    if (Math.random() < 0.01) {
      allRickinillo.push(new Ricknillo((cWidth - 133) * Math.random()));
    }
    if (allRickinillo.length && allRickinillo.length < 15) {
      allRickinillo.forEach(ricknillo =>
        ctx.drawImage(
          rickinilloSprite,
          0,
          0,
          665,
          727,
          ricknillo.positonX,
          ricknillo.positonY,
          100,
          109,
        ),
      );
    }
    allRickinillo.forEach(ricknillo => (ricknillo.positonY += 5));
    allRickinillo = allRickinillo.filter(
      ricknillo => ricknillo.positonY < cHeight,
    );
  }, 1000 / 20);
};

export const transition = time => {
  const portal = document.querySelector('.container-portal');
  if (time === 'start') {
    portal.classList.toggle('none');
    portal.animate(
      [
        {
          opacity: 1,
        },
      ],
      { duration: 100, delay: 100, fill: 'forwards' },
    );
  } else {
    portal.classList.toggle('none');
  }
};
