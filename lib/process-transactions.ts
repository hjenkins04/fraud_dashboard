"use server"

import { revalidatePath } from "next/cache"
import { Transaction } from "@/types/transaction"


export async function processTransactions(transactions: Transaction[] = []) {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid transactions input: must be an array.")
  }

  const lambdaInput = {
    instances: transactions.map((t) => ({
      trans_date_trans_time: t.trans_date_trans_time,
      cc_num: Number(t.cc_num),
      merchant: t.merchant,
      category: t.category,
      amt: t.amt,
      zip: Number(t.zip),
      trans_num: t.trans_num,
    })),
  }

  try {
    console.log("Sending request to Lambda with payload:")
    console.log(JSON.stringify(lambdaInput, null, 2))

    const response = await fetch(process.env.LAMBDA_INVOKE_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lambdaInput),
    })

    console.log("Lambda response status:", response.status)
    console.log("Lambda response headers:", [...response.headers.entries()])

    const json = await response.json()

    console.log("Lambda response raw body:", JSON.stringify(json))

    const predictionList = json?.predictions?.predictions || []
    const threshold = 3.0

    const enriched = transactions.map((tx, i) => ({
      ...tx,
      centroid: predictionList[i]?.closest_cluster ?? null,
      distance: predictionList[i]?.distance_to_cluster ?? null,
      is_fraud_inference: predictionList[i]?.distance_to_cluster > threshold ? 1 : 0,
    }))

    revalidatePath("/")
    revalidatePath("/metrics")

    return { processedTransactions: enriched }
  } catch (error: any) {
    console.error("Error calling Lambda:", error)
    throw new Error(`Lambda invocation failed: ${error.message}`)
  }
}