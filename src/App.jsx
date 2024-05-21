import React from 'react'
import './App.css'
import { FinanceProvider } from './context/FinanceProvider'
import Calendar from './components/Calendar'
import PurchaseForm from './components/PurchaseForm'
import PurchaseList from './components/PurchaseList'
import CardSummary from './components/CardSummary'

function App() {

  return (
    <FinanceProvider>
      <div className="container">
        <h1>Financial Manager</h1>
        <Calendar />
        <PurchaseForm />
        <PurchaseList />
        <CardSummary />
      </div>
    </FinanceProvider>
  )
}

export default App
