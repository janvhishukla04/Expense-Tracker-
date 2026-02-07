function ExpenseList({ expenses, onDeleteExpense, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">Loading expenses...</p>
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">No expenses yet. Add your first expense!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Expenses</h2>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-900">
                  ₹{expense.amount.toFixed(2)}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {expense.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(expense.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className="ml-4 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseList