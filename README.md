```markdown
# AI Chatbot Frontend

A modern, responsive chatbot interface built with **React**, **Vite**, and **Tailwind CSS**. The project follows a **feature-based architecture** to keep code organized, scalable, and maintainable.

---

## Features

* Modern dark-themed UI
* Responsive layout
* Feature-based folder structure
* Reusable components
* Zustand state management
* Authentication system
* Login and registration flows
* Protected routes
* Session restoration via refresh tokens
* HttpOnly cookie-based authentication
* Custom hooks for chat actions
* Streaming AI responses
* Real-time assistant message updates
* Backend integration through Express API
* LangGraph-powered AI backend integration

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* Zustand
* React Router DOM
* Axios

---

## Project Structure

```text
src/
├── assets/
│
├── components/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── hooks/
│   │   │   └── useAuthInit.js
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── authApi.js
│   │   └── store/
│   │       └── authStore.js
│   │
│   └── chat/
│       ├── components/
│       │   ├── ChatBubble.jsx
│       │   ├── ChatInput.jsx
│       │   ├── ChatWindow.jsx
│       │   └── MessageList.jsx
│       ├── hooks/
│       │   └── useChatActions.js
│       ├── services/
│       │   └── chatApi.js
│       └── store/
│           └── chatStore.js
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── App.jsx
├── main.jsx
└── index.css

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
* Request abstraction layer

### Services

Responsible for all backend communication.

Examples:

* Express backend API
* Request abstraction layer

Keeping API logic separate from UI components improves maintainability.

---

## Authentication Architecture

The frontend uses a token-based authentication flow with automatic session restoration.

```text
Login
    ↓
Access Token
    ↓
Zustand Store
    ↓
Protected Routes

Refresh Token
    ↓
HttpOnly Cookie
    ↓
Automatic Session Recovery

```

### Session Restoration Flow

```text
Application Start
        ↓
useAuthInit()
        ↓
Refresh Token Request
        ↓
New Access Token
        ↓
Get Current User
        ↓
Restore Session

```

This allows users to remain logged in across page refreshes and browser restarts without storing refresh tokens in localStorage.

---

## Streaming Architecture

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

---

## Current Request Flow

### Authentication Flow

```text
Login Form
      ↓
authApi.js
      ↓
Express Backend
      ↓
JWT Access Token
      ↓
Zustand Auth Store
      ↓
Protected Routes

```

### Chat Flow

```text
ChatInput
    ↓
useChatActions
    ↓
streamChatMessage()
    ↓
Authenticated Fetch Request
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

## Completed Milestones

• Authentication system implemented
• Login and registration flows implemented
• Protected routes implemented
• Session restoration implemented
• Zustand-based auth state management
• Streaming chat responses implemented
• LangGraph backend integration completed
• Real-time token streaming implemented
• Backend communication layer completed

At this point, your frontend is no longer a "chat UI". It's an authenticated AI chat client with session management and streaming support, and the README should reflect that evolution.

---

## Future Enhancements

### Authentication

* Profile management
* Password reset
* Email verification
* Multi-device sessions
* OAuth providers

### Chat Features

* Conversation history
* Chat persistence
* Conversation sidebar
* Multi-session chats
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

```

```