function Summary({ summary }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Summary</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600">Total Expenses</p>
        <p className="text-3xl font-bold text-blue-600">₹{summary.total.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">{summary.count} transactions</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">By Category</p>
        <div className="space-y-2">
          {Object.entries(summary.by_category).map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{category}</span>
              <span className="text-sm font-semibold text-gray-900">₹{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Summary