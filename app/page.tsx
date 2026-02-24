import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReportSection } from "@/components/report-section"
import { DashboardSection } from "@/components/dashboard-section"
import { JoinSection } from "@/components/join-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ReportSection />
      <DashboardSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
