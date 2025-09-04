# AI Agent Sandbox

A modern React-based platform for creating and managing autonomous AI agents, powered by Hugging Face AI models and Supabase backend.

## 🚀 Features

- **AI-Powered Agent Creation** - Natural language task breakdown using Hugging Face models
- **Real-time Database** - Supabase integration with PostgreSQL and real-time subscriptions
- **Authentication** - Secure user management with Supabase Auth
- **Agent Management** - Complete CRUD operations for AI agents
- **Task Visualization** - Interactive task tree and execution monitoring
- **Responsive Design** - Mobile-first design with TailwindCSS
- **Modern Stack** - React 18, Vite, Redux Toolkit, React Router v6

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Supabase account
- Hugging Face account

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Update .env with your Supabase and Hugging Face credentials
   ```

3. Set up Supabase database:
   ```bash
   # Run the SQL schema from database-schema.sql in your Supabase project
   ```
   
4. Start the development server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
ai_agent_sandbox/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Base UI components
│   ├── pages/          # Page components
│   │   ├── agent-creation/
│   │   ├── agent-management/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── register/
│   ├── services/       # API services
│   │   ├── huggingface.js
│   │   └── supabaseService.js
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── styles/         # Global styles
├── database-schema.sql # Supabase database schema
├── SETUP.md           # Detailed setup instructions
└── .env               # Environment variables
```

## 🤖 AI Integration

### Hugging Face Models
- **Task Breakdown**: `microsoft/DialoGPT-medium` for natural language task analysis
- **Classification**: `facebook/bart-large-mnli` for agent type categorization
- **Complexity Analysis**: Sentiment analysis for task difficulty assessment

### Supabase Features
- **Authentication**: User registration, login, and session management
- **Database**: PostgreSQL with real-time subscriptions
- **Security**: Row Level Security (RLS) for data protection
- **Storage**: File uploads and management

## 🔐 Authentication

The application includes:
- Protected routes with authentication guards
- Supabase Auth integration
- Demo credentials: `admin@aiagent.com` / `admin123`
- User session management

## 📊 Dashboard Features

- **Agent Metrics**: Active agents, completed tasks, success rates
- **Activity Feed**: Real-time system activity monitoring
- **Task Management**: Create, monitor, and manage agent tasks
- **System Status**: Performance monitoring and health checks


## 📦 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred platform (Vercel, Netlify, etc.)

3. Configure environment variables in production

## 🔧 Configuration

See `SETUP.md` for detailed configuration instructions including:
- Supabase project setup
- Hugging Face API configuration
- Database schema installation
- Environment variable configuration

## 🙏 Acknowledgments

- **AI Models**: Powered by Hugging Face transformers
- **Backend**: Supabase for authentication and database
- **Frontend**: React 18 with Vite build system
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React icon library

Built with ❤️ for AI agent management
