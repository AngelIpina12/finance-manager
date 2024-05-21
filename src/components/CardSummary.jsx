import React, { useContext } from 'react'
import { FinanceContext } from '../context/FinanceProvider'

const CardSummary = () => {
  const { state } = useContext(FinanceContext)
  const { cards } = state

  return (
    <div>
      <h2>Card Summary</h2>
      {Object.keys(cards).map((cardName) => (
        <div key={cardName} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Card Name: {cardName}</h5>
            <p className="card-text">Total Spent: {cards[cardName].totalSpent}</p>
            <p className="card-text">Remaining Debt: {cards[cardName].remainingDebt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardSummary