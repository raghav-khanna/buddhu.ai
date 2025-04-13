from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
from chromallm import add_log_entry, query_log
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Journal API", version="1.0")

origins = [
    "*",  # React dev server
    # Add production domain if needed, e.g. "https://yourfrontend.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # allow specific origins
    allow_credentials=True,
    allow_methods=["*"],            # allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],            # allow all headers
)

# Pydantic models for request validation
class JournalEntryRequest(BaseModel):
    username: str
    text: str

class JournalQueryRequest(BaseModel):
    username: str
    query: str
    chatid: str

@app.post("/journal/entry")
def add_journal_entry(entry: JournalEntryRequest) -> Dict:
    response = add_log_entry(entry.text, entry.username)
    return response


@app.post("/journal/query")
def query_journal_insights(query: JournalQueryRequest):
    response = query_log(query.query, query.username, query.chatid)
    return response


# Run the app with:
# uvicorn main:app --host 0.0.0.0 --port 54321
