import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Clock,
  BellRing,
  HeartHandshake,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "@/store/auth.store.ts";
import { RiDashboardFill } from "react-icons/ri";

export function Landing() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Your Personal Safety Net
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Peace of mind, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                  one check-in at a time.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                SafePulse ensures your well-being by scheduling regular
                check-ins. If you don't respond, we'll automatically notify your
                trusted emergency contacts.
              </p>
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 rounded-full px-8 text-base shadow-xl shadow-primary-500/20"
                    >
                      <RiDashboardFill />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/contacts">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto h-14 rounded-full px-8 text-base"
                    >
                      Contacts
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 rounded-full px-8 text-base shadow-xl shadow-primary-500/20"
                    >
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto h-14 rounded-full px-8 text-base"
                    >
                      Log In
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How SafePulse Protects You
            </h2>
            <p className="text-slate-600">
              Simple, reliable, and completely focused on your safety and
              privacy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Custom Schedules",
                desc: "Set check-in intervals that match your routine. Hourly, daily, or anywhere in between.",
              },
              {
                icon: BellRing,
                title: "Smart Alerts",
                desc: "If a check-in is missed, we instantly notify your pre-selected emergency contacts with your last known status.",
              },
              {
                icon: HeartHandshake,
                title: "Trusted Circle",
                desc: "Easily manage who gets notified. Add family members, close friends, or caregivers.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100"
              >
                <div className="h-12 w-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Simple 3-Step Process
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Set Your Schedule",
                    desc: "Choose how often you want SafePulse to check on you.",
                  },
                  {
                    title: "Respond to Check-ins",
                    desc: "Receive a notification and tap 'I'm Safe' before the timer ends.",
                  },
                  {
                    title: "Automatic Escalation",
                    desc: "If you miss a check-in, we alert your trusted contacts immediately.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/40 to-slate-50/40" />
                <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-slate-100 max-w-sm w-full mx-4">
                  <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                      Are you safe?
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Please confirm your status
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full text-lg h-14 rounded-2xl bg-success-500 hover:bg-success-600"
                    >
                      <CheckCircle2 className="mr-2 h-5 w-5" /> I'm Safe
                    </Button>
                    <Button
                      size="lg"
                      className="w-full text-lg bg-danger-600 hover:bg-danger-500 transition-all duration-200 h-14 rounded-2xl"
                    >
                      Need Help
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HeartPulse className="h-6 w-6 text-primary-500" />
            <span className="font-semibold text-xl text-white tracking-tight">
              Wasaya
            </span>
          </div>
          <p className="mb-6">
            &copy; {new Date().getFullYear()} Wasaya. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
