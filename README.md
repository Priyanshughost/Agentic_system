# AI Chatbot Frontend

A modern, production-ready AI chatbot frontend built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**.

The application provides a ChatGPT-like user experience with authentication, persistent conversations, real-time streaming responses, automatic session restoration, and a scalable feature-based architecture.

The frontend is designed to remain AI-provider agnostic while integrating seamlessly with a LangGraph-powered backend.

---

# Features

## Authentication

* User registration
* User login
* JWT-based authentication
* HttpOnly refresh token cookies
* Automatic access token refresh
* Session restoration after page refresh
* Session restoration after browser restart
* Protected routes
* Secure logout

---

## Chat

* Streaming AI responses
* Real-time token rendering
* Conversation history
* Conversation switching
* New conversation creation
* Automatic conversation creation on first message
* Sidebar conversation list
* Active conversation management
* Copy assistant responses
* Responsive chat interface

---

## State Management

* Zustand for authentication
* Zustand for conversations
* Zustand for messages
* Global conversation state
* Active conversation tracking

---

## User Experience

* Modern dark UI
* Mobile responsive layout
* Sidebar navigation
* Loading states
* Error handling
* Automatic scrolling
* Streaming assistant rendering
* ChatGPT-inspired interface

---

# Tech Stack

### Core

* React
* Vite
* Tailwind CSS

### Routing

* React Router DOM

### State Management

* Zustand

### Networking

* Axios
* Fetch Streaming API

### Authentication

* JWT Access Tokens
* HttpOnly Refresh Cookies

---

# Project Structure

```text
src/
│
├── assets/
│
├── components/
│
├── features/
│
│   ├── auth/
│   │
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuthInit.js
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── authApi.js
│   │   │
│   │   └── store/
│   │       └── authStore.js
│   │
│   ├── chat/
│   │
│   │   ├── components/
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useChatActions.js
│   │   │   └── useConversations.js
│   │   │
│   │   ├── services/
│   │   │   ├── chatApi.js
│   │   │   └── conversationApi.js
│   │   │
│   │   └── store/
│   │       └── chatStore.js
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

# Installation

Clone the repository

```bash
git clone <repository-url>
cd project-name
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Create a production build

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# Architecture

The frontend follows a **feature-first architecture**.

Instead of separating code by technical layers, every feature owns its own components, services, hooks, and state.

```text
features/
│
├── auth/
│
└── chat/
```

Each feature remains isolated and can evolve independently.

---

# Components

Components are responsible only for rendering UI.

Examples include:

* ChatWindow
* Sidebar
* ChatInput
* ChatBubble
* MessageList
* LoginForm
* RegisterForm

Business logic is intentionally kept outside UI components.

---

# Hooks

Custom hooks orchestrate application behavior.

Current hooks include:

* useAuthInit
* useChatActions
* useConversations

Responsibilities include:

* Session initialization
* Chat orchestration
* Conversation loading
* Streaming coordination

---

# Services

Services encapsulate all backend communication.

Current services include:

```text
authApi.js
chatApi.js
conversationApi.js
```

Responsibilities:

* Authentication requests
* Streaming requests
* Conversation retrieval
* Session restoration
* Logout
* Token refresh

Keeping networking logic outside components greatly improves maintainability.

---

# Zustand Stores

The application currently maintains two independent stores.

## Authentication Store

Responsible for:

* Current user
* Access token
* Authentication status
* Session restoration

---

## Chat Store

Responsible for:

* Messages
* Conversations
* Active conversation
* Streaming updates
* Conversation switching

This separation keeps authentication completely independent from chat state.

---

# Current Frontend Responsibilities

The frontend is responsible for:

* User authentication
* Session restoration
* Route protection
* Conversation management
* Streaming response rendering
* Message state
* Sidebar synchronization
* Chat interface rendering
* Backend communication

The AI reasoning itself is intentionally delegated to the backend, keeping the frontend focused on user experience and application state.
# Authentication Architecture

The frontend implements a JWT-based authentication system using **short-lived access tokens** and **HttpOnly refresh token cookies**.

This architecture keeps sensitive credentials out of local storage while allowing seamless session restoration.

---

## Authentication Flow

```text
Register / Login
        │
        ▼
Express Backend
        │
        ▼
Access Token
        │
        ▼
Zustand Auth Store
        │
        ▼
Protected Routes

Refresh Token
        │
        ▼
HttpOnly Cookie
        │
        ▼
Automatic Session Recovery
```

---

## Session Restoration

Unlike traditional applications that persist access tokens in localStorage, this application restores the session using the backend.

Application startup flow:

```text
Application Starts
        │
        ▼
useAuthInit()
        │
        ▼
POST /auth/refresh
        │
        ▼
New Access Token
        │
        ▼
GET /auth/me
        │
        ▼
Restore User
        │
        ▼
Render Protected Routes
```

This allows users to:

* Refresh the browser
* Close and reopen the browser
* Continue their previous session

without exposing refresh tokens to JavaScript.

---

# Conversation Architecture

Every conversation is represented independently.

The frontend keeps track of:

* Conversation list
* Active conversation
* Messages belonging to the active conversation

The backend remains the source of truth while Zustand provides fast client-side state management.

---

## Conversation Lifecycle

```text
Click "New Chat"
        │
        ▼
Clear Current Messages
        │
        ▼
activeConversation = null
        │
        ▼
User sends first message
        │
        ▼
Backend creates Conversation
        │
        ▼
Conversation streamed back
        │
        ▼
Conversation added to Sidebar
        │
        ▼
Future messages reuse Conversation ID
```

A conversation is therefore created **only when the first message is sent**, avoiding empty conversations in the database.

---

## Conversation Switching

When a conversation is selected from the sidebar:

```text
Sidebar
      │
      ▼
GET /conversations/:id
      │
      ▼
Load Messages
      │
      ▼
Update Zustand
      │
      ▼
Render Conversation
```

Conversation switching never reloads the application.

Only the relevant messages are fetched.

---

# Streaming Architecture

Assistant responses are streamed token-by-token from the backend.

```text
User Message
      │
      ▼
Authenticated Fetch Request
      │
      ▼
Express Backend
      │
      ▼
LangGraph Stream
      │
      ▼
Server-Sent Events
      │
      ▼
Streaming Chunks
      │
      ▼
appendToLastAssistantMessage()
      │
      ▼
Live UI Update
```

The assistant message is created immediately as an empty placeholder.

Each incoming chunk is appended incrementally, producing a ChatGPT-like typing experience.

---

# Request Flow

## Authentication

```text
Login Form
      │
      ▼
authApi.js
      │
      ▼
Express Backend
      │
      ▼
JWT Access Token
      │
      ▼
Auth Store
      │
      ▼
Protected Routes
```

---

## Sending a Message

```text
ChatInput
      │
      ▼
useChatActions()
      │
      ▼
chatApi.streamChatMessage()
      │
      ▼
Authenticated Fetch Request
      │
      ▼
Express Backend
      │
      ▼
Conversation Creation (if needed)
      │
      ▼
LangGraph Stream
      │
      ▼
Streaming Chunks
      │
      ▼
Zustand Chat Store
      │
      ▼
MessageList
      │
      ▼
ChatBubble
```

---

## Loading Conversations

```text
ChatWindow Mount
        │
        ▼
useConversations()
        │
        ▼
conversationApi.js
        │
        ▼
GET /conversations
        │
        ▼
Conversation List
        │
        ▼
Sidebar
```

---

## Loading Conversation Messages

```text
Sidebar Click
      │
      ▼
GET /conversations/:id
      │
      ▼
Messages Returned
      │
      ▼
loadConversation()
      │
      ▼
Update Chat Store
      │
      ▼
Render Messages
```

---

# Current Frontend Data Flow

```text
User
 │
 ▼
React Components
 │
 ▼
Custom Hooks
 │
 ▼
API Services
 │
 ▼
Express Backend
 │
 ▼
LangGraph
 │
 ▼
Streaming Response
 │
 ▼
Zustand Store
 │
 ▼
React Components
 │
 ▼
UI
```

The UI never communicates directly with the backend.

Every request passes through a dedicated service layer, while application state is coordinated through Zustand.
# Completed Milestones

The project has evolved from a simple chatbot interface into a fully authenticated AI chat application with persistent conversations and streaming responses.

Current completed functionality includes:

## Authentication

* User registration
* User login
* JWT access token authentication
* HttpOnly refresh token authentication
* Automatic access token refresh
* Session restoration
* Protected routes
* Secure logout

---

## Conversation Management

* Automatic conversation creation
* Conversation sidebar
* Conversation persistence
* Active conversation management
* Conversation switching
* Conversation history retrieval
* New chat workflow

---

## Messaging

* Persistent message storage
* Streaming AI responses
* Incremental assistant rendering
* Copy assistant responses
* Automatic scrolling
* Real-time UI updates

---

## State Management

* Zustand authentication store
* Zustand chat store
* Conversation synchronization
* Active conversation synchronization
* Session synchronization

---

## Backend Integration

* Authentication API integration
* Streaming chat API integration
* Conversation API integration
* Automatic session restoration
* Secure authenticated requests

---

## User Interface

* Responsive layout
* Mobile sidebar
* Dark theme
* ChatGPT-inspired interface
* Modern component design
* Reusable UI architecture

---

At this stage, the frontend is no longer just a chat interface.

It has become a fully authenticated AI client capable of managing users, conversations, and streaming interactions with an AI backend.

---

# Future Roadmap

The architecture has intentionally been designed to support future capabilities without major refactoring.

## Authentication

* Email verification
* Password reset
* Profile management
* Multi-device sessions
* OAuth providers
* Two-factor authentication

---

## Conversations

* Rename conversation
* Delete conversation
* Pin conversations
* Archive conversations
* Conversation search
* Infinite scrolling history

---

## Messaging

* Markdown rendering
* Syntax highlighting
* Message editing
* Regenerate responses
* Delete individual messages
* Message reactions
* Message timestamps
* Export conversations

---

## AI Features

* File uploads
* Image understanding
* Image generation
* Voice input
* Voice responses
* Tool calling
* Web search
* Code execution
* Multi-model support
* Agent selection
* Reasoning mode
* Model switching

---

## User Experience

* Typing indicators
* Better loading animations
* Keyboard shortcuts
* Drag-and-drop uploads
* Theme switching
* Accessibility improvements
* Framer Motion page transitions
* Offline detection
* Toast notifications

---

## Developer Experience

* TypeScript migration
* ESLint
* Prettier
* Unit testing
* Integration testing
* End-to-end testing
* CI/CD pipeline
* Docker support
* Storybook
* Environment validation

---

# Design Principles

The frontend is built around a small set of architectural principles.

## Feature-First Organization

Every feature owns its own:

* Components
* Hooks
* Services
* State

This minimizes coupling and keeps features easy to extend.

---

## Separation of Concerns

Responsibilities are clearly divided.

Components

* Render UI

Hooks

* Coordinate feature logic

Services

* Communicate with the backend

Stores

* Manage application state

---

## Scalability

The project favors scalable abstractions over short-term convenience.

Examples include:

* Dedicated API layer
* Independent authentication store
* Independent chat store
* Feature-based architecture
* AI-provider agnostic design

---

## Maintainability

Business logic remains outside UI components whenever possible.

This results in:

* Easier testing
* Easier debugging
* Better code reuse
* Smaller components

---

## User Experience First

The application prioritizes perceived responsiveness.

Examples include:

* Streaming responses
* Automatic scrolling
* Immediate placeholder messages
* Session restoration
* Responsive layouts
* Minimal loading interruptions

---

# License

MIT License

---

Built with **React**, **Vite**, **Tailwind CSS**, **Zustand**, and an authenticated streaming backend powered by **LangGraph**.
