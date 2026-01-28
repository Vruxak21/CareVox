# CareVox 🏥

**Transform Healthcare with AI Medical Voice Agents**

CareVox is an AI-powered medical assistant platform that enables patients to have natural voice conversations with medical agents. The platform uses advanced AI to conduct medical consultations, generate comprehensive reports, and suggest relevant healthcare specialists.

## ✨ Features

- **AI Voice Consultation**: Interactive voice conversations with AI medical agents powered by Vapi AI
- **Intelligent Medical Reports**: Automatic generation of detailed medical reports using OpenAI
- **Doctor Recommendations**: Smart suggestions for healthcare specialists based on consultation content
- **Session Management**: Track and review past medical consultation sessions
- **User Authentication**: Secure authentication and user management with Clerk
- **Real-time Transcription**: Live conversation transcription during medical consultations
- **Billing & Credits System**: Integrated credit-based system for managing consultations
- **Responsive Dashboard**: Modern, intuitive dashboard for managing your healthcare journey

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Voice AI**: Vapi AI
- **AI Model**: OpenAI
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Icons**: Tabler Icons, Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following:

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- A Clerk account and API keys
- A Neon database
- OpenAI API key
- Vapi AI account and API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd carevox
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Neon)
DATABASE_URL=your_neon_database_url

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Vapi AI
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_API_KEY=your_vapi_api_key
```

### 4. Database Setup

Run the database migrations:

```bash
npm run db:push
# or
npx drizzle-kit push
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
carevox/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (routes)/            # Protected application routes
│   │   └── dashboard/
│   │       ├── billing/
│   │       ├── history/
│   │       ├── medical-agent/
│   │       └── profile/
│   ├── api/                 # API routes
│   │   ├── medical-report/
│   │   ├── session-chat/
│   │   ├── suggest-doctors/
│   │   └── users/
│   └── _components/         # Landing page components
├── components/              # Reusable UI components
│   └── ui/                  # shadcn/ui components
├── config/                  # Configuration files
│   ├── db.tsx              # Database configuration
│   ├── OpenAIModel.tsx     # OpenAI configuration
│   └── schema.tsx          # Database schema
├── context/                 # React Context providers
│   └── UserDetailContext.tsx
└── lib/                     # Utility functions
```

## 🎯 Key Features Explained

### Medical Voice Agent
- Real-time voice conversations with AI medical agents
- Live transcription of the conversation
- Support for multiple doctor specializations
- Call duration tracking

### Medical Report Generation
- AI-powered analysis of consultation conversations
- Structured medical reports with symptoms, diagnoses, and recommendations
- Exportable and reviewable reports

### Doctor Suggestions
- Intelligent matching of specialists based on consultation content
- Comprehensive doctor profiles with specializations
- Integration with healthcare network

### Session History
- Complete history of all medical consultations
- Easy access to past reports and recommendations
- Session-based organization

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

The application uses two main tables:

- **users**: Stores user information and credits
- **sessionChatTable**: Stores medical consultation sessions, conversations, and reports

## 🎨 UI Components

The project uses shadcn/ui components including:
- Button
- Dialog
- Table
- Textarea
- Badge
- Bento Grid

## 🔐 Authentication & Authorization

User authentication is handled by Clerk with the following features:
- Email/password authentication
- OAuth support
- Protected routes via middleware
- User profile management

## 🌐 API Routes

- `POST /api/users` - Create/update user
- `GET /api/session-chat` - Get session details
- `POST /api/medical-report` - Generate medical report
- `POST /api/suggest-doctors` - Get doctor recommendations
- `POST /api/webhooks/clerk` - Handle Clerk webhooks

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy CareVox is using the [Vercel Platform](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables from `.env.local` to your production environment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Built with ❤️ by the CareVox Team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Vapi AI](https://vapi.ai/)
- [OpenAI](https://openai.com/)
- [Neon](https://neon.tech/)
- [shadcn/ui](https://ui.shadcn.com/)
