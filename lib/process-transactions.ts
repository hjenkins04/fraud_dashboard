"use server"

import { revalidatePath } from "next/cache"

export type Transaction = {
  trans_date_trans_time: string
  cc_num: string
  merchant: string
  category: string
  amt: number
  first: string
  last: string
  gender: string
  street: string
  city: string
  state: string
  zip: string
  lat: number
  long: number
  city_pop: number
  job: string
  dob: string
  trans_num: string
  unix_time: number
  merch_lat: number
  merch_long: number
  is_fraud: number
}

export async function processTransactions(transactions: Transaction[] = []) {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid transactions input: must be an array.")
  }

  const processedTransactions = transactions.map((t) => ({
    ...t,
    is_fraud: Number(t.is_fraud),
  }))
  

  revalidatePath("/")
  revalidatePath("/metrics")

  return { processedTransactions }
}

