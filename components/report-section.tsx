"use client"

import { useState, useCallback } from "react"
import {
  Upload,
  ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Package,
  Flame,
  Gift,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type WasteResult = {
  type: string
  icon: React.ReactNode
  confidence: number
  severity: "Low" | "Medium" | "High"
  severityColor: string
  suggestion: string
}

const sampleResult: WasteResult = {
  type: "Plastic",
  icon: <Package className="size-5" />,
  confidence: 94,
  severity: "Medium",
  severityColor: "text-amber-600 bg-amber-50 border-amber-200",
  suggestion:
    "This item should be placed in the dry waste recycling bin. Remove any labels before disposal.",
}

const conditionOptions = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "repairable", label: "Repairable" },
]

export function ReportSection() {
  // Waste upload state
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Donation upload state
  const [donDragActive, setDonDragActive] = useState(false)
  const [donUploaded, setDonUploaded] = useState(false)
  const [donDescription, setDonDescription] = useState("")
  const [donCondition, setDonCondition] = useState("")
  const [donSubmitted, setDonSubmitted] = useState(false)

  const handleUpload = useCallback(() => {
    setUploaded(true)
    setAnalyzing(true)
    setShowResult(false)
    setTimeout(() => {
      setAnalyzing(false)
      setShowResult(true)
    }, 2000)
  }, [])

  const handleReset = useCallback(() => {
    setUploaded(false)
    setAnalyzing(false)
    setShowResult(false)
  }, [])

  const handleDonUpload = useCallback(() => {
    setDonUploaded(true)
    setDonSubmitted(false)
  }, [])

  const handleDonReset = useCallback(() => {
    setDonUploaded(false)
    setDonDescription("")
    setDonCondition("")
    setDonSubmitted(false)
  }, [])

  const handleDonSubmit = useCallback(() => {
    setDonSubmitted(true)
  }, [])

  return (
    <section id="report" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <ImageIcon className="size-3.5" />
            AI Analysis
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Report, Classify &amp; Donate</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            Upload waste for AI classification or list reusable items for
            donation. Help your city stay clean and sustainable.
          </p>
        </div>

        {/* Two-column upload grid: Waste (left) + Donation (right) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── Waste Upload Card ── */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="size-4 text-primary" />
                Upload Waste Image
              </CardTitle>
              <CardDescription>
                Drag and drop or click to upload a photo for AI analysis
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
                  aria-label="Upload waste image"
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
                      waste_sample_photo.jpg
                    </p>
                    <p className="text-xs text-muted-foreground">2.4 MB</p>
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

          {/* ── Donation Upload Card ── */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="size-4 text-primary" />
                Upload Donatable Items
              </CardTitle>
              <CardDescription>
                Drag &amp; drop or click to upload reusable items for donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!donUploaded ? (
                <div
                  className={cn(
                    "relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
                    donDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDonDragActive(true)
                  }}
                  onDragLeave={() => setDonDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDonDragActive(false)
                    handleDonUpload()
                  }}
                  onClick={handleDonUpload}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload donatable item image"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleDonUpload()
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
              ) : !donSubmitted ? (
                <div className="space-y-5">
                  {/* Uploaded preview */}
                  <div className="relative overflow-hidden rounded-xl bg-muted/30">
                    <div className="flex flex-col items-center justify-center gap-2 py-6">
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                        <ImageIcon className="size-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        donation_item_photo.jpg
                      </p>
                      <p className="text-xs text-muted-foreground">1.8 MB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-2 right-2"
                      onClick={handleDonReset}
                      aria-label="Remove uploaded image"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>

                  {/* Description */}
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
                      value={donDescription}
                      onChange={(e) => setDonDescription(e.target.value)}
                      placeholder="e.g., clothes, books, electronics, furniture..."
                      rows={3}
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
                      value={donCondition}
                      onChange={(e) => setDonCondition(e.target.value)}
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

                  {/* Submit */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleDonSubmit}
                  >
                    <Gift className="mr-2 size-4" />
                    List for Donation
                  </Button>
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
                  <Button
                    variant="outline"
                    onClick={handleDonReset}
                    className="mt-2"
                  >
                    List Another Item
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── AI Analysis Result (full width below both uploads) ── */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Analysis Result</CardTitle>
              <CardDescription>
                AI-powered waste classification and recommendation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploaded && (
                <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl bg-muted/30 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="size-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Upload a waste image to see the AI analysis
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
                  <div className="size-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
                  <p className="text-sm font-medium text-foreground">
                    Analyzing waste type...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Our AI is classifying the image
                  </p>
                </div>
              )}

              {showResult && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Classification */}
                  <div className="flex items-start gap-4 rounded-xl bg-primary/5 p-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {sampleResult.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold text-foreground">
                          {sampleResult.type}
                        </span>
                        <CheckCircle2 className="size-4 text-primary" />
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Dry Waste &mdash; Recyclable
                      </p>
                    </div>
                  </div>

                  {/* Confidence + Severity */}
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          Confidence
                        </span>
                        <span className="font-display font-bold text-primary">
                          {sampleResult.confidence}%
                        </span>
                      </div>
                      <Progress
                        value={sampleResult.confidence}
                        className="h-2.5"
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="size-4 text-amber-500" />
                        <span className="text-sm font-medium text-foreground">
                          Severity
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          sampleResult.severityColor
                        )}
                      >
                        {sampleResult.severity}
                      </Badge>
                    </div>
                  </div>

                  {/* Waste types + Suggestion */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Plastic", icon: Package, active: true },
                        { label: "Wet", icon: Droplets, active: false },
                        { label: "Dry", icon: Flame, active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors",
                            item.active
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground"
                          )}
                        >
                          <item.icon className="size-4" />
                          <span className="text-xs font-medium">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <p className="text-sm leading-relaxed text-secondary-foreground">
                        {sampleResult.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
