# AI Frontend

A sleek, modern, production-ready AI orchestration client built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**.

This frontend does more than just display chat text—it visualizes the entire lifecycle of a multi-agent AI backend. It features dynamic pipeline steppers, real-time agent specification rendering using glassmorphism components, and Server-Sent Events (SSE) streaming for instantaneous feedback.

---

## Real-Time UI Visualizations

### 1. Pipeline Stepper (`PipelineStepper.jsx`)
A vertical tracking component that provides complete transparency into the backend's Meta-Graph execution. It advances automatically through the following phases based on SSE status updates:
- Intent Analyzer
- Meta-Architect
- Agent Specifications
- Runtime Execution (displays the currently executing Agent Name)
- Response Generator

### 2. Agent Glassmorphism Cards (`AgentVisualization.jsx`)
When the backend generates ephemeral agents, they are instantly streamed to the frontend and rendered as highly polished, glowing glassmorphism cards. Users can see exactly which agents were spawned, their specific roles, objectives, and assigned LLM tools.

---

## SSE Streaming Architecture

The core of the interaction layer is the `streamChatMessage` API inside `chatApi.js`. 
It consumes raw SSE data and dispatches events based on the `type` field:

- **`type: "status"`**: Updates the Pipeline Stepper phase and UI loading indicators.
- **`type: "agents"`**: Parses the backend's agent specifications and renders the Glassmorphism cards.
- **`type: "content"`**: Appends the final generated markdown sequentially to the chat bubble for a smooth typing effect.

---

## State Management

Application state is decoupled from components using **Zustand** stores:

- **`chatStore.js`**: Manages active conversations, historical messages, SSE chunk accumulation, and real-time visualization states (agents and pipeline status).
- **`authStore.js`**: Manages secure HTTP-only refresh tokens, JWT rotation, and automatic session recovery.

---

## Directory Structure

```text
src/
├── features/
│   ├── auth/            # Login, Registration, JWT state
│   └── chat/            # Chat interface and Visualizations
│       ├── components/  # PipelineStepper, AgentVisualization, ChatBubble
│       ├── hooks/       # useChatActions
│       ├── services/    # SSE consumer (chatApi)
│       └── store/       # Zustand chat store
├── lib/                 # Axios configurations and interceptors
├── routes/              # Protected routing
└── utils/               # Helper utilities
```

---

## Installation & Execution

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file from `.env.example` and set your `VITE_API_URL` to point to the local backend.

3. **Start the Application**
   ```bash
   npm run dev
   ```
