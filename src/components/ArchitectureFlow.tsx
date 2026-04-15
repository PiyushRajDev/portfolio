"use client"
import { ArrowDown, ArrowRight, Database, Server, Settings, Zap } from "lucide-react"

export const ArchitectureFlow = ({ visuals }: { visuals: any[] }) => {
  if (!visuals || visuals.length === 0) return null;

  return (
    <div className="space-y-12 my-8 rounded-xl bg-zinc-900/30 border border-zinc-800/60 p-6 md:p-8">
      {visuals.map((vis, idx) => (
        <div key={idx} className="flex flex-col items-center">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-6 bg-zinc-800/80 px-4 py-1.5 rounded-full shadow-inner border border-zinc-700">
               {vis.title}
            </h4>
            
            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
               
               {/* Incoming / Client Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-zinc-700 bg-zinc-800/40 shadow-lg">
                  <div className="p-2 bg-zinc-700/50 rounded-md mb-3 border border-zinc-600/50">
                     <Zap className="h-5 w-5 text-zinc-300" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">Event / Request</span>
               </div>

               {/* Connector */}
               <div className="flex items-center justify-center py-2 md:py-0 md:px-2">
                  <ArrowRight className="hidden md:block h-5 w-5 text-zinc-500" />
                  <ArrowDown className="md:hidden h-5 w-5 text-zinc-500" />
               </div>

               {/* Process Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-zinc-600/50 bg-zinc-800/80 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  <div className="p-2 bg-zinc-700 rounded-md mb-3 border border-zinc-500/50">
                     <Server className="h-5 w-5 text-zinc-100" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-100 text-center">{vis.description}</span>
               </div>

               {/* Connector */}
               <div className="flex items-center justify-center py-2 md:py-0 md:px-2">
                  <ArrowRight className="hidden md:block h-5 w-5 text-zinc-500" />
                  <ArrowDown className="md:hidden h-5 w-5 text-zinc-500" />
               </div>

               {/* Storage / Sink Box */}
               <div className="flex w-full md:w-1/3 flex-col items-center p-5 rounded-lg border border-zinc-700 bg-zinc-800/40 shadow-lg">
                  <div className="p-2 bg-zinc-700/50 rounded-md mb-3 border border-zinc-600/50">
                     <Database className="h-5 w-5 text-zinc-300" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">State / Persistence</span>
               </div>

            </div>
        </div>
      ))}
    </div>
  )
}
