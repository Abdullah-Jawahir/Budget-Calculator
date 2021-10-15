const budgetForm = document.getElementById('budget-form');

const budgetAmount = document.getElementById('budget-amount');
const expenseAmount = document.getElementById('expense-amount');
const expenseName = document.getElementById('expense-name');

const totalBudget = document.getElementById('total-budget');
const totalExpenses = document.getElementById('total-expenses');
const totalBalance = document.getElementById('total-balance');

const expenseDetailsTable = document.getElementById('expense-details-table');

let budgets = 0;
let expenses = 0; 
let balance = 0;

budgetForm.addEventListener('submit', addBudget);
function addBudget(me) {
    me.preventDefault();

    if ( budgetAmount.value >= 0 ) {
        console.log(budgetAmount.value);

        // Budget Part
        if ( budgetAmount.value >= 1 ) {

            budgets = parseFloat(budgetAmount.value);
            totalBudget.innerText = `$ ${budgets}`;
            balance = budgets - expenses;
            totalBalance.innerText = `$ ${balance}`;
        }
        


        // Expense part
        if ( expenseAmount.value >= 1 ) {
            const newExpense = document.createElement('tr');
            const expenseDetails = `
        
            <td>${expenseName.value}</td>
            <td>${expenseAmount.value}</td>
            <td><i class="fas fa-edit" id="edit-icon"></i></td>
            <td><i class="fas fa-trash-alt" id="del-icon"></i></td>
        
            `;

            newExpense.innerHTML = expenseDetails;
            expenseDetailsTable.appendChild(newExpense);

            expenses += parseFloat(expenseAmount.value);
            totalExpenses.innerText = `$ ${expenses}`;

            balance = budgets - expenses;
            totalBalance.innerText = `$ ${balance}`;
        } else {

            totalBalance.innerText = `$ ${balance}`;

            const newExpense = document.createElement('tr');
            const expenseDetails = `
        
            <td>None</td>
            <td>0</td>
            <td><i class="fas fa-edit" id="edit-icon"></i></td>
            <td><i class="fas fa-trash-alt" id="del-icon"></i></td>
        
            `;

            newExpense.innerHTML = expenseDetails;
            expenseDetailsTable.appendChild(newExpense);


        }




        


        // Clear field
        budgetAmount.value = '';
        expenseName.value = '';
        expenseAmount.value = '';

    }
    else {

        console.log('no values');
        alert("Number is to low to be calculated");
        budgetAmount.focus();
    }
}
