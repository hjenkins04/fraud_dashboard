"use client"

import { MapPin, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LocationMapProps {
  customerLat: number
  customerLong: number
  merchantLat: number
  merchantLong: number
  isFraud: boolean
}

export function LocationMap({
  customerLat,
  customerLong,
  merchantLat,
  merchantLong,
  isFraud,
}: LocationMapProps) {
  const distance = calculateDistance(customerLat, customerLong, merchantLat, merchantLong)
  const isSuspiciousDistance = distance > 1000 // threshold in miles

  const mapSrc = `https://www.google.com/maps?q=${merchantLat},${merchantLong}&z=15&output=embed`

  return (
    <div className="relative w-full h-[400px] rounded-md overflow-hidden border">
      <iframe
        src={mapSrc}
        className="w-full h-full pointer-events-none"
        loading="lazy"
        allowFullScreen
      />

      {isSuspiciousDistance && (
        <div className="absolute bottom-4 left-4 z-10">
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Suspicious location difference detected
          </Badge>
        </div>
      )}
    </div>
  )
}

// Haversine formula to calculate distance in miles
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8 // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
