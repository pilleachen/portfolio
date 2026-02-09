import './style.css'

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Animate burger icon
  const bars = mobileBtn.querySelectorAll('.bar');
  if (navLinks.classList.contains('active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const bars = mobileBtn.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});

// Smooth Scroll for Anchor Links (Backup for older browsers, though CSS handles most)
// Smooth Scroll for Anchor Links (Backup for older browsers, though CSS handles most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const sideNav = document.querySelector('.side-nav');
console.log('SideNav Element:', sideNav); // Debug log
const sections = document.querySelectorAll('section');
const sideLinks = document.querySelectorAll('.side-link');


/* =========================================
   Text Scramble Effect
   ========================================= */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.originalText = el.innerText;
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Apply scramble effect to Section Titles
const titles = document.querySelectorAll('.section-title');
titles.forEach(title => {
  const fx = new TextScramble(title);

  title.addEventListener('mouseenter', () => {
    fx.setText(title.innerText); // Scramble and return to same text
  });
});





