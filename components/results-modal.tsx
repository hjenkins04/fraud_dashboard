"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import SingleResultsModal from "@/components/single-results-modal" // 👈 import the second modal
import { Transaction } from "@/types/transaction"

type Result = Transaction & {
  is_fraud_inference: number
}

interface ResultsModalProps {
  open: boolean
  onClose: () => void
  results: Result[]
}

export function ResultsModal({ open, onClose, results }: ResultsModalProps) {
  const [search, setSearch] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<Result | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filtered = results.filter((t) =>
    t.trans_num.toLowerCase().includes(search.toLowerCase()) ||
    t.merchant.toLowerCase().includes(search.toLowerCase())
  )

  const handleRowClick = (transaction: Result) => {
    setSelectedTransaction(transaction)
    setShowDetailModal(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[90vw] md:max-w-[1200px] lg:max-w-[1400px]">
          <DialogHeader>
            <DialogTitle>Fraud Detection Results</DialogTitle>
          </DialogHeader>

          <div className="mb-4 relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Transaction ID or Merchant..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="rounded-md border max-h-[500px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ground Truth</TableHead>
                  <TableHead>Features</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((t) => (
                    <TableRow key={t.trans_num} onClick={() => handleRowClick(t)} className="cursor-pointer">
                      <TableCell className="font-medium">{t.trans_num}</TableCell>
                      <TableCell>{t.trans_date_trans_time}</TableCell>
                      <TableCell>${Number(t.amt).toFixed(2)}</TableCell>
                      <TableCell>{t.merchant}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            t.is_fraud_inference
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {t.is_fraud_inference ? "Fraud" : "Legit"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            t.is_fraud
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {t.is_fraud ? "Fraud" : "Legit"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getFakeFeatures(t).map((f, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">
                      No matching results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* 👇 Second modal triggered when a row is clicked */}
      {selectedTransaction && (
        <SingleResultsModal
          transaction={selectedTransaction}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </>
  )
}

function getFakeFeatures(t: Result): string[] {
  const features = []
  if (Number(t.amt) > 1000) features.push("High amount")
  if (t.is_fraud) features.push("Merchant anomaly", "Odd hour", "New location")
  else features.push("Normal behavior")
  return features
}
