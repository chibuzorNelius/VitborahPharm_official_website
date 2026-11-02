/**
 * Vibtorah Pharmaceuticals - Products Catalogue Logic
 * Category filtering, real-time search, badge counts, modal detail integration
 * Progressive enhancement over SEO-prerendered HTML
 */

document.addEventListener('DOMContentLoaded', () => {
  const catalogType = document.body.getAttribute('data-catalog-type'); // 'therapeutic' or 'supplements'
  if (catalogType) {
    initCatalog(catalogType);
  }
});

async function initCatalog(type) {
  const grid = document.getElementById('productsCatalogGrid');
  const searchInput = document.getElementById('catalogSearchInput');
  const clearBtn = document.getElementById('catalogSearchClear');
  const filterButtonsContainer = document.getElementById('categoryFilterBar');
  const resultsCountElem = document.getElementById('catalogResultsCount');

  if (!grid) return;

  const dataUrl = type === 'therapeutic' 
    ? '/data/therapeutic-products.json' 
    : '/data/supplements.json';

  let allProducts = [];
  let currentCategory = 'all';
  let currentSearchQuery = '';

  try {
    const res = await fetch(dataUrl);
    allProducts = await res.json();
    setupFilters();
    attachCardListeners();
  } catch (err) {
    console.warn('Using pre-rendered DOM products fallback:', err);
    // If fetch fails or runs offline, we extract data from pre-rendered DOM
    extractFromDom();
  }

  function extractFromDom() {
    const cards = grid.querySelectorAll('.product-card');
    allProducts = Array.from(cards).map(card => {
      const id = card.getAttribute('data-product-id');
      const name = card.querySelector('.product-name')?.textContent || '';
      const category = card.getAttribute('data-category') || '';
      const genericName = card.querySelector('.product-generic')?.textContent || '';
      const description = card.querySelector('.product-snippet')?.textContent || '';
      const img = card.querySelector('.product-card-img')?.src || '';
      return { id, name, category, genericName, description, image: img };
    });
    setupFilters();
    attachCardListeners();
  }

  // Setup category filter buttons dynamically
  function setupFilters() {
    if (!filterButtonsContainer) return;

    // Extract categories
    const categories = ['all'];
    const categoryCounts = { all: allProducts.length };

    allProducts.forEach(p => {
      const cat = p.category;
      if (!categoryCounts[cat]) {
        categoryCounts[cat] = 0;
        categories.push(cat);
      }
      categoryCounts[cat]++;
    });

    filterButtonsContainer.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
        ${cat === 'all' ? 'All Products' : cat}
        <span class="filter-count">${categoryCounts[cat]}</span>
      </button>
    `).join('');

    // Filter button click event
    filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderFiltered();
      });
    });
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        if (currentSearchQuery.length > 0) {
          clearBtn.classList.add('visible');
        } else {
          clearBtn.classList.remove('visible');
        }
      }
      renderFiltered();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
      renderFiltered();
    });
  }

  function renderFiltered() {
    const cards = grid.querySelectorAll('.product-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = (card.textContent || '').toLowerCase();

      const matchCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchSearch = !currentSearchQuery || cardText.includes(currentSearchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCountElem) {
      resultsCountElem.textContent = `Showing ${visibleCount} formulation${visibleCount === 1 ? '' : 's'}`;
    }

    // Handle empty state
    let emptyMsg = document.getElementById('catalogEmptyState');
    if (visibleCount === 0) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'catalogEmptyState';
        emptyMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background:#fff; border-radius:12px; border:1px solid #E0E8E2;';
        emptyMsg.innerHTML = `
          <svg style="width:48px; height:48px; color:#8E9F92; margin:0 auto 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="font-size:1.15rem; font-weight:700; color:#202820; margin-bottom:0.5rem;">No matching formulations found</h4>
          <p style="color:#5A6B5E; font-size:0.9rem;">Try selecting another category or clearing your search term.</p>
        `;
        grid.appendChild(emptyMsg);
      }
      emptyMsg.style.display = 'block';
    } else if (emptyMsg) {
      emptyMsg.style.display = 'none';
    }
  }

  function attachCardListeners() {
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-product-id');
        const product = allProducts.find(p => p.id === id);
        if (product && window.openProductModal) {
          window.openProductModal(product, type);
        }
      });
    });
  }
}
