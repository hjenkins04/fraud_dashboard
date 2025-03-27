"use client"

import { useEffect, useState } from "react"
import Papa from "papaparse"
import { TransactionForm } from "@/components/transaction-form"
import { Transaction } from "@/types/transaction"
import SingleResultsModal from "@/components/single-results-modal"

export function Single() {
  const [csvData, setCsvData] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Partial<Transaction> | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Load sample CSV on mount
  useEffect(() => {
    fetch("/fraudVal.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<Transaction>(text, {
          header: true,
          skipEmptyLines: true,
        }).data
        setCsvData(parsed)
      })
  }, [])

  // Function to handle form submission
  const handleFormSubmit = (data: Partial<Transaction>) => {
    setSelectedTransaction(data)
    setShowModal(true)
  }

  // Custom generate function that sets form values (injected into TransactionForm)
  const handleGenerateFromCSV = (setValue: (field: keyof Transaction, value: any) => void) => {
    const random = csvData[Math.floor(Math.random() * csvData.length)]
    if (random) {
      Object.entries(random).forEach(([key, value]) => {
        setValue(key as keyof Transaction, value)
      })
    }
  }

  return (
    <>
      <TransactionForm
        onSubmit={handleFormSubmit}
        onGenerateFromCSV={handleGenerateFromCSV}
      />

      {selectedTransaction && (
        <SingleResultsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          transaction={selectedTransaction}
        />
      )}
    </>
  )
}
