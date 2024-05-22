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
      const updatedCards = { ...state.cards };

      if (!updatedCards[cardName]) {
        updatedCards[cardName] = { totalSpent: 0, remainingDebt: 0 }
      }

      const currentTotalSpent = updatedCards[cardName].totalSpent;
      const currentRemainingDebt = updatedCards[cardName].remainingDebt;

      if (!state.purchases.some(p => p.cardName === cardName && p.amount === newPurchase.amount && p.date === newPurchase.date && p.note === newPurchase.note)) {
        updatedCards[cardName].totalSpent = currentTotalSpent + amount;
        updatedCards[cardName].remainingDebt = currentRemainingDebt + amount;
      }

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