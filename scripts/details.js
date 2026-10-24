/**
 * Flower Market - Dedicated Details Page Logic
 * Handles interactive image gallery, specifications, customer reviews,
 * related items, cart interactions, and theme persistence.
 */

(function () {
  'use strict';

  // State
  const state = {
    theme: localStorage.getItem('fm_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    cart: JSON.parse(localStorage.getItem('fm_cart') || '[]'),
    product: null,
    currentImageIndex: 0,
    quantity: 1,
    isLoggedIn: localStorage.getItem('fm_logged_in') === 'true'
  };

  // 1. Theme Management
  function initTheme() {
    applyTheme(state.theme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fm_theme', theme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      const label = toggleBtn.querySelector('.theme-label');
      if (theme === 'dark') {
        if (icon) icon.className = 'fas fa-sun';
        if (label) label.textContent = 'Light Mode';
        toggleBtn.setAttribute('aria-label', 'Switch to light theme');
      } else {
        if (icon) icon.className = 'fas fa-moon';
        if (label) label.textContent = 'Dark Mode';
        toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  // 2. Navigation & Auth Simulation
  function initNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('is-open');
        navMenu.classList.toggle('is-open', !isOpen);
        if (navBackdrop) navBackdrop.classList.toggle('is-visible', !isOpen);
        document.body.classList.toggle('no-scroll', !isOpen);
      });
      if (navBackdrop) {
        navBackdrop.addEventListener('click', () => {
          navMenu.classList.remove('is-open');
          navBackdrop.classList.remove('is-visible');
          document.body.classList.remove('no-scroll');
        });
      }
    }

    // Profile Dropdown
    const profileBtn = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.classList.contains('is-active');
        profileDropdown.classList.toggle('is-active', !isOpen);
        profileBtn.setAttribute('aria-expanded', String(!isOpen));
      });
      document.addEventListener('click', () => {
        profileDropdown.classList.remove('is-active');
        profileBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Auth Toggle in Profile Menu
    const authToggleBtn = document.getElementById('auth-toggle-btn');
    if (authToggleBtn) {
      authToggleBtn.addEventListener('click', () => {
        state.isLoggedIn = !state.isLoggedIn;
        localStorage.setItem('fm_logged_in', String(state.isLoggedIn));
        updateNavAuthUI();
        showToast(state.isLoggedIn ? 'Welcome back, Rayhan Raski!' : 'Signed out successfully.');
      });
    }

    updateNavAuthUI();
  }

  function updateNavAuthUI() {
    const authItems = document.querySelectorAll('.nav-auth-only');
    const authStatusText = document.getElementById('auth-status-text');
    const authToggleBtn = document.getElementById('auth-toggle-btn');

    authItems.forEach(item => {
      item.style.display = state.isLoggedIn ? 'block' : 'none';
    });

    if (authStatusText) {
      authStatusText.textContent = state.isLoggedIn ? 'Signed in as Rayhan Raski' : 'Guest Visitor';
    }
    if (authToggleBtn) {
      authToggleBtn.innerHTML = state.isLoggedIn 
        ? '<i class="fas fa-sign-out-alt"></i> <span>Sign Out</span>' 
        : '<i class="fas fa-sign-in-alt"></i> <span>Sign In as Member</span>';
    }
  }

  // 3. Load & Render Product
  function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('id') || 'prod-1';
    state.product = getProductById(prodId) || PRODUCTS_DATA[0];

    document.title = `${state.product.name} — Flower Market Details`;

    // Breadcrumbs
    const bcName = document.getElementById('breadcrumb-product-name');
    if (bcName) bcName.textContent = state.product.name;

    // Gallery
    renderGallery();

    // Primary Info
    document.getElementById('details-title').textContent = state.product.name;
    document.getElementById('details-sci-name').textContent = state.product.scientificName;
    document.getElementById('details-category').textContent = state.product.categoryLabel;
    document.getElementById('details-origin').textContent = state.product.origin;
    document.getElementById('details-rating').innerHTML = `
      <i class="fas fa-star text-amber"></i> ${state.product.rating}
      <span style="color: var(--text-muted); font-weight: normal;">(${state.product.reviewsCount} customer reviews)</span>
    `;
    document.getElementById('details-price').textContent = `$${state.product.price}.00`;
    document.getElementById('details-original-price').textContent = `$${state.product.originalPrice}.00`;
    document.getElementById('details-short-desc').textContent = state.product.shortDescription;

    // Overview Tab
    document.getElementById('details-overview').textContent = state.product.fullDescription;

    // Specifications Grid
    renderSpecs();

    // Customer Reviews
    renderReviews();

    // Related Products
    renderRelated();

    // Attach Cart Action Listeners
    initActions();
  }

  function renderGallery() {
    const mainImg = document.getElementById('gallery-main-img');
    const thumbContainer = document.getElementById('gallery-thumbnails');
    if (!mainImg || !thumbContainer) return;

    mainImg.src = state.product.images[state.currentImageIndex] || state.product.images[0];
    mainImg.alt = `${state.product.name} photo`;

    thumbContainer.innerHTML = state.product.images.map((img, idx) => `
      <button 
        type="button" 
        class="gallery-thumb-btn ${idx === state.currentImageIndex ? 'is-active' : ''}" 
        data-index="${idx}"
        aria-label="View photo ${idx + 1}"
      >
        <img src="${img}" alt="Thumbnail ${idx + 1}" onerror="this.src='assets/sample-flower-image.png'">
      </button>
    `).join('');

    thumbContainer.querySelectorAll('.gallery-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.currentImageIndex = idx;
        mainImg.src = state.product.images[idx];
        thumbContainer.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  }

  function renderSpecs() {
    const container = document.getElementById('details-specs-grid');
    if (!container) return;

    const s = state.product.specs;
    const items = [
      { label: 'Plant Height / Spread', val: s.height, icon: 'ruler-vertical' },
      { label: 'Vessel / Pot Size', val: s.potDiameter, icon: 'box-archive' },
      { label: 'Light Exposure', val: s.lightRequirement, icon: 'sun' },
      { label: 'Watering Frequency', val: s.wateringFrequency, icon: 'droplet' },
      { label: 'Pet Safety Rating', val: s.petSafety, icon: 'shield-cat' },
      { label: 'Bloom Longevity', val: s.bloomLongevity, icon: 'hourglass-half' },
      { label: 'Fragrance Profile', val: s.fragrance, icon: 'wind' },
      { label: 'Eco Packaging', val: s.packaging, icon: 'recycle' }
    ];

    container.innerHTML = items.map(item => `
      <div class="spec-card">
        <div class="spec-icon">
          <i class="fas fa-${item.icon}" aria-hidden="true"></i>
        </div>
        <div class="spec-content">
          <span class="spec-label">${item.label}</span>
          <strong class="spec-value">${item.val}</strong>
        </div>
      </div>
    `).join('');
  }

  function renderReviews() {
    const list = document.getElementById('details-reviews-list');
    const avgScore = document.getElementById('details-review-score');
    if (!list) return;

    if (avgScore) avgScore.textContent = state.product.rating.toFixed(1);

    list.innerHTML = state.product.reviews.map(rev => `
      <div class="review-item">
        <div class="review-header">
          <div class="review-author-meta">
            <div class="review-avatar">${rev.author.charAt(0)}</div>
            <div>
              <strong class="review-author-name">${rev.author}</strong>
              ${rev.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Buyer</span>' : ''}
              <div class="review-date">${rev.date}</div>
            </div>
          </div>
          <div class="review-stars" aria-label="${rev.rating} out of 5 stars">
            ${Array.from({ length: 5 }, (_, i) => `<i class="fas fa-star ${i < Math.floor(rev.rating) ? 'text-amber' : 'text-muted'}"></i>`).join('')}
          </div>
        </div>
        <p class="review-comment">“${rev.comment}”</p>
      </div>
    `).join('');
  }

  function renderRelated() {
    const container = document.getElementById('details-related-grid');
    if (!container) return;

    const relatedProducts = state.product.relatedIds
      .map(id => getProductById(id))
      .filter(Boolean);

    container.innerHTML = relatedProducts.map(p => `
      <article class="product-card">
        <div class="product-card__img-wrap">
          <img src="${p.images[0]}" alt="${p.name}" class="product-card__img" onerror="this.src='assets/sample-flower-image.png'">
          <span class="product-badge badge--${p.badgeColor}">${p.badge}</span>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta">
            <span class="product-category">${p.categoryLabel}</span>
            <span class="product-rating"><i class="fas fa-star text-amber"></i> ${p.rating}</span>
          </div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.shortDescription}</p>
          <div class="product-card__footer">
            <div class="product-price-box">
              <span class="product-price">$${p.price}.00</span>
              <span class="product-original-price">$${p.originalPrice}.00</span>
            </div>
            <a href="details.html?id=${p.id}" class="btn btn--outline" style="height: 38px; padding: 0 12px; font-size: 0.8125rem;">
              <span>Details</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function initActions() {
    // Quantity controls
    const qtyValEl = document.getElementById('details-qty-val');
    const decBtn = document.getElementById('details-qty-dec');
    const incBtn = document.getElementById('details-qty-inc');

    if (decBtn && incBtn && qtyValEl) {
      decBtn.addEventListener('click', () => {
        if (state.quantity > 1) {
          state.quantity--;
          qtyValEl.textContent = state.quantity;
        }
      });
      incBtn.addEventListener('click', () => {
        if (state.quantity < 20) {
          state.quantity++;
          qtyValEl.textContent = state.quantity;
        }
      });
    }

    // Add to Cart
    const addBtn = document.getElementById('details-add-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(state.product.id, state.quantity, addBtn);
      });
    }

    // Buy Now (Add + open drawer checkout)
    const buyNowBtn = document.getElementById('details-buy-now-btn');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        addToCart(state.product.id, state.quantity);
        if (window.openCartDrawer) window.openCartDrawer();
      });
    }
  }

  // 4. Cart Management & Drawer
  function saveCart() {
    localStorage.setItem('fm_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId, qty = 1, sourceBtn) {
    const product = getProductById(productId);
    if (!product) return;

    const existing = state.cart.find(i => i.id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.categoryLabel,
        quantity: qty
      });
    }

    saveCart();

    if (sourceBtn) {
      const original = sourceBtn.innerHTML;
      sourceBtn.innerHTML = '<i class="fas fa-check"></i> <span>Added to Cart!</span>';
      sourceBtn.classList.add('btn--success-flash');
      setTimeout(() => {
        sourceBtn.innerHTML = original;
        sourceBtn.classList.remove('btn--success-flash');
      }, 1200);
    }

    showToast(`Added ${qty} × "${product.name}" to cart.`);
  }

  function getCartTotals() {
    const subtotal = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const count = state.cart.reduce((s, i) => s + i.quantity, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal === 0 ? 0 : Math.round((subtotal + shipping + tax) * 100) / 100;
    return { count, subtotal, shipping, tax, total };
  }

  function updateCartUI() {
    const totals = getCartTotals();
    const countEl = document.getElementById('cart-badge-count');
    const totalEl = document.getElementById('cart-badge-total');
    if (countEl) countEl.textContent = totals.count;
    if (totalEl) totalEl.textContent = `$${totals.subtotal}.00`;

    const subtotalEl = document.getElementById('drawer-subtotal');
    const shippingEl = document.getElementById('drawer-shipping');
    const taxEl = document.getElementById('drawer-tax');
    const drawerTotalEl = document.getElementById('drawer-total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (drawerTotalEl) drawerTotalEl.textContent = `$${totals.total.toFixed(2)}`;
  }

  function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const checkoutSec = document.getElementById('cart-checkout-section');
    if (!container) return;

    if (state.cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('is-hidden');
      if (checkoutSec) checkoutSec.classList.add('is-hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('is-hidden');
    if (checkoutSec) checkoutSec.classList.remove('is-hidden');

    container.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img" onerror="this.src='assets/sample-flower-image.png'">
        <div class="cart-item__info">
          <h4 class="cart-item__name">${item.name}</h4>
          <span class="cart-item__price">$${item.price}.00 each</span>
          <div class="cart-item__actions">
            <div class="qty-control">
              <button type="button" class="btn-qty" data-action="dec" data-id="${item.id}"><i class="fas fa-minus"></i></button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="btn-qty" data-action="inc" data-id="${item.id}"><i class="fas fa-plus"></i></button>
            </div>
            <button type="button" class="btn-remove" data-action="remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="cart-item__subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        const idx = state.cart.findIndex(i => i.id === id);
        if (idx === -1) return;
        if (action === 'inc') state.cart[idx].quantity++;
        if (action === 'dec') {
          state.cart[idx].quantity--;
          if (state.cart[idx].quantity <= 0) state.cart.splice(idx, 1);
        }
        if (action === 'remove') state.cart.splice(idx, 1);
        saveCart();
        renderCartItems();
      });
    });

    updateCartUI();
  }

  function initCartDrawer() {
    const toggle = document.getElementById('cart-toggle');
    const drawer = document.getElementById('cart-drawer');
    const closeBtn = document.getElementById('cart-drawer-close');
    const backdrop = document.getElementById('cart-backdrop');

    if (!drawer) return;

    function open() {
      renderCartItems();
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-visible');
      document.body.classList.add('no-scroll');
    }
    function close() {
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }

    if (toggle) toggle.addEventListener('click', (e) => { e.preventDefault(); open(); });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    window.openCartDrawer = open;
    window.closeCartDrawer = close;
  }

  // 5. Toast System
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <i class="fas fa-check-circle toast-icon"></i>
      <span class="toast-message">${message}</span>
      <button type="button" class="toast-close">&times;</button>
    `;
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 3500);
  }

  // 6. Checkout in Details Drawer
  function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (state.cart.length === 0) {
        showToast('Cart is empty. Please add flowers before placing an order.');
        return;
      }
      const submitBtn = document.getElementById('checkout-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Processing Order...</span>';
      }

      setTimeout(() => {
        const orderId = 'FM-' + Math.floor(100000 + Math.random() * 900000);
        state.cart = [];
        saveCart();
        renderCartItems();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-lock"></i> <span>Place Secure Order</span>';
        }
        showToast(`Order #${orderId} confirmed successfully!`);
        window.closeCartDrawer();
      }, 1000);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    loadProduct();
    initCartDrawer();
    updateCartUI();
    initCheckoutForm();
  });

})();
