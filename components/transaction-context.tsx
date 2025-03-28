"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Transaction } from "@/types/transaction"

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

