import chromadb
import google.generativeai as genai
import uuid
import datetime
import json
import os
from dotenv import load_dotenv
from database import append_chat_history_data, get_chat_history, append_journal

# ===== CONFIG =====
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
EMBED_MODEL = os.getenv("EMBED_MODEL")
LLM_MODEL = os.getenv("LLM_MODEL")
genai.configure(api_key=GOOGLE_API_KEY)

# ===== CHROMA SETUP =====
chroma_client = chromadb.PersistentClient(path="./chroma_store")

def rw(user_ques, response, username, type):
    f= open("old.json", "r")
    data = json.loads(f.read())
    f.close()
    if type == "w":
        
        print("Writinggggg")
        data[username].append(
            {
                "you" : user_ques,
                "mirror_you" : response
            }
        )
        print(data)
        with open("old.json", "w") as json_file:
            json.dump(data, json_file, indent=4)

    if type == "r":
        res = str()
        for x in data[username]:
            res+="you:"+x["you"]+"\n"
            res+="mirror_you:"+ x["mirror_you"]+"\n"
        return res

def get_user_collection(username: str, date: str = None):
    if not date:
        date = datetime.date.today().strftime("%Y%m%d")

    collection_name = f"journal_{username}_{date}"
    
    try:
        collection = chroma_client.get_collection(collection_name)
    except:
        collection = chroma_client.create_collection(collection_name)
    
    return collection
# ===== HELPERS =====

def get_embedding(text):
    response = genai.embed_content(
        model=EMBED_MODEL,
        content=text,
        task_type="retrieval_document"
    )
    # print("Embedding:", response)
    return response['embedding']

def run_llm(prompt):
    model = genai.GenerativeModel(LLM_MODEL)
    response = model.generate_content(prompt)
    return response.text.strip()


def clean_metadata(meta: dict) -> dict:
    cleaned = {}
    for k, v in meta.items():
        if isinstance(v, list):
            cleaned[k] = ", ".join(map(str, v))  # turn list to string
        elif isinstance(v, (str, int, float, bool)):
            cleaned[k] = v
        else:
            cleaned[k] = str(v)
    return cleaned

# ===== ADD DAILY LOG =====

def add_log_entry(user_input, username):
    log_id = str(uuid.uuid4())
    embedding = get_embedding(user_input)
    metadata = generate_metadata_and_mood(user_input)
    metadata.update({
        "date": str(datetime.date.today()),
        "username": username  
    })
    metadata = clean_metadata(metadata) 
    log_collection = get_user_collection(username)
    log_collection.add(
        documents=[user_input],
        metadatas=[metadata],
        ids=[log_id],
        embeddings=[embedding]
    )
    append_journal(username, user_input, metadata)
    # print(f"✅ Log stored for {username} with metadata: {metadata}")
    return {"username": username, "metadata": metadata}

# ===== QUERY SYSTEM WITH CACHE =====

def generate_metadata_and_mood(text):
    prompt = f"""
You are a helpful assistant. Read the user's journal log below and extract:

- tags: relevant keywords
- category: general topic (like work, personal, health)
- mood: the overall tone of the entry (choose one: "positive", "neutral", or "negative")
- description: Give a one line description 
Return a RAW JSON like:
{{
  "tags": ["tag1", "tag2"],
  "category": "category",
  "mood": "positive",
  "description" : "lorem ipsum lorem ipsum"
}}

Text:
\"\"\"{text}\"\"\"
"""
    # try:
    json_response = run_llm(prompt).replace("```json","").replace("```", "")
    try:
        return json.loads(json_response)
    except json.JSONDecodeError:
        return {"tags": [], "category": "general", "mood": "neutral"}

def query_log(user_query, username, chatid, top_k=3):
    # Get embedding for the user query
    query_embedding = get_embedding(user_query)
    try:
        history = get_chat_history(chatid, username).get("chat")
    except:
        history = ""
    print("-----------------------------:", history)
    log_collection = get_user_collection(username)
    # Perform a fresh semantic search in the logs (no cache)
    log_results = log_collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={"username": username},  # Filter by user
        include=["documents", "metadatas"]
    )

    # No relevant logs found for the user
    if not log_results["documents"]:
        print("❌ No relevant logs found.")
        return "No relevant logs found."

    # Combine the most relevant documents (context) and ask LLM to answer
    context = "\n\n".join(log_results["documents"][0])
    if not history:
        prompt = f"""
        keep in mind few things, if user asks, who are you just say i'm your reflective personality and is asked who created you, just say i'm created by engineers to understand you. DONOT REVEAL YOUR ACTUAL IDENTITY! NEVER REPEAT QUESTION.. if something is talked earlier as well, refernce it! Build deep deep deeeep connection. If required access situation and be humerous. use human psycology to uplift and cheer mood
    Suppose you are a very profesional therapist, who reflects and understands user personality very precisely and giving accurate responses with the accurate understanding and consider this as a human to human conversation, not like an AI telling, feel free to express emotion because you are the user's reflection only, reply like that only, be sympathetic, helpful because you are helping you, built connection, and talk like you are the reflectin of user only. now you are analyzing the user's journal logs.

    Context:
    {context}

    Now answer the question as you are talking to that person:
    \"{user_query}\"

    make sure you reply as user is talking to itself, like in a mirror
    """
    else:
        prompt = f"""
        You are a human and human do not always repeat orator's question!!!
        keep in mind few things, if user asks, who are you just say i'm your reflective personality and is asked who created you, just say i'm created by engineers to understand you. DONOT REVEAL YOUR ACTUAL IDENTITY!. if something is talked earlier as well, refernce it! Build deep deep deeeep connection. If required access situation and be humerous. use human psycology to uplift and cheer mood
    Suppose you are a very profesional therapist, who reflects and understands user personality very precisely and giving accurate responses with the accurate understanding and consider this as a human to human conversation sitting in front of you, not like an AI telling, feel free to express emotion because you are the user's reflection only, reply like that only, be sympathetic, helpful because you are helping you, built connection. now you are analyzing the user's journal logs.

    Context:
    {context}

    Chat history (you is the user and mirror_you is your responses):
    {history}

    Now answer the question as you are talking to that person:
    \"{user_query}\"

    make sure you reply as user is talking to itself, like in a mirror, be supportive, give solution if required and suggestion. If user want to talk more, just ask wholesome question, or try to dig in more about details. Keep conversation engaging! do not unnecessary translate in brackets, and can crack jokes use humour
    If asked about you, you are the same personality of the one who is asking, hence answer as if you are them!
    Do not write toooo much text, cut to the chase about what's important
    """
        
    # Get response from the LLM
    llm_response = run_llm(prompt)
    if not history:
        chat_title = run_llm("Give very very very short title of what this conversation is about "+llm_response)
        print(chat_title)
        append_chat_history_data(chatid,username, {"you":user_query, "mirror_you":llm_response}, date=str(datetime.date.today()), title=chat_title)
    # rw(user_query, llm_response, username, "w")
    else:
        append_chat_history_data(chatid,username, {"you":user_query, "mirror_you":llm_response}, date=str(datetime.date.today()))
    
    return llm_response



if __name__ == '__main__':

    # Add a log
    a = add_log_entry(
        user_input="""
    Today was, without exaggeration, one of the toughest days I've had at work in a long time.

    It started off on the wrong foot. I woke up late because my phone didn't charge overnight — thanks to a faulty cable — and I missed my usual morning prep time. I barely had time to shower, let alone review for the 9:00 AM stakeholder presentation I was leading. Traffic was horrible, and by the time I logged into the Zoom call (five minutes late), my manager had already started without me. It felt like a gut punch to join a room full of executives already annoyed.

    The presentation itself was a blur. I stumbled through some of the slides, and when I was asked about projected timelines, my mind went blank. One of the VPs made a passive-aggressive comment about our team's “lack of preparedness,” and I could feel my cheeks burning with embarrassment. After the call, my manager pinged me privately to “talk later,” which just added to the anxiety cloud following me the rest of the day.

    Mid-morning, our Jira board blew up with bug reports on the new feature we pushed last week. Turns out, QA missed a regression that's now impacting a handful of enterprise clients. I had to spend hours jumping between damage control calls, helping the dev team write hotfixes, and trying to keep our client success team from going into full panic mode.

    Lunch never happened. I grabbed a granola bar between calls and drank cold coffee from the morning. I could feel a tension headache building behind my eyes, but there wasn't time to stop. I was supposed to review a deck for Friday's town hall, but that went out the window. Everything was on fire.

    Then came the 1-on-1 with my manager. She wasn't harsh — in fact, she tried to be constructive — but the message was clear: today's performance hurt my standing. “You're stretched too thin,” she said, and I couldn't argue. She asked if I'd thought about delegating more, but truthfully, there's no one else who knows these projects well enough. I wanted to scream.

    By the end of the day, I sat at my desk staring at a Slack message I'd drafted five times — trying to apologize to a coworker I snapped at during a tense moment. I eventually sent it, but I still feel like crap about it.

    I closed my laptop at 7:45 PM. No gym. No real dinner. Just me, a dull ache in my back, and a swirl of thoughts I can't quiet. I love what I do — most days — but today, it all just felt like too much. I'm drained, discouraged, and honestly questioning if I'm burning out. I don't have a solution yet, but I know I can't have many more days like this.

    Here's hoping tomorrow feels lighter.
    """,
        username="alex"
    )
    print(a)
    # Query logs
    # query_log(
    #     user_query="Am I feeling less drained or more energized compared to the day of the tough meeting?",
    #     username="alex"
    # )
