from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
import openai
import os
from dotenv import load_dotenv
import json

load_dotenv(override=True)

app = FastAPI(
    title="My Fullstack App API",
    description="This is a simple API for the fullstack app example.",
    version="0.1.0",
)
openai.api_key = os.getenv("OPENAI_API_KEY")

app.mount("/docs", StaticFiles(directory="docs"), name="docs")

@app.get("/api/message")
async def read_main():
    return {"message": "Hello World"}

@app.get("/api/gpt")
async def ask_gpt(question: str = Query(..., title="The question to ask GPT"), history: str = Query("[]", title="The conversation history")):
    try:
        history_list = json.loads(history)
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
        ]
        messages.extend(history_list)
        messages.append({"role": "user", "content": question})

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # Or another available model
            messages=messages,
            max_tokens=150
        )
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/summarize")
async def summarize_conversation(conversation: str = Query(..., title="The conversation history to summarize")):
    try:
        conversation_list = json.loads(conversation)
        messages = [
            {"role": "system", "content": "Summarize the following conversation in less than 50 words."},
            {"role": "user", "content": str(conversation_list)}
        ]
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=100
        )
        return {"summary": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
