// ============================================
//  JAVaAAAAAAAAAAAAAAAAAA
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Fancy Cursor ---- */
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();


  /* ---- Navigator Manu ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });


  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    });
  });


  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  /* ---- Counter Anime ---- */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  counters.forEach(el => counterObserver.observe(el));


  /* ---- GPA Bar Design ---- */
  const gpaFill = document.querySelector('.gpa-fill');
  if (gpaFill) {
    const gpaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          gpaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    gpaObserver.observe(gpaFill);
  }


  /* ---- Smooth Navi Design ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);


  /* ---- Skill Tags ---- */
  const skillTags = document.querySelectorAll('.skill-tags span');
  skillTags.forEach(tag => {
    tag.addEventListener('click', function () {
      this.style.transform = 'scale(0.92)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });


  /* ---- Card Tilt Cardline---- */
  const cards = document.querySelectorAll('.timeline-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -3;
      const rotY = ((x - cx) / cx) *  3;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ---- Hero Title design ---- */
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.animationDelay = `${i * 0.15}s`;
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.7s ${i * 0.15}s ease, transform 0.7s ${i * 0.15}s ease`;
    setTimeout(() => {
      line.style.opacity  = '1';
      line.style.transform = 'translateY(0)';
    }, 100 + i * 150);
  });


  /* ---- Parallax---- */
  const shapes = document.querySelectorAll('.shape');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = 0.05 + i * 0.03;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });


  /* ---- Contacts ---- */
  const emailItem = document.querySelector('a[href^="mailto"]');
  if (emailItem) {
    emailItem.title = 'Click to copy email';
    emailItem.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'ericcomacho@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const original = emailItem.querySelector('span:last-child').textContent;
        emailItem.querySelector('span:last-child').textContent = 'Copied! ✓';
        emailItem.style.background = '#DCFCE7';
        setTimeout(() => {
          emailItem.querySelector('span:last-child').textContent = original;
          emailItem.style.background = '';
        }, 2000);
      });
    });
  }


  /* ---- Footer ---- */
  const footerYear = document.querySelector('.footer-small');
  if (footerYear) {
    const yr = new Date().getFullYear();
    footerYear.textContent = `Built with Time (Spent 3 Days) · 2026`;
  }

});
