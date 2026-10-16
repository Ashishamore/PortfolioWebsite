import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Work from '../components/Work'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Work />
      <About />
      <Experience />
      <Contact />
    </main>
  )
}
