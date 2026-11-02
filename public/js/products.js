/**
 * Vibtorah Pharmaceuticals - Products Catalogue Logic
 * Category filtering, real-time search, badge counts, modal detail integration
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
    renderProducts();
  } catch (err) {
    console.error('Failed to load catalog products:', err);
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <p style="color:#E83D36; font-weight:700; font-size:1.1rem;">Unable to load products at this moment.</p>
        <p style="color:#5A6B5E; margin-top:0.5rem;">Please check your connection and reload.</p>
      </div>
    `;
    return;
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
        renderProducts();
      });
    });
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Render product cards based on active category & search query
  function renderProducts() {
    const filtered = allProducts.filter(item => {
      const matchCategory = currentCategory === 'all' || item.category === currentCategory;
      const textToSearch = `${item.name} ${item.genericName || ''} ${item.category} ${item.description || ''}`.toLowerCase();
      const matchSearch = !currentSearchQuery || textToSearch.includes(currentSearchQuery);
      return matchCategory && matchSearch;
    });

    if (resultsCountElem) {
      resultsCountElem.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background:#fff; border-radius:12px; border:1px solid #E0E8E2;">
          <svg style="width:48px; height:48px; color:#8E9F92; margin:0 auto 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="font-size:1.15rem; font-weight:700; color:#202820; margin-bottom:0.5rem;">No matching formulations found</h4>
          <p style="color:#5A6B5E; font-size:0.9rem;">Try selecting a different category or adjusting your search term.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="product-card" data-product-id="${item.id}">
        <div class="product-img-box">
          <span class="badge ${type === 'therapeutic' ? 'badge-green' : 'badge-blue'}" style="position:absolute; top:0.75rem; left:0.75rem;">
            ${item.badge || item.category}
          </span>
          <img src="${item.image}" alt="${item.name}" class="product-card-img" loading="lazy">
        </div>
        
        <div class="product-meta-row">
          <span class="product-category-tag">${item.category}</span>
          <span class="badge badge-green" style="font-size:0.7rem; font-weight:800;">WHO-cGMP</span>
        </div>

        <h3 class="product-name">${item.name}</h3>
        ${item.genericName ? `<p class="product-generic">${item.genericName}</p>` : ''}
        <p class="product-snippet">${truncateText(item.description, 110)}</p>

        <div class="product-card-footer">
          <span class="product-pack-size">${item.packSize || item.strength || ''}</span>
          <button class="btn btn-secondary btn-sm open-detail-btn" data-id="${item.id}">
            View Details
          </button>
        </div>
      </article>
    `).join('');

    // Attach listeners
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-product-id');
        const product = allProducts.find(p => p.id === id);
        if (product && window.openProductModal) {
          window.openProductModal(product, type);
        }
      });
    });
  }

  function truncateText(str, max) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '...' : str;
  }
}
