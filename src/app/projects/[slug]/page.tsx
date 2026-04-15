import { portfolioData } from "@/data/portfolio"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { ArchitectureFlow } from "@/components/ArchitectureFlow"
import { Metadata } from "next"

export async function generateStaticParams() {
  return portfolioData.projects.map((p) => ({
    slug: p.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const project = portfolioData.projects.find((p) => p.id === resolvedParams.slug)
  if (!project) return { title: "Not Found" }
  return {
    title: `${project.title} - Architecture & Deep Dive`,
    description: project.solution,
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = portfolioData.projects.find((p) => p.id === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Top Nav Back */}
      <div>
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>
        <h2 className="text-xl font-medium text-zinc-300">
          {project.subtitle}
        </h2>
        
        <div className="flex flex-wrap gap-3 pt-2">
           <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-zinc-700 hover:border-zinc-500"
           >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Source
           </a>
        </div>
      </header>

      {/* Stack */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Tech Stack</h3>
        <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
                <li key={t} className="bg-zinc-800/50 text-zinc-300 text-sm px-3 py-1.5 rounded-md border border-zinc-700/50">
                    {t}
                </li>
            ))}
        </ul>
      </section>

      {/* Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> The Problem
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
               {project.problem}
            </p>
         </div>
         <div className="bg-zinc-800/30 p-6 rounded-xl border border-zinc-700/50">
            <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span> The Solution
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm">
               {project.solution}
            </p>
         </div>
      </section>

      {/* Architecture Deep Dive */}
      <section id="architecture" className="space-y-8 scroll-mt-24 pt-8 border-t border-zinc-800/50">
         <h2 className="text-2xl font-bold tracking-tight text-white">
            Architecture & Deep Dive
         </h2>
         <p className="text-zinc-400">
            Visualizing the data flow and system components that power {project.title}.
         </p>

         {project.deepDive?.architectureVisuals && (
            <ArchitectureFlow visuals={project.deepDive.architectureVisuals} />
         )}

      </section>

      {/* Insights / Trade-Offs / Scaling */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {project.deepDive?.tradeOffs && (
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-zinc-100">Engineering Trade-Offs</h3>
               <ul className="space-y-3">
                  {project.deepDive.tradeOffs.map((tradeoff, idx) => (
                     <li key={idx} className="text-sm text-zinc-400 leading-relaxed flex gap-3">
                        <span className="text-zinc-600 font-mono mt-0.5">[{idx + 1}]</span>
                        {tradeoff}
                     </li>
                  ))}
               </ul>
            </div>
         )}
         
         {project.deepDive?.scaling && (
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-zinc-100">Scaling Decisions</h3>
               <ul className="space-y-3">
                  {project.deepDive.scaling.map((scale, idx) => (
                     <li key={idx} className="text-sm text-zinc-400 leading-relaxed flex gap-3">
                        <span className="text-zinc-300 font-mono mt-0.5">→</span>
                        {scale}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </section>

    </div>
  )
}
