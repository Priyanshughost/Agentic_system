# AI Chatbot Frontend

A modern, responsive chatbot interface built with **React**, **Vite**, and **Tailwind CSS**. The project follows a **feature-based architecture** to keep code organized, scalable, and maintainable.

---

## Features

* Modern dark-themed UI
* Responsive layout
* Feature-based folder structure
* Reusable components
* Zustand state management
* Custom hooks for chat actions
* Streaming AI responses
* Real-time assistant message updates
* Backend integration through Express API
* LangGraph-powered AI backend integration
* Service abstraction layer
* Ready for advanced AI workflows and tool integrations
* Easy to scale and maintain

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* Zustand
* Axios

---

## Project Structure

```text
src/
├── assets/
├── components/
│
├── features/
│   └── chat/
│       ├── components/
│       │   ├── ChatBubble.jsx
│       │   ├── ChatInput.jsx
│       │   ├── ChatWindow.jsx
│       │   └── MessageList.jsx
│       ├── hooks/
│       │   └── useChatActions.js
│       ├── store/
│       │   └── chatStore.js
│       └── services/
│          └── chatApi.js
├── hooks/
├── utils/
├── App.jsx
└── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd project-name
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Architecture

### Components

Contains reusable UI elements responsible for rendering the interface.

Examples:

* ChatBubble
* ChatInput
* MessageList
* ChatWindow

### Store (Zustand)

Manages application state for the chat feature.

Responsibilities:

* Messages state
* Active conversation
* Loading states
* User preferences
* Future persistence support

Benefits:

* No Provider wrappers
* Centralized state management
* Selective subscriptions
* Easy scalability

### Hooks

Contains custom React hooks.

Examples:

* Streaming API communication
* Express backend integration
* LangGraph backend communication
* Future AI provider integrations
* Request abstraction layer

### Services

Responsible for all backend communication.

Examples:

* Express backend API
* Future AI provider integrations
* Request abstraction layer

Keeping API logic separate from UI components improves maintainability.

### Streaming Architecture

The frontend consumes Server-Sent Event style streams from the backend and updates assistant messages incrementally as chunks arrive.

Flow:

```text
User Message
      ↓
Backend Stream
      ↓
Chunk Received
      ↓
Zustand Update
      ↓
UI Re-render
```

This enables ChatGPT-style real-time response generation instead of waiting for a complete response before rendering.


### Current Request Flow

```text
ChatInput
    ↓
useChatActions
    ↓
streamChatMessage()
    ↓
Fetch Stream
    ↓
Express Backend
    ↓
LangGraph Stream
    ↓
Streaming Chunks
    ↓
Zustand Store
    ↓
MessageList
    ↓
ChatBubble
```

---

## Future Enhancements

### Chat Features

* Conversation history
* Message editing
* Regenerate response
* Copy message
* Delete conversations
* Search conversations

### AI Features

* Streaming responses
* Multi-model support
* File uploads
* Image generation
* Voice input
* Function calling

### UI Improvements

* Framer Motion animations
* Glassmorphism effects
* Mobile drawer navigation
* Theme switching
* Markdown rendering
* Code syntax highlighting

### Developer Experience

* TypeScript migration
* Unit testing
* E2E testing
* ESLint + Prettier
* CI/CD pipeline

---

## Design Principles

* Feature-first architecture
* Separation of concerns
* Reusable UI components
* Scalable folder organization
* Easy API integration
* Production-ready codebase structure

---

## License

MIT License

---

Built with React, Vite, Tailwind CSS, Zustand, and a streaming LangGraph-powered backend.

