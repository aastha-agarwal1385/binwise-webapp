import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { ReportSection } from "@/components/report-section"
import { DonationSection } from "@/components/donation-section"
import { DashboardSection } from "@/components/dashboard-section"
import { JoinSection } from "@/components/join-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ReportSection />
      <DonationSection />
      <DashboardSection />
      <JoinSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
