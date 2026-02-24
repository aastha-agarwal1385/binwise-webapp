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
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

export function ReportSection() {
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

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

  return (
    <section id="report" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <ImageIcon className="size-3.5" />
            AI Analysis
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Report &amp; Classify Waste</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            Upload an image of waste and our AI will instantly classify it,
            assess severity, and recommend proper disposal.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upload area */}
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Upload Waste Image</CardTitle>
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

          {/* Result area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Result</CardTitle>
              <CardDescription>
                AI-powered waste classification and recommendation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploaded && (
                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-muted/30 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="size-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Upload an image to see the AI analysis
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="flex min-h-[260px] flex-col items-center justify-center gap-4">
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
                <div className="space-y-5">
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

                  {/* Confidence */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        Confidence
                      </span>
                      <span className="font-display font-bold text-primary">
                        {sampleResult.confidence}%
                      </span>
                    </div>
                    <Progress value={sampleResult.confidence} className="h-2.5" />
                  </div>

                  {/* Severity */}
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="size-4 text-amber-500" />
                      <span className="text-sm font-medium text-foreground">
                        Severity
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", sampleResult.severityColor)}
                    >
                      {sampleResult.severity}
                    </Badge>
                  </div>

                  {/* Waste types */}
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
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Suggestion */}
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {sampleResult.suggestion}
                    </p>
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
