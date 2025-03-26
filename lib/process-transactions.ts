"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// This is a mock fraud detection algorithm
// In a real application, this would call an external API or ML model
export async function processTransactions() {
  // Get transactions from cookie storage (in a real app, this would be from a database)
  const transactionsCookie = cookies().get("transactions")
  let transactions = []

  if (transactionsCookie) {
    try {
      transactions = JSON.parse(transactionsCookie.value)
    } catch (error) {
      console.error("Error parsing transactions cookie:", error)
    }
  }

  // Process each transaction for fraud
  const processedTransactions = transactions.map((transaction) => {
    // This is a simplified fraud detection algorithm
    // In a real application, this would be much more sophisticated

    // Factors that might indicate fraud:
    // 1. Unusually large transaction amounts
    // 2. Transactions in unusual categories for the customer
    // 3. Transactions at unusual times
    // 4. Transactions in unusual locations

    let fraudScore = 0

    // Check for high amount
    if (transaction.amt > 1000) {
      fraudScore += 3
    } else if (transaction.amt > 500) {
      fraudScore += 2
    } else if (transaction.amt > 200) {
      fraudScore += 1
    }

    // Check for suspicious merchant (simplified)
    if (transaction.merchant.toLowerCase().includes("fraud")) {
      fraudScore += 3
    }

    // Check for unusual time (simplified)
    const transactionDate = new Date(transaction.trans_date_trans_time)
    const hour = transactionDate.getHours()
    if (hour >= 0 && hour <= 5) {
      fraudScore += 2
    }

    // Check for unusual location (simplified)
    // Calculate distance between customer and merchant
    const distance = calculateDistance(transaction.lat, transaction.long, transaction.merch_lat, transaction.merch_long)

    if (distance > 100) {
      fraudScore += 2
    }

    // Determine if transaction is fraudulent based on score
    return {
      ...transaction,
      is_fraud: fraudScore >= 5 ? 1 : 0,
    }
  })

  // Store processed transactions in cookie (in a real app, this would be in a database)
  cookies().set("processed_transactions", JSON.stringify(processedTransactions))

  // Revalidate the paths
  revalidatePath("/")
  revalidatePath("/metrics")

  return { processedTransactions }
}

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

