"use client"

import { useState } from "react"
import { AlertCircle, Download, Filter, Search } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function FraudDetectionResults() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for fraud detection results
  const results = [
    {
      id: "T12346",
      timestamp: "2023-03-15 14:23:45",
      amount: "$1,500.00",
      merchant: "Best Buy",
      cardLast4: "5678",
      location: "New York, NY",
      score: 0.92,
      status: "High Risk",
      features: ["Unusual location", "High amount", "Frequency anomaly"],
    },
    {
      id: "T12348",
      timestamp: "2023-03-15 13:05:12",
      amount: "$899.99",
      merchant: "Apple",
      cardLast4: "3456",
      location: "Online",
      score: 0.87,
      status: "High Risk",
      features: ["Multiple transactions", "Unusual merchant"],
    },
    {
      id: "T12350",
      timestamp: "2023-03-15 11:45:33",
      amount: "$2,450.00",
      merchant: "Electronics Store",
      cardLast4: "7123",
      location: "Miami, FL",
      score: 0.95,
      status: "High Risk",
      features: ["Unusual location", "High amount", "Time anomaly"],
    },
    {
      id: "T12352",
      timestamp: "2023-03-15 10:12:08",
      amount: "$75.50",
      merchant: "Gas Station",
      cardLast4: "9234",
      location: "Chicago, IL",
      score: 0.65,
      status: "Medium Risk",
      features: ["Unusual merchant category"],
    },
    {
      id: "T12354",
      timestamp: "2023-03-15 09:34:22",
      amount: "$120.00",
      merchant: "Unknown Vendor",
      cardLast4: "8345",
      location: "Online",
      score: 0.72,
      status: "Medium Risk",
      features: ["Unrecognized merchant"],
    },
  ]

  const filteredResults = results.filter(
    (result) =>
      result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Detection Summary</AlertTitle>
        <AlertDescription>
          Analysis complete. 5 suspicious transactions detected out of 124 flagged transactions.
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Features</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.id}</TableCell>
                  <TableCell>{result.timestamp}</TableCell>
                  <TableCell>{result.amount}</TableCell>
                  <TableCell>{result.merchant}</TableCell>
                  <TableCell>{result.score.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        result.status === "High Risk"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {result.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

