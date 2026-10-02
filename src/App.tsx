import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight, Circle, Menu, Quote, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const heroVideo = '/hero-video.mp4'
const canvasVideo = '/canvas-video.mp4'
const iconStoryboard = '/icon-storyboard.png'
const iconCritiques = '/icon-critiques.png'
const iconImmersion = '/icon-immersion.png'
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=jammed.us@gmail.com'

const ease = [0.16, 1, 0.3, 1] as const
const cardEase = [0.22, 1, 0.36, 1] as const

type Segment = { text: string; className?: string }

function WordsPullUp({ text, className = '', showAsterisk = false }: { text: string; className?: string; showAsterisk?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.25em] inline-flex overflow-hidden align-bottom pb-[0.04em]">
          <motion.span
            className="relative inline-block"
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            {showAsterisk && index === words.length - 1 ? (
              <>
                {word.slice(0, -1)}<span className="relative inline-block">{word.slice(-1)}<span className="absolute -right-[0.28em] top-[0.04em] text-[0.31em] leading-none">*</span></span>
              </>
            ) : word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

function WordsPullUpMultiStyle({ segments, className = '' }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const words = segments.flatMap((segment) => segment.text.split(' ').map((word) => ({ word, className: segment.className ?? '' })))

  return (
    <div ref={ref} className={`${className} flex flex-wrap justify-center`}>
      {words.map(({ word, className: wordClassName }, index) => (
        <span key={`${word}-${index}`} className="mr-[0.25em] inline-flex overflow-hidden pb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.7, delay: index * 0.055, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

function AnimatedLetter({ char, index, total }: { char: string; index: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const charProgress = index / total
  const opacity = useTransform(scrollYProgress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])

  return <motion.span ref={ref} style={{ opacity }} className={char === ' ' ? 'inline' : 'inline'}>{char}</motion.span>
}

function ScrollRevealText({ children }: { children: string }) {
  return (
    <p className="mx-auto max-w-2xl text-center text-xs leading-[1.55] text-[#DEDBC8] sm:text-sm md:text-base">
      {Array.from(children).map((char, index) => <AnimatedLetter key={`${char}-${index}`} char={char} index={index} total={children.length} />)}
    </p>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'My Story', href: '#about' },
    { label: 'Programs', href: '#features' },
    { label: 'Results', href: '#pricing' },
    { label: 'Inquiries', href: '#inquiries' },
  ]

  return (
    <nav className="absolute left-1/2 top-0 z-30 w-max -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8 md:py-3" aria-label="Primary navigation">
      <div className="hidden items-center gap-3 sm:flex sm:gap-6 md:gap-12 lg:gap-14">
        {links.map((link) => <a key={link.label} href={link.href} className="text-[10px] text-[#E1E0CC]/80 transition-colors hover:text-[#E1E0CC] sm:text-xs md:text-sm">{link.label}</a>)}
      </div>
      <button className="flex items-center gap-2 text-[#E1E0CC] sm:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu">
        <span className="text-[10px] uppercase tracking-[0.22em]">Prisma</span>{open ? <X size={13} strokeWidth={1.5} /> : <Menu size={13} strokeWidth={1.5} />}
      </button>
      {open && <div className="absolute left-0 top-full flex w-full flex-col gap-3 rounded-b-2xl bg-black px-4 pb-4 pt-3 sm:hidden">{links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-[10px] text-[#E1E0CC]/80">{link.label}</a>)}</div>}
    </nav>
  )
}

function Hero() {
  return (
    <section className="h-screen min-h-[680px] bg-black p-4 md:p-6" id="top">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video className="hero-video absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline poster="/logo.png"><source src={heroVideo} type="video/mp4" /></video>
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-transparent to-black/70" />
        <Nav />

        <div className="absolute left-6 right-6 top-20 z-20 flex items-start justify-between text-[9px] uppercase tracking-[0.22em] text-[#E1E0CC]/65 sm:left-10 sm:right-10 sm:text-[10px] md:top-24">
          <span className="hidden sm:block">Global creative network</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 sm:px-10 sm:pb-10 md:px-12 md:pb-12">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-4">
            <div className="min-w-0 md:col-span-7">
          <WordsPullUp text="Elena Ross" showAsterisk className="display-tight whitespace-normal md:whitespace-nowrap text-[14vw] font-medium leading-[0.82] text-[#E1E0CC] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] xl:text-[12vw] 2xl:text-[13vw]" />
            </div>
            <div className="min-w-0 max-w-sm md:col-span-5 md:justify-self-end md:pb-2 lg:max-w-[19rem]">
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.5, ease }} className="text-xs leading-[1.22] text-primary/70 sm:text-sm md:text-base">
                Elena Ross is a mindset and business coach helping ambitious founders break through self-doubt, build sustainable momentum, and lead with clarity — not burnout.
              </motion.p>
              <motion.a href={gmailComposeUrl} target="_blank" rel="noreferrer" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.7, ease }} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-4 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:mt-7 sm:text-base">
                <span>Start a conversation</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"><ArrowRight size={16} className="text-[#E1E0CC]" /></span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-black px-4 py-4 md:px-6 md:py-6">
      <div className="relative mx-auto flex min-h-[700px] max-w-6xl flex-col justify-center overflow-hidden bg-[#101010] px-6 py-24 text-center sm:min-h-[780px] sm:px-10 md:min-h-[860px] md:px-16 lg:px-20">
        <div className="absolute left-6 top-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-primary/55 sm:left-10 sm:top-10"><Circle size={5} fill="currentColor" /><span>About the practice</span></div>
        <div className="absolute right-6 top-6 text-[9px] uppercase tracking-[0.22em] text-primary/35 sm:right-10 sm:top-10">02 / 03</div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-primary/[0.06]" />
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="mb-7 text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">Mindset &amp; Business</motion.p>
          <WordsPullUpMultiStyle segments={[{ text: 'I am Elena Ross,' }, { text: 'a coach for founders who refuse to settle.', className: 'font-serif italic' }, { text: 'I help you build the business without losing yourself in it.' }]} className="mx-auto max-w-3xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
          <div className="mx-auto mt-16 max-w-2xl border-t border-primary/10 pt-7 sm:mt-24 sm:pt-9">
            <ScrollRevealText>Over the last eight years I've worked with 200+ founders and leaders, combining mindset coaching with practical business strategy. My clients have launched companies, doubled revenue, and — more importantly — learned to lead without constant overwhelm.</ScrollRevealText>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-left text-[9px] uppercase tracking-[0.22em] text-primary/35 sm:bottom-10 sm:left-10 sm:right-10"><span>Independent / always learning</span><ArrowDownRight size={15} /></div>
      </div>
    </section>
  )
}

type FeatureCardData = { number: string; title: string; image: string; items: string[] }
const featureCards: FeatureCardData[] = [
  { number: '01', title: '1:1 Coaching', image: iconStoryboard, items: ['Weekly private sessions', 'Custom 90-day roadmap', 'Direct message support', 'Quarterly strategy reset'] },
  { number: '02', title: 'Group Program', image: iconCritiques, items: ['Live cohort coaching calls', 'Peer accountability pods', 'Resource & template library'] },
  { number: '03', title: 'Intensive Days', image: iconImmersion, items: ['Full-day 1:1 deep work', 'Business model overhaul', '90-day execution plan'] },
]

function FeatureCard({ data, index }: { data: FeatureCardData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.article ref={ref} initial={{ opacity: 0, scale: .95 }} animate={inView ? { opacity: 1, scale: 1 } : undefined} transition={{ duration: .9, delay: index * .15, ease: cardEase }} className="group flex min-h-[360px] flex-col bg-[#212121] p-5 sm:min-h-[410px] sm:p-6 lg:h-[480px]">
      <div className="flex items-start justify-between"><img src={data.image} alt="" className="h-10 w-10 rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0 sm:h-12 sm:w-12" /><span className="text-[10px] tracking-[0.2em] text-primary/45">{data.number}</span></div>
      <div className="mt-auto">
        <h3 className="mb-5 max-w-[12rem] text-xl font-normal leading-[.95] text-[#E1E0CC] sm:text-2xl">{data.title}</h3>
        <ul className="space-y-2.5">
          {data.items.map((item) => <li key={item} className="flex items-start gap-2 text-[10px] leading-[1.25] text-gray-400 sm:text-xs"><Check size={13} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" />{item}</li>)}
        </ul>
        <a href="#top" className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary/70 transition-colors hover:text-primary">Learn more <ArrowRight size={14} className="-rotate-45 transition-transform duration-300 group-hover:translate-x-1" /></a>
      </div>
    </motion.article>
  )
}

function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section id="features" ref={ref} className="relative min-h-screen overflow-hidden bg-black px-4 py-24 sm:px-6 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <WordsPullUpMultiStyle segments={[{ text: 'Coaching built around your actual goals.', className: 'text-[#E1E0CC]' }, { text: 'Clarity first. Strategy second. Results always.', className: 'text-gray-500' }]} className="max-w-3xl justify-start text-left text-xl font-normal leading-[1.05] sm:text-2xl md:text-3xl lg:text-4xl" />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .8, delay: .4, ease }} className="flex shrink-0 items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-primary/45"><span>Scroll to explore</span><ArrowDownRight size={15} /></motion.div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-1">
          <motion.article ref={canvasRef} initial={{ opacity: 0, scale: .95 }} animate={inView ? { opacity: 1, scale: 1 } : undefined} transition={{ duration: .9, ease: cardEase }} className="group relative min-h-[390px] overflow-hidden sm:min-h-[410px] lg:h-[480px]">
            <video className="card-video absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay loop muted playsInline><source src={canvasVideo} type="video/mp4" /></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6"><h3 className="max-w-[78%] text-xl text-[#E1E0CC] sm:max-w-none sm:text-2xl">Your next chapter starts with one conversation.</h3><ArrowRight size={18} className="-rotate-45 text-[#E1E0CC] transition-transform duration-300 group-hover:translate-x-1" /></div>
          </motion.article>
          {featureCards.map((card, index) => <FeatureCard data={card} index={index + 1} key={card.number} />)}
        </div>
      </div>
    </section>
  )
}

type BillingCycle = 'monthly' | 'annual'

type PricingPlan = {
  eyebrow: string
  name: string
  monthly: number
  annual: number
  description: string
  features: string[]
  featured?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    eyebrow: 'For the curious',
    name: 'Field Notes',
    monthly: 0,
    annual: 0,
    description: 'A lightweight starting point for independent makers finding their signal.',
    features: ['Open studio archive', 'Monthly creative prompts', 'Community dispatches'],
  },
  {
    eyebrow: 'For the committed',
    name: 'Studio Pass',
    monthly: 49,
    annual: 39,
    description: 'The full Prisma toolkit for turning strong ideas into considered work.',
    features: ['Unlimited project storyboards', 'Smart critique sessions', 'Private working rooms'],
    featured: true,
  },
  {
    eyebrow: 'For the ambitious',
    name: 'Full Spectrum',
    monthly: 120,
    annual: 96,
    description: 'A close creative partnership for teams who want to go further, faster.',
    features: ['Everything in Studio Pass', 'Dedicated art direction', 'Priority production support'],
  },
]

function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual')

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#101010] px-4 py-24 sm:px-6 md:py-32">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-primary/45"><Circle size={5} fill="currentColor" /><span>Choose your frequency</span></div>
            <WordsPullUpMultiStyle segments={[{ text: 'Make room for the work.', className: 'text-[#E1E0CC]' }, { text: 'Stay close to your vision.', className: 'text-gray-500' }]} className="max-w-3xl justify-start text-left text-3xl font-normal leading-[0.98] sm:text-4xl md:text-5xl" />
          </div>
          <div className="flex w-fit items-center rounded-full border border-primary/15 p-1 text-[10px] uppercase tracking-[0.16em] text-primary/55">
            {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => (
              <button key={cycle} type="button" aria-pressed={billingCycle === cycle} onClick={() => setBillingCycle(cycle)} className={`relative rounded-full px-4 py-2 transition-colors sm:px-5 ${billingCycle === cycle ? 'bg-primary text-black' : 'hover:text-primary'}`}>
                {cycle}{cycle === 'annual' && <span className="ml-1.5 text-[8px] normal-case tracking-normal opacity-70">save 20%</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const price = billingCycle === 'annual' ? plan.annual : plan.monthly
            return (
              <motion.article key={plan.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8, delay: index * .12, ease: cardEase }} className={`relative flex min-h-[425px] flex-col p-6 sm:p-8 ${plan.featured ? 'bg-primary text-black' : 'bg-[#212121] text-[#E1E0CC]'}`}>
                {plan.featured && <span className="absolute right-6 top-6 text-[9px] uppercase tracking-[0.2em] text-black/55">Most chosen</span>}
                <div className={`text-[9px] uppercase tracking-[0.22em] ${plan.featured ? 'text-black/55' : 'text-primary/45'}`}>{plan.eyebrow}</div>
                <h3 className="mt-4 text-3xl font-normal leading-none sm:text-4xl">{plan.name}</h3>
                <p className={`mt-4 max-w-xs text-xs leading-[1.45] ${plan.featured ? 'text-black/65' : 'text-gray-400'}`}>{plan.description}</p>
                <div className="mt-auto">
                  <div className="mb-6 flex items-end gap-2 border-t border-current/15 pt-6">
                    <motion.span key={`${plan.name}-${billingCycle}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className="text-4xl font-normal">${price}</motion.span>
                    <span className={`pb-1 text-[10px] ${plan.featured ? 'text-black/55' : 'text-primary/45'}`}>{price === 0 ? 'forever' : ` / month, billed ${billingCycle}`}</span>
                  </div>
                  <ul className="mb-7 space-y-2.5">
                    {plan.features.map((feature) => <li key={feature} className={`flex items-start gap-2 text-xs ${plan.featured ? 'text-black/70' : 'text-gray-400'}`}><Check size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />{feature}</li>)}
                  </ul>
                  <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className={`group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] transition-[gap] duration-300 hover:gap-3 ${plan.featured ? 'text-black' : 'text-primary'}`}>Enter the studio <span className={`flex h-7 w-7 items-center justify-center rounded-full ${plan.featured ? 'bg-black text-primary' : 'bg-primary text-black'}`}><ArrowRight size={13} /></span></a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  { quote: 'Prisma gave our film a pulse before we ever stepped onto set. The room to think, test and refine changed the whole production.', name: 'Maya Okafor', role: 'Director, Lagos / London', initials: 'MO' },
  { quote: 'The critique is generous but never soft. Every session leaves you with a sharper question and a braver next move.', name: 'Theo Laurent', role: 'Creative director, Paris', initials: 'TL' },
  { quote: 'It feels less like a platform and more like a group of people quietly raising the bar for one another.', name: 'Sofia Reyes', role: 'Photographer, Mexico City', initials: 'SR' },
]

function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonial = testimonials[active]

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 7000)
    return () => window.clearInterval(timer)
  }, [])

  const goTo = (index: number) => setActive((index + testimonials.length) % testimonials.length)

  return (
    <section id="voices" className="bg-black px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-center justify-between border-b border-primary/10 pb-5"><div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-primary/45"><Circle size={5} fill="currentColor" /><span>Field notes / 04</span></div><span className="text-[9px] uppercase tracking-[0.2em] text-primary/35">A few words from the room</span></div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4"><WordsPullUp text="The work speaks. The people stay." className="max-w-sm text-4xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-5xl" /><div className="mt-10 flex items-center gap-2"><button type="button" onClick={() => goTo(active - 1)} aria-label="Previous testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-black"><ChevronLeft size={16} /></button><button type="button" onClick={() => goTo(active + 1)} aria-label="Next testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-black"><ChevronRight size={16} /></button><div className="ml-3 flex gap-1.5" role="tablist" aria-label="Testimonials">{testimonials.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={active === index} aria-label={`Show testimonial from ${item.name}`} onClick={() => goTo(index)} className={`h-1.5 rounded-full transition-all ${active === index ? 'w-8 bg-primary' : 'w-1.5 bg-primary/25'}`} />)}</div></div></div>
          <div className="lg:col-span-8">
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease }} className="relative min-h-[330px] bg-[#101010] p-6 sm:min-h-[360px] sm:p-10 md:p-14">
              <Quote size={42} strokeWidth={1} className="text-primary/30" />
              <blockquote className="mt-10 max-w-3xl text-2xl font-normal leading-[1.08] text-[#E1E0CC] sm:text-3xl md:text-4xl">“{testimonial.quote}”</blockquote>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">{testimonial.initials}</div><div><div className="text-xs text-[#E1E0CC]">{testimonial.name}</div><div className="mt-1 text-[9px] uppercase tracking-[0.15em] text-primary/45">{testimonial.role}</div></div></div><div className="hidden items-center gap-1 text-primary/50 sm:flex">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={12} fill="currentColor" />)}</div></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Inquiries() {
  return (
    <section id="inquiries" className="bg-[#101010] px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-center justify-between border-b border-primary/10 pb-5"><div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-primary/45"><Circle size={5} fill="currentColor" /><span>Inquiries / 05</span></div><span className="text-[9px] uppercase tracking-[0.2em] text-primary/35">Start with a question</span></div>
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7"><WordsPullUp text="Let's make the next move deliberate." className="max-w-3xl text-4xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-5xl md:text-6xl" /></div>
          <div className="md:col-span-5 md:justify-self-end lg:max-w-md">
            <p className="text-base leading-[1.4] text-[#DEDBC8] sm:text-lg">Tell me what you are building, where you feel stuck, and what you want the next season to feel like.</p>
            <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-4">Start a conversation <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#E1E0CC] transition-transform duration-300 group-hover:scale-110"><ArrowRight size={14} /></span></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t border-primary/10 bg-black px-5 py-8 text-[9px] uppercase tracking-[0.2em] text-primary/40 sm:flex-row sm:items-center sm:justify-between sm:px-10">
      <span>Prisma / Worldwide creative network</span><a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">jammed.us@gmail.com</a><span>© {new Date().getFullYear()}</span>
    </footer>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black shadow-lg shadow-black/30 transition-all duration-300 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'}`}>
      <ArrowUp size={26} strokeWidth={1.8} />
    </button>
  )
}

export default function App(): ReactNode {
  return <main className="overflow-hidden bg-black"><Hero /><About /><Features /><Pricing /><Testimonials /><Inquiries /><Footer /><BackToTop /></main>
}
