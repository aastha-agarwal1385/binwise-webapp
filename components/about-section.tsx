import { Leaf, Target, Users, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To revolutionize waste management across cities using AI-driven classification, helping communities move towards zero-waste environments.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We believe change starts at the grassroots. BinWise empowers residents, local organizations, and municipal teams to take ownership of their environment.",
  },
  {
    icon: Globe,
    title: "Sustainable Impact",
    description:
      "Every piece of waste properly classified contributes to a cleaner planet. Our platform has helped reduce landfill contributions by over 40% in partner cities.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Leaf className="size-3.5" />
            About Us
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Why BinWise Exists</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            We started BinWise with a simple belief: technology can make waste
            management smarter, more transparent, and genuinely impactful.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="size-7 text-primary" />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "50+", label: "City Partners" },
            { value: "12K+", label: "Waste Reports" },
            { value: "2.4T", label: "CO2 Reduced" },
            { value: "5K+", label: "Active Volunteers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
