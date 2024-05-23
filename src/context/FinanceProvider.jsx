import React, { createContext, useReducer } from 'react'

const initialState = {
  purchases: [],
  cards: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PURCHASE':
      const newPurchase = action.payload;
      const cardName = newPurchase.cardName;
      const amount = parseFloat(newPurchase.amount);

      if(isNaN(amount)){return state}

      const updatedCards = { ...state.cards };

      if (!updatedCards[cardName]) {
        updatedCards[cardName] = { totalSpent: 0, remainingDebt: 0 }
      }

      if (!state.purchases.some(p => p.cardName === cardName && p.amount === newPurchase.amount && p.date === newPurchase.date && p.note === newPurchase.note)) {
        updatedCards[cardName].totalSpent += amount;
        updatedCards[cardName].remainingDebt += amount;
      }

      return {
        ...state,
        purchases: [...state.purchases, newPurchase],
        cards: updatedCards
      }
    
    case 'UPDATE_PURCHASE_DATE':
      const { id, date } = action.payload
      const updatedPurchases = state.purchases.map(purchase => {
        if (purchase.id === id) {
          return { ...purchase, date }
        }
        return purchase
      })
      return {
        ...state,
        purchases: updatedPurchases
      }
    default:
      return state
  }
}

export const FinanceContext = createContext()

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  )
}