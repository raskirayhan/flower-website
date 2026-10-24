/**
 * Flower Market - Authentication System
 * Handles Login, Registration, Demo Logins, Role Persistence, and Validation
 */

(function () {
  'use strict';

  // Demo Credentials
  const DEMO_ACCOUNTS = {
    user: {
      email: 'user@flowermarket.shop',
      password: 'FlowerUser2026!',
      name: 'Rayhan Raski',
      role: 'user',
      title: 'Floral Club VIP'
    },
    admin: {
      email: 'admin@flowermarket.shop',
      password: 'FlowerAdmin2026!',
      name: 'Rayhan Admin',
      role: 'admin',
      title: 'Senior Administrator'
    },
    manager: {
      email: 'manager@flowermarket.shop',
      password: 'FlowerManager2026!',
      name: 'Store Operations Manager',
      role: 'manager',
      title: 'Greenhouse Manager'
    }
  };

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase().trim());
  }

  // Set User Session
  function setSession(account) {
    localStorage.setItem('fm_logged_in', 'true');
    localStorage.setItem('fm_user_role', account.role);
    localStorage.setItem('fm_user_name', account.name);
    localStorage.setItem('fm_user_email', account.email);
    localStorage.setItem('fm_user_title', account.title);
  }

  // Password Visibility Toggle
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.className = 'fas fa-eye-slash';
        } else {
          input.type = 'password';
          if (icon) icon.className = 'fas fa-eye';
        }
      });
    });
  }

  // Login Form
  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitBtn = document.getElementById('login-submit-btn');
    const alertBox = document.getElementById('login-alert');

    function showAlert(msg) {
      if (alertBox) {
        alertBox.textContent = msg;
        alertBox.classList.remove('is-hidden');
      }
    }

    function clearAlert() {
      if (alertBox) {
        alertBox.textContent = '';
        alertBox.classList.add('is-hidden');
      }
    }

    // Demo Auto-fill Buttons
    document.querySelectorAll('[data-demo-role]').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-demo-role');
        const acc = DEMO_ACCOUNTS[role];
        if (acc) {
          if (emailInput) emailInput.value = acc.email;
          if (passwordInput) passwordInput.value = acc.password;
          clearAlert();
          // Visual feedback
          btn.classList.add('btn--success-flash');
          setTimeout(() => btn.classList.remove('btn--success-flash'), 600);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAlert();

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email || !isValidEmail(email)) {
        showAlert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!password || password.length < 6) {
        showAlert('Password must contain at least 6 characters.');
        if (passwordInput) passwordInput.focus();
        return;
      }

      // Loader State
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Authenticating...</span>';

      setTimeout(() => {
        // Match demo accounts or default to regular user
        let matched = Object.values(DEMO_ACCOUNTS).find(a => a.email.toLowerCase() === email.toLowerCase());
        if (!matched) {
          matched = {
            email: email,
            name: email.split('@')[0],
            role: 'user',
            title: 'Floral Enthusiast'
          };
        }

        setSession(matched);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Redirect to Dashboard
        window.location.href = 'dashboard.html';
      }, 900);
    });

    // Social Logins Simulation
    document.querySelectorAll('.social-login-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-provider') || 'Google';
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;
        setTimeout(() => {
          setSession(DEMO_ACCOUNTS.user);
          window.location.href = 'dashboard.html';
        }, 1000);
      });
    });
  }

  // Registration Form
  function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm-password');
    const submitBtn = document.getElementById('register-submit-btn');
    const alertBox = document.getElementById('register-alert');

    function showAlert(msg) {
      if (alertBox) {
        alertBox.textContent = msg;
        alertBox.classList.remove('is-hidden');
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (alertBox) alertBox.classList.add('is-hidden');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirm = confirmInput ? confirmInput.value : '';

      if (!name || name.length < 2) {
        showAlert('Please enter your full name (minimum 2 letters).');
        return;
      }
      if (!email || !isValidEmail(email)) {
        showAlert('Please provide a valid email address.');
        return;
      }
      if (!password || password.length < 6) {
        showAlert('Password must contain at least 6 characters.');
        return;
      }
      if (password !== confirm) {
        showAlert('Passwords do not match. Please re-enter.');
        return;
      }

      // Loader
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Creating Account...</span>';

      setTimeout(() => {
        setSession({
          name: name,
          email: email,
          role: 'user',
          title: 'New Floral Club Member'
        });
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initLoginForm();
    initRegisterForm();
  });

})();
