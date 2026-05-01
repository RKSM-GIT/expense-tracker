import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ExpenseTrends.css'

const CATEGORIES = ['Food', 'Entertainment', 'Travel']

export default function ExpenseTrends({ expenses }) {
    const data = CATEGORIES.map(cat => ({
        name: cat,
        amount: expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + parseFloat(e.price), 0)
    }))

    return (
        <div className="expense-trends">
            <h2>Top Expenses</h2>
            <div className="trends-box">
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                        <Tooltip formatter={(val) => `₹${val}`} />
                        <Bar dataKey="amount" fill="#f5a623" radius={[0, 6, 6, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}