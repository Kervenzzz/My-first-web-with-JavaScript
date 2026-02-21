import {cart} from './checkout.js'

// HEADER
const openSidebar = document.querySelector('#open-nav-sidebar');
const sidebar = document.querySelector('#nav-sidebar');
const closeSidebar = document.querySelector('#close-nav-sidebar');
const openSearch = document.querySelector('#open-search');
const closeSearch = document.querySelector('#close-search');
const search = document.querySelector('#search');
const overlay = document.querySelector('#overlay');

// SLIDER
const track = document.querySelector('#slide-ul');
const slides = document.querySelectorAll('.slide-item'); // renamed
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots-container');

if (!track || slides.length === 0) {
  // no slides / track -> salir para evitar errores
  console.warn('Slider no inicializado: faltan elementos DOM (track o slides).');
} else {

  // --------- HEADER HELPERS ----------
  function openElement(element) { element.classList.add('open'); }
  function closeElement(element) { element.classList.remove('open'); }

  // Cerrar overlay/elementos cuando se hace click fuera (mejor comparar con el elemento overlay)
  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeElement(search);
      closeElement(sidebar);
      closeElement(overlay);
    }
  });

  openSidebar.addEventListener('click', () => {
    openElement(sidebar);
    openElement(overlay); // abrir overlay también al abrir sidebar
  });

  closeSidebar.addEventListener('click', () => {
    closeElement(sidebar);
    closeElement(overlay);
  });

  openSearch.addEventListener('click', () => {
    openElement(search);
    openElement(overlay);
  });

  closeSearch.addEventListener('click', () => {
    closeElement(search);
    closeElement(overlay);
  });


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
}


// LIST OF PRODUCTS //

const productsContainer = document.querySelector('.js-products-grid')

let products = [
    {
        id : crypto.randomUUID(),
        image : "assets/image/laptop1.jpeg",
        name : 'Gaming Laptop',
        rating : {
            stars : '5' ,
            count : '120'
        },
        priceCent : '129999',
    }, {
        id : crypto.randomUUID(),
        image : "assets/image/canon1.jpeg",
        name : 'Camara Ultra Angular',
        rating : {
            stars : '4' ,
            count : '808'
        },
        priceCent : '83000',
    },{
        id : crypto.randomUUID(),
        image : "assets/image/drone1.jpeg",
        name : 'DJI mini Drone fast',
        rating : {
            stars : '3.5' ,
            count : '1399'
        },
        priceCent : '65000',
    },{
        id : crypto.randomUUID(),
        image : "assets/image/jbl1.jpeg",
        name : 'Good sound JBL',
        rating : {
            stars : '4.5' ,
            count : '1200'
        },
        priceCent : '43599',
    }
];

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
                <div class="product-price">$${(product.priceCent / 100).toFixed(2)}</div>
                <div class="product-quantity">
                    <label for="quantity-1">Quantity:</label>
                    <select id="quantity-1" >
                        <option value="1">1</option>
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

const cartCount = document.querySelector('.cart-count');


document.querySelectorAll('.js-btn-add-cart').forEach((btn) => {
  btn.addEventListener('click', () => {

    const productId = Number(btn.dataset.productId);
    let matchingItem;

    cart.forEach((item) => {
      if (item.id === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        id: productId,
        quantity: 1
      });
    }

    // recalcular el total correctamente
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });


  if (cartQuantity > 0) {
    cartCount.innerHTML = cartQuantity;
    cartCount.style.display = 'block';
  } else {
    cartCount.style.display = 'none';
  }

  });
});
