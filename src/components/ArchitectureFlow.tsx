"use client"
import { ArrowDown, ArrowRight, Database, Server, Settings, Zap } from "lucide-react"

export const ArchitectureFlow = ({ visuals }: { visuals: any[] }) => {
  // A simple structured layout simulating a system architecture
  // For standard visuals, we'll map them to nice Tailwind blocks.
  
  if (!visuals || visuals.length === 0) return null;

  return (
    <div className="space-y-12 my-8 rounded-xl bg-zinc-900/30 border border-zinc-800/60 p-6 md:p-8">
      {visuals.map((vis, idx) => (
        <div key={idx} className="flex flex-col items-center">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-6 bg-zinc-800/80 px-4 py-1.5 rounded-full shadow-inner border border-zinc-700">
               {vis.title}
            </h4>
            
            {/* Diagram UI - simplified generic block architecture */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
               
               {/* Incoming / Client Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-zinc-700 bg-zinc-800/40 shadow-lg">
                  <div className="p-2 bg-zinc-700/50 rounded-md mb-3">
                     <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">Event / Request</span>
               </div>

               {/* Connector */}
               <div className="flex items-center justify-center py-2 md:py-0 md:px-2">
                  <ArrowRight className="hidden md:block h-5 w-5 text-zinc-500" />
                  <ArrowDown className="md:hidden h-5 w-5 text-zinc-500" />
               </div>

               {/* Process Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                  <div className="p-2 bg-emerald-900/40 rounded-md mb-3 border border-emerald-500/20">
                     <Server className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-100 text-center">{vis.description}</span>
               </div>

               {/* Connector */}
               <div className="flex items-center justify-center py-2 md:py-0 md:px-2">
                  <ArrowRight className="hidden md:block h-5 w-5 text-zinc-500" />
                  <ArrowDown className="md:hidden h-5 w-5 text-zinc-500" />
               </div>

               {/* Storage / Sink Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-zinc-700 bg-zinc-800/40 shadow-lg">
                  <div className="p-2 bg-zinc-700/50 rounded-md mb-3">
                     <Database className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">State / Persistence</span>
               </div>

            </div>
        </div>
      ))}
    </div>
  )
}
