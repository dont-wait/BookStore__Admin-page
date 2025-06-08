// Navigation functionality
const navLinks = document.querySelectorAll('.sidebar .nav-link');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleSidebar = document.getElementById('toggleSidebar');

// Page titles mapping
const pageTitles = {
    'dashboard': 'Dashboard',
    'categories': 'Book Categories',
    'books': 'Books Management',
    'users': 'Users Management',
    'sellers': 'Sellers Management',
    'transactions': 'Transactions Management'
};

// Navigation click handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        contentSections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Show corresponding section
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            pageTitle.textContent = pageTitles[sectionId] || 'Dashboard';
        }
    });
});

// Sidebar toggle functionality
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});

// Responsive sidebar for mobile
function handleResize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

// Sample data and interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects to stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Search functionality (demo)
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function () {
            // This would normally filter the table data
            console.log('Searching for:', this.value);
        });
    });

    // Status badge click handlers
    const statusBadges = document.querySelectorAll('.badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('click', function () {
            // This would normally open a status change modal
            console.log('Status clicked:', this.textContent);
        });
    });
});