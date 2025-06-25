import React from 'react'
import HistoryList from '../_components/HistoryList'

function History() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Consultation History</h1>
        <p className="text-gray-600">View all your previous medical consultations</p>
      </div>
      <HistoryList showAll={true} />
    </div>
  )
}

export default History