import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './ExpenseSummary.css'

const COLORS = { Food: '#8b5cf6', Entertainment: '#f5a623', Travel: '#f5c518' }

export default function ExpenseSummary({ expenses }) {
    const data = Object.entries(
        expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + parseFloat(e.price)
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    return (
        <div className="expense-summary">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={false}>
                        {data.map((entry) => (
                            <Cell key={entry.name} fill={COLORS[entry.name] || '#ccc'} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${val}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}