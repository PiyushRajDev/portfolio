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
            description: "Stateless parsing of Github repositories dispatched to isolated background workers.",
          },
          {
            title: "Worker Queue System",
            description: "Redis+BullMQ based reliable processing ensuring zero dropped evaluations.",
          }
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
            description: "Postgres as source of truth, replicating to Elasticsearch for full-text search.",
          }
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
            description: "Separated WebSocket transport for coordinate state from WebRTC media transport.",
          }
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
