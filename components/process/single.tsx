"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Single() {
  const [formData, setFormData] = useState({
    trans_date_trans_time: "",
    cc_num: "",
    merchant: "",
    category: "",
    amt: "",
    first: "",
    last: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Add logic to validate and process the single entry
    console.log("Submitting single transaction:", formData)
    alert("Submitted for processing (console log)")
  }

  return (
    <form className="space-y-4">
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <Label htmlFor={field}>{field.replace(/_/g, " ")}</Label>
          <Input
            id={field}
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <Button type="button" onClick={handleSubmit}>
        Submit Transaction
      </Button>
    </form>
  )
}
