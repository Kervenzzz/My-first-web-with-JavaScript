export function initHeader() {

  const openSearch = document.querySelector('#open-search');
  const closeSearch = document.querySelector('#close-search');
  const search = document.querySelector('#search');

  const overlay = document.querySelector('#overlay');

  function openElement(el) {
    if (el) el.classList.add('open');
  }

  function closeElement(el) {
    if (el) el.classList.remove('open');
  }

  // click fuera (overlay) — solo si existe overlay
  if (overlay) {
    window.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeElement(search);
        closeElement(overlay);
      }
    });
  }


  // SEARCH (solo si existe en la página)
  if (openSearch && search) {
    openSearch.addEventListener('click', () => {
      openElement(search);
      if (overlay) openElement(overlay);
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener('click', () => {
      closeElement(search);
      if (overlay) closeElement(overlay);
    });
  }
}
