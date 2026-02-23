from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from pathlib import Path
from dotenv import load_dotenv
from database import init_db, save_message, get_chat_history, get_stats
from resume_context import RESUME_CONTEXT, SYSTEM_PROMPT

# Load .env
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# --- UPDATED MODELS LIST (Removed broken/rate-limited ones) ---
MODELS = [
    "google/gemini-2.0-flash-lite-preview-02-05:free", # Best/Fastest currently
    "meta-llama/llama-3-8b-instruct:free",             # Reliable fallback
    "deepseek/deepseek-r1-distill-llama-70b:free",     # Smart reasoning
]

app = FastAPI(title="Portfolio AI Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str

@app.on_event("startup")
async def startup():
    init_db()

# --- HELPER: DEMO FALLBACK ---
def get_demo_response(message: str) -> str:
    # (Keep your existing get_demo_response function exactly as it is)
    # Just putting a placeholder here to save space in the answer
    msg = message.lower()
    if "contact" in msg: return "You can reach Aastha at asthaarora1204@gmail.com."
    return "Aastha is a Full-Stack Developer with 9.5 CGPA and internships at DRDO & Indian Navy."

# --- MAIN CHAT ENDPOINT ---
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    history = get_chat_history(request.session_id, limit=10)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": request.message})

    print(f"\n>>> USER: {request.message}")

    response_text = None

    if not OPENROUTER_API_KEY:
        print(">>> NO API KEY. Using demo mode.")
        response_text = get_demo_response(request.message)
    else:
        async with httpx.AsyncClient(timeout=40.0) as client:
            for model in MODELS:
                try:
                    print(f">>> TRYING Model: {model}")
                    api_response = await client.post(
                        OPENROUTER_URL,
                        headers={
                            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                            "Content-Type": "application/json",
                            "HTTP-Referer": "http://localhost:3000",
                            "X-Title": "Aastha Portfolio",
                        },
                        json={
                            "model": model,
                            "messages": messages,
                            "temperature": 0.7,
                        },
                    )

                    if api_response.status_code == 200:
                        data = api_response.json()
                        # CRITICAL FIX: Check if content actually exists
                        if "choices" in data and len(data["choices"]) > 0:
                            content = data["choices"][0]["message"].get("content", "")
                            if content and content.strip():
                                response_text = content
                                print(f">>> SUCCESS with {model} ✓")
                                print(f">>> CONTENT PREVIEW: {response_text[:50]}...")
                                break # Exit loop on success
                            else:
                                print(f">>> {model} returned 200 OK but EMPTY content.")
                        else:
                            print(f">>> {model} returned 200 OK but invalid JSON structure.")
                    else:
                        print(f">>> FAILED {model} (Status {api_response.status_code})")
                        # 401 means invalid key, 402 means payment required
                        if api_response.status_code in [401, 402]:
                            print(">>> STOPPING: Authentication or Payment issue.")
                            break

                except Exception as e:
                    print(f">>> EXCEPTION on {model}: {e}")
                    continue

    # Final Fallback
    if not response_text:
        print(">>> ALL MODELS FAILED. Switching to demo fallback.")
        response_text = get_demo_response(request.message)

    save_message(request.session_id, "user", request.message)
    save_message(request.session_id, "assistant", response_text)

    return ChatResponse(response=response_text, session_id=request.session_id)