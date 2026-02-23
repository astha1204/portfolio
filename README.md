# 🚀 Portfolio × AI Chat

A professional developer portfolio with an embedded AI chat assistant that answers questions about the resume in real time.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Backend | Python 3.11 + FastAPI |
| Database | SQLite (via Python stdlib) |
| Chat Engine | OpenRouter API (Mistral 7B free) |
| Styling | Custom CSS with CSS variables |
| Hosting | Cloudflare Tunnel (optional) |

---

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── main.py              # FastAPI app + chat endpoint
│   ├── database.py          # SQLite session & message storage
│   ├── resume_context.py    # Resume data + system prompt for AI
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Nav.tsx / Nav.css
│   │   ├── Hero.tsx / Hero.css
│   │   ├── Skills.tsx / Skills.css
│   │   ├── Experience.tsx / Experience.css
│   │   ├── Projects.tsx / Projects.css
│   │   ├── Chat.tsx / Chat.css        ← AI Chat feature
│   │   ├── Footer.tsx / Footer.css
│   │   ├── api.ts                     ← API service layer
│   │   ├── data.ts                    ← Portfolio content
│   │   └── types.ts
│   ├── public/index.html
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md
```

---

## 🛠 Local Setup

### 1. Backend

```bash
cd backend

# Copy env file
cp .env.example .env
# Edit .env and add your OpenRouter API key

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm start
```

The app will open at `http://localhost:3000`

---

## 🔑 Getting an OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Create a free account
3. Navigate to **API Keys** → **Create Key**
4. Copy the key to `backend/.env`

The app uses `mistralai/mistral-7b-instruct:free` — completely free with rate limits suitable for a portfolio.

> **Note:** The app also has a built-in demo mode that works without an API key for testing.

---

## 🐳 Docker Compose

```bash
# Build and run everything
docker-compose up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## 🌐 Publishing with Cloudflare Tunnel

```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared   # macOS
# or: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Build frontend
cd frontend && npm run build

# Serve frontend
npx serve -s build -p 3000 &

# Start backend
cd backend && uvicorn main:app --port 8000 &

# Create public tunnels
cloudflared tunnel --url http://localhost:3000   # share this URL for frontend
cloudflared tunnel --url http://localhost:8000   # set as REACT_APP_API_URL
```

Set the backend tunnel URL as:
```
REACT_APP_API_URL=https://your-backend-tunnel.trycloudflare.com
```

---

## 🔧 Customizing the Portfolio

### Update Resume Content
Edit `backend/resume_context.py` — change the `RESUME_CONTEXT` string with your actual resume data. The AI will automatically use it.

### Update Portfolio Data
Edit `frontend/src/data.ts` — update `SKILL_CATEGORIES`, `PROJECTS`, `EXPERIENCES`.

### Update Personal Info
Edit `frontend/src/Hero.tsx` and `frontend/src/Chat.tsx` for name/contact info.

---

## 🏗 Architecture

```
Browser ←→ React (TSX)
              ↓ fetch()
           FastAPI (Python)
              ├── SQLite — stores chat sessions & messages
              └── OpenRouter API → Mistral 7B
                    └── System prompt includes full resume
```

The AI has the full resume injected as a system prompt, so it answers accurately about experience, skills, and contact information. Chat history per session is stored in SQLite for context continuity.

---

## 📊 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | API status |
| POST | `/api/chat` | Send message, get AI response |
| GET | `/api/stats` | Chat usage statistics |
| GET | `/api/resume` | Raw resume data |
| GET | `/docs` | Swagger UI |

---

## License

MIT
