// Intitialize the form objects
const budgetForm = document.getElementById('budget-form');
const expenseForm = document.getElementById('expense-form');

// Initialize the budget form's input field.
const budgetAmount = document.getElementById('budget-amount');

// Initialize the expense form's input fields.
const expenseAmount = document.getElementById('expense-amount');
const expenseName = document.getElementById('expense-name');

// Initialize the budget, Expense & balance counter area.
const totalBudget = document.getElementById('total-budget');
const totalExpenses = document.getElementById('total-expenses');
const totalBalance = document.getElementById('total-balance');

//Initialize budget error message box
const budgetError = document.getElementById('budget-error');
//Initialize expense error message box
const expenseError = document.getElementById('expense-error');

// Initalize the table in the page for expense representation
const expenseDetailsTable = document.getElementById('expense-details-table');

// Assign some important variables to store some values later.
let budgets = 0;
let expenses = 0; 
let balance = 0;

// Add click event to the budjet form's button
budgetForm.addEventListener('submit', addBudget);
function addBudget(me) {
    me.preventDefault();

    // Make sure the field is not empty
    if ( !budgetAmount.value == '' ) {

        budgets = parseFloat(budgetAmount.value);
        totalBudget.innerText = `$ ${budgets}`;
        balance = budgets - expenses;
        totalBalance.innerText = `$ ${balance}`;

        // Clear field and set focus to expense form
        budgetAmount.value = '';
        expenseName.focus();
    }
    else{

        setTimeout(() => {
            budgetError.style.visibility = 'visible';
            budgetError.style.transition = 'all 1s ease';
            budgetAmount.focus();
        }, 200);
        

        setTimeout(() => {
            budgetError.style.visibility = 'hidden';
        }, 1200);
    }
}

expenseForm.addEventListener('submit', updateExpenses);
function updateExpenses(me) {
    me.preventDefault();


    if ( !expenseAmount.value == '' ) {
        
        const newExpense = document.createElement('tr');
        const expenseDetails = `
        
        <td class="stored-title">${expenseName.value}</td>
        <td class="stored-expense">${expenseAmount.value}</td>
        <td><i class="fas fa-edit" id="edit-icon"></i></td>
        <td><i class="fas fa-trash-alt" id="del-icon"></i></td>
        
        `;

        newExpense.innerHTML = expenseDetails;
        expenseDetailsTable.appendChild(newExpense);

        expenses += parseFloat(expenseAmount.value);
        totalExpenses.innerText = `$ ${expenses}`;

        balance = budgets - expenses;
        totalBalance.innerText = `$ ${balance}`;


        // Clear field
        expenseName.value = '';
        expenseAmount.value = '';

    } else {

        setTimeout(() => {
            expenseError.style.visibility = 'visible';
            expenseError.style.transition = 'all 1s ease';
            expenseAmount.focus();
        }, 200);
        

        setTimeout(() => {
            expenseError.style.visibility = 'hidden';
        }, 1200);
    }
}


let index = 1;

expenseDetailsTable.addEventListener('click', (me) => {

    // const theDeleteRule = me.target.parentElement.firstElementChild.classList.contains('fa-trash-alt');
    const theDeleteRule = me.target.classList.contains('fa-trash-alt');
    const theEditRule = me.target.classList.contains('fa-edit');

    const clickedExpenseAmount = document.querySelectorAll('#expense-details-table tr .stored-expense');
    const clickedExpenseTitle = document.querySelectorAll('#expense-details-table tr .stored-title');

    if ( theDeleteRule ) {

        if ( confirm('Are you Sure?') ) {
            index = me.target.parentElement.parentElement.rowIndex;

            let specificDeleteAmount = parseFloat(clickedExpenseAmount[index - 1].textContent);

            expenses -= specificDeleteAmount;
            totalExpenses.innerText = `$ ${expenses}`;

            balance += specificDeleteAmount;
            totalBalance.innerText = `$ ${balance}`;

            me.target.parentElement.parentElement.remove();
        }
    }

    if ( theEditRule ) {

        index = me.target.parentElement.parentElement.rowIndex;
        
        let specificEditAmount = parseFloat(clickedExpenseAmount[index - 1].textContent);
        let specificEditTitle = clickedExpenseTitle[index - 1].textContent

        expenses -= specificEditAmount;
        totalExpenses.innerText = `$ ${expenses}`;
        balance += specificEditAmount;
        totalBalance.innerText = `$ ${balance}`

        expenseName.value = specificEditTitle;
        expenseAmount.value = specificEditAmount;
        expenseName.focus();

        me.target.parentElement.parentElement.remove();
    }
});







