"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, CreditCard, MapPin, User, Building, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/types/transaction"

// Categories for transactions
const CATEGORIES = [
  "grocery_pos",
  "shopping_pos",
  "food_dining",
  "health_fitness",
  "travel",
  "entertainment",
  "gas_transport",
  "misc_pos",
  "misc_net",
  "shopping_net",
  "home",
  "kids_pets",
  "personal_care",
]

// States for dropdown
const STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

// Form validation schema
export const formSchema = z.object({
  // Transaction Details
  trans_date_trans_time: z.string().min(1, "Transaction date is required"),
  trans_num: z.string().min(8, "Transaction number must be at least 8 characters"),
  amt: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),

  // Card Information
  cc_num: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "Card number must contain only digits",
    }),

  // Merchant Information
  merchant: z.string().min(1, "Merchant name is required"),
  category: z.string().min(1, "Category is required"),
  merch_lat: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90), {
      message: "Latitude must be between -90 and 90 degrees",
    }),
  merch_long: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180), {
      message: "Longitude must be between -180 and 180 degrees",
    }),

  // Location Information
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  city: z.string().optional(),
  city_pop: z.string().refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Population must be a positive number",
  }),
  state: z.string().optional(),
  lat: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90), {
      message: "Latitude must be between -90 and 90 degrees",
    }),
  long: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180), {
      message: "Longitude must be between -180 and 180 degrees",
    }),

  // Customer Information
  first: z.string().optional(),
  last: z.string().optional(),
  job: z.string().optional(),
  gender: z.string().optional(),
  street: z.string().optional(),
  dob: z.string().optional(),

  // Additional Fields
  unix_time: z.string().optional(),
  is_fraud: z.union([z.string(), z.number()]).optional(),
})

interface TransactionFormProps {
    onSubmit: (data: Partial<Transaction>) => void
    onGenerateFromCSV?: (setValue: (field: keyof z.infer<typeof formSchema>, value: any) => void) => void
  }
  
export function TransactionForm({ onSubmit, onGenerateFromCSV }: TransactionFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dobDate, setDobDate] = useState<Date | undefined>()

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trans_date_trans_time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      cc_num: "",
      merchant: "",
      category: "",
      amt: "",
      zip: "",
      city_pop: "",
      trans_num: "",
      lat: "",
      long: "",
      merch_lat: "",
      merch_long: "",
      first: "",
      last: "",
      job: "",
      gender: "",
      state: "",
      street: "",
      city: "",
      dob: "",
      unix_time: "",
      is_fraud: "0"
    },
  })

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Accordion type="single" collapsible defaultValue="transaction" className="w-full">
          {/* Transaction Details Section */}
          <AccordionItem value="transaction">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Transaction Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="trans_date_trans_time"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Transaction Date & Time*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP HH:mm:ss")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                  setDate(date)
                                  if (date) {
                                    const now = new Date()
                                    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds())
                                    field.onChange(format(date, "yyyy-MM-dd'T'HH:mm:ss"))
                                  }
                                }}
                                initialFocus
                              />
                              <div className="p-3 border-t border-border">
                                <Input
                                  type="time"
                                  step="1"
                                  onChange={(e) => {
                                    if (date) {
                                      const [hours, minutes, seconds] = e.target.value.split(":").map(Number)
                                      const newDate = new Date(date)
                                      newDate.setHours(hours || 0, minutes || 0, seconds || 0)
                                      field.onChange(format(newDate, "yyyy-MM-dd'T'HH:mm:ss"))
                                    }
                                  }}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trans_num"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., TXN123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                              <Input className="pl-7" placeholder="0.00" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="is_fraud"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fraud Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || "0"}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fraud status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Not Fraudulent</SelectItem>
                              <SelectItem value="1">Fraudulent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Card Information Section */}
          <AccordionItem value="card">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Card Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="cc_num"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter card number"
                            {...field}
                            maxLength={19}
                            onChange={(e) => {
                              // Only allow digits
                              const value = e.target.value.replace(/\D/g, "")
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormDescription>Card number will be masked for security</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Merchant Information Section */}
          <AccordionItem value="merchant">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>Merchant Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="merchant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Walmart" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category.replace(/_/g, " ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="merch_lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40.7128" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="merch_long"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchant Longitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., -74.0060" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Location Information Section */}
          <AccordionItem value="location">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Location Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {STATES.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city_pop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City Population</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 8000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40.7128" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="long"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., -74.0060" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Customer Information Section */}
          <AccordionItem value="customer">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Customer Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="first"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="M">Male</SelectItem>
                              <SelectItem value="F">Female</SelectItem>
                              <SelectItem value="O">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={dobDate}
                                onSelect={(date) => {
                                  setDobDate(date)
                                  if (date) {
                                    field.onChange(format(date, "yyyy-MM-dd"))
                                  }
                                }}
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1900}
                                toYear={new Date().getFullYear()}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
                type="button"
                variant="outline"
                onClick={() => {
                    if (onGenerateFromCSV) {
                        onGenerateFromCSV(form.setValue)
                    }
                }}
                className="sm:w-auto w-full"
                >
                Generate Sample Data
            </Button>

          <div className="flex gap-4">
            <Button type="button" variant="secondary" onClick={() => form.reset()} className="sm:w-auto w-full">
              Reset
            </Button>
            <Button type="submit" className="sm:w-auto w-full">
              Submit Transaction
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

