"use client"

import { useEffect, useState } from "react"
import Papa from "papaparse"
import { TransactionForm } from "@/components/transaction-form"
import { Transaction } from "@/types/transaction"
import SingleResultsModal from "@/components/single-results-modal"
import { processTransactions } from "@/lib/process-transactions"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

export function Single() {
  const [csvData, setCsvData] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Partial<Transaction> | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleFormSubmit = async (data: Partial<Transaction>) => {
    setIsLoading(true)
    try {
      const response = await processTransactions([data as Transaction])
      const enriched = response.processedTransactions?.[0] ?? {
        ...data,
        is_fraud_inference: -1,
        distance: 0,
        closest_cluster: -1,
      }
      setSelectedTransaction(enriched)
      setShowModal(true)
    } catch (err) {
      console.error("❌ Error running inference:", err)
    } finally {
      setIsLoading(false)
    }
  }

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

      {/* Loader Dialog */}
      <Dialog open={isLoading}>
        <DialogContent className="flex flex-col items-center justify-center space-y-4 w-[300px]">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Running fraud detection...</p>
        </DialogContent>
      </Dialog>

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
