"use client"
import { portfolioData } from "@/data/portfolio"
import { ArrowRight, Terminal, ArrowRightCircle, GitFork, Database, Server, Component } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const primaryProject = portfolioData.projects.find((p) => p.isPrimary)
  const secondaryProjects = portfolioData.projects.filter((p) => !p.isPrimary)

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 1. Hero / Currently Building */}
      <section id="hero" className="scroll-mt-24 space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl text-pretty mb-6">
            {portfolioData.personal.headline}
          </h2>
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>
            <span>Currently Building: </span>
            <Link href={portfolioData.currentlyBuilding.link} className="font-semibold text-white hover:text-zinc-300 transition-colors">
              {portfolioData.currentlyBuilding.title}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. About */}
      <section id="about" className="scroll-mt-24 space-y-6">
        <h3 className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-zinc-200">
          About
        </h3>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-4 text-zinc-400">
          {portfolioData.about.intro.map((p, i) => (
            <p key={i} className="leading-relaxed">{p}</p>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800/50">
          {Object.entries(portfolioData.about.skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-zinc-500" />
                {category}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li key={skill} className="bg-zinc-800/50 text-zinc-300 text-xs px-3 py-1 rounded-md border border-zinc-700/50">
                     {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Projects */}
      <section id="projects" className="scroll-mt-24 space-y-6">
        <h3 className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 text-sm font-bold uppercase tracking-widest text-zinc-200">
          Projects
        </h3>

        {/* Primary Project Card (Dominate) */}
        {primaryProject && (
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href={`/projects/${primaryProject.id}`} className="group block relative rounded-2xl bg-zinc-900 border-2 border-zinc-800 p-6 md:p-10 hover:bg-zinc-800 transition-all shadow-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold text-white transition-colors">
                      {primaryProject.title}
                    </h4>
                    <p className="text-sm font-medium text-zinc-400 mt-1 uppercase tracking-wider">{primaryProject.subtitle}</p>
                  </div>
                  <div className="bg-zinc-800 p-2 rounded-full border border-zinc-700 text-zinc-300 group-hover:text-white group-hover:border-zinc-500 transition-all">
                    <ArrowRight className="group-hover:translate-x-1 transition-transform h-5 w-5" />
                  </div>
                </div>
                
                <div className="bg-zinc-950/50 border border-zinc-800/80 p-4 rounded-lg">
                   <p className="text-zinc-200 font-semibold leading-relaxed">
                     &ldquo;{primaryProject.impactLine}&rdquo;
                   </p>
                </div>

                <p className="text-zinc-400 leading-relaxed text-sm">
                  {primaryProject.shortDescription}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {primaryProject.tech.slice(0, 5).map((t) => (
                      <li key={t} className="text-xs text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">
                        {t}
                      </li>
                    ))}
                    {primaryProject.tech.length > 5 && (
                      <li className="text-xs text-zinc-500 px-2 py-1">+{primaryProject.tech.length - 5}</li>
                    )}
                  </ul>
                  <span className="opacity-0 lg:group-hover:opacity-100 transition-opacity text-xs font-semibold text-zinc-300 flex items-center gap-1">
                     See system design <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Secondary Projects List */}
        <div className="grid grid-cols-1 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800">
          {secondaryProjects.map((project, idx) => (
             <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (idx+1) }}>
               <Link href={`/projects/${project.id}`} className="group flex flex-col p-6 bg-zinc-950 hover:bg-zinc-900 transition-all gap-4">
                 <div className="flex justify-between items-start gap-4">
                   <div className="space-y-1.5">
                     <h4 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors flex items-center gap-2">
                       {project.title}
                     </h4>
                     {/* Impact Line */}
                     <p className="text-sm text-zinc-300 font-medium">
                       {project.impactLine}
                     </p>
                     <p className="text-sm text-zinc-500 line-clamp-1">{project.shortDescription}</p>
                   </div>
                   <ArrowRightCircle className="h-6 w-6 text-zinc-700 shrink-0 group-hover:text-zinc-300 transition-colors" />
                 </div>
                 
                 <div className="flex items-center justify-between">
                   <div className="flex gap-2 shrink-0">
                      {project.tech.slice(0,4).map(t => (
                        <span key={t} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 border border-zinc-800 px-2 py-1 rounded-md">{t}</span>
                      ))}
                   </div>
                   <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center gap-1">
                      View details <ArrowRight className="h-3 w-3" />
                   </span>
                 </div>
               </Link>
             </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Systems / Deep Dive CTA */}
      <section id="deep-dive" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-800/50">
        <h3 className="text-xl font-bold text-white">Systems & Architecture Insight</h3>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
          I don't just consume APIs; I design the infrastructure behind them. Take a look at the data flows and scaling considerations driving these projects.
        </p>
        
        {/* Visual Preview */}
        <Link href={`/projects/skill-lighthouse#architecture`} className="group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 hover:border-zinc-700 transition-all">
           <div className="flex items-center gap-2 text-zinc-400">
             <GitFork className="h-5 w-5" />
             <span className="text-xs font-mono">Repo</span>
           </div>
           <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors hidden sm:block" />
           <div className="flex items-center gap-2 text-zinc-300 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700 group-hover:border-zinc-500 transition-colors">
             <Server className="h-4 w-4 text-zinc-100" />
             <span className="text-xs font-semibold">AST Analyzer</span>
           </div>
           <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors hidden sm:block" />
           <div className="flex items-center gap-2 text-zinc-300 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">
             <Component className="h-4 w-4 text-zinc-200" />
             <span className="text-xs font-semibold">Evaluation Engine</span>
           </div>
           <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors hidden sm:block" />
           <div className="flex items-center gap-2 text-zinc-400">
             <Database className="h-5 w-5" />
             <span className="text-xs font-mono">Output db</span>
           </div>
           
           <span className="text-xs text-zinc-300 font-bold ml-auto mt-4 sm:mt-0 flex items-center gap-1 group-hover:underline">
             See system design <ArrowRight className="h-3 w-3" />
           </span>
        </Link>
      </section>

      {/* 5. Engineering Thinking */}
      <section id="thinking" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-800/50">
        <h3 className="text-xl font-bold text-white">Engineering Thinking</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {portfolioData.engineeringThinking.map((item, idx) => (
             <div key={idx} className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 hover:bg-zinc-800 transition-colors">
                <h4 className="font-bold text-zinc-200 mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 6. Contact CTA - Hiring Focused */}
      <section id="contact" className="pt-12 mt-4 border-t border-zinc-800/50">
         <div className="flex flex-col items-start gap-4 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg">
           <div>
             <h2 className="text-2xl font-bold text-white mb-2">Available for Engineering Roles</h2>
             <p className="text-zinc-400">Open to challenging backend and full-stack software development positions.</p>
           </div>
           <a href={`mailto:${portfolioData.personal.email}`} className="mt-2 inline-flex items-center gap-2 bg-white text-zinc-950 px-6 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors shadow-md">
              Let's Work Together <ArrowRight className="h-5 w-5" />
           </a>
         </div>
      </section>

    </div>
  )
}
