import React, { createContext, useReducer } from 'react'

const initialState = {
  purchases: [],
  cards: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PURCHASE':
      const newPurchase = action.payload
      const updatedCards = { ...state.cards }
      if (!updatedCards[newPurchase.cardName]) {
        updatedCards[newPurchase.cardName] = { totalSpent: 0, remainingDebt: 0 }
      }
      updatedCards[newPurchase.cardName].totalSpent += parseFloat(newPurchase.amount)
      updatedCards[newPurchase.cardName].remainingDebt += parseFloat(newPurchase.amount)
      return {
        ...state,
        purchases: [...state.purchases, newPurchase],
        cards: updatedCards
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