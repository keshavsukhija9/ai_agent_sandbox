# AI Agent Sandbox Setup Guide

## Prerequisites
- Node.js (v14.x or higher)
- Supabase account
- Hugging Face account

## Environment Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Update `.env` file with your credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_HUGGINGFACE_API_KEY=your-huggingface-api-key
   ```

3. **Supabase Setup:**
   - Create a new Supabase project
   - Run the SQL schema from `database-schema.sql` in your Supabase SQL editor
   - Enable authentication providers in Supabase dashboard

4. **Hugging Face Setup:**
   - Create account at https://huggingface.co
   - Generate API token in Settings > Access Tokens
   - Add token to environment variables

## Database Schema

The application uses these main tables:
- `agents` - AI agent configurations
- `tasks` - Agent tasks and execution history  
- `activity_logs` - System activity tracking

## Features Implemented

### Authentication (Supabase)
- User registration and login
- Protected routes
- Session management
- Row-level security

### AI Integration (Hugging Face)
- Task breakdown generation
- Agent type classification
- Complexity analysis
- Fallback mechanisms

### Core Functionality
- Agent creation with AI-powered task analysis
- Agent management dashboard
- Task visualization
- Activity monitoring

## Running the Application

```bash
npm start
```

## Demo Credentials
For testing without Supabase setup:
- Email: admin@aiagent.com
- Password: admin123

## API Integration

### Hugging Face Models Used:
- `microsoft/DialoGPT-medium` - Task breakdown generation
- `facebook/bart-large-mnli` - Agent classification
- `cardiffnlp/twitter-roberta-base-sentiment-latest` - Complexity analysis

### Supabase Features:
- Real-time subscriptions
- Row Level Security (RLS)
- Authentication with JWT
- PostgreSQL with JSON support

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

3. Update environment variables in production

## Troubleshooting

- **Hugging Face API errors**: Check API key and rate limits
- **Supabase connection issues**: Verify URL and keys
- **Authentication problems**: Check RLS policies and user permissions