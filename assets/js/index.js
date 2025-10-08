const openSidebar = document.querySelector('#open-sidebar');
const sidebar = document.querySelector('#sidebar');
const closeSidebar = document.querySelector('#close-sidebar')
const openSearch = document.querySelector('#open-search');
const closeSearch = document.querySelector('#close-search')
const search = document.querySelector('#search');
const overlay = document.querySelector('#overlay');

function openElement (element) {
    element.classList.add('open')
}
function closeElement (element) {
    element.classList.remove('open')
}
window.addEventListener('click',(event) => {
    if(event.target.classList.contains('overlay')) {
        closeElement(search)
        closeElement(sidebar)
        closeElement(overlay)
    }
})


openSidebar.addEventListener('click', () => {
    openElement(sidebar);
    openElement(overlay);
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