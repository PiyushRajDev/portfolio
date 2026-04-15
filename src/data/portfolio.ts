export const portfolioData = {
  personal: {
    name: "Piyush Raj",
    title: "Backend Systems Engineer",
    shortLine: "Building scalable systems & SaaS",
    headline:
      "Backend-focused engineer building scalable systems and SaaS products with real-world architecture and performance considerations.",
    email: "piyush.705039@gmail.com",
    github: "https://github.com/PiyushRajDev",
    twitter: "https://x.com/imposterdev07",
  },
  about: {
    intro: [
      "I'm a CSE student with a strong SaaS builder mindset.",
      "My primary focus goes beyond just writing code—I engineer resilient backend architectures and build systems meant to scale.",
      "I prioritize clarity, determinism, and performance in every system I architect.",
    ],
    skills: {
      "Backend & Infra": [
        "Node.js",
        "Express",
        "NestJS",
        "Next.js",
        "Redis",
        "BullMQ",
        "Turborepo",
      ],
      "Databases": ["PostgreSQL", "Elasticsearch"],
      "Real-time Systems": ["WebSockets", "WebRTC (LiveKit)", "PIXI.js"],
      "Languages & Tools": ["TypeScript", "React", "Tailwind CSS"],
    },
  },
  currentlyBuilding: {
    title: "SkillLighthouse (SLH)",
    description: "An engineering evaluation infrastructure prioritizing determinism over black-box AI.",
    link: "/projects/skill-lighthouse",
  },
  projects: [
    {
      id: "skill-lighthouse",
      isPrimary: true,
      title: "SkillLighthouse",
      subtitle: "Engineering Evaluation Infrastructure",
      shortDescription: "Deterministic system to evaluate developer capability using code analysis.",
      problem: "Resume-based hiring is unreliable and subjective.",
      impactLine: "Evaluates developer capability using deterministic code analysis instead of relying on resume proxies.",
      solution: "A deterministic system to evaluate developer capability using deep code analysis, circumventing traditional proxy-based evaluations.",
      features: [
        "Project Analyzer (code metrics extraction)",
        "Job Readiness Index (JRI)",
        "Async worker-based architecture",
      ],
      tech: [
        "Node.js",
        "Express",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "React"
      ],
      architecture: [
        "Stateless API",
        "Background workers",
        "Modular monorepo",
      ],
      principles: [
        "Deterministic over probabilistic",
        "Explainability-first",
        "Separation of concerns",
      ],
      github: "https://github.com/PiyushRajDev/slh",
      deepDive: {
        architectureVisuals: [
          {
            title: "Evaluation Pipeline",
            subtitle: "End-to-end flow from repository ingestion to scored output",
            nodes: [
              { id: "client", col: 1, type: "client", label: "GitHub Repo URL", icon: "git", accent: "zinc", description: "User submits a public repository for evaluation" },
              { id: "api", col: 2, type: "service", label: "REST API", icon: "server", accent: "blue", description: "Stateless Express server — validates, enqueues, returns job ID" },
              { id: "queue", col: 3, type: "queue", label: "BullMQ", icon: "layers", accent: "amber", description: "Redis-backed job queue with retry policies and dead-letter handling" },
              { id: "worker", col: 4, type: "worker", label: "AST Worker", icon: "cpu", accent: "emerald", description: "Isolated worker parses repo, extracts metrics via deterministic AST analysis" },
              { id: "db", col: 5, type: "storage", label: "PostgreSQL", icon: "database", accent: "violet", description: "Persists evaluation results, user profiles, and JRI scores" },
            ],
            edges: [
              { from: "client", to: "api", label: "POST /evaluate" },
              { from: "api", to: "queue", label: "Enqueue job" },
              { from: "queue", to: "worker", label: "Dequeue & process", animated: true },
              { from: "worker", to: "db", label: "Write results" },
            ],
          },
          {
            title: "Worker Queue System",
            subtitle: "Reliable async processing with zero dropped evaluations",
            nodes: [
              { id: "producer", col: 1, type: "service", label: "API Server", icon: "server", accent: "blue", description: "Produces jobs on every evaluation request" },
              { id: "redis", col: 2, type: "queue", label: "Redis", icon: "zap", accent: "red", description: "In-memory store backing BullMQ — handles pub/sub and job state" },
              { id: "w1", col: 3, type: "worker", label: "Worker 1", icon: "cpu", accent: "emerald", description: "Horizontally scalable — processes evaluations concurrently" },
              { id: "w2", col: 3, type: "worker", label: "Worker N", icon: "cpu", accent: "emerald", description: "Additional workers scale independently from API tier" },
              { id: "dlq", col: 4, type: "storage", label: "Dead Letter Queue", icon: "alertTriangle", accent: "amber", description: "Failed jobs are captured for inspection — nothing silently drops" },
            ],
            edges: [
              { from: "producer", to: "redis", label: "Add to queue" },
              { from: "redis", to: "w1", label: "Dispatch", animated: true },
              { from: "redis", to: "w2", label: "Dispatch", animated: true },
              { from: "w1", to: "dlq", label: "On failure" },
              { from: "w2", to: "dlq", label: "On failure" },
            ],
          },
        ],
        tradeOffs: [
          "Opted for BullMQ over Kafka for lower operational overhead while still maintaining strict queue processing reliability.",
          "Chose deterministic AST analysis instead of LLM-based scoring to guarantee explainability in evaluation results."
        ],
        scaling: [
          "Worker nodes can be horizontally scaled entirely independent of the API server.",
          "Redis acts as a persistent state layer for fast pipeline progression tracking."
        ]
      }
    },
    {
      id: "trendy",
      isPrimary: false,
      title: "Trendy",
      subtitle: "Scalable Fashion Search & Recommendation Engine",
      shortDescription: "Modular monolith backend simulating real-world product, search, and recommendation systems.",
      problem: "Large-scale e-commerce systems require incredibly fast search, personalization, and resilient event-driven processing.",
      impactLine: "Demonstrates production-ready data replication and decoupled search indexing to handle heavy read/write loads.",
      solution: "A robust modular monolith architecture employing cache-aside patterns and event-driven updates for high-performance retrieval.",
      features: [
        "Product catalog (PostgreSQL)",
        "Full-text search (Elasticsearch)",
        "Event-driven recommendation engine",
        "Redis-based caching & ranking",
      ],
      tech: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "Elasticsearch", "Redis"],
      architecture: [
        "Event-driven (Redis Streams)",
        "Cache-aside pattern",
        "Derived search index",
      ],
      keyInsights: [
        "Eventual consistency trade-offs",
        "Async processing for performance",
      ],
      github: "https://github.com/PiyushRajDev/trendy",
      deepDive: {
        architectureVisuals: [
          {
            title: "Derived Data Architecture",
            subtitle: "Event-driven replication from source of truth to optimized read stores",
            nodes: [
              { id: "api", col: 1, type: "service", label: "NestJS API", icon: "server", accent: "blue", description: "Modular monolith — handles product CRUD and search requests" },
              { id: "cache", col: 2, type: "queue", label: "Redis Cache", icon: "zap", accent: "emerald", description: "Cache-aside layer for hot product data — reduces DB read pressure" },
              { id: "pg", col: 2, type: "storage", label: "PostgreSQL", icon: "database", accent: "violet", description: "Single source of truth for all product and catalog data" },
              { id: "stream", col: 3, type: "queue", label: "Redis Streams", icon: "radio", accent: "red", description: "Event bus publishing change events on every write operation" },
              { id: "es", col: 4, type: "storage", label: "Elasticsearch", icon: "search", accent: "amber", description: "Derived search index — eventually consistent, optimized for full-text queries" },
            ],
            edges: [
              { from: "api", to: "pg", label: "Write" },
              { from: "pg", to: "stream", label: "Change event", animated: true },
              { from: "stream", to: "es", label: "Index sync", animated: true },
              { from: "api", to: "cache", label: "Cache-aside read" },
              { from: "cache", to: "pg", label: "Cache miss → DB" },
            ],
          },
        ],
        tradeOffs: [
          "Accepted eventual consistency between primary DB and Search Index to drastically reduce synchronous write latency.",
          "Chose structured NestJS modules to prevent monolith entanglement."
        ],
        scaling: [
          "Redis Streams decouple the recommendation engine, allowing search and analytics to fail independently.",
        ]
      }
    },
    {
      id: "metaspace",
      isPrimary: false,
      title: "Metaspace",
      subtitle: "Real-Time Virtual Collaboration Platform",
      shortDescription: "Real-time virtual environment with proximity-based communication.",
      problem: "Remote collaboration often feels disjointed and lacks natural interaction and physical presence.",
      impactLine: "Combines high-frequency state synchronization with live media routing for seamless digital presence.",
      solution: "A low-latency, real-time environment combining spatial WebSocket state with WebRTC media streams.",
      features: [
        "WebSocket-based state sync",
        "WebRTC audio/video (LiveKit)",
        "Interactive 2D world (PIXI.js)",
      ],
      tech: ["Next.js", "Node.js", "WebSockets", "PostgreSQL", "LiveKit", "PIXI.js"],
      architecture: ["Monorepo (Turborepo)", "Real-time event synchronization"],
      github: "https://github.com/PiyushRajDev/metaspace",
      deepDive: {
        architectureVisuals: [
          {
            title: "Real-time Sync Loop",
            subtitle: "Dual transport — WebSocket for state, WebRTC for media",
            nodes: [
              { id: "client", col: 1, type: "client", label: "PIXI.js Client", icon: "monitor", accent: "zinc", description: "Renders 2D world, captures input, interpolates remote positions" },
              { id: "ws", col: 2, type: "service", label: "WS State Server", icon: "radio", accent: "blue", description: "Broadcasts coordinate + action state at high frequency to all room participants" },
              { id: "lk", col: 2, type: "service", label: "LiveKit SFU", icon: "video", accent: "emerald", description: "Selective forwarding unit — routes audio/video streams without mixing" },
              { id: "db", col: 3, type: "storage", label: "PostgreSQL", icon: "database", accent: "violet", description: "Persists user profiles, room state, and session metadata" },
            ],
            edges: [
              { from: "client", to: "ws", label: "Position updates", animated: true },
              { from: "ws", to: "client", label: "Broadcast state", animated: true },
              { from: "client", to: "lk", label: "Media tracks" },
              { from: "lk", to: "client", label: "Forwarded streams" },
              { from: "ws", to: "db", label: "Persist sessions" },
            ],
          },
        ],
        tradeOffs: [
          "Offloaded heavy media routing to LiveKit (SFU) instead of a custom WebRTC implementation to optimize client CPU.",
          "Client-side interpolation used to mask network jitter in movements."
        ],
        scaling: [
          "State servers can be sharded per 'space' or 'room' without shared bottlenecks."
        ]
      }
    },
  ],
  engineeringThinking: [
    {
      title: "Deterministic Systems > Black-box AI",
      description: "In critical evaluation and business logic, I prefer systems whose outputs can be traced, explained, and reproduced. Explainability is a feature.",
    },
    {
      title: "Modular Monoliths before Microservices",
      description: "Premature abstraction kills velocity. I architect for clear domain boundaries within a single deployable unit until scale demands network boundaries.",
    },
    {
      title: "Build for Real-world Constraints",
      description: "A demo is easy; handling node failures, eventual consistency, and malformed data is engineering. I build with failure modes in mind.",
    },
    {
      title: "Clear Separation of Concerns",
      description: "APIs should route, workers should process, and databases should store. Tangled responsibilities lead to fragile scaling.",
    },
  ],
};
