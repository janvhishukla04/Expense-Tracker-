import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState({ total: 0, by_category: {}, count: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
    fetchSummary()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses/`)
      setExpenses(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setLoading(false)
    }
  }

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses/summary`)
      setSummary(response.data)
    } catch (error) {
      console.error('Error fetching summary:', error)
    }
  }

  const handleAddExpense = async (newExpense) => {
    try {
      await axios.post(`${API_URL}/expenses/`, newExpense)
      fetchExpenses()
      fetchSummary()
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`)
      fetchExpenses()
      fetchSummary()
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          💰 Expense Tracker
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <Summary summary={summary} />
          </div>
          
          <div className="lg:col-span-2">
            <ExpenseList 
              expenses={expenses} 
              onDeleteExpense={handleDeleteExpense}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App