import React, { useContext } from 'react'
import { FinanceContext } from '../context/FinanceProvider'

const PurchaseList = () => {
  const { state } = useContext(FinanceContext)
  const { purchases } = state

  return (
    <div>
      <h2>Purchase List</h2>
      <ul className="list-group">
        {purchases.map((purchase, index) => (
          <li key={index} className="list-group-item">
            {purchase.date} - {purchase.note} - {purchase.amount} - {purchase.status} - {purchase.cardName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PurchaseList