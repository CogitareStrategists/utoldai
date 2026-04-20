'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function EducationPage() {
  const sections = [
    {
      id: '01',
      eyebrow: 'Learning',
      title: 'Education systems change slowly',
      line: 'Technology enters faster than learning behavior evolves',
      question: 'Where should AI truly intervene in learning?',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '02',
      eyebrow: 'Tools',
      title: 'Too many tools focus on content delivery',
      line: 'Few focus on actual understanding and outcomes',
      question: 'What improves learning, not just access?',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '03',
      eyebrow: 'Trust',
      title: 'Teachers and institutions rely on proven methods',
      line: 'Adoption cannot happen by announcement alone',
      question: 'How do you bring AI in without weakening trust in the classroom?',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '04',
      eyebrow: 'Adoption',
      title: 'Students may use tools quickly',
      line: 'Institutions do not transform at the same speed',
      question: 'How do you create adoption across teachers, students, and administration?',
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: '05',
      eyebrow: 'Outcomes',
      title: 'Education is not about activity alone',
      line: 'It is about measurable improvement in learning',
      question: 'How do you scale AI while protecting learning quality and academic intent?',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
    },
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-white [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
      <div className="fixed inset-0 -z-30 bg-[#07111f]" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(89,137,255,0.18),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(0,199,255,0.12),transparent_22%),linear-gradient(180deg,#060d17_0%,#07111f_38%,#091828_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.18)_58%,rgba(7,17,31,0.75)_100%)]" />

      <section className="relative min-h-screen px-5 pt-6 sm:px-8 lg:px-12">
<motion.div
  initial={{ opacity: 0, y: -16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  className="mx-auto flex max-w-7xl items-center justify-between py-4"
>
  <Link
    href="/"
    className="text-[11px] uppercase tracking-[0.42em] text-white/68 hover:text-white"
  >
    UTOLD AI
  </Link>

  <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/50">
    <Link href="/#applications">Applications</Link>
    <Link href="/#contact">Contact</Link>
  </nav>
</motion.div>

        <div className="relative mx-auto mt-4 grid min-h-[calc(100vh-6.5rem)] max-w-7xl items-stretch gap-10 lg:grid-cols-12 lg:gap-0">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 flex items-center py-10 lg:col-span-5 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-8 h-px w-20 bg-gradient-to-r from-cyan-200/70 to-transparent" />
              <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.84] tracking-[-0.075em] text-white sm:text-6xl lg:text-[5rem] xl:text-[5.7rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">Plan AI for learning, not just delivery.</h1>
              <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-white/72 sm:text-xl lg:text-[1.55rem]">
                <p>Education is not content alone</p>
                <p>Tools can move faster than understanding</p>
                <p className="text-white">Plan AI with learning in mind</p>
              </div>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href="tel:+919182626500" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.18)]">Call +91 9182626500</a>
                <a href="mailto:admin@utoldai.com" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">admin@utoldai.com</a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="relative mt-2 min-h-[440px] overflow-hidden rounded-[2rem] lg:col-span-7 lg:mt-0 lg:min-h-full xl:rounded-[2.75rem]">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80" alt="Education AI consulting visual" className="absolute inset-0 h-full w-full scale-[1.03] object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,14,26,0.58),rgba(5,14,26,0.2)_38%,rgba(8,24,44,0.46)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(92,157,255,0.24),transparent_22%),radial-gradient(circle_at_70%_75%,rgba(0,208,255,0.12),transparent_20%)] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07111f]/10 to-[#07111f]/72 lg:bg-gradient-to-r lg:from-[#07111f]/68 lg:via-[#07111f]/16 lg:to-transparent" />
            <div className="absolute inset-0 ring-1 ring-white/10 ring-inset" />
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-12 lg:pt-20">
        <div className="mx-auto max-w-7xl"><div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" /></div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:gap-14">
          {sections.map((section, index) => (
            <motion.div key={section.id} {...fadeUp} transition={{ duration: 0.72, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="grid lg:grid-cols-12">
                <div className={`flex items-center p-7 sm:p-9 lg:col-span-6 lg:p-14 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/60">{section.id} • {section.eyebrow}</div>
                    <div className="mt-8 space-y-5 lg:space-y-6">
                      <h2 className="text-3xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-4xl lg:text-[3.2rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">{section.title}</h2>
                      <p className="max-w-2xl text-lg leading-relaxed text-white/66 sm:text-xl lg:text-[1.35rem]">{section.line}</p>
                      <p className="pt-4 text-2xl font-medium leading-tight tracking-[-0.03em] text-cyan-50 sm:text-3xl lg:text-[2.35rem]">{section.question}</p>
                    </div>
                  </div>
                </div>
                <div className={`relative min-h-[320px] overflow-hidden lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={section.image} alt={section.eyebrow} className="h-full w-full scale-[1.02] object-cover transition duration-700 group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,14,28,0.34),rgba(6,14,28,0.08)_40%,rgba(8,23,43,0.34)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(86,153,255,0.22),transparent_20%),radial-gradient(circle_at_25%_75%,rgba(0,210,255,0.1),transparent_18%)] mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08111d]/78 via-[#08111d]/24 to-transparent lg:bg-gradient-to-t lg:from-[#08111d]/75 lg:via-transparent lg:to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(8,17,29,0.9),rgba(10,36,61,0.96))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="grid gap-8 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:px-14 lg:py-16">
            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/60">Reach Out</div>
              <div className="mt-6 space-y-4 sm:space-y-5">
                <p className="text-xl text-white/72 sm:text-2xl lg:text-3xl">Learning deserves serious decisions</p>
                <p className="text-xl text-white/72 sm:text-2xl lg:text-3xl">If you have the intent, we can help shape the path</p>
                <h2 className="max-w-4xl text-3xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4rem] [font-family:Inter_Tight,Inter,ui-sans-serif,system-ui,sans-serif]">To work together on AI for education</h2>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:col-span-4">
              <a href="tel:+919182626500" className="rounded-[1.35rem] border border-white/10 bg-white px-6 py-5 text-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.14)]">+91 9182626500</a>
              <a href="mailto:admin@utoldai.com" className="rounded-[1.35rem] border border-white/10 bg-white/5 px-6 py-5 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">admin@utoldai.com</a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
