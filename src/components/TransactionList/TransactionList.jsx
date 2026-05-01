import { FiEdit2 } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import './TransactionList.css'

export default function TransactionList({ expenses, onEdit, onDelete }) {
    return (
        <div className="transaction-list">
            <h2>Recent Transactions</h2>
            <div className="transaction-box">
                {expenses.length === 0
                    ? <p className="no-transactions">No transactions!</p>
                    : expenses.slice().reverse().map(expense => (
                        <div key={expense.id} className="transaction-item">
                            <div className="transaction-info">
                                <span className="transaction-title">{expense.title}</span>
                                <span className="transaction-meta">{expense.date} • {expense.category}</span>
                            </div>
                            <div className="transaction-right">
                                <span className="transaction-amount">₹{expense.price}</span>
                                <button className="icon-btn edit" onClick={() => onEdit(expense)} title="Edit">
                                    <FiEdit2 />
                                </button>
                                <button className="icon-btn delete" onClick={() => onDelete(expense.id)} title="Delete">
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}