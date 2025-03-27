"use client"

import { Transaction } from "@/types/transaction"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LocationMap } from "@/components/location-map"

import { useState } from "react"
import { MapPin, AlertTriangle, CreditCard, User, Building } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


type Props = {
  transaction: Partial<Transaction>
  isOpen: boolean
  onClose: () => void
}

export default function SingleResultsModal({ transaction, isOpen, onClose }: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="w-full max-w-[90vw] md:max-w-[1200px] lg:max-w-[1400px] p-8">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-">
              <DialogTitle className="text-xl font-bold">Transaction Details</DialogTitle>
              {transaction.is_fraud === 1 ? (
                <Badge variant="destructive" className="flex items-center gap-2 px-4 py-2 text-base rounded-md">
                  <AlertTriangle className="h-5 w-5" />
                  Fraud Detected
                </Badge>
              ) : (
                <Badge className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-base rounded-md">
                  Legitimate
                </Badge>
              )}
            </div>
          </DialogHeader>
    
            <Tabs defaultValue="overview" className="w-full">
            <div className="min-h-[800px] transition-all duration-800">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="merchant">Merchant</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
      
                <TabsContent value="overview">
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Transaction Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Transaction Date & Time</p>
                            <p className="text-sm text-muted-foreground">{transaction.trans_date_trans_time}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Transaction Number</p>
                            <p className="text-sm text-muted-foreground">{transaction.trans_num}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Credit Card</p>
                            <p className="text-sm text-muted-foreground">{transaction.cc_num}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm text-muted-foreground">${Number(transaction.amt).toFixed(2)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Unix Timestamp</p>
                            <p className="text-sm text-muted-foreground">{transaction.unix_time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
      
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Merchant Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Merchant</p>
                            <p className="text-sm text-muted-foreground">{transaction.merchant}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Category</p>
                            <p className="text-sm text-muted-foreground">{transaction.category}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
      
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.first} {transaction.last}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Gender</p>
                            <p className="text-sm text-muted-foreground">{transaction.gender}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Date of Birth</p>
                            <p className="text-sm text-muted-foreground">{transaction.dob}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Occupation</p>
                            <p className="text-sm text-muted-foreground">{transaction.job}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
      
                <TabsContent value="customer">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Personal Information</h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Full Name:</p>
                                <p className="text-sm col-span-2">
                                  {transaction.first} {transaction.last}
                                </p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Gender:</p>
                                <p className="text-sm col-span-2">{transaction.gender}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Date of Birth:</p>
                                <p className="text-sm col-span-2">{transaction.dob}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Occupation:</p>
                                <p className="text-sm col-span-2">{transaction.job}</p>
                              </div>
                            </div>
                          </div>
                        </div>
      
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Address Information</h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Street:</p>
                                <p className="text-sm col-span-2">{transaction.street}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">City:</p>
                                <p className="text-sm col-span-2">{transaction.city}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">State:</p>
                                <p className="text-sm col-span-2">{transaction.state}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">ZIP:</p>
                                <p className="text-sm col-span-2">{transaction.zip}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">City Population:</p>
                                <p className="text-sm col-span-2">{transaction.city_pop?.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
      
                <TabsContent value="merchant">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Merchant Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">Merchant Information</h3>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Name:</p>
                              <p className="text-sm col-span-2">{transaction.merchant}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Category:</p>
                              <p className="text-sm col-span-2">{transaction.category}</p>
                            </div>
                          </div>
      
                          <div className="space-y-2">
                            <h3 className="font-medium">Transaction Details</h3>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Amount:</p>
                              <p className="text-sm col-span-2">${Number(transaction.amt).toFixed(2)}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Date & Time:</p>
                              <p className="text-sm col-span-2">{transaction.trans_date_trans_time}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Transaction #:</p>
                              <p className="text-sm col-span-2">{transaction.trans_num}</p>
                            </div>
                          </div>
                        </div>
      
                        <div>
                          <h3 className="font-medium mb-2">Merchant Location</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Latitude:</p>
                              <p className="text-sm col-span-2">{transaction.merch_lat}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <p className="text-sm text-muted-foreground">Longitude:</p>
                              <p className="text-sm col-span-2">{transaction.merch_long}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
      
                <TabsContent value="location">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Customer Location</h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Address:</p>
                                <p className="text-sm col-span-2">{transaction.street}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">City:</p>
                                <p className="text-sm col-span-2">{transaction.city}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">State:</p>
                                <p className="text-sm col-span-2">{transaction.state}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">ZIP:</p>
                                <p className="text-sm col-span-2">{transaction.zip}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Latitude:</p>
                                <p className="text-sm col-span-2">{transaction.lat}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Longitude:</p>
                                <p className="text-sm col-span-2">{transaction.long}</p>
                              </div>
                            </div>
                          </div>
                        </div>
      
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Merchant Location</h3>
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Merchant:</p>
                                <p className="text-sm col-span-2">{transaction.merchant}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Latitude:</p>
                                <p className="text-sm col-span-2">{transaction.merch_lat}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Longitude:</p>
                                <p className="text-sm col-span-2">{transaction.merch_long}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <p className="text-sm text-muted-foreground">Distance:</p>
                                <p className="text-sm col-span-2">
                                  {calculateDistance(
                                    Number(transaction.lat),
                                    Number(transaction.long),
                                    Number(transaction.merch_lat),
                                    Number(transaction.merch_long),
                                  ).toFixed(2)}{" "}
                                  miles
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
      
                      <div>
                        <h3 className="font-medium mb-2">Location Map</h3>
                        <LocationMap
                          customerLat={Number(transaction.lat)}
                          customerLong={Number(transaction.long)}
                          merchantLat={Number(transaction.merch_lat)}
                          merchantLong={Number(transaction.merch_long)}
                          isFraud={transaction.is_fraud === 1}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      )
    }

    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 3958.8 // miles
        const dLat = ((lat2 - lat1) * Math.PI) / 180
        const dLon = ((lon2 - lon1) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      }