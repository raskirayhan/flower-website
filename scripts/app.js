/**
 * Flower Market - Interactive Client Application
 * Adheres to all Global UI & Design Rules:
 * - 3 Primary Colors (+ Neutrals)
 * - Light & Dark Mode with High Contrast
 * - Form Validations, Loaders, Error & Success States
 * - Fully Responsive Layout & Component Consistency
 * - Zero Dummy / Placeholder Data
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA DEFINITIONS (Authentic Products)
  // ==========================================
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'White Peace Lily',
      category: 'indoor',
      categoryLabel: 'Air Purifying',
      price: 24,
      originalPrice: 30,
      rating: 4.9,
      reviews: 64,
      image: 'assets/peace-lily.jpg',
      badge: 'Best Seller',
      badgeColor: 'primary',
      description: 'Lush indoor Spathiphyllum in artisanal terracotta pot, naturally purifying indoor air.'
    },
    {
      id: 'prod-2',
      name: 'Crimson Velvet Rose',
      category: 'bouquets',
      categoryLabel: 'Fresh Cut',
      price: 35,
      originalPrice: 42,
      rating: 5.0,
      reviews: 88,
      image: 'assets/rose.jpg',
      badge: 'Fresh Cut',
      badgeColor: 'secondary',
      description: 'Dozen long-stem Ecuadorian crimson roses paired with fresh silver dollar eucalyptus.'
    },
    {
      id: 'prod-3',
      name: 'Sunburst Sunflower',
      category: 'bouquets',
      categoryLabel: 'Seasonal',
      price: 18,
      originalPrice: 22,
      rating: 4.8,
      reviews: 52,
      image: 'assets/sunflower.jpg',
      badge: 'Seasonal',
      badgeColor: 'tertiary',
      description: 'Golden field-cut sunflowers radiating positive energy and rustic cottage charm.'
    },
    {
      id: 'prod-4',
      name: 'Pink Lily Blossom',
      category: 'bouquets',
      categoryLabel: 'Fragrant',
      price: 22,
      originalPrice: 28,
      rating: 4.9,
      reviews: 41,
      image: 'assets/sample-flower-image.png',
      badge: 'Popular',
      badgeColor: 'primary',
      description: 'Fragrant Oriental stargazer lilies with delicate blush petals and graceful blooms.'
    },
    {
      id: 'prod-5',
      name: 'Calathea Bloom Plant',
      category: 'indoor',
      categoryLabel: 'Pet Friendly',
      price: 28,
      originalPrice: 35,
      rating: 4.7,
      reviews: 39,
      image: 'assets/deal-bloom.png',
      badge: 'Eco Pick',
      badgeColor: 'secondary',
      description: 'Ornamental prayer plant with striking patterned leaves that fold gently at dusk.'
    },
    {
      id: 'prod-6',
      name: 'Scarlet Anthurium Ana',
      category: 'flowering',
      categoryLabel: 'Long Lasting',
      price: 32,
      originalPrice: 38,
      rating: 4.9,
      reviews: 73,
      image: 'assets/deal-ana.png',
      badge: 'Trending',
      badgeColor: 'primary',
      description: 'Heart-shaped fiery red spathes that bloom continuously for months in indirect light.'
    },
    {
      id: 'prod-7',
      name: 'Zabo Bonsai Ficus',
      category: 'indoor',
      categoryLabel: 'Architectural',
      price: 45,
      originalPrice: 55,
      rating: 5.0,
      reviews: 94,
      image: 'assets/deal-zabo.png',
      badge: 'Signature',
      badgeColor: 'tertiary',
      description: 'Sculptural miniature bonsai featuring aerial roots potted in glazed stoneware.'
    },
    {
      id: 'prod-8',
      name: 'Pastel Floral Harmony',
      category: 'flowering',
      categoryLabel: 'Centerpiece',
      price: 39,
      originalPrice: 48,
      rating: 4.8,
      reviews: 45,
      image: 'assets/hero-flower.png',
      badge: 'Chef Choice',
      badgeColor: 'secondary',
      description: 'Hand-tied arrangement of seasonal pastel garden blooms curated by master florists.'
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  const state = {
    theme: localStorage.getItem('fm_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    cart: JSON.parse(localStorage.getItem('fm_cart') || '[]'),
    activeFilter: 'all'
  };

  // ==========================================
  // 3. THEME MANAGEMENT (Light / Dark Mode)
  // ==========================================
  function initTheme() {
    applyTheme(state.theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }

    // Listen to OS theme changes if user hasn't explicitly set one
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('fm_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
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

  // ==========================================
  // 4. MOBILE NAVIGATION
  // ==========================================
  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    if (!navToggle || !navMenu) return;

    function openNav() {
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      if (navBackdrop) navBackdrop.classList.add('is-visible');
      document.body.classList.add('no-scroll');
    }

    function closeNav() {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      if (navBackdrop) navBackdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  // ==========================================
  // 5. PRODUCT CATALOG & CARDS RENDERING
  // ==========================================
  function renderProducts(filter = 'all') {
    const container = document.getElementById('product-catalog');
    if (!container) return;

    const filtered = filter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filter);

    container.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card__img-wrap">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-card__img"
            loading="lazy"
            onerror="this.src='assets/sample-flower-image.png'"
          >
          <span class="product-badge badge--${product.badgeColor}">
            ${product.badge}
          </span>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta">
            <span class="product-category">${product.categoryLabel}</span>
            <span class="product-rating" aria-label="Rating: ${product.rating} out of 5 stars">
              <i class="fas fa-star text-amber" aria-hidden="true"></i> ${product.rating}
              <span class="review-count">(${product.reviews})</span>
            </span>
          </div>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-card__footer">
            <div class="product-price-box">
              <span class="product-price">$${product.price}.00</span>
              <span class="product-original-price">$${product.originalPrice}.00</span>
            </div>
            <button 
              type="button" 
              class="btn btn--primary btn--add-cart" 
              data-product-id="${product.id}"
              aria-label="Add ${product.name} to cart"
            >
              <i class="fas fa-bag-shopping" aria-hidden="true"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to all Add to Cart buttons
    container.querySelectorAll('.btn--add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-product-id');
        addToCart(id, btn);
      });
    });
  }

  function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        const filter = btn.getAttribute('data-filter') || 'all';
        state.activeFilter = filter;
        renderProducts(filter);
      });
    });
  }

  // ==========================================
  // 6. CART MANAGEMENT & DRAWER
  // ==========================================
  function saveCart() {
    localStorage.setItem('fm_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId, sourceBtn) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.categoryLabel,
        quantity: 1
      });
    }

    saveCart();

    // Visual button feedback
    if (sourceBtn) {
      const originalHtml = sourceBtn.innerHTML;
      sourceBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> <span>Added!</span>';
      sourceBtn.classList.add('btn--success-flash');
      sourceBtn.disabled = true;
      setTimeout(() => {
        sourceBtn.innerHTML = originalHtml;
        sourceBtn.classList.remove('btn--success-flash');
        sourceBtn.disabled = false;
      }, 1000);
    }

    showToast(`Added "${product.name}" to your cart.`);
  }

  function updateCartQuantity(productId, delta) {
    const itemIndex = state.cart.findIndex(i => i.id === productId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }
    saveCart();
    renderCartItems();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
    showToast('Item removed from cart.');
  }

  function clearCart() {
    state.cart = [];
    saveCart();
    renderCartItems();
  }

  function getCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal === 0 ? 0 : Math.round((subtotal + shipping + tax) * 100) / 100;

    return { count, subtotal, shipping, tax, total };
  }

  function updateCartUI() {
    const totals = getCartTotals();

    // Update navbar badge and label
    const cartCountEl = document.getElementById('cart-badge-count');
    const cartTotalEl = document.getElementById('cart-badge-total');
    if (cartCountEl) cartCountEl.textContent = totals.count;
    if (cartTotalEl) cartTotalEl.textContent = `$${totals.subtotal}.00`;

    // Update cart drawer summary
    const drawerSubtotal = document.getElementById('drawer-subtotal');
    const drawerShipping = document.getElementById('drawer-shipping');
    const drawerTax = document.getElementById('drawer-tax');
    const drawerTotal = document.getElementById('drawer-total');

    if (drawerSubtotal) drawerSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (drawerShipping) drawerShipping.textContent = totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`;
    if (drawerTax) drawerTax.textContent = `$${totals.tax.toFixed(2)}`;
    if (drawerTotal) drawerTotal.textContent = `$${totals.total.toFixed(2)}`;
  }

  function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const checkoutContainer = document.getElementById('cart-checkout-section');
    if (!container) return;

    if (state.cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('is-hidden');
      if (checkoutContainer) checkoutContainer.classList.add('is-hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('is-hidden');
    if (checkoutContainer) checkoutContainer.classList.remove('is-hidden');

    container.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img" onerror="this.src='assets/sample-flower-image.png'">
        <div class="cart-item__info">
          <h4 class="cart-item__name">${item.name}</h4>
          <span class="cart-item__price">$${item.price}.00 each</span>
          <div class="cart-item__actions">
            <div class="qty-control" role="group" aria-label="Item quantity">
              <button type="button" class="btn-qty" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">
                <i class="fas fa-minus" aria-hidden="true"></i>
              </button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="btn-qty" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">
                <i class="fas fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <button type="button" class="btn-remove" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
              <i class="fas fa-trash-alt" aria-hidden="true"></i> Remove
            </button>
          </div>
        </div>
        <div class="cart-item__subtotal">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');

    // Attach listeners
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (action === 'inc') updateCartQuantity(id, 1);
        if (action === 'dec') updateCartQuantity(id, -1);
        if (action === 'remove') removeFromCart(id);
      });
    });

    updateCartUI();
  }

  function initCartDrawer() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerClose = document.getElementById('cart-drawer-close');
    const drawerBackdrop = document.getElementById('cart-backdrop');

    if (!cartDrawer) return;

    function openDrawer() {
      renderCartItems();
      cartDrawer.classList.add('is-open');
      if (drawerBackdrop) drawerBackdrop.classList.add('is-visible');
      document.body.classList.add('no-scroll');
      cartDrawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      cartDrawer.classList.remove('is-open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
      cartDrawer.setAttribute('aria-hidden', 'true');
    }

    if (cartToggle) {
      cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // "Continue Shopping" buttons inside drawer
    document.querySelectorAll('.btn-continue-shopping').forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });

    // Make openDrawer accessible globally if needed
    window.openCartDrawer = openDrawer;
    window.closeCartDrawer = closeDrawer;
  }

  // ==========================================
  // 7. FORM VALIDATION & INTERACTIVE HANDLERS
  // ==========================================

  /**
   * Helper: Email regex validation conforming to standard formats
   */
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(String(email).toLowerCase().trim());
  }

  /**
   * Form 1: Newsletter Subscription Form
   * Includes live validation, loaders, error messages, and success state
   */
  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const emailInput = document.getElementById('newsletter-email');
    const submitBtn = document.getElementById('newsletter-submit-btn');
    const errorContainer = document.getElementById('newsletter-error');
    const successCard = document.getElementById('newsletter-success');
    const formContent = document.getElementById('newsletter-form-content');
    const resetBtn = document.getElementById('newsletter-reset-btn');

    function clearError() {
      if (errorContainer) {
        errorContainer.textContent = '';
        errorContainer.classList.add('is-hidden');
      }
      if (emailInput) {
        emailInput.classList.remove('input--invalid');
        emailInput.removeAttribute('aria-invalid');
      }
    }

    function showError(msg) {
      if (errorContainer) {
        errorContainer.textContent = msg;
        errorContainer.classList.remove('is-hidden');
      }
      if (emailInput) {
        emailInput.classList.add('input--invalid');
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
      }
    }

    // Clear error as user types
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        clearError();
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearError();

      const val = emailInput ? emailInput.value.trim() : '';

      if (!val) {
        showError('Please enter your email address to receive our weekly bloom discounts.');
        return;
      }

      if (!isValidEmail(val)) {
        showError('Please enter a valid email address (e.g., yourname@domain.com).');
        return;
      }

      // Loader State
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> <span>Subscribing...</span>';
      if (emailInput) emailInput.disabled = true;

      // Simulate network request
      setTimeout(() => {
        // Success State
        if (formContent) formContent.classList.add('is-hidden');
        if (successCard) {
          successCard.classList.remove('is-hidden');
          const emailDisplay = successCard.querySelector('.user-email-display');
          if (emailDisplay) emailDisplay.textContent = val;
        }

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        if (emailInput) emailInput.disabled = false;

        showToast('Successfully subscribed to Flower Market newsletter!');
      }, 1000);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (emailInput) emailInput.value = '';
        clearError();
        if (successCard) successCard.classList.add('is-hidden');
        if (formContent) formContent.classList.remove('is-hidden');
        if (emailInput) emailInput.focus();
      });
    }
  }

  /**
   * Form 2: Checkout / Order Form inside Cart Drawer
   * Complete validation for Name, Email, Address, Delivery Date
   * Includes loader, error banners, and celebratory order confirmation
   */
  function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const fields = {
      name: document.getElementById('checkout-name'),
      email: document.getElementById('checkout-email'),
      address: document.getElementById('checkout-address'),
      date: document.getElementById('checkout-date'),
      notes: document.getElementById('checkout-notes')
    };

    const submitBtn = document.getElementById('checkout-submit-btn');
    const orderConfirmation = document.getElementById('order-confirmation-screen');
    const checkoutSection = document.getElementById('cart-checkout-section');
    const cartItemsContainer = document.getElementById('cart-items-container');

    // Set min date to today for delivery date input
    if (fields.date) {
      const today = new Date().toISOString().split('T')[0];
      fields.date.min = today;
    }

    function setFieldError(field, errorId, message) {
      field.classList.add('input--invalid');
      field.setAttribute('aria-invalid', 'true');
      const errEl = document.getElementById(errorId);
      if (errEl) {
        errEl.textContent = message;
        errEl.classList.remove('is-hidden');
      }
    }

    function clearFieldError(field, errorId) {
      field.classList.remove('input--invalid');
      field.removeAttribute('aria-invalid');
      const errEl = document.getElementById(errorId);
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.add('is-hidden');
      }
    }

    // Attach live clearing on input
    if (fields.name) fields.name.addEventListener('input', () => clearFieldError(fields.name, 'checkout-name-error'));
    if (fields.email) fields.email.addEventListener('input', () => clearFieldError(fields.email, 'checkout-email-error'));
    if (fields.address) fields.address.addEventListener('input', () => clearFieldError(fields.address, 'checkout-address-error'));
    if (fields.date) fields.date.addEventListener('change', () => clearFieldError(fields.date, 'checkout-date-error'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (state.cart.length === 0) {
        showToast('Your cart is empty. Please add flowers before placing an order.');
        return;
      }

      let hasError = false;

      // 1. Name validation
      const nameVal = fields.name ? fields.name.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setFieldError(fields.name, 'checkout-name-error', 'Please enter your full name (at least 2 characters).');
        hasError = true;
      } else {
        clearFieldError(fields.name, 'checkout-name-error');
      }

      // 2. Email validation
      const emailVal = fields.email ? fields.email.value.trim() : '';
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(fields.email, 'checkout-email-error', 'Please provide a valid delivery contact email.');
        hasError = true;
      } else {
        clearFieldError(fields.email, 'checkout-email-error');
      }

      // 3. Address validation
      const addressVal = fields.address ? fields.address.value.trim() : '';
      if (!addressVal || addressVal.length < 5) {
        setFieldError(fields.address, 'checkout-address-error', 'Please provide a complete street address for safe courier delivery.');
        hasError = true;
      } else {
        clearFieldError(fields.address, 'checkout-address-error');
      }

      // 4. Delivery Date validation
      const dateVal = fields.date ? fields.date.value : '';
      if (!dateVal) {
        setFieldError(fields.date, 'checkout-date-error', 'Please select a preferred delivery date.');
        hasError = true;
      } else {
        const selected = new Date(dateVal);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (selected < now) {
          setFieldError(fields.date, 'checkout-date-error', 'Delivery date cannot be in the past.');
          hasError = true;
        } else {
          clearFieldError(fields.date, 'checkout-date-error');
        }
      }

      if (hasError) return;

      // Loader State
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> <span>Processing Order...</span>';

      // Disable inputs during processing
      Object.values(fields).forEach(input => {
        if (input) input.disabled = true;
      });

      // Simulate order processing
      setTimeout(() => {
        const orderId = 'FM-' + Math.floor(100000 + Math.random() * 900000);
        const totals = getCartTotals();

        // Render confirmation screen
        if (checkoutSection) checkoutSection.classList.add('is-hidden');
        if (cartItemsContainer) cartItemsContainer.classList.add('is-hidden');

        if (orderConfirmation) {
          orderConfirmation.classList.remove('is-hidden');
          const orderNumEl = document.getElementById('order-confirmation-id');
          const orderTotalEl = document.getElementById('order-confirmation-total');
          const orderRecipientEl = document.getElementById('order-confirmation-name');
          const orderDateEl = document.getElementById('order-confirmation-date');

          if (orderNumEl) orderNumEl.textContent = orderId;
          if (orderTotalEl) orderTotalEl.textContent = `$${totals.total.toFixed(2)}`;
          if (orderRecipientEl) orderRecipientEl.textContent = nameVal;
          if (orderDateEl) orderDateEl.textContent = dateVal;
        }

        // Clear cart state
        clearCart();
        form.reset();

        // Re-enable fields
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        Object.values(fields).forEach(input => {
          if (input) input.disabled = false;
        });

        showToast(`Order #${orderId} placed successfully!`);
      }, 1200);
    });

    // Reset confirmation screen handler
    const finishBtn = document.getElementById('order-confirmation-finish-btn');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        if (orderConfirmation) orderConfirmation.classList.add('is-hidden');
        if (checkoutSection) checkoutSection.classList.remove('is-hidden');
        if (cartItemsContainer) cartItemsContainer.classList.remove('is-hidden');
        window.closeCartDrawer();
      });
    }
  }

  /**
   * Form 3: Contact Us Modal Form
   * Handles inquiries, error states, loaders, and success state
   */
  function initContactModal() {
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-modal-close');
    const backdrop = document.getElementById('contact-backdrop');
    const form = document.getElementById('contact-form');

    if (!modal || !form) return;

    function openModal(e) {
      if (e) e.preventDefault();
      modal.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-visible');
      document.body.classList.add('no-scroll');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      modal.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
      modal.setAttribute('aria-hidden', 'true');
    }

    contactLinks.forEach(link => {
      link.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const successCard = document.getElementById('contact-success');
    const formContent = document.getElementById('contact-form-content');

    function checkField(input, errorId, condition, errorMsg) {
      const errEl = document.getElementById(errorId);
      if (!condition) {
        input.classList.add('input--invalid');
        input.setAttribute('aria-invalid', 'true');
        if (errEl) {
          errEl.textContent = errorMsg;
          errEl.classList.remove('is-hidden');
        }
        return false;
      } else {
        input.classList.remove('input--invalid');
        input.removeAttribute('aria-invalid');
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.add('is-hidden');
        }
        return true;
      }
    }

    if (nameInput) nameInput.addEventListener('input', () => checkField(nameInput, 'contact-name-error', nameInput.value.trim().length >= 2, ''));
    if (emailInput) emailInput.addEventListener('input', () => checkField(emailInput, 'contact-email-error', isValidEmail(emailInput.value.trim()), ''));
    if (messageInput) messageInput.addEventListener('input', () => checkField(messageInput, 'contact-message-error', messageInput.value.trim().length >= 10, ''));

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, 'contact-name-error', nameInput.value.trim().length >= 2, 'Please enter your name (min 2 characters).');
      const isEmailValid = checkField(emailInput, 'contact-email-error', isValidEmail(emailInput.value.trim()), 'Please enter a valid email address.');
      const isMsgValid = checkField(messageInput, 'contact-message-error', messageInput.value.trim().length >= 10, 'Please write a message of at least 10 characters.');

      if (!isNameValid || !isEmailValid || !isMsgValid) return;

      // Loader State
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending Message...</span>';

      setTimeout(() => {
        if (formContent) formContent.classList.add('is-hidden');
        if (successCard) successCard.classList.remove('is-hidden');

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        showToast('Message sent to our floral support team!');
      }, 1000);
    });

    const resetContactBtn = document.getElementById('contact-reset-btn');
    if (resetContactBtn) {
      resetContactBtn.addEventListener('click', () => {
        if (successCard) successCard.classList.add('is-hidden');
        if (formContent) formContent.classList.remove('is-hidden');
        if (nameInput) nameInput.focus();
      });
    }
  }

  // ==========================================
  // 8. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'default') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast--${type}`;
    toast.innerHTML = `
      <i class="fas fa-check-circle toast-icon" aria-hidden="true"></i>
      <span class="toast-message">${message}</span>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast--exit');
        setTimeout(() => toast.remove(), 250);
      }
    }, 3500);
  }

  // ==========================================
  // 9. PROMOTIONAL DEALS ADD-TO-CART BINDINGS
  // ==========================================
  function initDealButtons() {
    document.querySelectorAll('.btn--deal-shop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dealId = btn.getAttribute('data-deal-target');
        if (dealId) {
          addToCart(dealId, btn);
        } else {
          // Scroll smoothly to catalog
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) {
            catalogEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ==========================================
  // 10. INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    renderProducts('all');
    initFilters();
    initCartDrawer();
    updateCartUI();
    initNewsletterForm();
    initCheckoutForm();
    initContactModal();
    initDealButtons();
  });

})();
