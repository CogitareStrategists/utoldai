'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  const applications = [
    {
      title: 'Hospitals',
      description: 'AI in care environments',
      href: '/ai-consulting/hospitals',
      image:
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=80',
    },
    {
      title: 'Education',
      description: 'AI in learning systems',
      href: '/ai-consulting/education',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80',
    },
    {
      title: 'Finance',
      description: 'AI in risk and decisions',
      href: '/ai-consulting/finance',
      image:
        'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1800&q=80',
    },
  ]

  const sections = [
    {
      id: '01',
      eyebrow: 'Choices',
      title: 'The market is flooded with AI solutions',
      line: 'Many sell products and many more sell services',
      question: 'What do you buy? What do you build?',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '02',
      eyebrow: 'Conviction',
      title: 'Everyone talks about the future with confidence',
      line: 'Everyone has concepts to prove',
      question: 'Which ONE do you need to engage with?',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '03',
      eyebrow: 'Trust',
      title: 'Every seller wants to build relationships',
      line: 'But only few of them sustain',
      question: 'How do you build the relations that matter for AI solutions?',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '04',
      eyebrow: 'Adoption',
      title: 'Thousands of tools and platforms are launched each day',
      line: 'But people still prefer using excel and word',
      question: 'How do you solve the challenge of adoption?',
      image:
        'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '05',
      eyebrow: 'Judgment',
      title: 'Intelligence hints at starting things at time',
      line: 'But only wise can gauge the successful exits',
      question: 'How can you plan your AI transformation wisely?',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    },
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-white [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <div className="fixed inset-0 -z-30 bg-[#07111f]" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(89,137,255,0.22),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(0,199,255,0.14),transparent_22%),linear-gradient(180deg,#060d17_0%,#07111f_38%,#091828_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.18)_58%,rgba(7,17,31,0.75)_100%)]" />

      <section className="relative min-h-screen px-5 pt-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-7xl items-center justify-between py-4"
        >
          <div className="text-[11px] uppercase tracking-[0.42em] text-white/68">
            UTOLD AI
          </div>
          <nav className="hidden items-center gap-8 sm:flex">
            <a
              href="#applications"
              className="text-[11px] uppercase tracking-[0.3em] text-white/38 transition hover:text-white/72"
            >
              Applications
            </a>
            <a
              href="#contact"
              className="text-[11px] uppercase tracking-[0.3em] text-white/38 transition hover:text-white/72"
            >
              Contact
            </a>
          </nav>
        </motion.div>

        <div className="relative mx-auto mt-4 grid min-h-[calc(100vh-6.5rem)] max-w-7xl items-stretch gap-10 lg:grid-cols-12 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
            className="relative z-10 flex items-center py-10 lg:col-span-5 lg:py-20"
          >
            <div className="max-w-3xl">
              <div className="mb-8 h-px w-20 bg-gradient-to-r from-cyan-200/70 to-transparent" />
              <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.84] tracking-[-0.075em] text-white sm:text-6xl lg:text-[5.15rem] xl:text-[5.85rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">
                Plan your AI future with judgment.
              </h1>

              <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-white/72 sm:text-xl lg:text-[1.55rem]">
                <p>Time is like an ocean</p>
                <p>Do not go with random waves</p>
                <p className="text-white">Plan your journey with the tides</p>
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#applications"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.18)]"
                >
                  View Applications
                </a>
                <a
                  href="tel:+919182626500"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Call +91 9182626500
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.15, ease: 'easeOut' }}
            className="relative mt-2 min-h-[440px] overflow-hidden rounded-[2rem] lg:col-span-7 lg:mt-0 lg:min-h-full xl:rounded-[2.75rem]"
          >
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80"
              alt="Premium AI consulting visual"
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,14,26,0.58),rgba(5,14,26,0.2)_38%,rgba(8,24,44,0.46)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(92,157,255,0.24),transparent_22%),radial-gradient(circle_at_70%_75%,rgba(0,208,255,0.12),transparent_20%)] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07111f]/10 to-[#07111f]/72 lg:bg-gradient-to-r lg:from-[#07111f]/68 lg:via-[#07111f]/16 lg:to-transparent" />
            <div className="absolute inset-0 ring-1 ring-white/10 ring-inset" />
          </motion.div>
        </div>
      </section>

      <section
        id="applications"
        className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-8 lg:pt-20"
      >
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/60">
              Applications
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.25rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">
              Where are you applying AI?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/66 sm:text-xl lg:text-[1.3rem]">
              AI Consulting is not one thing. The right decisions depend on where AI enters your
              world.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-3">
          {applications.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              {...fadeUp}
              transition={{ duration: 0.72, delay: index * 0.05, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-[24rem] sm:h-[28rem] lg:h-[32rem]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.08),rgba(7,17,31,0.22)_35%,rgba(7,17,31,0.88)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(91,157,255,0.22),transparent_20%),radial-gradient(circle_at_25%_75%,rgba(0,210,255,0.1),transparent_18%)] mix-blend-screen" />
                <div className="absolute inset-0 ring-1 ring-white/10 ring-inset" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-cyan-100/60">
                    Application
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-4xl [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
                    {item.description}
                  </p>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.28em] text-white/72">
                    Enter
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pb-12 lg:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:gap-14">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              {...fadeUp}
              transition={{ duration: 0.72, delay: index * 0.04, ease: 'easeOut' }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              <div className="grid lg:grid-cols-12">
                <div
                  className={`flex items-center p-7 sm:p-9 lg:col-span-6 lg:p-14 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/60">
                      {section.id} • {section.eyebrow}
                    </div>
                    <div className="mt-8 space-y-5 lg:space-y-6">
                      <h2 className="text-3xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-4xl lg:text-[3.35rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">
                        {section.title}
                      </h2>
                      <p className="max-w-2xl text-lg leading-relaxed text-white/66 sm:text-xl lg:text-[1.35rem]">
                        {section.line}
                      </p>
                      <p className="pt-4 text-2xl font-medium leading-tight tracking-[-0.03em] text-cyan-50 sm:text-3xl lg:text-[2.5rem]">
                        {section.question}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative min-h-[320px] overflow-hidden lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <img
                    src={section.image}
                    alt={section.eyebrow}
                    className="h-full w-full scale-[1.02] object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,14,28,0.34),rgba(6,14,28,0.08)_40%,rgba(8,23,43,0.34)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(86,153,255,0.22),transparent_20%),radial-gradient(circle_at_25%_75%,rgba(0,210,255,0.1),transparent_18%)] mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08111d]/78 via-[#08111d]/24 to-transparent lg:bg-gradient-to-t lg:from-[#08111d]/75 lg:via-transparent lg:to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16"
      >
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(8,17,29,0.9),rgba(10,36,61,0.96))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="grid gap-8 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:px-14 lg:py-16">
            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/60">
                Reach Out
              </div>
              <div className="mt-6 space-y-4 sm:space-y-5">
                <p className="text-xl text-white/72 sm:text-2xl lg:text-3xl">
                  Your seriousness is our strength
                </p>
                <p className="text-xl text-white/72 sm:text-2xl lg:text-3xl">
                  If you have the intent, we can fuel the creation
                </p>
                <h2 className="max-w-4xl text-3xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">
                  To work together on your AI future
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:col-span-4">
              <a
                href="tel:+919182626500"
                className="rounded-[1.35rem] border border-white/10 bg-white px-6 py-5 text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.14)]"
              >
                +91 9182626500
              </a>
              <a
                href="mailto:admin@utoldai.com"
                className="rounded-[1.35rem] border border-white/10 bg-white/5 px-6 py-5 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                admin@utoldai.com
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}