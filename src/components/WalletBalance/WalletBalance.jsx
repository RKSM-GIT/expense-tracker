import './WalletBalance.css'

export default function WalletBalance({ balance, totalExpenses, onAddIncome, onAddExpense }) {
    return (
        <div className="wallet-section">
            <div className="wallet-card">
                <p className="wallet-label">
                    Wallet Balance: <span className="wallet-amount">₹{balance}</span>
                </p>
                <button type="button" className="btn-income" onClick={onAddIncome}>+ Add Income</button>
            </div>
            <div className="expense-card">
                <p className="wallet-label">
                    Expenses: <span className="expense-amount">₹{totalExpenses}</span>
                </p>
                <button type="button" className="btn-expense" onClick={onAddExpense}>+ Add Expense</button>
            </div>
        </div>
    )
}