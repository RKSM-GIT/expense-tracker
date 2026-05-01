import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import './ExpenseForm.css'

const CATEGORIES = ['Food', 'Entertainment', 'Travel']

export default function ExpenseForm({ onAdd, onEdit, onCancel, balance, editingExpense }) {
    const { enqueueSnackbar } = useSnackbar()
    const [form, setForm] = useState({ title: '', price: '', category: '', date: '' })

    useEffect(() => {
        if (editingExpense) {
            setForm({
                title: editingExpense.title,
                price: editingExpense.price,
                category: editingExpense.category,
                date: editingExpense.date,
            })
        } else {
            setForm({ title: '', price: '', category: '', date: '' })
        }
    }, [editingExpense])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.title || !form.price || !form.category || !form.date) {
            enqueueSnackbar('Please fill all fields!', { variant: 'warning' })
            return
        }

        const price = parseFloat(form.price)
        if (editingExpense) {
            const diff = price - parseFloat(editingExpense.price)
            if (diff > balance) {
                enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' })
                return
            }
            onEdit({ ...editingExpense, ...form, price })
        } else {
            if (price > balance) {
                enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' })
                return
            }
            onAdd({ ...form, price, id: Date.now().toString() })
        }

        setForm({ title: '', price: '', category: '', date: '' })
    }

    return (
        <div className="expense-form">
            <h2>{editingExpense ? 'Edit Expense' : 'Add Expenses'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                    <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} min="1" />
                </div>
                <div className="form-row">
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input name="date" type="date" value={form.date} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-add-expense">
                        {editingExpense ? 'Update Expense' : 'Add Expense'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}