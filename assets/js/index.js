import { products } from '../data/products-data.js';
import { cart, addToCart } from '../data/cart-data.js';
import { initHeader } from './header.js';
import { tofixedmoney } from './utiles/money.js';

initHeader();

// SLIDER
const track = document.querySelector('#slide-ul');
const slides = document.querySelectorAll('.slide-item'); // renamed
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots-container');

  // --------- SLIDER LOGIC ----------
  let currentIndex = 0; // corregido nombre
  let dots = []; // cache de botones

  function moveToSlide(index = currentIndex) {
    // asegura índice válido
    if (slides.length === 0) return;
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  function updateDots() {
    if (dots.length === 0) return;
    dots.forEach(dot => dot.classList.remove('dots-active'));
    const safeIndex = ((currentIndex % slides.length) + slides.length) % slides.length;
    dots[safeIndex].classList.add('dots-active');
  }

  // Crear dots una sola vez y cachearlos
  function createDots() {
    dotsContainer.innerHTML = ''; // limpiar si acaso
    dots = Array.from(slides).map((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dots');
      dot.dataset.index = String(index);
      dot.addEventListener('click', () => {
        currentIndex = index;
        moveToSlide();
        updateDots();
        restartAutoSlide(); // interacción -> reiniciar temporizador
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  }

  // Avanzar al siguiente slide (modular, sin ifs redundantes)
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide();
    updateDots();
  }

  // Ir al slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide();
    updateDots();
  }

  // listeners de controles
  next.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
  });

  prev.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
  });

  // --------- AUTOPLAY (setInterval correctamente usado) ----------
  let autoSlideIntervalId = null;
  const AUTO_DELAY = 4000;

  function startAutoSlide() {
    if (autoSlideIntervalId) return; // ya corriendo
    autoSlideIntervalId = setInterval(nextSlide, AUTO_DELAY); // pasar la referencia, no llamar
  }

  function stopAutoSlide() {
    if (!autoSlideIntervalId) return;
    clearInterval(autoSlideIntervalId);
    autoSlideIntervalId = null;
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Opcional: pausar al poner el ratón encima (mejora UX)
  [track, prev, next, dotsContainer].forEach(el => {
    el.addEventListener('mouseenter', stopAutoSlide);
    el.addEventListener('mouseleave', startAutoSlide);
  });

  // --------- INICIALIZACIÓN ----------
  createDots();
  moveToSlide(0);
  updateDots();
  startAutoSlide();



// LIST OF PRODUCTS //
function renderProducts() {
  const productsContainer = document.querySelector('.js-products-grid')

  let productsHtml = '';

  products.forEach((product) => {
      productsHtml += `
          <div class="product-card">
              <img src="${product.image}">
              <div class="product-content">
                  <h3 class="product-name">${product.name}</h3>
                  <div class="product-rating">
                      <div class="product-stars">
                          <img src="assets/image/rating-${product.rating.stars * 10}.png">
                      </div>
                      <span class="product-rating-count">(${product.rating.count})</span>
                  </div>
                  <div class="product-price">$${ tofixedmoney(product.priceCent) }</div>
                  <div class="product-quantity">
                      <label for="quantity-1">Quantity:</label>
                      <select class="js-quantity-selectorId-${product.id}" >
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                      </select>
                  </div>
                  <button class="btn-add-cart js-btn-add-cart " data-product-id='${product.id}'>Add to Cart</button>
              </div>
          </div>
      `
  });


  productsContainer.innerHTML = productsHtml;


  function updateCartCount (){

    const cartCount = document.querySelector('.cart-count');
    let cartQuantity = 0;
    cart.forEach((cartProductAndQuantity) => {
      let productQuantity = cartProductAndQuantity.quantity;
      cartQuantity += productQuantity;
    });


    if (cartQuantity > 0) {
      cartCount.innerHTML = cartQuantity;
      cartCount.style.display = 'block';
    } else {
      cartCount.style.display = 'none';
    }
  }


  document.querySelectorAll('.js-btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      // adding to the cart
      const btnProductId = btn.dataset.productId;
      const quantitySelector = document.querySelector(`.js-quantity-selectorId-${btnProductId}`);
      let quantity = Number(quantitySelector.value);

      addToCart(btnProductId,quantity)

      // recalcular el total correctamente
      updateCartCount()

    });
  });
  updateCartCount()

};

renderProducts()
