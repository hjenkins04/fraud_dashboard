export type Transaction = {
    trans_date_trans_time: string
    cc_num: string
    merchant: string
    category: string
    amt: string
    zip: string
    city_pop: string
    trans_num: string
    lat?: string
    long?: string
    merch_lat?: string
    merch_long?: string
    first?: string
    last?: string
    job?: string
    gender?: string
    state?: string
    street?: string
    city?: string
    dob?: string
    unix_time?: string
    is_fraud?: string | number
  }
  