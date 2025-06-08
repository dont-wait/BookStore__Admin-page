// Fetch data from db.json
async function fetchData() {
    try {
        const response = await fetch('db.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Render dashboard stats
function renderDashboardStats(stats) {
    const statsContainer = document.querySelector('.row.g-4.mb-4');
    statsContainer.innerHTML = stats.map(stat => `
        <div class="col-xl-3 col-md-6">
            <div class="stats-card">
                <div class="d-flex align-items-center">
                    <div class="stats-card__icon" style="background: ${stat.gradient}">
                        <i class="${stat.icon}"></i>
                    </div>
                    <div class="ms-3">
                        <h3 class="mb-0">${stat.value.toLocaleString()}</h3>
                        <p class="text-muted mb-0">${stat.title}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render recent transactions
function renderRecentTransactions(transactions) {
    const tbody = document.querySelector('#dashboard .table-responsive tbody');
    tbody.innerHTML = transactions.map(tx => `
        <tr>
            <td>#${tx.id}</td>
            <td>${tx.customer}</td>
            <td>${tx.book}</td>
            <td>$${tx.amount.toFixed(2)}</td>
            <td><span class="badge bg-${tx.status === 'Completed' ? 'success' : 'warning'}">${tx.status}</span></td>
        </tr>
    `).join('');
}

// Render top selling books
function renderTopSellingBooks(books) {
    const listGroup = document.querySelector('#dashboard .list-group');
    listGroup.innerHTML = books.map(book => `
        <div class="list-group-item d-flex justify-content-between align-items-center border-0">
            <div>
                <h6 class="mb-1">${book.title}</h6>
                <small class="text-muted">${book.author}</small>
            </div>
            <span class="badge bg-primary rounded-pill">${book.sales} sales</span>
        </div>
    `).join('');
}

// Render categories
function renderCategories(categories) {
    const tbody = document.querySelector('#categories .table-responsive tbody');
    tbody.innerHTML = categories.map(category => `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td>${category.booksCount}</td>
            <td><span class="badge bg-success">${category.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render books
function renderBooks(books) {
    const tbody = document.querySelector('#books .table-responsive tbody');
    tbody.innerHTML = books.map(book => `
        <tr>
            <td>
                <div class="bg-light rounded d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 50px;">
                    <i class="fas fa-book text-muted"></i>
                </div>
            </td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>${book.stock}</td>
            <td><span class="badge bg-${book.status === 'Available' ? 'success' : 'danger'}">${book.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render users
function renderUsers(users) {
    const tbody = document.querySelector('#users .table-responsive tbody');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="badge bg-info">${user.role}</span></td>
            <td>${user.joinedDate}</td>
            <td><span class="badge bg-success">${user.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning me-1">
                    <i class="fas fa-ban"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render sellers
function renderSellers(sellers) {
    const tbody = document.querySelector('#sellers .table-responsive tbody');
    tbody.innerHTML = sellers.map(seller => `
        <tr>
            <td>${seller.id}</td>
            <td>${seller.name}</td>
            <td>${seller.email}</td>
            <td>${seller.phone}</td>
            <td>${seller.commissionRate}</td>
            <td>$${seller.totalSales.toLocaleString()}</td>
            <td><span class="badge bg-success">${seller.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-info me-1">
                    <i class="fas fa-chart-line"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render transactions
function renderTransactions(transactions) {
    const tbody = document.querySelector('#transactions .table-responsive tbody');
    tbody.innerHTML = transactions.map(tx => `
        <tr>
            <td>#${tx.id}</td>
            <td>${tx.customer}</td>
            <td>${tx.seller}</td>
            <td>${tx.book}</td>
            <td>$${tx.amount.toFixed(2)}</td>
            <td>${tx.paymentMethod}</td>
            <td>${tx.date}</td>
            <td><span class="badge bg-${tx.status === 'Completed' ? 'success' : 'warning'}">${tx.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-info">
                    <i class="fas fa-receipt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Initialize the dashboard
async function initializeDashboard() {
    const data = await fetchData();
    if (!data) return;

    // Render dashboard data
    renderDashboardStats(data.dashboard.stats);
    renderRecentTransactions(data.dashboard.recentTransactions);
    renderTopSellingBooks(data.dashboard.topSellingBooks);

    // Render other sections
    renderCategories(data.categories);
    renderBooks(data.books);
    renderUsers(data.users);
    renderSellers(data.sellers);
    renderTransactions(data.transactions);
}

// Navigation handling
document.querySelectorAll('.sidebar__nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.closest('.sidebar__nav-link').dataset.section;
        
        // Update active states
        document.querySelectorAll('.sidebar__nav-link').forEach(l => l.classList.remove('sidebar__nav-link--active'));
        e.target.closest('.sidebar__nav-link').classList.add('sidebar__nav-link--active');
        
        // Update content sections
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('content-section--active'));
        document.getElementById(section).classList.add('content-section--active');
        
        // Update page title
        document.getElementById('pageTitle').textContent = section.charAt(0).toUpperCase() + section.slice(1);
    });
});

// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('sidebar--collapsed');
    document.getElementById('mainContent').classList.toggle('main-content--expanded');
});

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initializeDashboard); 