"use client"

import { useState, useCallback } from "react"
import {
  Upload,
  ImageIcon,
  CheckCircle2,
  Gift,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const conditionOptions = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "repairable", label: "Repairable" },
]

export function DonationSection() {
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [description, setDescription] = useState("")
  const [condition, setCondition] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleUpload = useCallback(() => {
    setUploaded(true)
    setSubmitted(false)
  }, [])

  const handleReset = useCallback(() => {
    setUploaded(false)
    setDescription("")
    setCondition("")
    setSubmitted(false)
  }, [])

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
  }, [])

  return (
    <section id="donate" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Gift className="size-3.5" />
            Donate &amp; Reuse
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Upload Donatable Items</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            Drag &amp; drop or click to upload reusable items for donation.
            Give your pre-loved items a second life.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upload area */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Upload Item Image</CardTitle>
              <CardDescription>
                Drag and drop or click to upload a photo of the donatable item
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploaded ? (
                <div
                  className={cn(
                    "relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragActive(true)
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragActive(false)
                    handleUpload()
                  }}
                  onClick={handleUpload}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload donatable item image"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleUpload()
                  }}
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Upload className="size-6 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    Drop your image here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
              ) : (
                <div className="relative min-h-[260px] overflow-hidden rounded-xl bg-muted/30">
                  <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                      <ImageIcon className="size-7 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      donation_item_photo.jpg
                    </p>
                    <p className="text-xs text-muted-foreground">1.8 MB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="absolute top-3 right-3"
                    onClick={handleReset}
                    aria-label="Remove uploaded image"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details & submission area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Item Details</CardTitle>
              <CardDescription>
                Describe the item and its condition for potential recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <div className="space-y-5">
                  {/* Description field */}
                  <div>
                    <label
                      htmlFor="donation-description"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Description{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="donation-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., clothes, books, electronics, furniture..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  {/* Condition dropdown */}
                  <div>
                    <label
                      htmlFor="donation-condition"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Condition
                    </label>
                    <select
                      id="donation-condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      <option value="" disabled>
                        Select item condition
                      </option>
                      {conditionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit button */}
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!uploaded}
                    onClick={handleSubmit}
                  >
                    <Gift className="mr-2 size-4" />
                    List for Donation
                  </Button>

                  {!uploaded && (
                    <p className="text-center text-xs text-muted-foreground">
                      Upload an image first to list your item
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      Item listed successfully
                    </p>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
                      NGOs and community members can now request it.
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleReset} className="mt-2">
                    List Another Item
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
