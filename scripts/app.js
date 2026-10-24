/**
 * Flower Market - Interactive Client Application
 * Supporting all sections:
 * - Advanced Navbar (Logged in / Logged out states, Profile Menu)
 * - Hero Slider (Autoplay, next/prev, dots, 60-70% height)
 * - Skeleton Loader for Card Section
 * - 4-cards-per-row Core Listing with Meta Info & "View Details"
 * - FAQ Accordion
 * - Deals Countdown Timer
 * - Journal Reader Modal
 * - Cart Drawer & Checkout Form Validation
 * - Newsletter Validation with Loader & Success States
 */

(function () {
  'use strict';

  // State Management
  const state = {
    theme: localStorage.getItem('fm_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    cart: JSON.parse(localStorage.getItem('fm_cart') || '[]'),
    activeFilter: 'all',
    currentHeroSlide: 0,
    heroAutoplayTimer: null,
    isLoggedIn: localStorage.getItem('fm_logged_in') === 'true'
  };

  // ==========================================
  // 1. THEME MANAGEMENT (Light / Dark Mode)
  // ==========================================
  function initTheme() {
    applyTheme(state.theme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

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
        toggleBtn.setAttribute('title', 'Switch to light theme');
      } else {
        if (icon) icon.className = 'fas fa-moon';
        if (label) label.textContent = 'Dark Mode';
        toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        toggleBtn.setAttribute('title', 'Switch to dark theme');
      }
    }
  }

  // ==========================================
  // 2. NAVBAR & ADVANCED PROFILE MENU
  // ==========================================
  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');

    if (navToggle && navMenu) {
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
        if (navMenu.classList.contains('is-open')) {
          closeNav();
        } else {
          openNav();
        }
      });

      if (navBackdrop) navBackdrop.addEventListener('click', closeNav);

      navMenu.querySelectorAll('a').forEach(l => {
        l.addEventListener('click', () => closeNav());
      });
    }

    // Advanced Profile Dropdown
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

    // Sign in / Sign out Simulator Toggle
    const authToggleBtn = document.getElementById('auth-toggle-btn');
    if (authToggleBtn) {
      authToggleBtn.addEventListener('click', () => {
        state.isLoggedIn = !state.isLoggedIn;
        localStorage.setItem('fm_logged_in', String(state.isLoggedIn));
        updateNavAuthUI();
        showToast(state.isLoggedIn ? 'Welcome back, Rayhan Raski! (Member routes unlocked)' : 'You have signed out.');
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

  // ==========================================
  // 3. HERO SLIDER (60-70% Height, Autoplay)
  // ==========================================
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const sliderContainer = document.querySelector('.hero-slider');

    if (slides.length === 0) return;

    function goToSlide(index) {
      slides.forEach((s, i) => {
        s.classList.toggle('is-active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === index);
        d.setAttribute('aria-selected', String(i === index));
      });
      state.currentHeroSlide = index;
    }

    function nextSlide() {
      const next = (state.currentHeroSlide + 1) % slides.length;
      goToSlide(next);
    }

    function prevSlide() {
      const prev = (state.currentHeroSlide - 1 + slides.length) % slides.length;
      goToSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
    });

    function startAutoplay() {
      state.heroAutoplayTimer = setInterval(nextSlide, 5500);
    }

    function pauseAutoplay() {
      if (state.heroAutoplayTimer) clearInterval(state.heroAutoplayTimer);
    }

    function resetAutoplay() {
      pauseAutoplay();
      startAutoplay();
    }

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', pauseAutoplay);
      sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  // ==========================================
  // 4. CORE LISTING WITH SKELETON LOADER
  // ==========================================
  function renderSkeletonLoader(count = 8) {
    const container = document.getElementById('product-catalog');
    if (!container) return;

    container.innerHTML = Array.from({ length: count }, () => `
      <div class="product-card skeleton-card" aria-hidden="true">
        <div class="skeleton-box skeleton-img"></div>
        <div class="skeleton-meta-row">
          <div class="skeleton-box skeleton-text-short"></div>
          <div class="skeleton-box skeleton-text-badge"></div>
        </div>
        <div class="skeleton-box skeleton-title"></div>
        <div class="skeleton-box skeleton-desc"></div>
        <div class="skeleton-box skeleton-desc" style="width: 70%;"></div>
        <div class="skeleton-footer">
          <div class="skeleton-box skeleton-price"></div>
          <div class="skeleton-box skeleton-btn"></div>
        </div>
      </div>
    `).join('');
  }

  function renderProducts(filter = 'all') {
    const container = document.getElementById('product-catalog');
    if (!container) return;

    // Trigger Skeleton Loader
    renderSkeletonLoader(8);

    setTimeout(() => {
      const filtered = filter === 'all' 
        ? PRODUCTS_DATA 
        : PRODUCTS_DATA.filter(p => p.category === filter);

      container.innerHTML = filtered.map(product => `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card__img-wrap">
            <img 
              src="${product.images[0]}" 
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
              <span class="product-rating" aria-label="Rating: ${product.rating} stars">
                <i class="fas fa-star text-amber"></i> ${product.rating}
                <span class="review-count">(${product.reviewsCount})</span>
              </span>
            </div>

            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.shortDescription}</p>

            <!-- Card Meta Info: Harvest Date & Location Origin -->
            <div class="product-card__ext-meta">
              <span><i class="fas fa-calendar-check text-secondary-color"></i> ${product.dateAdded}</span>
              <span><i class="fas fa-location-dot text-primary-color"></i> ${product.origin}</span>
            </div>

            <div class="product-card__footer">
              <div class="product-price-box">
                <span class="product-price">$${product.price}.00</span>
                <span class="product-original-price">$${product.originalPrice}.00</span>
              </div>
              
              <!-- Two Actions: View Details and Add to Cart -->
              <div class="product-btn-group">
                <a 
                  href="details.html?id=${product.id}" 
                  class="btn btn--outline btn--view-details"
                  aria-label="View details for ${product.name}"
                >
                  <i class="fas fa-circle-info" aria-hidden="true"></i>
                  <span>Details</span>
                </a>
                <button 
                  type="button" 
                  class="btn btn--primary btn--add-cart" 
                  data-product-id="${product.id}"
                  aria-label="Add ${product.name} to cart"
                >
                  <i class="fas fa-bag-shopping" aria-hidden="true"></i>
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `).join('');

      // Add to Cart Handlers
      container.querySelectorAll('.btn--add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-product-id');
          addToCart(id, 1, btn);
        });
      });
    }, 450); // Shimmer duration
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

    // Category Section Cards click-to-filter
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const cat = card.getAttribute('data-category');
        if (cat) {
          const matchingFilterBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
          if (matchingFilterBtn) {
            matchingFilterBtn.click();
          }
          const catSection = document.getElementById('catalog');
          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================
  // 5. CART MANAGEMENT & DRAWER
  // ==========================================
  function saveCart() {
    localStorage.setItem('fm_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId, qty = 1, sourceBtn) {
    const product = getProductById(productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
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
      sourceBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> <span>Added!</span>';
      sourceBtn.classList.add('btn--success-flash');
      sourceBtn.disabled = true;
      setTimeout(() => {
        sourceBtn.innerHTML = original;
        sourceBtn.classList.remove('btn--success-flash');
        sourceBtn.disabled = false;
      }, 1000);
    }

    showToast(`Added ${qty} × "${product.name}" to cart.`);
  }

  function updateCartQuantity(productId, delta) {
    const idx = state.cart.findIndex(i => i.id === productId);
    if (idx === -1) return;
    state.cart[idx].quantity += delta;
    if (state.cart[idx].quantity <= 0) {
      state.cart.splice(idx, 1);
    }
    saveCart();
    renderCartItems();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
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
    const cartCountEl = document.getElementById('cart-badge-count');
    const cartTotalEl = document.getElementById('cart-badge-total');
    if (cartCountEl) cartCountEl.textContent = totals.count;
    if (cartTotalEl) cartTotalEl.textContent = `$${totals.subtotal}.00`;

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
                <i class="fas fa-minus"></i>
              </button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="btn-qty" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button type="button" class="btn-remove" data-action="remove" data-id="${item.id}">
              <i class="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>
        <div class="cart-item__subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

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
    }

    function closeDrawer() {
      cartDrawer.classList.remove('is-open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }

    if (cartToggle) {
      cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) closeDrawer();
    });

    document.querySelectorAll('.btn-continue-shopping').forEach(b => {
      b.addEventListener('click', closeDrawer);
    });

    window.openCartDrawer = openDrawer;
    window.closeCartDrawer = closeDrawer;
  }

  // ==========================================
  // 6. DEALS COUNTDOWN TIMER
  // ==========================================
  function initDealsTimer() {
    const timerEls = document.querySelectorAll('.deal-timer');
    if (timerEls.length === 0) return;

    // Target: 2 days, 14 hours from now
    const target = new Date(Date.now() + (2 * 24 + 14) * 3600 * 1000);

    function update() {
      const now = new Date();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      const str = `${String(d).padStart(2, '0')}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
      timerEls.forEach(el => { el.textContent = str; });
    }

    update();
    setInterval(update, 1000);
  }

  // ==========================================
  // 7. FAQ ACCORDION
  // ==========================================
  function initAccordion() {
    const accordions = document.querySelectorAll('.faq-item');
    accordions.forEach(item => {
      const trigger = item.querySelector('.faq-question');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others
        accordions.forEach(other => {
          other.classList.remove('is-open');
          const t = other.querySelector('.faq-question');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================
  // 8. BOTANICAL JOURNAL / BLOG MODAL
  // ==========================================
  const BLOG_POSTS = {
    'post-1': {
      title: '5 Secrets to Make Cut Flowers Last 2 Weeks',
      date: 'October 20, 2026',
      readTime: '4 min read',
      author: 'Eleanor Vance, Head Florist',
      content: `
        <p>Fresh-cut flowers bring an unmistakable aura of beauty into any living space, but watching them wilt within three days can be heartbreaking. Here are the 5 science-backed botanical practices our florists use daily:</p>
        <h4 style="margin: 1rem 0 0.5rem;">1. The 45-Degree Underwater Stem Cut</h4>
        <p>Never cut flower stems flat across! Cutting at a 45-degree angle under a gentle stream of lukewarm water prevents air bubbles (embolisms) from locking up the xylem tubes. This ensures unobstructed water uptake.</p>
        <h4 style="margin: 1rem 0 0.5rem;">2. Sterile Vase Sanitation</h4>
        <p>Bacteria is the #1 enemy of stem longevity. Wash your vase with hot soapy water and a drop of bleach before filling with floral water.</p>
        <h4 style="margin: 1rem 0 0.5rem;">3. Strip Submerged Leaves</h4>
        <p>Any foliage submerged beneath the water level quickly rots, creating foul odors and breeding bacterial colonies that plug the stem base.</p>
        <h4 style="margin: 1rem 0 0.5rem;">4. Location Matters: Away from Ethylene</h4>
        <p>Keep your arrangement away from ripening fruit (bananas, apples) and direct sunlight. Fruit emits ethylene gas, which signals flowers to rapidly mature and drop petals.</p>
        <h4 style="margin: 1rem 0 0.5rem;">5. Refresh Water Every 48 Hours</h4>
        <p>Change vase water completely every two days and add half a sachet of flower food. Your blooms will easily flourish for 12 to 14 days!</p>
      `
    },
    'post-2': {
      title: 'Top 7 Low-Light Houseplants for Calm Workspaces',
      date: 'October 16, 2026',
      readTime: '6 min read',
      author: 'Marcus Lin, Horticulturist',
      content: `
        <p>Not every office or study desk receives direct morning sun, but that shouldn't stop you from surrounding yourself with lush greenery. Research demonstrates that desk plants improve concentration by 15% and significantly lower ambient stress.</p>
        <h4 style="margin: 1rem 0 0.5rem;">The Best Low-Light Champions:</h4>
        <ul style="list-style: disc; padding-left: 1.5rem; line-height: 1.8;">
          <li><strong>White Peace Lily:</strong> Beautiful glossy foliage that actively filters indoor airborne VOCs and signals when it needs water.</li>
          <li><strong>ZZ Plant (Zamioculcas zamiifolia):</strong> Virtually indestructible; tolerates fluorescent lighting and dry office air.</li>
          <li><strong>Cast Iron Plant (Aspidistra elatior):</strong> True to its name, endures temperature swings and dim corners.</li>
          <li><strong>Snake Plant (Sansevieria):</strong> Produces oxygen overnight and requires watering only once every 3 weeks.</li>
          <li><strong>Golden Pothos:</strong> Cascading trailing vines that thrive under desk lamps.</li>
        </ul>
      `
    },
    'post-3': {
      title: 'The Art of Color Pairing: Harmonizing Pastels & Emeralds',
      date: 'October 11, 2026',
      readTime: '5 min read',
      author: 'Sophia Rossi, Botanical Stylist',
      content: `
        <p>Floral arrangement is an art form rooted in chromatic balance and textural juxtaposition. In this guide, we explore how pairing delicate blush florals with deep emerald greenery creates an instant sense of peaceful luxury.</p>
        <h4 style="margin: 1rem 0 0.5rem;">The 60-30-10 Floral Rule</h4>
        <p>Apply the interior design principle to your bouquets: 60% dominant foliage or base flowers (deep greens), 30% secondary bloom color (blush, cream, soft lilac), and 10% bold chromatic accent (crimson rose or golden sunflower).</p>
      `
    }
  };

  function initJournalModal() {
    const modal = document.getElementById('journal-modal');
    const closeBtn = document.getElementById('journal-modal-close');
    const backdrop = document.getElementById('journal-backdrop');
    const titleEl = document.getElementById('journal-modal-title');
    const metaEl = document.getElementById('journal-modal-meta');
    const bodyEl = document.getElementById('journal-modal-body');

    if (!modal) return;

    function openArticle(postId) {
      const post = BLOG_POSTS[postId];
      if (!post) return;

      if (titleEl) titleEl.textContent = post.title;
      if (metaEl) metaEl.innerHTML = `<span><i class="fas fa-calendar"></i> ${post.date}</span> • <span><i class="fas fa-clock"></i> ${post.readTime}</span> • <span><i class="fas fa-user"></i> ${post.author}</span>`;
      if (bodyEl) bodyEl.innerHTML = post.content;

      modal.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-visible');
      document.body.classList.add('no-scroll');
    }

    function closeModal() {
      modal.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }

    document.querySelectorAll('[data-blog-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-blog-id');
        openArticle(id);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  // ==========================================
  // 9. FORMS: NEWSLETTER & CHECKOUT VALIDATION
  // ==========================================
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(String(email).toLowerCase().trim());
  }

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

    if (emailInput) emailInput.addEventListener('input', clearError);

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
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
      if (emailInput) emailInput.disabled = true;

      setTimeout(() => {
        if (formContent) formContent.classList.add('is-hidden');
        if (successCard) {
          successCard.classList.remove('is-hidden');
          const emailDisplay = successCard.querySelector('.user-email-display');
          if (emailDisplay) emailDisplay.textContent = val;
        }

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

  function initCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const fields = {
      name: document.getElementById('checkout-name'),
      email: document.getElementById('checkout-email'),
      address: document.getElementById('checkout-address'),
      date: document.getElementById('checkout-date')
    };

    const submitBtn = document.getElementById('checkout-submit-btn');
    const orderConfirmation = document.getElementById('order-confirmation-screen');
    const checkoutSection = document.getElementById('cart-checkout-section');
    const cartItemsContainer = document.getElementById('cart-items-container');

    if (fields.date) {
      fields.date.min = new Date().toISOString().split('T')[0];
    }

    function setFieldError(field, errorId, msg) {
      field.classList.add('input--invalid');
      const err = document.getElementById(errorId);
      if (err) {
        err.textContent = msg;
        err.classList.remove('is-hidden');
      }
    }

    function clearFieldError(field, errorId) {
      field.classList.remove('input--invalid');
      const err = document.getElementById(errorId);
      if (err) {
        err.textContent = '';
        err.classList.add('is-hidden');
      }
    }

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

      const nameVal = fields.name ? fields.name.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setFieldError(fields.name, 'checkout-name-error', 'Please enter your full name (at least 2 characters).');
        hasError = true;
      }

      const emailVal = fields.email ? fields.email.value.trim() : '';
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(fields.email, 'checkout-email-error', 'Please provide a valid delivery contact email.');
        hasError = true;
      }

      const addressVal = fields.address ? fields.address.value.trim() : '';
      if (!addressVal || addressVal.length < 5) {
        setFieldError(fields.address, 'checkout-address-error', 'Please provide a complete street address.');
        hasError = true;
      }

      const dateVal = fields.date ? fields.date.value : '';
      if (!dateVal) {
        setFieldError(fields.date, 'checkout-date-error', 'Please select a preferred delivery date.');
        hasError = true;
      }

      if (hasError) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Processing Order...</span>';

      setTimeout(() => {
        const orderId = 'FM-' + Math.floor(100000 + Math.random() * 900000);
        const totals = getCartTotals();

        if (checkoutSection) checkoutSection.classList.add('is-hidden');
        if (cartItemsContainer) cartItemsContainer.classList.add('is-hidden');

        if (orderConfirmation) {
          orderConfirmation.classList.remove('is-hidden');
          const numEl = document.getElementById('order-confirmation-id');
          const totalEl = document.getElementById('order-confirmation-total');
          const recEl = document.getElementById('order-confirmation-name');
          const dtEl = document.getElementById('order-confirmation-date');

          if (numEl) numEl.textContent = orderId;
          if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
          if (recEl) recEl.textContent = nameVal;
          if (dtEl) dtEl.textContent = dateVal;
        }

        clearCart();
        form.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        showToast(`Order #${orderId} placed successfully!`);
      }, 1200);
    });

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

  // ==========================================
  // 10. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'default') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast--${type}`;
    toast.innerHTML = `
      <i class="fas fa-check-circle toast-icon"></i>
      <span class="toast-message">${message}</span>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast--exit');
        setTimeout(() => toast.remove(), 250);
      }
    }, 3500);
  }

  // Deals Claim Button
  function initDealButtons() {
    document.querySelectorAll('.btn--deal-shop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dealId = btn.getAttribute('data-deal-target');
        if (dealId) {
          addToCart(dealId, 1, btn);
        } else {
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================
  // 11. INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initHeroSlider();
    renderProducts('all');
    initFilters();
    initCartDrawer();
    updateCartUI();
    initDealsTimer();
    initAccordion();
    initJournalModal();
    initNewsletterForm();
    initCheckoutForm();
    initDealButtons();
  });

})();
