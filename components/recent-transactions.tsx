import { CheckCircle2, XCircle } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentTransactions() {
  const transactions = [
    {
      id: "T12345",
      amount: "$230.00",
      status: "legitimate",
      cardLast4: "4242",
      timestamp: "2 minutes ago",
      merchant: "Amazon",
    },
    {
      id: "T12346",
      amount: "$1,500.00",
      status: "suspicious",
      cardLast4: "5678",
      timestamp: "15 minutes ago",
      merchant: "Best Buy",
    },
    {
      id: "T12347",
      amount: "$45.20",
      status: "legitimate",
      cardLast4: "9012",
      timestamp: "45 minutes ago",
      merchant: "Uber",
    },
    {
      id: "T12348",
      amount: "$899.99",
      status: "suspicious",
      cardLast4: "3456",
      timestamp: "1 hour ago",
      merchant: "Apple",
    },
    {
      id: "T12349",
      amount: "$12.50",
      status: "legitimate",
      cardLast4: "7890",
      timestamp: "2 hours ago",
      merchant: "Starbucks",
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {transaction.merchant.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.merchant}</p>
            <p className="text-sm text-muted-foreground">
              {transaction.timestamp} • Card ending {transaction.cardLast4}
            </p>
          </div>
          <div className="ml-auto font-medium">{transaction.amount}</div>
          <div className="ml-2">
            {transaction.status === "legitimate" ? (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                Safe
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                <XCircle className="mr-1 h-3.5 w-3.5" />
                Suspicious
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

