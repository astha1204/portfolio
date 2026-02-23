import sqlite3
import json
from datetime import datetime
from typing import List, Dict

DB_PATH = "portfolio.db"


def init_db():
    """Initialize SQLite database with required tables."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_sessions (
            id TEXT PRIMARY KEY,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
            message_count INTEGER DEFAULT 0
        )
    """)
    
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_session_id ON chat_messages(session_id)
    """)
    
    conn.commit()
    conn.close()
    print("Database initialized successfully.")


def save_message(session_id: str, role: str, content: str):
    """Save a chat message to the database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, role, content)
    )
    
    cursor.execute("""
        INSERT INTO chat_sessions (id, message_count) VALUES (?, 1)
        ON CONFLICT(id) DO UPDATE SET 
            last_active = CURRENT_TIMESTAMP,
            message_count = message_count + 1
    """, (session_id,))
    
    conn.commit()
    conn.close()


def get_chat_history(session_id: str, limit: int = 20) -> List[Dict]:
    """Retrieve chat history for a session."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT role, content, timestamp 
        FROM chat_messages 
        WHERE session_id = ? 
        ORDER BY timestamp ASC 
        LIMIT ?
    """, (session_id, limit))
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"role": row["role"], "content": row["content"], "timestamp": row["timestamp"]} for row in rows]


def get_stats() -> Dict:
    """Get overall chat statistics."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM chat_sessions")
    total_sessions = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM chat_messages WHERE role = 'user'")
    total_questions = cursor.fetchone()[0]
    
    cursor.execute("""
        SELECT COUNT(*) FROM chat_messages 
        WHERE timestamp >= datetime('now', '-1 day')
        AND role = 'user'
    """)
    questions_today = cursor.fetchone()[0]
    
    conn.close()
    
    return {
        "total_sessions": total_sessions,
        "total_questions": total_questions,
        "questions_today": questions_today
    }
