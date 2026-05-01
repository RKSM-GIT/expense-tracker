import { useState } from 'react'
import './IncomeForm.css'

export default function IncomeForm({ onAdd, onCancel }) {
    const [amount, setAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || parseFloat(amount) <= 0) return
        onAdd(parseFloat(amount))
        setAmount('')
    }

    return (
        <div className="income-form">
            <h2>Add Balance</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Income Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    min="1"
                />
                <div className="form-actions">
                    <button type="submit" className="btn-add-balance">Add Balance</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}