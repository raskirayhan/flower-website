/**
 * Flower Market - Role-Based Dashboard Engine
 * Supports User, Admin, and Manager views, Dynamic SVG Charts,
 * Paginated and Filterable Data Tables, and Profile Editing.
 */

(function () {
  'use strict';

  // State
  const state = {
    theme: localStorage.getItem('fm_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    role: localStorage.getItem('fm_user_role') || 'admin',
    userName: localStorage.getItem('fm_user_name') || 'Rayhan Raski',
    userEmail: localStorage.getItem('fm_user_email') || 'admin@flowermarket.shop',
    userTitle: localStorage.getItem('fm_user_title') || 'Administrator',
    activeTab: 'overview',
    ordersPage: 1,
    ordersPerPage: 5,
    ordersFilter: 'all',
    ordersSearch: '',
    inventoryPage: 1,
    inventoryPerPage: 5,
    inventorySearch: ''
  };

  // Mock Orders Data
  const MOCK_ORDERS = [
    { id: 'FM-10842', customer: 'Sophia Martinez', items: 'White Peace Lily, Calathea Bloom', total: 52.00, date: 'Oct 24, 2026', status: 'In Transit', color: 'primary' },
    { id: 'FM-10841', customer: 'David Chen', items: 'Crimson Velvet Rose (Dozen)', total: 35.00, date: 'Oct 24, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10840', customer: 'Claire Gallagher', items: 'Pastel Floral Harmony', total: 39.00, date: 'Oct 23, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10839', customer: 'Hannah Miller', items: 'Sunburst Sunflower × 2', total: 36.00, date: 'Oct 23, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10838', customer: 'Liam O’Connor', items: 'Zabo Bonsai Ficus', total: 45.00, date: 'Oct 22, 2026', status: 'Arranging', color: 'amber' },
    { id: 'FM-10837', customer: 'Amber Davies', items: 'Calathea Bloom Plant', total: 28.00, date: 'Oct 22, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10836', customer: 'Rachel Adams', items: 'Pastel Floral Harmony, Vase', total: 49.00, date: 'Oct 21, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10835', customer: 'Marcus Vance', items: 'Emerald Snake Plant', total: 26.00, date: 'Oct 20, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10834', customer: 'Olivia Wilde', items: 'Lavender Mist Orchid', total: 36.00, date: 'Oct 19, 2026', status: 'Delivered', color: 'success' },
    { id: 'FM-10833', customer: 'Emma Watson', items: 'Rustic Wildflower Medley', total: 29.00, date: 'Oct 18, 2026', status: 'Delivered', color: 'success' }
  ];

  // 1. Theme Management
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('fm_theme', state.theme);
        toggleBtn.querySelector('i').className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      });
    }
  }

  // 2. Role Switching & Sidebar Updates
  function initRoles() {
    const roleSelect = document.getElementById('dashboard-role-selector');
    if (roleSelect) {
      roleSelect.value = state.role;
      roleSelect.addEventListener('change', () => {
        state.role = roleSelect.value;
        localStorage.setItem('fm_user_role', state.role);
        applyRoleVisibility();
        renderSidebar();
        showToast(`Switched active view to ${state.role.toUpperCase()} Role`);
      });
    }

    applyRoleVisibility();
    renderSidebar();
  }

  function applyRoleVisibility() {
    // Update badge in top bar
    const roleBadge = document.getElementById('user-role-badge');
    if (roleBadge) {
      roleBadge.textContent = state.role.toUpperCase();
      roleBadge.className = `role-pill role-pill--${state.role}`;
    }

    const userNameEl = document.getElementById('dashboard-user-name');
    if (userNameEl) userNameEl.textContent = state.userName;

    const userEmailEl = document.getElementById('dashboard-user-email');
    if (userEmailEl) userEmailEl.textContent = state.userEmail;

    // Filter cards and sections by role
    document.querySelectorAll('[data-role-required]').forEach(el => {
      const allowed = el.getAttribute('data-role-required').split(',');
      if (allowed.includes(state.role) || allowed.includes('all')) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  function renderSidebar() {
    const nav = document.getElementById('dashboard-sidebar-nav');
    if (!nav) return;

    // Defined items based on role requirements:
    // User: min 4 items
    // Admin: min 6 items
    const menus = {
      user: [
        { id: 'overview', icon: 'gauge-high', label: 'My Garden Overview' },
        { id: 'orders', icon: 'basket-shopping', label: 'My Floral Orders' },
        { id: 'wishlist', icon: 'heart', label: 'Saved Wishlist' },
        { id: 'profile', icon: 'user-gear', label: 'Botanical Profile' }
      ],
      admin: [
        { id: 'overview', icon: 'gauge-high', label: 'Admin Overview & KPIs' },
        { id: 'orders', icon: 'truck-ramp-box', label: 'All Orders & Logistics' },
        { id: 'inventory', icon: 'boxes-stacked', label: 'Plant Stock & Inventory' },
        { id: 'customers', icon: 'users', label: 'Member Accounts' },
        { id: 'analytics', icon: 'chart-pie', label: 'Revenue Analytics' },
        { id: 'profile', icon: 'user-shield', label: 'Admin Settings & Profile' }
      ],
      manager: [
        { id: 'overview', icon: 'gauge-high', label: 'Storefront Operations' },
        { id: 'orders', icon: 'truck-ramp-box', label: 'Courier Dispatch' },
        { id: 'inventory', icon: 'boxes-stacked', label: 'Greenhouse Inventory' },
        { id: 'analytics', icon: 'chart-line', label: 'Performance Metrics' },
        { id: 'profile', icon: 'user-gear', label: 'Manager Profile' }
      ]
    };

    const currentMenu = menus[state.role] || menus.admin;

    nav.innerHTML = currentMenu.map(m => `
      <button type="button" class="sidebar-item ${state.activeTab === m.id ? 'is-active' : ''}" data-tab="${m.id}">
        <i class="fas fa-${m.icon}"></i>
        <span>${m.label}</span>
      </button>
    `).join('');

    nav.querySelectorAll('.sidebar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        nav.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.activeTab = btn.getAttribute('data-tab');
        switchTab(state.activeTab);
      });
    });
  }

  function switchTab(tabId) {
    document.querySelectorAll('.dashboard-tab-panel').forEach(panel => {
      panel.classList.add('is-hidden');
    });

    const target = document.getElementById(`tab-${tabId}`) || document.getElementById('tab-overview');
    if (target) target.classList.remove('is-hidden');
  }

  // 3. Dynamic Interactive Charts (SVG Generated)
  function renderCharts() {
    renderSalesTrendChart();
    renderCategoryPieChart();
    renderDeliveryBarChart();
  }

  function renderSalesTrendChart() {
    const container = document.getElementById('sales-trend-chart');
    if (!container) return;

    // Monthly data points
    const points = [
      { month: 'May', val: 24000 },
      { month: 'Jun', val: 29500 },
      { month: 'Jul', val: 33000 },
      { month: 'Aug', val: 38200 },
      { month: 'Sep', val: 42100 },
      { month: 'Oct', val: 48250 }
    ];

    const maxVal = 55000;
    const width = 540;
    const height = 180;
    const pad = 35;

    const svgPoints = points.map((p, idx) => {
      const x = pad + (idx * ((width - pad * 2) / (points.length - 1)));
      const y = height - pad - ((p.val / maxVal) * (height - pad * 1.5));
      return { x, y, month: p.month, val: p.val };
    });

    const pathD = svgPoints.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
    const fillArea = `${pathD} L ${svgPoints[svgPoints.length - 1].x} ${height - pad} L ${svgPoints[0].x} ${height - pad} Z`;

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <!-- Horizontal Grid Lines -->
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="var(--border-subtle)" stroke-width="1"/>
        <line x1="${pad}" y1="${(height - pad) / 2}" x2="${width - pad}" y2="${(height - pad) / 2}" stroke="var(--border-subtle)" stroke-width="1" stroke-dasharray="4"/>
        
        <!-- Area & Line -->
        <path d="${fillArea}" fill="url(#salesGrad)" />
        <path d="${pathD}" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" />
        
        <!-- Points & Labels -->
        ${svgPoints.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--bg-surface)" stroke="var(--color-primary)" stroke-width="2.5" />
          <text x="${p.x}" y="${height - 10}" font-size="11" text-anchor="middle" fill="var(--text-muted)">${p.month}</text>
          <text x="${p.x}" y="${p.y - 8}" font-size="10" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">$${(p.val / 1000).toFixed(0)}k</text>
        `).join('')}
      </svg>
    `;
  }

  function renderCategoryPieChart() {
    const container = document.getElementById('category-pie-chart');
    if (!container) return;

    // 4 categories: Fresh Bouquets 42%, Indoor Greens 28%, Flowering 18%, Bonsai 12%
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-around; width: 100%; height: 100%;">
        <svg viewBox="0 0 160 160" width="130" height="130">
          <!-- Donut segments -->
          <circle r="50" cx="80" cy="80" fill="transparent" stroke="var(--color-primary)" stroke-width="24" stroke-dasharray="132 314" stroke-dashoffset="0"/>
          <circle r="50" cx="80" cy="80" fill="transparent" stroke="var(--color-secondary)" stroke-width="24" stroke-dasharray="88 314" stroke-dashoffset="-132"/>
          <circle r="50" cx="80" cy="80" fill="transparent" stroke="var(--color-tertiary)" stroke-width="24" stroke-dasharray="56 314" stroke-dashoffset="-220"/>
          <circle r="50" cx="80" cy="80" fill="transparent" stroke="#6366F1" stroke-width="24" stroke-dasharray="38 314" stroke-dashoffset="-276"/>
          <text x="80" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--text-primary)">100%</text>
        </svg>
        <div class="pie-legend">
          <div><span style="background-color: var(--color-primary);"></span> Bouquets (42%)</div>
          <div><span style="background-color: var(--color-secondary);"></span> Indoor (28%)</div>
          <div><span style="background-color: var(--color-tertiary);"></span> Flowering (18%)</div>
          <div><span style="background-color: #6366F1;"></span> Bonsai (12%)</div>
        </div>
      </div>
    `;
  }

  function renderDeliveryBarChart() {
    const container = document.getElementById('delivery-bar-chart');
    if (!container) return;

    const days = [
      { d: 'Mon', count: 28 },
      { d: 'Tue', count: 34 },
      { d: 'Wed', count: 42 },
      { d: 'Thu', count: 39 },
      { d: 'Fri', count: 58 },
      { d: 'Sat', count: 64 },
      { d: 'Sun', count: 32 }
    ];

    const max = 70;
    container.innerHTML = `
      <div class="bar-chart-flex">
        ${days.map(item => `
          <div class="bar-col">
            <div class="bar-fill-wrap">
              <div class="bar-fill" style="height: ${(item.count / max) * 100}%;"></div>
            </div>
            <span class="bar-label">${item.d}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 4. Data Tables with Pagination and Filtering
  function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-tbody');
    const pagination = document.getElementById('orders-pagination');
    if (!tbody) return;

    // Filter
    let filtered = MOCK_ORDERS.filter(o => {
      const matchStatus = state.ordersFilter === 'all' || o.status.toLowerCase() === state.ordersFilter.toLowerCase();
      const matchSearch = !state.ordersSearch || 
        o.id.toLowerCase().includes(state.ordersSearch.toLowerCase()) || 
        o.customer.toLowerCase().includes(state.ordersSearch.toLowerCase());
      return matchStatus && matchSearch;
    });

    const totalPages = Math.ceil(filtered.length / state.ordersPerPage) || 1;
    if (state.ordersPage > totalPages) state.ordersPage = totalPages;

    const start = (state.ordersPage - 1) * state.ordersPerPage;
    const pageItems = filtered.slice(start, start + state.ordersPerPage);

    tbody.innerHTML = pageItems.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td><span class="text-truncate-cell">${o.items}</span></td>
        <td>$${o.total.toFixed(2)}</td>
        <td>${o.date}</td>
        <td>
          <span class="status-pill status-pill--${o.status === 'Delivered' ? 'green' : (o.status === 'In Transit' ? 'blue' : 'amber')}">
            ${o.status}
          </span>
        </td>
        <td>
          <button type="button" class="btn-action-view" onclick="alert('Viewing receipt for ${o.id}');">
            <i class="fas fa-file-invoice"></i> Receipt
          </button>
        </td>
      </tr>
    `).join('');

    // Pagination Controls
    if (pagination) {
      pagination.innerHTML = `
        <div class="pagination-info">Showing ${start + 1}–${Math.min(start + state.ordersPerPage, filtered.length)} of ${filtered.length} orders</div>
        <div class="pagination-controls">
          <button type="button" class="btn-page" ${state.ordersPage === 1 ? 'disabled' : ''} id="orders-prev-btn"><i class="fas fa-chevron-left"></i></button>
          <span class="page-indicator">Page ${state.ordersPage} of ${totalPages}</span>
          <button type="button" class="btn-page" ${state.ordersPage === totalPages ? 'disabled' : ''} id="orders-next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      `;

      const prev = document.getElementById('orders-prev-btn');
      const next = document.getElementById('orders-next-btn');
      if (prev) prev.addEventListener('click', () => { state.ordersPage--; renderOrdersTable(); });
      if (next) next.addEventListener('click', () => { state.ordersPage++; renderOrdersTable(); });
    }
  }

  function initOrdersFilters() {
    const searchInput = document.getElementById('orders-search-input');
    const filterSelect = document.getElementById('orders-status-filter');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.ordersSearch = searchInput.value.trim();
        state.ordersPage = 1;
        renderOrdersTable();
      });
    }
    if (filterSelect) {
      filterSelect.addEventListener('change', () => {
        state.ordersFilter = filterSelect.value;
        state.ordersPage = 1;
        renderOrdersTable();
      });
    }
  }

  function renderInventoryTable() {
    const tbody = document.getElementById('inventory-table-tbody');
    const pagination = document.getElementById('inventory-pagination');
    if (!tbody || typeof PRODUCTS_DATA === 'undefined') return;

    let filtered = PRODUCTS_DATA.filter(p => {
      return !state.inventorySearch || 
        p.name.toLowerCase().includes(state.inventorySearch.toLowerCase()) || 
        p.categoryLabel.toLowerCase().includes(state.inventorySearch.toLowerCase());
    });

    const totalPages = Math.ceil(filtered.length / state.inventoryPerPage) || 1;
    if (state.inventoryPage > totalPages) state.inventoryPage = totalPages;

    const start = (state.inventoryPage - 1) * state.inventoryPerPage;
    const pageItems = filtered.slice(start, start + state.inventoryPerPage);

    tbody.innerHTML = pageItems.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 34px; height: 34px; border-radius: 6px; object-fit: cover;">
            <span>${p.name}</span>
          </div>
        </td>
        <td><span class="product-badge badge--${p.badgeColor}">${p.categoryLabel}</span></td>
        <td>$${p.price}.00</td>
        <td>
          <span style="font-weight: 700; color: ${p.stockCount < 10 ? 'var(--color-error)' : 'var(--color-success)'};">
            ${p.stockCount} in stock
          </span>
        </td>
        <td>
          <button type="button" class="btn-action-view" onclick="alert('Restock ordered for ${p.name}');">
            <i class="fas fa-plus"></i> Restock
          </button>
        </td>
      </tr>
    `).join('');

    if (pagination) {
      pagination.innerHTML = `
        <div class="pagination-info">Showing ${start + 1}–${Math.min(start + state.inventoryPerPage, filtered.length)} of ${filtered.length} products</div>
        <div class="pagination-controls">
          <button type="button" class="btn-page" ${state.inventoryPage === 1 ? 'disabled' : ''} id="inv-prev-btn"><i class="fas fa-chevron-left"></i></button>
          <span class="page-indicator">Page ${state.inventoryPage} of ${totalPages}</span>
          <button type="button" class="btn-page" ${state.inventoryPage === totalPages ? 'disabled' : ''} id="inv-next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      `;
      const prev = document.getElementById('inv-prev-btn');
      const next = document.getElementById('inv-next-btn');
      if (prev) prev.addEventListener('click', () => { state.inventoryPage--; renderInventoryTable(); });
      if (next) next.addEventListener('click', () => { state.inventoryPage++; renderInventoryTable(); });
    }
  }

  function initInventoryFilters() {
    const searchInput = document.getElementById('inventory-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.inventorySearch = searchInput.value.trim();
        state.inventoryPage = 1;
        renderInventoryTable();
      });
    }
  }

  // 5. Editable Profile Form
  function initProfileForm() {
    const form = document.getElementById('dashboard-profile-form');
    if (!form) return;

    const nameInput = document.getElementById('prof-name');
    const emailInput = document.getElementById('prof-email');
    const phoneInput = document.getElementById('prof-phone');
    const addressInput = document.getElementById('prof-address');

    if (nameInput) nameInput.value = state.userName;
    if (emailInput) emailInput.value = state.userEmail;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('prof-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Saving Profile...</span>';

      setTimeout(() => {
        state.userName = nameInput.value.trim() || state.userName;
        state.userEmail = emailInput.value.trim() || state.userEmail;
        localStorage.setItem('fm_user_name', state.userName);
        localStorage.setItem('fm_user_email', state.userEmail);

        applyRoleVisibility();

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Botanical profile details updated successfully!');
      }, 700);
    });
  }

  // 6. Toast Notification
  function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = 'toast-item';
    t.innerHTML = `<i class="fas fa-check-circle toast-icon"></i> <span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => { t.remove(); }, 3500);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRoles();
    renderCharts();
    renderOrdersTable();
    initOrdersFilters();
    renderInventoryTable();
    initInventoryFilters();
    initProfileForm();
  });

})();
