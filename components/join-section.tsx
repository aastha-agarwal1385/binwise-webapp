"use client"

import { useState } from "react"
import {
  Users,
  Building2,
  Recycle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const roles = [
  {
    id: "volunteer",
    label: "Volunteer",
    icon: Users,
    description: "Join campus clean-up drives, waste sorting events, and awareness campaigns.",
    perks: [
      "Community service hours",
      "Certificate of participation",
      "Eco-rewards points",
      "Team networking",
    ],
  },
  {
    id: "ngo",
    label: "NGO",
    icon: Building2,
    description: "Partner with us to scale waste management impact across multiple campuses.",
    perks: [
      "Access to waste data analytics",
      "Co-branded campaigns",
      "Grant collaboration",
      "Event sponsorship",
    ],
  },
  {
    id: "recycler",
    label: "Recycling Partner",
    icon: Recycle,
    description: "Connect with campuses to source recyclable materials and close the loop.",
    perks: [
      "Verified waste stream data",
      "Priority pickups",
      "Dashboard access",
      "Revenue sharing model",
    ],
  },
]

export function JoinSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="join" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Users className="size-3.5" />
            Community
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Join the BinWise Movement</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
            Whether you are a student volunteer, an NGO, or a recycling
            partner, there is a place for you in building a cleaner campus.
          </p>
        </div>

        <div className="mt-14">
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
              {roles.map((role) => (
                <TabsTrigger
                  key={role.id}
                  value={role.id}
                  className="gap-1.5"
                >
                  <role.icon className="size-4" />
                  <span className="hidden sm:inline">{role.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {roles.map((role) => (
              <TabsContent key={role.id} value={role.id} className="mt-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* Info card */}
                  <Card>
                    <CardHeader>
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <role.icon className="size-6 text-primary" />
                      </div>
                      <CardTitle className="mt-2 text-xl">{role.label}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm font-medium text-foreground">
                        What you get:
                      </p>
                      <ul className="space-y-2.5">
                        {role.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2.5">
                            <CheckCircle2 className="size-4 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Form card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sign Up</CardTitle>
                      <CardDescription>
                        Fill in your details to join as a {role.label.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor={`${role.id}-name`}
                                className="mb-1.5 block text-sm font-medium text-foreground"
                              >
                                Full Name
                              </label>
                              <Input
                                id={`${role.id}-name`}
                                placeholder="Your name"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor={`${role.id}-email`}
                                className="mb-1.5 block text-sm font-medium text-foreground"
                              >
                                Email
                              </label>
                              <Input
                                id={`${role.id}-email`}
                                type="email"
                                placeholder="you@email.com"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor={`${role.id}-org`}
                              className={cn(
                                "mb-1.5 block text-sm font-medium text-foreground",
                                role.id === "volunteer" && "hidden"
                              )}
                            >
                              Organization
                            </label>
                            <Input
                              id={`${role.id}-org`}
                              placeholder={
                                role.id === "volunteer"
                                  ? "College / Department"
                                  : "Organization name"
                              }
                              className={cn(role.id === "volunteer" && "hidden")}
                            />
                            {role.id === "volunteer" && (
                              <>
                                <label
                                  htmlFor={`${role.id}-college`}
                                  className="mb-1.5 block text-sm font-medium text-foreground"
                                >
                                  College / Department
                                </label>
                                <Input
                                  id={`${role.id}-college`}
                                  placeholder="e.g., Computer Science, Block A"
                                />
                              </>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor={`${role.id}-phone`}
                              className="mb-1.5 block text-sm font-medium text-foreground"
                            >
                              Phone Number
                            </label>
                            <Input
                              id={`${role.id}-phone`}
                              type="tel"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <Button type="submit" className="w-full gap-2">
                            Join as {role.label}
                            <ArrowRight className="size-4" />
                          </Button>
                        </form>
                      ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle2 className="size-8 text-primary" />
                          </div>
                          <h3 className="font-display mt-4 text-lg font-bold text-foreground">
                            Welcome aboard!
                          </h3>
                          <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
                            Thank you for joining BinWise. We will reach out to
                            you shortly with next steps.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-6"
                            onClick={() => setSubmitted(false)}
                          >
                            Submit another
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
