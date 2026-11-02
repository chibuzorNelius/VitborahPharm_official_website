/**
 * Vibtorah Pharmaceuticals - Corporate Website Core JavaScript
 * Vanilla JS, Clean, Modular, Zero Framework Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroCarousel();
  initStatsCounter();
  initShowcaseMarquees();
  initProductModal();
});

/* ==========================================================================
   1. STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. HERO EXPERIENCE CAROUSEL
   Automatic 6s transitions, indicators, arrows, swipe, pause on hover
   ========================================================================== */
function initHeroCarousel() {
  const container = document.querySelector('.hero-carousel-container');
  const slides = document.querySelectorAll('.hero-slide');
  const indicatorBtns = document.querySelectorAll('.hero-indicator-btn');
  const prevBtn = document.querySelector('.hero-arrow-btn.prev');
  const nextBtn = document.querySelector('.hero-arrow-btn.next');

  if (!container || slides.length === 0) return;

  let currentIndex = 0;
  let slideInterval = null;
  const slideDuration = 6000;
  let isPaused = false;

  const goToSlide = (index) => {
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    indicatorBtns.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIdx);
  };

  const startAutoplay = () => {
    stopAutoplay();
    slideInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideDuration);
  };

  const stopAutoplay = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };

  // Click on indicators
  indicatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-slide-index'), 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoplay();
      }
    });
  });

  // Next / Prev button triggers
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide(); // swipe left -> next
      } else {
        prevSlide(); // swipe right -> prev
      }
      startAutoplay();
    }
  };

  // Initialize first slide
  goToSlide(0);
  startAutoplay();
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   Interpolates figures smoothly when entering viewport
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number-val');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-count'), 10);
        if (!isNaN(targetVal)) {
          animateValue(el, 0, targetVal, 1600);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.35 });

  statNumbers.forEach(el => observer.observe(el));

  function animateValue(elem, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      elem.textContent = currentVal.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        elem.textContent = end.toLocaleString();
      }
    };
    window.requestAnimationFrame(step);
  }
}

/* ==========================================================================
   5. SHOWCASE CONTINUOUS MARQUEES
   Loads JSON data, duplicates items for infinite seamless looping
   ========================================================================== */
async function initShowcaseMarquees() {
  const therTrack = document.getElementById('therapeuticShowcaseTrack');
  const suppTrack = document.getElementById('supplementsShowcaseTrack');

  // Load Therapeutic Products
  if (therTrack) {
    try {
      const res = await fetch('/data/therapeutic-products.json');
      const products = await res.json();
      renderMarquee(therTrack, products, 'therapeutic');
    } catch (e) {
      console.warn('Could not load therapeutic products for showcase:', e);
    }
  }

  // Load Supplements
  if (suppTrack) {
    try {
      const res = await fetch('/data/supplements.json');
      const supplements = await res.json();
      renderMarquee(suppTrack, supplements, 'supplement');
    } catch (e) {
      console.warn('Could not load supplements for showcase:', e);
    }
  }
}

function renderMarquee(trackElement, items, type) {
  // Create card HTML for one set
  const makeCards = (list) => {
    return list.map(item => `
      <div class="showcase-card" data-product-id="${item.id}" data-product-type="${type}">
        <div class="showcase-card-img-wrap">
          <span class="badge ${type === 'therapeutic' ? 'badge-green' : 'badge-blue'} showcase-card-badge">${item.badge || item.category}</span>
          <img src="${item.image}" alt="${item.name}" class="showcase-card-img" loading="lazy">
        </div>
        <div class="showcase-card-category">${item.category}</div>
        <h4 class="showcase-card-title">${item.name}</h4>
        <p class="showcase-card-sub">${item.genericName || item.strength || item.packSize}</p>
        <div class="showcase-card-footer">
          <span class="showcase-card-action">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span style="font-size:0.75rem; color:#8E9F92; font-weight:700;">WHO-cGMP</span>
        </div>
      </div>
    `).join('');
  };

  // To achieve a seamless infinite loop without gaps, we duplicate the item list twice
  const cardsHtml = makeCards(items);
  trackElement.innerHTML = cardsHtml + cardsHtml;

  // Add click listeners to cards to open modal
  trackElement.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-product-id');
      const item = items.find(i => i.id === id);
      if (item) {
        window.openProductModal(item, type);
      }
    });
  });
}

/* ==========================================================================
   6. GLOBAL PRODUCT DETAIL MODAL
   ========================================================================== */
function initProductModal() {
  const backdrop = document.getElementById('productModalBackdrop');
  if (!backdrop) return;

  const closeBtn = document.getElementById('modalCloseBtn');
  const inquiryBtn = document.getElementById('modalInquiryBtn');

  const closeModal = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  if (inquiryBtn) {
    inquiryBtn.addEventListener('click', () => {
      closeModal();
      window.location.href = '/work-with-us.html#apply';
    });
  }

  // Expose opener function globally
  window.openProductModal = (product, type = 'therapeutic') => {
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductImg').alt = product.name;
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalGenericTitle').textContent = product.genericName || product.strength || '';
    document.getElementById('modalCategoryBadge').textContent = product.category;
    document.getElementById('modalCategoryBadge').className = `badge ${type === 'therapeutic' ? 'badge-green' : 'badge-blue'}`;
    
    document.getElementById('modalSpecCategory').textContent = product.category;
    document.getElementById('modalSpecStrength').textContent = product.strength || 'Standard Pharmacopeial';
    document.getElementById('modalSpecPack').textContent = product.packSize || 'Institutional Wholesale Packaging';
    document.getElementById('modalSpecStorage').textContent = product.storage || 'Store below 25°C in dry conditions';

    document.getElementById('modalDescription').textContent = product.description;

    const charList = document.getElementById('modalCharacteristicsList');
    if (charList) {
      if (product.qualityCharacteristics && product.qualityCharacteristics.length > 0) {
        charList.innerHTML = product.qualityCharacteristics.map(q => `<li>${q}</li>`).join('');
      } else {
        charList.innerHTML = `
          <li>Manufactured in strict adherence to WHO-cGMP regulations</li>
          <li>Comprehensive stability and batch release certification</li>
          <li>Full regulatory traceability and quality compliance</li>
        `;
      }
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}
