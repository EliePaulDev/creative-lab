from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_ollama.llms import OllamaLLM
from langchain_core.messages import HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Message(BaseModel):
    role: Literal["human", "ai"]
    content: str

class ChatRequest(BaseModel):
    question: str
    history: List[Message] = []

llm = OllamaLLM(model="llama3.2")

@app.post("/")
def chat(chatRequest: ChatRequest):
    model = chat_context.model
    chat_history_messages = []

    for msg in chatRequest.history:
        chat_history_messages.append((msg.role, msg.content))

    messages = [
        ("system", "You are a helpful assistant, answer the user's questions."),
        MessagesPlaceholder(variable_name="history"),
        ("human", "Question: {question}")
    ]

    prompt_template = ChatPromptTemplate.from_messages(messages)

    prompt_context = {
        "documentation": RunnableLambda(func=retrieve_documentation),
        "question": RunnablePassThrough(),
        "history": lambda _: chat_history_messages
    }

    trim_history = trim_messages(
        token_counter=llm,
        max_tokens=4000,
        strategy="last",
        include_system=True
    )

    chain = context | prompt_template | llm | trim_history | llm

    return StreamingResponse(
        content=chain.stream({"question": chatRequest.question}),
        media_type="text/plain"
    )