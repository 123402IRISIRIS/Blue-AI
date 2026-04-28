# Blue - AI Companion for Teens

Blue is a compassionate AI companion designed specifically for teenagers, providing emotional support and crisis detection capabilities.

## 🌟 Features

- **💬 Simple Chat Interface** - Clean, WhatsApp-style chat experience with Blue
- **😊 Emoji Support** - Express yourself with a wide range of emojis
- **🎬 GIF Integration** - Send GIFs to share emotions and reactions
- **🚨 Crisis Detection** - Automatic detection of distress signals with immediate support resources
- **🔔 Notifications** - Stay connected with notification alerts
- **🌐 Global Crisis Support** - Database of crisis helplines worldwide

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (provided via DATABASE_URL environment variable)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blue-ai-companion
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
DATABASE_URL=your_postgres_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
/apps
  /web
    /src
      /app
        /api              # Backend API routes
          /chat           # AI chat endpoint
          /crisis-detection  # Crisis detection logic
          /get-crisis-resources  # Crisis resource lookup
        layout.jsx        # Root layout
        page.jsx          # Main chat page
      /components
        ChatWindow.jsx    # Main chat interface
```

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with crisis lines and distress signals tables
- **AI**: Integration with AI models for conversation and crisis detection
- **APIs**: Tenor GIF API

## 🔐 Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `APP_URL` - Application URL (auto-set by platform)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For location services (optional)

## 📦 Database Schema

### crisis_lines
Stores global crisis helpline information:
- Country, phone number, service name
- Hours of operation
- Email, website
- Geographic coordinates

### distress_signals
Logs detected crisis situations:
- User information
- Message content
- Risk level assessment
- Associated crisis line
- Email notification status

## 🎨 Interface

Blue features a clean, WhatsApp-inspired interface:
- **Top Left**: Blue logo and online status
- **Top Right**: Notification bell with active indicator
- **Center**: Chat messages area with smooth scrolling
- **Bottom**: Message input with emoji and GIF picker

## 🤝 Contributing

This project is designed to help teenagers in need. When contributing:

1. Keep the interface simple and teen-friendly
2. Maintain crisis detection accuracy
3. Ensure privacy and data protection
4. Test thoroughly before submitting PRs

## 📄 License

This project is built with care to support mental health. Please use responsibly.

## 🆘 Crisis Resources

If you or someone you know is in crisis:
- **USA**: National Suicide Prevention Lifeline: 988
- **UK**: Samaritans: 116 123
- **International**: Find your local crisis line at https://findahelpline.com

## 💙 About Blue

Blue is more than just an AI - it's a supportive companion designed to:
- Listen without judgment
- Provide emotional support
- Connect users with professional help when needed
- Be available 24/7

---

**Note**: Blue is a support tool and does not replace professional mental health services. Always seek professional help for serious concerns.
