//  HEADER
const openSidebar = document.querySelector('#open-sidebar');
const sidebar = document.querySelector('#sidebar');
const closeSidebar = document.querySelector('#close-sidebar')
const openSearch = document.querySelector('#open-search');
const closeSearch = document.querySelector('#close-search')
const search = document.querySelector('#search');
const overlay = document.querySelector('#overlay');

// SLIDER 
const track = document.querySelector("#slide-ul");
const slideList = document.querySelectorAll('.slide-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next')
const dotsContainer = document.querySelector('.dots-container')


// HEADER SECTION
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

// SLIDER SECTION

let curentIndex = 0;

function moveToSlide(){
    let index = curentIndex;
    let offset = -index * 100 ;
    track.style.transform = `translateX(${offset}%)`;
    
}


slideList.forEach((_,index) => {
    const dot = document.createElement('button');
    dot.classList.add('dots');
    dot.dataset.index = index;
    dot.addEventListener('click',() =>{
        curentIndex = index;
        moveToSlide();
        updateDots()
    })
    dotsContainer.appendChild(dot);
})

function updateDots(){
    let dots = document.querySelectorAll('.dots');
    dots.forEach((dot) => {
        dot.classList.remove('dots-active');
    })
    dots[curentIndex].classList.add('dots-active');
}

function nextSlide(){
    curentIndex++;
    if (curentIndex < slideList.length){
        moveToSlide();
        updateDots()
    }else if ( curentIndex > slideList.length - 1){
        curentIndex = 0 ;
        moveToSlide()
        updateDots()
    }
}
next.addEventListener('click', nextSlide);

prev.addEventListener('click',()=>{
    curentIndex--;
    if(curentIndex > -1){
        moveToSlide();
        updateDots();
    }else if(curentIndex < 0){
        curentIndex = slideList.length - 1;
        moveToSlide();
        updateDots();
    }
})


