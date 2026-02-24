import {
  Camera,
  BarChart3,
  MapPin,
  Bell,
  Recycle,
  Shield,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Camera,
    title: "AI Waste Classification",
    description:
      "Upload an image and our AI instantly classifies the waste type, material, and recommended disposal method with over 94% accuracy.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description:
      "Monitor campus cleanliness scores, waste collection trends, and recycling rates with live, interactive charts and metrics.",
  },
  {
    icon: MapPin,
    title: "Hotspot Detection",
    description:
      "Automatically identify high-waste zones across campus so cleanup efforts can be directed where they matter most.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive instant notifications when bins are full, cleanliness scores drop, or waste hotspots emerge in your area.",
  },
  {
    icon: Recycle,
    title: "Recycling Insights",
    description:
      "Track what percentage of waste is being recycled and get actionable recommendations to improve recycling rates.",
  },
  {
    icon: Shield,
    title: "Community Reporting",
    description:
      "Enable students and staff to report waste issues directly through the app, fostering accountability and engagement.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Zap className="size-3.5" />
            Features
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Everything You Need for Smarter Waste Management</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            From AI classification to real-time dashboards, BinWise gives your
            campus the tools to manage waste effectively and sustainably.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group transition-colors hover:border-primary/30"
            >
              <CardContent className="pt-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-display mt-4 text-base font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
