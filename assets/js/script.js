
// Loader
window.addEventListener("load", () => {
    document.getElementById("preloader").classList.add("hidden");
    document.body.classList.add("loaded");
});

// Modal Zoom
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    });
});

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".nav-icons button:first-child");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const products = document.querySelectorAll(".product-card");
  const noResults = document.getElementById("noResults");

  // ambil daftar produk
  const productList = Array.from(products).map(p => ({
    name: p.querySelector("p").innerText,
    element: p
  }));

  // toggle search box
  searchBtn.addEventListener("click", () => {
    searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
    searchInput.focus();
  });

  // tampilkan suggestion
  function showSuggestions(value) {
    suggestionsBox.innerHTML = "";
    if (!value) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = productList.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    if (matches.length > 0) {
      matches.forEach(p => {
        const item = document.createElement("div");
        item.textContent = p.name;
        item.classList.add("suggestion-item");
        item.onclick = () => {
          searchInput.value = p.name;
          suggestionsBox.style.display = "none";
          filterProducts(p.name);
        };
        suggestionsBox.appendChild(item);
      });
      suggestionsBox.style.display = "block";
    } else {
      const noRes = document.createElement("div");
      noRes.textContent = "No Matching Product Found!";
      noRes.classList.add("suggestion-item");
      suggestionsBox.appendChild(noRes);
      suggestionsBox.style.display = "block";
    }
  }

  // filter produk
  function filterProducts(query) {
    let found = false;

    products.forEach(p => {
      const text = p.querySelector("p").innerText.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        p.style.display = "block";
        found = true;
      } else {
        p.style.display = "none";
      }
    });

    noResults.style.display = found ? "none" : "block";
  }

  // input handler
  searchInput.addEventListener("input", e => {
    if (!e.target.value) {
      products.forEach(p => p.style.display = "block");
      noResults.style.display = "none";
      suggestionsBox.style.display = "none";
      return;
    }
    showSuggestions(e.target.value);
  });

  // enter → reload dengan query
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      window.location.href = window.location.pathname + (query ? "?q=" + encodeURIComponent(query) : "");
    }
  });

  // cek query di URL saat load
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  if (q) {
    searchBox.style.display = "block"; // tampilkan box otomatis
    searchInput.value = q;
    filterProducts(q);
  }
});

// filter produk
function filterProducts(query) {
  let found = false;

  products.forEach(p => {
    const text = p.querySelector("p").innerText.toLowerCase();
    if (text.includes(query.toLowerCase())) {
      p.style.display = "block";
      found = true;
    } else {
      p.style.display = "none";
    }
  });

  // tampilkan pesan kosong
  noResults.style.display = found ? "none" : "block";
}

// idle title
document.addEventListener("DOMContentLoaded", () => {
  const text = "WELCOME TO BAGUS STORE";
  const typingElement = document.getElementById("typing");
  let i = 0;

  function type() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  type();
});