export const backgroundRicknillo = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  class Ricknillo {
    constructor(x) {
      this.positonX = x;
      this.positonY = -200;
      this.type = 'ricknillo';
    }
  }
  class Potato {
    constructor(x) {
      this.positonX = x;
      this.positonY = -200;
      this.type = 'potato';
    }
  }
  class Catete {
    constructor(x) {
      this.positonX = x;
      this.positonY = -200;
      this.type = 'catete';
    }
  }
  class Star {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  }

  let allCharacters = [];
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
  const catGravitySprite = new Image();
  catGravitySprite.src = './assets/src/img/catgravity.png';
  function drawCatGravity(x, y, degrees) {
    ctx.translate(
      x + catGravitySprite.width / 2,
      y + catGravitySprite.height / 2,
    );
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(
      catGravitySprite,
      0,
      0,
      catGravitySprite.width,
      catGravitySprite.height,
      -catGravitySprite.width / 2,
      -catGravitySprite.height / 2,
      catGravitySprite.width,
      catGravitySprite.height,
    );
    ctx.rotate((-degrees * Math.PI) / 180);
    ctx.translate(
      -x - catGravitySprite.width / 2,
      -y - catGravitySprite.height / 2,
    );
  }
  const catGravity = {
    positionX: cWidth * Math.random(),
    positionY: -100,
    degrees: 0,
  };
  setInterval(() => {
    // Init And Clean Canvas
    canvas.width = cWidth;
    canvas.height = cHeight;

    // Print All Stars
    ctx.fillRect(0, 0, cWidth, cHeight);
    starsArray.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });

    //Loaded Images
    const rickinilloSprite = new Image();
    const potatoSprite = new Image();
    const cateteSprite = new Image();
    rickinilloSprite.src = './assets/src/img/ricknillo.png';
    potatoSprite.src = './assets/src/img/potato.png';
    cateteSprite.src = './assets/src/img/catete.png';
    drawCatGravity(
      catGravity.positionX,
      catGravity.positionY,
      catGravity.degrees,
    );
    //Print Images
    if (Math.random() < 0.01) {
      if (Math.random() < 0.3) {
        Math.random() < 0.5
          ? allCharacters.push(new Potato((cWidth - 133) * Math.random()))
          : allCharacters.push(new Catete((cWidth - 133) * Math.random()));
      }
      allCharacters.push(new Ricknillo((cWidth - 133) * Math.random()));
    }
    if (allCharacters.length && allCharacters.length < 15) {
      allCharacters.forEach(character => {
        if (character.type === 'ricknillo') {
          ctx.drawImage(
            rickinilloSprite,
            0,
            0,
            665,
            727,
            character.positonX,
            character.positonY,
            100,
            109,
          );
        } else if (character.type === 'potato') {
          ctx.drawImage(
            potatoSprite,
            0,
            0,
            512,
            512,
            character.positonX,
            character.positonY,
            100,
            100,
          );
        } else if (character.type === 'catete') {
          ctx.drawImage(
            cateteSprite,
            0,
            0,
            512,
            512,
            character.positonX,
            character.positonY,
            100,
            100,
          );
        }
      });
    }
    allCharacters.forEach(character => (character.positonY += 5));
    allCharacters = allCharacters.filter(
      character => character.positonY < cHeight,
    );
    if (catGravity.positionY > cHeight + 100) {
      catGravity.positionY = -100;
      catGravity.positionX = cWidth * Math.random();
    } else {
      catGravity.positionY += 1;
      catGravity.positionx += 1;
    }
    catGravity.degrees = (catGravity.degrees + 1) % 360;
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

export const animateSidebar = () => {
  const nav = document.getElementById('nav');
  const navController = document.getElementById('navController');
  if (nav.classList.contains('none')) {
    nav.classList.toggle('none');
    nav.animate(
      { opacity: 1 },
      {
        duration: 500,
        fill: 'forwards',
      },
    );
    navController.classList.toggle('bx-x');
    navController.classList.toggle('bxs-chevron-right');
  } else {
    nav.animate(
      { opacity: 0 },
      {
        duration: 500,
        fill: 'forwards',
      },
    );
    setTimeout(() => {
      nav.classList.toggle('none');
      navController.classList.toggle('bx-x');
      navController.classList.toggle('bxs-chevron-right');
    }, 400);
  }
};
