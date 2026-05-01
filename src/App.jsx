import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import WalletBalance from './components/WalletBalance/WalletBalance'
import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import IncomeForm from './components/IncomeForm/IncomeForm'
import TransactionList from './components/TransactionList/TransactionList'
import ExpenseSummary from './components/ExpenseSummary/ExpenseSummary'
import ExpenseTrends from './components/ExpenseTrends/ExpenseTrends'
import './App.css'

Modal.setAppElement('#root')

const MODAL_STYLES = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'relative',
        inset: 'auto',
        border: 'none',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '420px',
        width: '90%',
        background: '#fff',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
    },
}

export default function App() {
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('walletBalance')
        return saved ? parseFloat(saved) : 5000
    })

    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses')
        return saved ? JSON.parse(saved) : []
    })

    const [incomeModalOpen, setIncomeModalOpen] = useState(false)
    const [expenseModalOpen, setExpenseModalOpen] = useState(false)
    const [editingExpense, setEditingExpense] = useState(null)

    useEffect(() => {
        localStorage.setItem('walletBalance', balance)
    }, [balance])

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.price), 0)

    const handleAddIncome = (amount) => {
        setBalance(prev => prev + amount)
        setIncomeModalOpen(false)
    }

    const handleAddExpense = (expense) => {
        setExpenses(prev => [...prev, expense])
        setBalance(prev => prev - parseFloat(expense.price))
        setExpenseModalOpen(false)
    }

    const handleEditExpense = (expense) => {
        const old = expenses.find(e => e.id === expense.id)
        const diff = parseFloat(expense.price) - parseFloat(old.price)
        setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e))
        setBalance(prev => prev - diff)
        setEditingExpense(null)
        setExpenseModalOpen(false)
    }

    const handleDeleteExpense = (id) => {
        const expense = expenses.find(e => e.id === id)
        setBalance(prev => prev + parseFloat(expense.price))
        setExpenses(prev => prev.filter(e => e.id !== id))
    }

    const openEditModal = (expense) => {
        setEditingExpense(expense)
        setExpenseModalOpen(true)
    }

    return (
        <div className="app-container">
            <h1>Expense Tracker</h1>

            <div className="top-section">
                <WalletBalance
                    balance={balance}
                    totalExpenses={totalExpenses}
                    onAddIncome={() => setIncomeModalOpen(true)}
                    onAddExpense={() => { setEditingExpense(null); setExpenseModalOpen(true) }}
                />
                <ExpenseSummary expenses={expenses} />
            </div>

            <div className="bottom-section">
                <TransactionList
                    expenses={expenses}
                    onEdit={openEditModal}
                    onDelete={handleDeleteExpense}
                />
                <ExpenseTrends expenses={expenses} />
            </div>

            {/* Income Modal */}
            <Modal
                isOpen={incomeModalOpen}
                onRequestClose={() => setIncomeModalOpen(false)}
                style={MODAL_STYLES}
            >
                <IncomeForm
                    onAdd={handleAddIncome}
                    onCancel={() => setIncomeModalOpen(false)}
                />
            </Modal>

            {/* Expense Modal */}
            <Modal
                isOpen={expenseModalOpen}
                onRequestClose={() => { setExpenseModalOpen(false); setEditingExpense(null) }}
                style={MODAL_STYLES}
            >
                <ExpenseForm
                    onAdd={handleAddExpense}
                    onEdit={handleEditExpense}
                    onCancel={() => { setExpenseModalOpen(false); setEditingExpense(null) }}
                    balance={balance}
                    editingExpense={editingExpense}
                />
            </Modal>
        </div>
    )
}