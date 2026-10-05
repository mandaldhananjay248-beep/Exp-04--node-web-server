const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeButton) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeButton.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '◐';
  }
}

let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('nodeserve-theme') || 'light';
} catch {
  savedTheme = 'light';
}
applyTheme(savedTheme);

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  try {
    localStorage.setItem('nodeserve-theme', nextTheme);
  } catch {
    // The theme still works for this page if storage is unavailable.
  }
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  });
});

const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
const currentPage = currentPath === '/about' ? 'about' : currentPath === '/contact' ? 'contact' : 'home';
document.querySelector(`[data-nav="${currentPage}"]`)?.setAttribute('aria-current', 'page');

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const counterItems = document.querySelectorAll('[data-counter]');
function showCounter(counter) {
  const target = Number(counter.dataset.counter);
  const startedAt = performance.now();
  const duration = 650;

  function updateCounter(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    counter.textContent = String(Math.round(target * progress));
    if (progress < 1) requestAnimationFrame(updateCounter);
  }

  requestAnimationFrame(updateCounter);
}

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterItems.forEach((counter) => counterObserver.observe(counter));
} else {
  counterItems.forEach((counter) => { counter.textContent = counter.dataset.counter; });
}

const serverCheckButton = document.querySelector('[data-server-check]');
const serverFeedback = document.querySelector('[data-server-feedback]');
serverCheckButton?.addEventListener('click', async () => {
  serverCheckButton.disabled = true;
  if (serverFeedback) serverFeedback.textContent = 'Checking the current page response…';
  try {
    const response = await fetch(window.location.pathname, { method: 'HEAD', cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (serverFeedback) serverFeedback.textContent = 'Express is serving this page successfully!';
  } catch {
    if (serverFeedback) serverFeedback.textContent = 'Could not reach this page. Check that the server is running.';
  } finally {
    serverCheckButton.disabled = false;
  }
});

const contactForm = document.querySelector('[data-contact-form]');
const formFeedback = document.querySelector('[data-form-feedback]');
const validationRules = {
  name: (value) => value.trim() ? '' : 'Please enter your name.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address.',
  subject: (value) => value.trim() ? '' : 'Please enter a subject.',
  message: (value) => value.trim().length >= 20 ? '' : 'Please write at least 20 characters.'
};

function validateField(field) {
  const errorMessage = validationRules[field.name](field.value);
  const errorElement = document.getElementById(`${field.name}-error`);
  field.setAttribute('aria-invalid', String(Boolean(errorMessage)));
  if (errorElement) errorElement.textContent = errorMessage;
  return !errorMessage;
}

contactForm?.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.hasAttribute('aria-invalid')) validateField(field);
    if (formFeedback) formFeedback.textContent = '';
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const isValid = fields.map(validateField).every(Boolean);
  if (!isValid) {
    fields.find((field) => field.getAttribute('aria-invalid') === 'true')?.focus();
    if (formFeedback) formFeedback.textContent = '';
    return;
  }
  if (formFeedback) formFeedback.textContent = 'Message validated successfully! This static demo does not send data to a backend.';
});

contactForm?.addEventListener('reset', () => {
  window.setTimeout(() => {
    contactForm.querySelectorAll('input, textarea').forEach((field) => field.removeAttribute('aria-invalid'));
    contactForm.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
    if (formFeedback) formFeedback.textContent = '';
  }, 0);
});