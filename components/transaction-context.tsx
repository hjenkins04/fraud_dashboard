"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Transaction {
  trans_date_trans_time: string
  cc_num: string
  merchant: string
  category: string
  amt: number
  first: string
  last: string
  gender: string
  street: string
  city: string
  state: string
  zip: string
  lat: number
  long: number
  city_pop: number
  job: string
  dob: string
  trans_num: string
  unix_time: number
  merch_lat: number
  merch_long: number
  is_fraud: number
}

interface TransactionContextType {
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  processedData: boolean
  setProcessedData: (processed: boolean) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [processedData, setProcessedData] = useState(false)

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        isLoading,
        setIsLoading,
        processedData,
        setProcessedData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider")
  }
  return context
}

