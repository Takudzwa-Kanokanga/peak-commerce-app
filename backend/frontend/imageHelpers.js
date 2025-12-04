// Simple frontend helpers for images
// - parseImages(product): returns array of image URLs from product object
// - lazyLoadImage(imgEl): attaches lazy-loading behavior to an <img> element

export function parseImages(product) {
  if (!product) return [];
  if (Array.isArray(product.images) && product.images.length > 0) return product.images;
  if (product.imageUrl) {
    try {
      const parsed = JSON.parse(product.imageUrl);
      return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch {
      return [String(product.imageUrl)];
    }
  }
  return [];
}

export function lazyLoadImage(imgEl, opts = {}) {
  if (!('IntersectionObserver' in window)) {
    // fallback: set src immediately
    imgEl.src = imgEl.dataset.src || imgEl.getAttribute('data-src');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.src = el.dataset.src || el.getAttribute('data-src');
        observer.unobserve(el);
      }
    });
  }, opts);

  observer.observe(imgEl);
}

// Usage (example):
// const images = parseImages(product);
// <img data-src="/uploads/.." alt="..." />
// lazyLoadImage(document.querySelector('img'));
