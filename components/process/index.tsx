"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Batch } from "./batch"
import { Single } from "./single"

export default function ProcessSection() {
  return (
    <Tabs defaultValue="batch" className="w-full space-y-6">
      <TabsList>
        <TabsTrigger value="batch">Batch Upload</TabsTrigger>
        <TabsTrigger value="single">Single Entry</TabsTrigger>
      </TabsList>
      <TabsContent value="batch">
        <Batch />
      </TabsContent>
      <TabsContent value="single">
        <Single />
      </TabsContent>
    </Tabs>
  )
}
