import React, { useState, useContext } from 'react'
import { FinanceContext } from '../context/FinanceProvider'

const PurchaseForm = () => {
  const { dispatch } = useContext(FinanceContext)
  const [purchase, setPurchase] = useState({
    cardName: '',
    amount: '',
    note: '',
    date: '',
    status: 'planned' // 'completed' o 'planned'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!purchase.cardName || !purchase.amount || isNaN(parseFloat(purchase.amount))){
      alert('Please fill all the fields with valid data')
      return
    }
    dispatch({ type: 'ADD_PURCHASE', payload: purchase })
    setPurchase({ cardName: '', amount: '', note: '', date: '', status: 'planned' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="cardName" className="form-label">Card Name</label>
        <input
          type="text"
          className="form-control"
          id="cardName"
          value={purchase.cardName}
          onChange={(e) => setPurchase({ ...purchase, cardName: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={purchase.amount}
          onChange={(e) => setPurchase({ ...purchase, amount: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="note" className="form-label">Note</label>
        <input
          type="text"
          className="form-control"
          id="note"
          value={purchase.note}
          onChange={(e) => setPurchase({ ...purchase, note: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={purchase.date}
          onChange={(e) => setPurchase({ ...purchase, date: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          className="form-select"
          id="status"
          value={purchase.status}
          onChange={(e) => setPurchase({ ...purchase, status: e.target.value })}
        >
          <option value="planned">Planned</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Purchase</button>
    </form>
  )
}

export default PurchaseForm