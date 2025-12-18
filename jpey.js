document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const list = document.getElementById('expense-list');
    const filter = document.getElementById('category-filter');
    const totalSpan = document.getElementById('total-balance');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const updateApp = () => {
        const selected = filter.value;
        // Filter expenses based on dropdown
        const filtered = selected === 'All' ? expenses : expenses.filter(e => e.category === selected);
        
        // Generate HTML list
        list.innerHTML = filtered.length ? filtered.map(e => `
            <li class="expense-item">
                <div class="expense-details">
                    <strong>${e.name}</strong> <small>(${e.category})</small>
                </div>
                <div class="expense-actions">
                    <span class="expense-amount">₱${e.amount.toFixed(2)}</span>
                    <button class="delete-btn" onclick="deleteExpense(${e.id})">✖</button>
                </div>
            </li>`).join('') : '<li style="text-align:center; color:#777;">No expenses found.</li>';

        // Update Total
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        totalSpan.textContent = total.toFixed(2);
        
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: Date.now(),
            name: document.getElementById('name').value,
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value
        };
        expenses.push(newExpense);
        form.reset();
        updateApp();
    };

    // Global function for the delete button
    window.deleteExpense = (id) => {
        expenses = expenses.filter(e => e.id !== id);
        updateApp();
    };

    filter.onchange = updateApp;
    updateApp(); // Initial load
});