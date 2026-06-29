import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { FaArrowDown, FaInstagram, FaPlay, FaSpotify, FaYoutube } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2005',
    title: 'A explosão',
    copy: 'Uma força jovem com uma voz que transformou o ritmo em urgência.',
  },
  {
    year: '2007',
    title: 'A reinvenção',
    copy: 'Cada apresentação se tornou uma declaração de precisão e presença.',
  },
  {
    year: '2011',
    title: 'O ícone',
    copy: 'Um novo capítulo de presença de palco, coreografia e influência cultural.',
  },
  {
    year: '2015',
    title: 'A resistência',
    copy: 'A experiência virou linguagem da sua arte: disciplinada, obsessiva e implacável.',
  },
  {
    year: '2020',
    title: 'O retorno',
    copy: 'Os holofotes o encontraram novamente, ainda mais cinematográfico e intenso.',
  },
  {
    year: '2026',
    title: 'A herança',
    copy: 'Uma nova era em que a performance deixa de ser só vista e passa a ser sentida.',
  },
]

const performances = [
  {
    title: 'O palco é uma arma',
    text: 'Cada movimento cai como um golpe de bateria e cada pausa parece calculada.',
    image:
      'foto/cris 3.jpg',
  },
  {
    title: 'O corpo diz a verdade',
    text: 'A coreografia é construída em ritmo, precisão e um perigo controlado.',
    image:
      'foto/chris 2.jpg',
  },
  {
    title: 'O holofote lembra',
    text: 'Um artista que transforma espetáculo em memória e memória em mito.',
    image:
      'foto/cris.jpg',
  },
]

const gallery = [
  'foto/for the moment.jpg',
  'foto/cb 1.webp',
  'foto/cb2.jpg',
  'foto/cb3.webp'
]

const albums = [
  { name: 'Chris Brown', year: '2026', accent: 'foto/2026.jpg' },
  { name: 'Exclusive', year: '2023', accent: 'foto/11.11.jpg' },
  { name: 'F.A.M.E.', year: '2019', accent: 'foto/indigo.jpg' },
  { name: 'Royalty', year: '2015', accent: 'foto/royalty.jpg' },
]

const stats = [
  { value: 15, label: 'álbuns' },
  { value: 28, label: 'prêmios' },
  { value: 20, label: 'anos' },
  { value: 280, label: ' milhões de streams' },
]

const tours = [
  { city: 'Londres', country: 'Reino Unido', arena: 'The O2', status: 'Esgotado' },
  { city: 'Paris', country: 'França', arena: 'Accor Arena', status: 'Disponível' },
  { city: 'Chicago', country: 'EUA', arena: 'United Center', status: 'Em breve' },
]

function App() {
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(false), 1800)

    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-title]',
        { y: 90, opacity: 0, filter: 'blur(18px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out', delay: 0.2 },
      )

      gsap.fromTo(
        '[data-fade]',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.35,
        },
      )

      const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      const timelineItems = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline]'))
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })

      const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-counter]'))
      counters.forEach((counter) => {
        const value = Number(counter.dataset.counter ?? 0)
        gsap.fromTo(
          counter,
          { textContent: '0' },
          {
            textContent: value,
            duration: 2.2,
            ease: 'power3.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })
    })

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-700 ${isLoaded ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="w-full max-w-md px-6 text-center">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.8em] text-[#c7a354]">Carregando experiência</p>
          <div className="mb-4 h-[1px] w-full overflow-hidden bg-white/15">
            <div className={`h-full bg-[#c7a354] transition-all duration-[1800ms] ${isLoaded ? 'w-full' : 'w-0'}`} />
          </div>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.35em]">Chris Brown</h2>
        </div>
      </div>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          poster="foto/chris foto q.jpg"
        >
          <source src="foto/Obvious (Official Video).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,163,84,0.2),transparent_40%),linear-gradient(90deg,rgba(0,0,0,0.95),rgba(0,0,0,0.7))]" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.6em] text-white/70">
            <span>Chris Brown</span>
            <span>A evolução da performance</span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
            <p className="mb-6 text-sm uppercase tracking-[0.75em] text-[#c7a354]" data-fade>
              Narrativa imersiva em scroll
            </p>
            <h1
              className="max-w-5xl text-6xl font-black uppercase leading-[0.83] tracking-[0.15em] sm:text-8xl lg:text-[9rem]"
              data-hero-title
            >
              Chris
              <br />
              Brown
            </h1>
            <p className="mt-8 max-w-xl text-base text-white/70 sm:text-lg" data-fade>
              Dos primeiros momentos ao status de lenda: uma jornada cinematográfica pela evolução de um dos artistas mais impactantes da música.
            </p>
          </div>

          <div className="flex items-end justify-between pb-4 text-sm text-white/60" data-fade>
            <div>
              <p className="uppercase tracking-[0.6em] text-[#c7a354]">Role a página</p>
              <p className="mt-2">Comece a história</p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
              <FaArrowDown />
              <span className="text-xs uppercase tracking-[0.5em]">Entrar</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Introdução</p>
            <h2 className="max-w-2xl text-4xl font-semibold uppercase tracking-[0.12em] sm:text-5xl">
              Um artista que transforma movimento em memória.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-white/70" data-reveal>
            <p>
              Chris Brown redefiniu a performance moderna com disciplina, ritmo e um raro senso de timing. Sua obra vive na interseção entre dança, emoção e espetáculo.
            </p>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs uppercase tracking-[0.6em] text-[#c7a354]">Assinatura</p>
              <p className="text-xl text-white">
                Precisão. Carisma. Evolução.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mb-8" data-reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.8em] text-[#c7a354]">A evolução</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur"
              data-timeline
            >
              <p className="mb-4 text-sm uppercase tracking-[0.6em] text-[#c7a354]">{item.year}</p>
              <h3 className="mb-2 text-xl font-semibold uppercase tracking-[0.15em]">{item.title}</h3>
              <p className="text-sm leading-6 text-white/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="mb-10 max-w-2xl" data-reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">O performer</p>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
            Momentos em tela cheia feitos para impactar.
          </h2>
        </div>

        <div className="space-y-6">
          {performances.map((performance, index) => (
            <article
              key={performance.title}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black"
              data-reveal
            >
              <img src={performance.image} alt={performance.title} className="h-[460px] w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute left-0 top-0 flex h-full w-full items-end p-8 sm:p-12">
                <div className="max-w-xl">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#c7a354]/60 bg-[#c7a354]/20 text-[#c7a354]">
                    <FaPlay />
                  </div>
                  <p className="mb-3 text-xs uppercase tracking-[0.7em] text-[#c7a354]">Capítulo {index + 1}</p>
                  <h3 className="mb-3 text-3xl font-semibold uppercase tracking-[0.16em]">{performance.title}</h3>
                  <p className="max-w-lg text-sm leading-7 text-white/75">{performance.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Experiência de dança</p>
            <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
              Uma galeria vertical de movimento e atmosfera.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/70">
            Cada quadro é montado para parecer cinematográfico: o foco muda, o desfoque se aprofunda e a experiência acompanha o ritmo do scroll.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
            <img src={gallery[0]} alt="Chris Brown performance" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
          </div>
          <div className="grid gap-4">
            {gallery.slice(1).map((image) => (
              <div key={image} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-3 backdrop-blur">
                <img src={image} alt="Chris Brown gallery" className="h-40 w-full rounded-[1.2rem] object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="mb-10 max-w-2xl" data-reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Discografia</p>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
            Um catálogo que segue em evolução.
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {albums.map((album) => (
            <div key={album.name} className="min-w-[240px] rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-5">
              <img
                src={album.accent}
                alt={album.name}
                className="mb-6 h-40 w-full rounded-[1.5rem] object-cover"
              />
              <p className="mb-2 text-xs uppercase tracking-[0.6em] text-[#c7a354]">{album.year}</p>
              <h3 className="text-xl font-semibold uppercase tracking-[0.15em]">{album.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0d0d0d] to-[#050505] p-8 sm:p-12" data-reveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Estatísticas</p>
            <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
              Os números por trás da aura.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-6">
                <p className="mb-3 text-[2rem] font-semibold text-[#c7a354]" data-counter={stat.value}>
                  0
                </p>
                <p className="text-sm uppercase tracking-[0.5em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="mb-10 max-w-2xl" data-reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Turnê 2026</p>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
            Um palco global para uma nova era.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tours.map((tour) => (
            <div key={tour.city} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur" data-reveal>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.6em] text-[#c7a354]">{tour.country}</p>
                <span className="rounded-full border border-[#c7a354]/40 px-3 py-1 text-[0.7rem] uppercase tracking-[0.45em] text-[#c7a354]">
                  {tour.status}
                </span>
              </div>
              <h3 className="text-2xl font-semibold uppercase tracking-[0.16em]">{tour.city}</h3>
              <p className="mt-2 text-white/60">{tour.arena}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/70 px-8 py-16 text-center backdrop-blur sm:px-12 lg:px-20" data-reveal>
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="foto/YTDown_YouTube_Chris-Brown-Wall-to-Wall-LIVE-Breezy-Bow_Media_iDuB3a0OhSI_001_1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,163,84,0.16),transparent_55%)]" />
          <div className="relative z-10">
            <p className="mb-4 text-xs uppercase tracking-[0.8em] text-[#c7a354]">Final</p>
            <h2 className="mx-auto max-w-4xl text-5xl font-semibold uppercase leading-[0.9] tracking-[0.16em] sm:text-6xl lg:text-7xl">
              Talento.
              <br />
              Disciplina.
              <br />
              Legado.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/60">
              <a className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.4em] transition hover:border-[#c7a354] hover:text-[#c7a354]" href="https://open.spotify.com/intl-pt/artist/7bXgB6jMjp9ATFy66eO08Z?si=BycIm7tBTeW4JQO8U2nTkw">
                <FaSpotify />
                Ouvir
              </a>
              <a className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.4em] transition hover:border-[#c7a354] hover:text-[#c7a354]" href="https://www.instagram.com/chrisbrownofficial/">
                <FaInstagram />
                Seguir
              </a>
              <a className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.4em] transition hover:border-[#c7a354] hover:text-[#c7a354]" href="https://www.youtube.com/@ChrisBrownTV">
                <FaYoutube />
                Assistir
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.6em] text-white/40">
              <span>Chris Brown</span>
              <FiArrowUpRight className="text-[#c7a354]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
