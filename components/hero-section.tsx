import { ArrowRight, Recycle, Leaf, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 backdrop-blur-sm">
          <Leaf className="size-4 text-chart-5" />
          <span className="text-sm font-medium text-primary-foreground/90">
            AI-Powered Waste Classification
          </span>
        </div>

        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl md:leading-tight">
          <span className="text-balance">Smart Waste Management for a Cleaner Tomorrow</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
          BinWise uses AI to classify and monitor waste in real time, helping
          cities and communities reduce pollution, improve recycling, and
          build a sustainable future.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 text-base">
            Report Waste
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-primary-foreground/20 bg-primary-foreground/5 text-base text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            View Dashboard
          </Button>
        </div>

        {/* Quick stats */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Recycle, label: "Waste Classified", value: "12,480+" },
            { icon: BarChart3, label: "City Score", value: "87/100" },
            { icon: Leaf, label: "CO2 Reduced", value: "2.4 Tons" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-6 py-5 backdrop-blur-sm"
            >
              <stat.icon className="size-5 text-chart-5" />
              <span className="font-display text-2xl font-bold text-primary-foreground">
                {stat.value}
              </span>
              <span className="text-sm text-primary-foreground/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
