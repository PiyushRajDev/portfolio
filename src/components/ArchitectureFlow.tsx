"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Server, Database, Cpu, Layers, Zap, Radio, Search,
  MonitorSmartphone, Video, AlertTriangle, GitBranch
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArchNode {
  id: string
  col?: number
  type: string
  label: string
  icon: string
  accent: string
  description: string
}

interface ArchEdge {
  from: string
  to: string
  label: string
  animated?: boolean
}

interface ArchVisual {
  title: string
  subtitle?: string
  nodes: ArchNode[]
  edges: ArchEdge[]
}

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server,
  database: Database,
  cpu: Cpu,
  layers: Layers,
  zap: Zap,
  radio: Radio,
  search: Search,
  monitor: MonitorSmartphone,
  video: Video,
  alertTriangle: AlertTriangle,
  git: GitBranch,
}

// ─── Accent Color Tokens ──────────────────────────────────────────────────────

const accentTokens: Record<string, { base: string; border: string; text: string; shadow: string; iconBg: string }> = {
  emerald: {
    base: "bg-emerald-950",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    shadow: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
    iconBg: "bg-emerald-500/20",
  },
  blue: {
    base: "bg-blue-950",
    border: "border-blue-500/40",
    text: "text-blue-400",
    shadow: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    iconBg: "bg-blue-500/20",
  },
  amber: {
    base: "bg-amber-950",
    border: "border-amber-500/40",
    text: "text-amber-400",
    shadow: "shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    iconBg: "bg-amber-500/20",
  },
  red: {
    base: "bg-red-950",
    border: "border-red-500/40",
    text: "text-red-400",
    shadow: "shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]",
    iconBg: "bg-red-500/20",
  },
  violet: {
    base: "bg-violet-950",
    border: "border-violet-500/40",
    text: "text-violet-400",
    shadow: "shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]",
    iconBg: "bg-violet-500/20",
  },
  zinc: {
    base: "bg-zinc-900",
    border: "border-zinc-500/40",
    text: "text-zinc-300",
    shadow: "shadow-[0_0_30px_-5px_rgba(161,161,170,0.15)]",
    iconBg: "bg-zinc-500/20",
  },
}

// ─── SVG Edge Renderer ────────────────────────────────────────────────────────

function EdgeLines({
  edges,
  nodePositions,
}: {
  edges: ArchEdge[]
  nodePositions: Map<string, { x: number; y: number }>
}) {
  if (nodePositions.size === 0) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="rgba(161,161,170,0.4)"
          />
        </marker>
        <marker
          id="arrowhead-animated"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="rgba(16,185,129,0.6)"
          />
        </marker>
      </defs>
      {edges.map((edge, idx) => {
        const fromPos = nodePositions.get(edge.from)
        const toPos = nodePositions.get(edge.to)
        if (!fromPos || !toPos) return null

        const dx = toPos.x - fromPos.x
        const dy = toPos.y - fromPos.y
        if (dx === 0 && dy === 0) return null

        const isSameColumn = Math.abs(dx) < 20 // If vertically aligned
        let startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y

        if (isSameColumn) {
          const isBottomToTop = dy < 0
          startX = fromPos.x
          startY = fromPos.y + (isBottomToTop ? -60 : 60)
          endX = toPos.x
          endY = toPos.y + (isBottomToTop ? 66 : -66)

          const curvature = Math.max(40, Math.abs(dy) * 0.4)
          cp1X = startX
          cp1Y = startY + (isBottomToTop ? -curvature : curvature)
          cp2X = endX
          cp2Y = endY + (isBottomToTop ? curvature : -curvature)
        } else {
          const isRightToLeft = dx < 0
          startX = fromPos.x + (isRightToLeft ? -88 : 88)
          startY = fromPos.y
          endX = toPos.x + (isRightToLeft ? 94 : -94)
          endY = toPos.y

          const curvature = Math.max(80, Math.abs(dx) * 0.4)
          cp1X = startX + (isRightToLeft ? -curvature : curvature)
          cp1Y = startY
          cp2X = endX + (isRightToLeft ? curvature : -curvature)
          cp2Y = endY
        }

        const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`

        // True midpoint of bezier segment for perfectly centered edge label
        const midX = 0.125 * startX + 0.375 * cp1X + 0.375 * cp2X + 0.125 * endX
        const midY = 0.125 * startY + 0.375 * cp1Y + 0.375 * cp2Y + 0.125 * endY

        return (
          <g key={idx}>
            <path
              d={path}
              fill="none"
              stroke={edge.animated ? "rgba(16,185,129,0.5)" : "rgba(161,161,170,0.25)"}
              strokeWidth={edge.animated ? "2" : "1.5"}
              markerEnd={edge.animated ? "url(#arrowhead-animated)" : "url(#arrowhead)"}
              strokeDasharray={edge.animated ? "8 6" : "none"}
              className={edge.animated ? "arch-flow-dash" : ""}
            />
            {/* Edge label */}
            <g transform={`translate(${midX}, ${midY})`}>
              <rect
                x={-(edge.label.length * 4) - 10}
                y={-12}
                width={edge.label.length * 8 + 20}
                height={24}
                rx="12"
                fill="#09090b"
                stroke={edge.animated ? "rgba(16,185,129,0.3)" : "rgba(63,63,70,0.4)"}
                strokeWidth="1"
                className="shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              />
              <text
                textAnchor="middle"
                dy="4"
                className={`font-mono text-[10px] font-bold tracking-widest uppercase ${edge.animated ? 'fill-emerald-400' : 'fill-zinc-400'}`}
              >
                {edge.label}
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Single Node ──────────────────────────────────────────────────────────────

function ArchNodeCard({
  node,
  index,
  hoveredNode,
  setHoveredNode,
}: {
  node: ArchNode
  index: number
  hoveredNode: string | null
  setHoveredNode: (id: string | null) => void
}) {
  const tokens = accentTokens[node.accent] || accentTokens.zinc
  const IconComp = iconMap[node.icon] || Server
  const isHovered = hoveredNode === node.id
  const isDimmed = hoveredNode !== null && !isHovered

  return (
    <motion.div
      data-node-id={node.id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      className={`
        relative flex flex-col items-center justify-center text-center p-4 rounded-2xl
        border ${tokens.border} ${tokens.base}
        transition-all duration-300 cursor-default
        w-44 min-h-[120px] flex-shrink-0
        ${isHovered ? "scale-105 z-40 " + tokens.shadow : "shadow-xl z-20"}
        ${isDimmed ? "opacity-40 grayscale-[0.5] blur-[1px]" : "opacity-100"}
      `}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className={`p-2 ${tokens.iconBg} rounded-lg mb-2.5 border ${tokens.border}`}>
        <IconComp className={`h-5 w-5 ${tokens.text}`} />
      </div>

      {/* Label */}
      <span className={`text-xs font-bold ${tokens.text} tracking-wide`}>
        {node.label}
      </span>

      {/* Type badge */}
      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">
        {node.type}
      </span>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full
                     w-56 bg-zinc-950 border border-zinc-700 rounded-lg p-3
                     shadow-2xl z-50 text-left pointer-events-none"
        >
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            {node.description}
          </p>
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950
                        border-r border-b border-zinc-700 rotate-45"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Single Diagram ───────────────────────────────────────────────────────────

function DiagramPanel({ visual, index }: { visual: ArchVisual; index: number }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map())
  const [, setTick] = useState(0)

  const computePositions = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const positions = new Map<string, { x: number; y: number }>()

    visual.nodes.forEach((node) => {
      const el = container.querySelector(`[data-node-id="${node.id}"]`)
      if (el) {
        const rect = el.getBoundingClientRect()
        positions.set(node.id, {
          // Adjust position for container scroll state so SVG paths don't misalign
          x: rect.left - containerRect.left + container.scrollLeft + rect.width / 2,
          y: rect.top - containerRect.top + container.scrollTop + rect.height / 2,
        })
      }
    })

    setNodePositions(positions)
  }, [visual.nodes])

  useEffect(() => {
    // Initial compute after layout
    const timers = [
      setTimeout(() => { computePositions(); setTick((t) => t + 1) }, 100),
      setTimeout(() => { computePositions(); setTick((t) => t + 1) }, 500),
      setTimeout(() => { computePositions(); setTick((t) => t + 1) }, 1200),
    ]

    const handleResize = () => {
      computePositions()
      setTick((t) => t + 1)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("resize", handleResize)
    }
  }, [computePositions])

  // Group nodes by column
  const columns: ArchNode[][] = []
  visual.nodes.forEach((n) => {
    const colIdx = (n.col || 1) - 1
    if (!columns[colIdx]) columns[colIdx] = []
    columns[colIdx].push(n)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      className="flex flex-col items-center"
    >
      {/* Title cluster */}
      <div className="text-center mb-10 w-full max-w-2xl">
        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-[0.2em]
                       bg-zinc-800/80 px-6 py-2 rounded-full shadow-inner
                       border border-zinc-700/80 inline-block mb-3">
          {visual.title}
        </h4>
        {visual.subtitle && (
          <p className="text-sm text-zinc-400">
            {visual.subtitle}
          </p>
        )}
      </div>

      <div className="relative w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/40 shadow-2xl py-20">
        <div 
          className="relative w-full overflow-x-auto overflow-y-visible hide-scrollbar" 
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Nodes in structured DAG row layout */}
          <div
            ref={containerRef}
            className="min-w-max px-12 md:px-24 py-16 relative flex flex-row items-stretch justify-start gap-16 md:gap-24 mx-auto w-max"
          >
            {/* SVG edges rendered inside scrollable content so coordinates match perfectly */}
            <EdgeLines edges={visual.edges} nodePositions={nodePositions} />
            
            {columns.map((colNodes, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-10 items-center justify-center relative" style={{ zIndex: 10 }}>
                {colNodes.map((node, nIdx) => (
                  <ArchNodeCard
                    key={node.id}
                    node={node}
                    index={cIdx + nIdx} // stagger based on absolute position
                    hoveredNode={hoveredNode}
                    setHoveredNode={setHoveredNode}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export const ArchitectureFlow = ({ visuals }: { visuals: ArchVisual[] }) => {
  if (!visuals || visuals.length === 0) return null

  return (
    <div className="space-y-16 my-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/60
                    p-6 md:p-10 overflow-hidden">
      {visuals.map((vis, idx) => (
        <DiagramPanel key={idx} visual={vis} index={idx} />
      ))}
    </div>
  )
}
