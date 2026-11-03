# Smart Shop (Product Explorer) &bull; Module 2 Final Exam

A modern, responsive e-commerce product browsing application where users can explore products, search by title, filter by category, sort results, and maintain a personal wishlist persisted with `localStorage`.

Built with **HTML5**, **CSS3**, and **Vanilla JavaScript** for the Module 2 Final Exam (HTML, CSS & JavaScript).

---

## 🔗 Live Demo & Deployment

- **GitHub Pages Deployed URL:** `https://tarikze2119-png.github.io/My-learning-tasks-/module-02-html-css-javascript/Final%20Exam/`
*(Or see [Deployment Guide](#-how-to-deploy) below to deploy in 1-click to Vercel, Netlify, or GitHub Pages)*

---

## 📋 Exam Tasks & Requirements Checklist

| Task # | Requirement | Implementation Details | Status |
|---|---|---|:---:|
| **1** | **Fetch products from the API when the application starts** | Fetches products asynchronously using `fetch()` from `https://dummyjson.com/products?limit=100` on startup (`DOMContentLoaded`). | ✅ Done |
| **2** | **Display products dynamically as responsive cards** | Responsive CSS Grid layout adapting smoothly from 1 column on mobile to 2, 3, and 4 columns on tablet and desktop. | ✅ Done |
| **3** | **Show image, title, category, price, and rating** | Each card displays high-resolution thumbnail, category badge, clamped 2-line title, star rating (★) with numeric score, and formatted price ($XX.XX). | ✅ Done |
| **4** | **Add a search box that filters products by title** | Real-time search input with instant filtering by product title (case-insensitive) and clear button. | ✅ Done |
| **5** | **Add an "Add to Wishlist" button on every product** | Each card features an accessible wishlist action button with heart icon and active state indicator ("In Wishlist"). | ✅ Done |
| **6** | **Save wishlist items using localStorage** | Automatically saves wishlist items into browser `localStorage` on addition, removal, or clear, and restores them on page reload. | ✅ Done |
| **7** | **Allow users to remove items from the wishlist** | Users can remove items directly by toggling the card button or through the off-canvas wishlist drawer (individual remove or "Clear Wishlist"). | ✅ Done |
| **8** | **Show loading and error messages appropriately** | Beautiful shimmer skeleton cards displayed while loading; clean error card with actionable "Retry Loading" button on fetch failure. | ✅ Done |
| **Bonus** | **No products match search message** | Custom empty state with descriptive text and "Clear Search Filter" button when no results match. | ✅ Done |
| **Bonus** | **Expected State structure** | Strictly adheres to the required state shape: `const state = { products: [], wishlist: [], search: "" };` | ✅ Done |
| **Bonus** | **Quick View Modal & Toast Notifications** | Click any card or title to inspect full product specifications, gallery, stock, and SKU; unobtrusive toast alerts on wishlist actions. | ✅ Done |

---

## 🏗️ State Architecture

As strictly specified in the exam requirements, the core application state is structured as follows in `app.js`:

```javascript
const state = {
  products: [],
  wishlist: [],
  search: ""
};
```

- `state.products`: Array of product objects populated from the DummyJSON API.
- `state.wishlist`: Array of saved product items loaded from and synchronized with `localStorage`.
- `state.search`: Current search string entered by the user, dynamically filtering `products`.

---

## 📂 Project Structure

```text
Final Exam/
├── index.html        # Semantic HTML5 markup, header, search bar, drawer, modal, and grid
├── style.css         # Modern styling, CSS variables, responsive grid, skeleton shimmer, transitions
├── app.js            # Core application logic, API integration, state management, DOM manipulation
└── README.md         # Project documentation and submission details
```

---

## 🚀 How to Run Locally

1. Open the project folder:
   ```bash
   cd "module-02-html-css-javascript/Final Exam"
   ```
2. Simply double-click `index.html` to open it in any web browser, or serve it using any local static server:
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   # or with python:
   python -m http.server 8000
   ```

---

## 🌐 How to Deploy (For Exam Submission)

### Option 1: GitHub Pages (Recommended)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Module 2 Final Exam Smart Shop project"
   git push origin main
   ```
2. In your GitHub repository settings:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Select Branch: `main`, folder: `/ (root)`, and click **Save**.
3. Your live link will be:
   ```
   https://tarikze2119-png.github.io/My-learning-tasks-/module-02-html-css-javascript/Final%20Exam/
   ```

### Option 2: Vercel / Netlify
1. Drag and drop the `Final Exam` folder onto [Netlify Drop](https://app.netlify.com/drop).
2. It will instantly generate a free HTTPS URL to paste into your exam submission!
