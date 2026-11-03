/**
 * Smart Shop (Product Explorer)
 * Module 2 Final Exam: HTML, CSS & JavaScript
 * 
 * Tasks Implemented:
 * 1. Fetch products from the API when the application starts.
 * 2. Display products dynamically as responsive cards.
 * 3. Show image, title, category, price and rating.
 * 4. Add a search box that filters products by title.
 * 5. Add an "Add to Wishlist" button on every product.
 * 6. Save wishlist items using localStorage.
 * 7. Allow users to remove items from the wishlist.
 * 8. Show loading and error messages appropriately.
 * 9. Display an appropriate message when no products match the search.
 */

// --------------------------------------------------------------------------
// 1. Application State (As explicitly required by exam instructions)
// --------------------------------------------------------------------------
const state = {
  products: [],
  wishlist: [],
  search: ""
};

// Auxiliary state for enhanced features (category filtering and sorting)
const viewSettings = {
  selectedCategory: "all",
  sortBy: "featured"
};

// API Endpoint configuration
const API_URL = "https://dummyjson.com/products?limit=100";
const STORAGE_KEY = "smart_shop_wishlist_v1";

// --------------------------------------------------------------------------
// 2. DOM Elements Cache
// --------------------------------------------------------------------------
const DOM = {
  // Main Views & Containers
  productsGrid: document.getElementById("productsGrid"),
  loadingState: document.getElementById("loadingState"),
  skeletonGrid: document.getElementById("skeletonGrid"),
  errorState: document.getElementById("errorState"),
  errorMessage: document.getElementById("errorMessage"),
  retryBtn: document.getElementById("retryBtn"),
  emptyState: document.getElementById("emptyState"),
  emptyMessage: document.getElementById("emptyMessage"),
  resetSearchBtn: document.getElementById("resetSearchBtn"),
  
  // Search & Filters
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  categoryFilterBar: document.getElementById("categoryFilterBar"),
  sortSelect: document.getElementById("sortSelect"),
  displayedCount: document.getElementById("displayedCount"),

  // Wishlist Drawer & Badges
  wishlistTriggerBtn: document.getElementById("wishlistTriggerBtn"),
  wishlistBadgeCount: document.getElementById("wishlistBadgeCount"),
  drawerWishlistCount: document.getElementById("drawerWishlistCount"),
  wishlistDrawer: document.getElementById("wishlistDrawer"),
  wishlistModalBackdrop: document.getElementById("wishlistModalBackdrop"),
  closeWishlistBtn: document.getElementById("closeWishlistBtn"),
  wishlistEmptyState: document.getElementById("wishlistEmptyState"),
  wishlistCardsContainer: document.getElementById("wishlistCardsContainer"),
  wishlistDrawerFooter: document.getElementById("wishlistDrawerFooter"),
  wishlistTotalPrice: document.getElementById("wishlistTotalPrice"),
  clearAllWishlistBtn: document.getElementById("clearAllWishlistBtn"),
  exploreProductsBtn: document.getElementById("exploreProductsBtn"),

  // Quick View Modal
  productDetailModal: document.getElementById("productDetailModal"),
  modalProductContent: document.getElementById("modalProductContent"),
  closeDetailModalBtn: document.getElementById("closeDetailModalBtn"),

  // Toast Container
  toastContainer: document.getElementById("toastContainer")
};

// --------------------------------------------------------------------------
// 3. LocalStorage Persistence Layer
// --------------------------------------------------------------------------

/**
 * Load saved wishlist items from browser localStorage
 */
function loadWishlistFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.wishlist = parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse wishlist from localStorage:", err);
    state.wishlist = [];
  }
}

/**
 * Persist current wishlist state to browser localStorage
 */
function saveWishlistToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
  } catch (err) {
    console.error("Failed to save wishlist to localStorage:", err);
  }
}

// --------------------------------------------------------------------------
// 4. API Service & Data Fetching
// --------------------------------------------------------------------------

/**
 * Fetch products from the DummyJSON API
 */
async function fetchProducts() {
  showLoading();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("Invalid response format received from products API.");
    }

    // Populate state.products
    state.products = data.products;

    // Render category filters based on fetched products
    buildCategoryFilterBar();

    // Render products grid
    renderProducts();
  } catch (error) {
    console.error("API Fetch Error:", error);
    showError(error.message || "Could not retrieve products. Please verify your connection.");
  }
}

// --------------------------------------------------------------------------
// 5. Wishlist Management Operations
// --------------------------------------------------------------------------

/**
 * Check if a product is already in the user's wishlist
 * @param {number} productId 
 * @returns {boolean}
 */
function isInWishlist(productId) {
  return state.wishlist.some(item => item.id === productId);
}

/**
 * Toggle a product in or out of the wishlist
 * @param {Object} product 
 */
function toggleWishlist(product) {
  const index = state.wishlist.findIndex(item => item.id === product.id);

  if (index > -1) {
    // Remove from wishlist
    state.wishlist.splice(index, 1);
    showToast(`Removed "${product.title}" from wishlist`, "remove");
  } else {
    // Add to wishlist
    state.wishlist.push({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
      rating: product.rating
    });
    showToast(`Added "${product.title}" to wishlist`, "add");
  }

  // Persist updated wishlist
  saveWishlistToStorage();

  // Update UI components
  updateWishlistBadge();
  renderWishlistDrawer();
  updateProductCardWishlistButtons();
}

/**
 * Remove a specific product by ID from wishlist
 * @param {number} productId 
 */
function removeFromWishlist(productId) {
  const product = state.wishlist.find(item => item.id === productId);
  state.wishlist = state.wishlist.filter(item => item.id !== productId);

  saveWishlistToStorage();
  updateWishlistBadge();
  renderWishlistDrawer();
  updateProductCardWishlistButtons();

  if (product) {
    showToast(`Removed "${product.title}" from wishlist`, "remove");
  }
}

/**
 * Clear the entire wishlist
 */
function clearAllWishlist() {
  if (state.wishlist.length === 0) return;
  state.wishlist = [];
  saveWishlistToStorage();
  updateWishlistBadge();
  renderWishlistDrawer();
  updateProductCardWishlistButtons();
  showToast("Wishlist cleared", "remove");
}

// --------------------------------------------------------------------------
// 6. UI Rendering Functions
// --------------------------------------------------------------------------

/**
 * Generate visual star rating HTML string
 * @param {number} rating 
 * @returns {string}
 */
function generateStarRating(rating) {
  const rounded = Math.round(rating * 2) / 2; // round to nearest 0.5
  let starsHtml = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      starsHtml += "★";
    } else if (i - 0.5 === rounded) {
      starsHtml += "★";
    } else {
      starsHtml += "☆";
    }
  }

  return `
    <span class="stars-container" title="${rating.toFixed(2)} out of 5 stars">${starsHtml}</span>
    <span class="rating-score">${rating.toFixed(1)}</span>
  `;
}

/**
 * Get the filtered and sorted list of products based on state.search and viewSettings
 */
function getVisibleProducts() {
  let list = [...state.products];

  // 1. Filter by search query (Task 4: filter products by title)
  const query = state.search.trim().toLowerCase();
  if (query.length > 0) {
    list = list.filter(item => item.title.toLowerCase().includes(query));
  }

  // 2. Filter by category
  if (viewSettings.selectedCategory !== "all") {
    list = list.filter(item => item.category === viewSettings.selectedCategory);
  }

  // 3. Apply sorting
  switch (viewSettings.sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "title-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // "featured" preserves original API order
      break;
  }

  return list;
}

/**
 * Render the main products grid
 */
function renderProducts() {
  hideLoading();
  hideError();

  const visibleProducts = getVisibleProducts();

  // Update counter
  DOM.displayedCount.textContent = visibleProducts.length;

  // Task 9: Display appropriate message when no products match the search
  if (visibleProducts.length === 0) {
    DOM.productsGrid.innerHTML = "";
    DOM.productsGrid.style.display = "none";
    DOM.emptyState.style.display = "flex";

    if (state.search.trim().length > 0) {
      DOM.emptyMessage.innerHTML = `No products found matching <strong>"${escapeHtml(state.search)}"</strong>. Try checking your spelling or clear the search.`;
    } else if (viewSettings.selectedCategory !== "all") {
      DOM.emptyMessage.innerHTML = `No products found in category <strong>"${escapeHtml(viewSettings.selectedCategory)}"</strong>.`;
    } else {
      DOM.emptyMessage.textContent = "No products available at this time.";
    }
    return;
  }

  // Hide empty state and show grid
  DOM.emptyState.style.display = "none";
  DOM.productsGrid.style.display = "grid";

  // Build card elements (Tasks 2, 3, 5)
  DOM.productsGrid.innerHTML = visibleProducts.map(product => {
    const wishlisted = isInWishlist(product.id);
    const thumbnail = product.thumbnail || (product.images && product.images[0]) || "";
    const discount = product.discountPercentage ? `<span class="card-discount-badge">-${Math.round(product.discountPercentage)}%</span>` : "";

    return `
      <article class="product-card" data-id="${product.id}">
        <!-- Media / Thumbnail (Task 3) -->
        <div class="card-media-wrapper" onclick="openProductDetailModal(${product.id})">
          <img 
            src="${escapeHtml(thumbnail)}" 
            alt="${escapeHtml(product.title)}" 
            class="card-image" 
            loading="lazy"
            onerror="this.onerror=null; this.src='https://placehold.co/400x300?text=No+Image';"
          >
          <!-- Category Tag (Task 3) -->
          <span class="card-category-badge">${escapeHtml(product.category)}</span>
        </div>

        <!-- Body -->
        <div class="card-body">
          <!-- Title (Task 3) -->
          <h3 class="card-title" onclick="openProductDetailModal(${product.id})" title="${escapeHtml(product.title)}">
            ${escapeHtml(product.title)}
          </h3>

          <!-- Rating (Task 3) -->
          <div class="card-rating-row">
            ${generateStarRating(product.rating || 0)}
          </div>

          <!-- Price (Task 3) -->
          <div class="card-price-row">
            <span class="card-price">$${Number(product.price).toFixed(2)}</span>
            ${discount}
          </div>

          <!-- Add to Wishlist Button (Task 5) -->
          <div class="card-footer-action">
            <button 
              type="button" 
              class="btn-card-wishlist ${wishlisted ? 'active' : ''}" 
              data-wishlist-id="${product.id}"
              aria-label="${wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <span>${wishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach event listeners to newly rendered wishlist buttons
  DOM.productsGrid.querySelectorAll(".btn-card-wishlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-wishlist-id"), 10);
      const product = state.products.find(p => p.id === id);
      if (product) {
        toggleWishlist(product);
      }
    });
  });
}

/**
 * Dynamically synchronize all product card wishlist button styles
 */
function updateProductCardWishlistButtons() {
  document.querySelectorAll(".btn-card-wishlist").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-wishlist-id"), 10);
    const wishlisted = isInWishlist(id);
    const span = btn.querySelector("span");
    const svg = btn.querySelector("svg");

    if (wishlisted) {
      btn.classList.add("active");
      if (span) span.textContent = "In Wishlist";
      if (svg) svg.setAttribute("fill", "currentColor");
      btn.setAttribute("aria-label", "Remove from Wishlist");
    } else {
      btn.classList.remove("active");
      if (span) span.textContent = "Add to Wishlist";
      if (svg) svg.setAttribute("fill", "none");
      btn.setAttribute("aria-label", "Add to Wishlist");
    }
  });
}

/**
 * Update wishlist counter badges in header and drawer
 */
function updateWishlistBadge() {
  const count = state.wishlist.length;
  DOM.wishlistBadgeCount.textContent = count;
  DOM.drawerWishlistCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
}

/**
 * Render the wishlist drawer list (Task 7: remove items from wishlist)
 */
function renderWishlistDrawer() {
  const count = state.wishlist.length;

  if (count === 0) {
    DOM.wishlistEmptyState.style.display = "flex";
    DOM.wishlistCardsContainer.innerHTML = "";
    DOM.wishlistDrawerFooter.style.display = "none";
    return;
  }

  DOM.wishlistEmptyState.style.display = "none";
  DOM.wishlistDrawerFooter.style.display = "block";

  // Calculate total price
  const total = state.wishlist.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  DOM.wishlistTotalPrice.textContent = `$${total.toFixed(2)}`;

  // Render wishlist cards
  DOM.wishlistCardsContainer.innerHTML = state.wishlist.map(item => `
    <div class="wishlist-card" data-id="${item.id}">
      <div class="wishlist-card-media">
        <img 
          src="${escapeHtml(item.thumbnail)}" 
          alt="${escapeHtml(item.title)}"
          onerror="this.onerror=null; this.src='https://placehold.co/100x100?text=No+Image';"
        >
      </div>
      <div class="wishlist-card-info">
        <h4 class="wishlist-card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h4>
        <div class="wishlist-card-meta">
          <span>${escapeHtml(item.category || '')}</span>
          ${item.rating ? `&bull; <span>★ ${Number(item.rating).toFixed(1)}</span>` : ''}
        </div>
        <div class="wishlist-card-price">$${Number(item.price).toFixed(2)}</div>
      </div>
      <button 
        type="button" 
        class="btn-remove-wishlist" 
        data-remove-id="${item.id}"
        title="Remove from Wishlist"
        aria-label="Remove ${escapeHtml(item.title)} from wishlist"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  `).join("");

  // Attach remove handlers
  DOM.wishlistCardsContainer.querySelectorAll(".btn-remove-wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-remove-id"), 10);
      removeFromWishlist(id);
    });
  });
}

/**
 * Dynamically extract categories from state.products and build category filter pills
 */
function buildCategoryFilterBar() {
  const categories = Array.from(new Set(state.products.map(p => p.category))).sort();

  DOM.categoryFilterBar.innerHTML = `
    <button class="filter-pill ${viewSettings.selectedCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">All Products</button>
    ${categories.map(cat => `
      <button class="filter-pill ${viewSettings.selectedCategory === cat ? 'active' : ''}" data-category="${escapeHtml(cat)}" role="tab">
        ${escapeHtml(cat)}
      </button>
    `).join("")}
  `;

  // Attach click listener to category pills
  DOM.categoryFilterBar.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.categoryFilterBar.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      viewSettings.selectedCategory = pill.getAttribute("data-category");
      renderProducts();
    });
  });
}

// --------------------------------------------------------------------------
// 7. Loading, Error & Feedback States (Task 8)
// --------------------------------------------------------------------------

/**
 * Show loading shimmer skeleton cards
 */
function showLoading() {
  DOM.loadingState.style.display = "block";
  DOM.errorState.style.display = "none";
  DOM.emptyState.style.display = "none";
  DOM.productsGrid.style.display = "none";

  // Build 8 skeleton cards
  DOM.skeletonGrid.innerHTML = Array.from({ length: 8 }).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-box skeleton-media"></div>
      <div class="skeleton-box skeleton-tag"></div>
      <div class="skeleton-box skeleton-title"></div>
      <div class="skeleton-box skeleton-title-short"></div>
      <div class="skeleton-box skeleton-rating"></div>
      <div class="skeleton-box skeleton-price"></div>
      <div class="skeleton-box skeleton-button"></div>
    </div>
  `).join("");
}

/**
 * Hide loading skeletons
 */
function hideLoading() {
  DOM.loadingState.style.display = "none";
}

/**
 * Display error state with message
 * @param {string} msg 
 */
function showError(msg) {
  hideLoading();
  DOM.productsGrid.style.display = "none";
  DOM.emptyState.style.display = "none";
  DOM.errorState.style.display = "flex";
  DOM.errorMessage.textContent = msg;
}

/**
 * Hide error state
 */
function hideError() {
  DOM.errorState.style.display = "none";
}

/**
 * Non-intrusive Toast Notification
 * @param {string} message 
 * @param {'add'|'remove'} type 
 */
function showToast(message, type = "add") {
  const toast = document.createElement("div");
  toast.className = "toast";

  const iconSvg = type === "add"
    ? `<svg class="toast-icon-add" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg class="toast-icon-remove" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  toast.innerHTML = `${iconSvg} <span>${escapeHtml(message)}</span>`;
  DOM.toastContainer.appendChild(toast);

  // Automatically remove toast from DOM after animation completes
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2600);
}

// --------------------------------------------------------------------------
// 8. Quick View Detail Modal
// --------------------------------------------------------------------------

/**
 * Open Quick View Modal for a product
 * @param {number} productId 
 */
function openProductDetailModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const wishlisted = isInWishlist(product.id);
  const image = (product.images && product.images[0]) || product.thumbnail || "";

  DOM.modalProductContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-media">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}">
      </div>
      <div class="modal-details">
        <span class="modal-category">${escapeHtml(product.category)}</span>
        <h2 class="modal-title">${escapeHtml(product.title)}</h2>
        <div class="card-rating-row" style="margin-bottom: 0.85rem;">
          ${generateStarRating(product.rating || 0)}
        </div>
        <div class="card-price-row" style="margin-bottom: 1rem;">
          <span class="card-price" style="font-size: 1.6rem;">$${Number(product.price).toFixed(2)}</span>
          ${product.discountPercentage ? `<span class="card-discount-badge">-${Math.round(product.discountPercentage)}% off</span>` : ''}
        </div>
        <p class="modal-description">${escapeHtml(product.description || 'No description available.')}</p>
        
        <div class="modal-specs">
          <div class="spec-item"><strong>Brand:</strong> ${escapeHtml(product.brand || 'N/A')}</div>
          <div class="spec-item"><strong>Stock:</strong> ${product.stock !== undefined ? product.stock + ' units' : 'Available'}</div>
          <div class="spec-item"><strong>SKU:</strong> ${escapeHtml(product.sku || 'N/A')}</div>
          <div class="spec-item"><strong>Warranty:</strong> ${escapeHtml(product.warrantyInformation || 'Standard')}</div>
        </div>

        <button 
          id="modalWishlistActionBtn" 
          class="btn ${wishlisted ? 'btn-danger-outline' : 'btn-primary'} btn-full"
        >
          ${wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  `;

  // Attach button event in modal
  const modalBtn = document.getElementById("modalWishlistActionBtn");
  modalBtn.addEventListener("click", () => {
    toggleWishlist(product);
    const nowWishlisted = isInWishlist(product.id);
    modalBtn.className = `btn ${nowWishlisted ? 'btn-danger-outline' : 'btn-primary'} btn-full`;
    modalBtn.textContent = nowWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist';
  });

  DOM.productDetailModal.classList.add("open");
  DOM.productDetailModal.setAttribute("aria-hidden", "false");
}

function closeProductDetailModal() {
  DOM.productDetailModal.classList.remove("open");
  DOM.productDetailModal.setAttribute("aria-hidden", "true");
}

// --------------------------------------------------------------------------
// 9. Drawer Navigation & Modal Controls
// --------------------------------------------------------------------------

function openWishlistDrawer() {
  DOM.wishlistDrawer.classList.add("open");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "false");
  DOM.wishlistModalBackdrop.classList.add("open");
  DOM.wishlistModalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent body scroll
}

function closeWishlistDrawer() {
  DOM.wishlistDrawer.classList.remove("open");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "true");
  DOM.wishlistModalBackdrop.classList.remove("open");
  DOM.wishlistModalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// --------------------------------------------------------------------------
// 10. Utility Functions
// --------------------------------------------------------------------------

/**
 * Escape HTML to prevent XSS injection
 * @param {string} str 
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== "string") return String(str || "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --------------------------------------------------------------------------
// 11. Event Listeners Setup
// --------------------------------------------------------------------------

function setupEventListeners() {
  // Task 4: Search input filter by title
  DOM.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;

    if (state.search.length > 0) {
      DOM.clearSearchBtn.style.display = "flex";
    } else {
      DOM.clearSearchBtn.style.display = "none";
    }

    renderProducts();
  });

  // Clear search button
  DOM.clearSearchBtn.addEventListener("click", () => {
    state.search = "";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.style.display = "none";
    DOM.searchInput.focus();
    renderProducts();
  });

  // Reset search from empty state
  DOM.resetSearchBtn.addEventListener("click", () => {
    state.search = "";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.style.display = "none";
    viewSettings.selectedCategory = "all";
    DOM.categoryFilterBar.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.toggle("active", p.getAttribute("data-category") === "all");
    });
    renderProducts();
  });

  // Sort dropdown
  DOM.sortSelect.addEventListener("change", (e) => {
    viewSettings.sortBy = e.target.value;
    renderProducts();
  });

  // Retry button in error state
  DOM.retryBtn.addEventListener("click", () => {
    fetchProducts();
  });

  // Wishlist drawer trigger & close
  DOM.wishlistTriggerBtn.addEventListener("click", openWishlistDrawer);
  DOM.closeWishlistBtn.addEventListener("click", closeWishlistDrawer);
  DOM.wishlistModalBackdrop.addEventListener("click", closeWishlistDrawer);
  DOM.exploreProductsBtn.addEventListener("click", closeWishlistDrawer);
  DOM.clearAllWishlistBtn.addEventListener("click", clearAllWishlist);

  // Quick view modal close
  DOM.closeDetailModalBtn.addEventListener("click", closeProductDetailModal);
  DOM.productDetailModal.addEventListener("click", (e) => {
    if (e.target === DOM.productDetailModal) {
      closeProductDetailModal();
    }
  });

  // Escape key global listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeWishlistDrawer();
      closeProductDetailModal();
    }
  });
}

// --------------------------------------------------------------------------
// 12. Application Initialization
// --------------------------------------------------------------------------

function initApp() {
  // 1. Setup event listeners
  setupEventListeners();

  // 2. Load stored wishlist from localStorage (Task 6)
  loadWishlistFromStorage();
  updateWishlistBadge();
  renderWishlistDrawer();

  // 3. Fetch products from API (Task 1)
  fetchProducts();
}

// Start application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
