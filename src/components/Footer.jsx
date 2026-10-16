import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 font-mono text-xs text-ink-soft sm:flex-row sm:px-6 lg:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#top" className="transition-colors hover:text-marker">
        back_to_top ↑
      </a>
    </footer>
  )
}
