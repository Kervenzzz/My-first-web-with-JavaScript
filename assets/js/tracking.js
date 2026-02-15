// Navigation Sidebar
document.addEventListener('DOMContentLoaded', function() {
    const openNavSidebar = document.querySelector('#open-nav-sidebar');
    const closeNavSidebar = document.querySelector('#close-nav-sidebar');
    const navSidebar = document.querySelector('#nav-sidebar');
    const navSidebarLinks = document.querySelectorAll('.nav-sidebar-link');

    // Open sidebar
    if (openNavSidebar) {
        openNavSidebar.addEventListener('click', function() {
            navSidebar.classList.add('active');
        });
    }

    // Close sidebar
    if (closeNavSidebar) {
        closeNavSidebar.addEventListener('click', function() {
            navSidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking on a link
    navSidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navSidebar.classList.remove('active');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (navSidebar && !navSidebar.contains(event.target) && event.target !== openNavSidebar) {
            navSidebar.classList.remove('active');
        }
    });

    // Initialize navigation active states
    initializeNavigation();
});

// Set active navigation link based on current page
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-pages a, .nav-sidebar-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Export functions for use in HTML if needed
window.navFunctions = {
    initializeNavigation
};
