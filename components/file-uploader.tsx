"use client"

import React, { useState, useCallback } from "react"
import { useTransactions } from "@/components/transaction-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { processTransactions } from "@/lib/process-transactions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ResultsModal } from "@/components/results-modal"

export function FileUploader() {
  const { setTransactions, isLoading, setIsLoading, setProcessedData } = useTransactions()

  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [resultRows, setResultRows] = useState<any[]>([])
  const [parsedData, setParsedData] = useState<any[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files)
  }

  const handleFiles = (files: FileList) => {
    const file = files[0]
    if (!file) return

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please upload a CSV file")
      setSuccess(null)
      setFile(null)
      return
    }

    setFile(file)
    setError(null)
    setSuccess(null)
    parseCSV(file)
  }

  const parseCSV = async (file: File) => {
    setIsLoading(true)
    setProgress(10)

    try {
      const text = await file.text()
      setProgress(30)

      const lines = text.split("\n").filter((line) => line.trim() !== "")
      if (lines.length === 0) throw new Error("CSV is empty")

      const headerRow = lines[0].includes(",") ? lines[0].split(",") : lines[0].split("\t")

      const requiredColumns = [
        "trans_date_trans_time",
        "cc_num",
        "merchant",
        "category",
        "amt",
        "first",
        "last",
        "is_fraud",
      ]

      const missingColumns = requiredColumns.filter((col) => !headerRow.includes(col))
      if (missingColumns.length > 0) {
        setError(`Missing required columns: ${missingColumns.join(", ")}`)
        setSuccess(null)
        setIsLoading(false)
        return
      }

      setProgress(50)

      const data: any[] = []
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].includes(",") ? lines[i].split(",") : lines[i].split("\t")
        if (values.length !== headerRow.length) continue

        const row: Record<string, string | number> = {}
        headerRow.forEach((header, index) => {
          const value = values[index]
          row[header] = [
            "amt", "lat", "long", "city_pop", "unix_time", "merch_lat", "merch_long", "is_fraud"
          ].includes(header)
            ? Number.parseFloat(value)
            : value
        })
        data.push(row)
      }

      setProgress(80)
      setTransactions(data)
      setParsedData(data)
      setSuccess(`Successfully uploaded ${data.length} transactions`)
      setError(null)
      setProcessedData(false)
    } catch (err) {
      console.error(err)
      setError("Error parsing CSV file. Please check the format and try again.")
      setSuccess(null)
    } finally {
      setProgress(100)
      setIsLoading(false)
    }
  }

  const handleProcess = async () => {
    if (!parsedData.length) return

    setIsLoading(true)
    setProgress(30)
    setError(null)
    setSuccess(null)

    try {
      const { processedTransactions } = await processTransactions(parsedData)
      setProgress(80)
      setTransactions(processedTransactions)
      setProcessedData(true)
      setResultRows(processedTransactions)
      setSuccess("Successfully processed transactions for fraud detection")
      setShowModal(true)
    } catch (err) {
      console.error(err)
      setError("Error processing transactions. Please try again.")
    } finally {
      setProgress(100)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {(error || success) && (
          <Alert
            variant={error ? "destructive" : "default"}
            className={
              success
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30"
                : ""
            }
          >
            {error ? (
              <>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </>
            )}
          </Alert>
        )}

        <Card
          className={`border-2 border-dashed p-10 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your CSV file here</p>
              <p className="text-sm text-muted-foreground">or click to browse files (max 10MB)</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleChange}
              disabled={isLoading}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isLoading}
            >
              <FileText className="mr-2 h-4 w-4" />
              Select CSV File
            </Button>
          </div>
        </Card>

        {file && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
              </div>
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {progress < 100 ? "Processing..." : "Complete"}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleProcess} disabled={isLoading} className="w-full md:w-auto">
                Process for Fraud Detection
              </Button>
            </div>
          </div>
        )}
      </div>

      <ResultsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        results={resultRows}
      />
    </>
  )
}
