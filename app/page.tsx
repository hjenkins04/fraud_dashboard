"use client"

import { Suspense } from "react"
import Link from "next/link"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  ShieldAlert,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import ProcessSection from "@/components/process"
import { FraudDetectionResults } from "@/components/fraud-detection-results"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="h-6 w-6" />
            <span>Fraud Detection Dashboard</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Data
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Transactions</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fraud Amount</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,543.00</div>
                  <p className="text-xs text-muted-foreground">-4.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2%</div>
                  <p className="text-xs text-muted-foreground">+1.1% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Transaction Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Suspense fallback={<div>Loading chart...</div>}>
                    <Overview />
                  </Suspense>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Showing the 5 most recent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading transactions...</div>}>
                    <RecentTransactions />
                  </Suspense>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cluster Analysis</CardTitle>
                <CardDescription>Visualization of transaction clusters using K-means algorithm</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Cluster visualization will appear here</p>
                  <p className="text-sm mt-2">
                    (This would display a scatter plot of transactions with clusters highlighted)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab with ProcessSection */}
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Transaction Data</CardTitle>
                <CardDescription>Upload CSV files or enter a single transaction manually</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading upload form...</div>}>
                  <ProcessSection />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Results</CardTitle>
                <CardDescription>Results of the fraud detection analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading results...</div>}>
                  <FraudDetectionResults />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
