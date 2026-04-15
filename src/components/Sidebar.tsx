"use client"

import { portfolioData } from "@/data/portfolio"
import { Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Systems & Trade-offs", href: "/#deep-dive" },
  { name: "Engineering Thinking", href: "/#thinking" },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          <Link href="/">{portfolioData.personal.name}</Link>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-zinc-200 sm:text-xl">
          {portfolioData.personal.title}
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-zinc-400">
          {portfolioData.personal.shortLine}
        </p>

        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center py-3 active"
                >
                  <span className="nav-indicator mr-4 h-px w-8 bg-zinc-600 transition-all group-hover:w-16 group-hover:bg-zinc-200 motion-reduce:transition-none"></span>
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200 focus-visible:text-zinc-200">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
        <li className="text-xs shrink-0">
          <a
            className="block hover:text-zinc-200"
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-5 w-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            className="block hover:text-zinc-200"
            href={portfolioData.personal.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-5 w-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            className="block hover:text-zinc-200"
            href={`mailto:${portfolioData.personal.email}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
          >
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6 text-zinc-400 hover:text-zinc-100 transition-colors" />
          </a>
        </li>
      </ul>
    </>
  )
}
