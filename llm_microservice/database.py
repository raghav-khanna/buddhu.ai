from pymongo import MongoClient, InsertOne
import datetime
import certifi
import os

ca = certifi.where()

from dotenv import load_dotenv

client = MongoClient(
    os.getenv("MONGODB"),
    tlsCAFile=ca,
)

db = client["echoai"]

# Call collections
journal = db["journal"]
chat_history = db["chatHistory"]


def append_chat_history_data(chatid, username, chat, title=None, date=None):
    print(f"💬 Chat: {chat}")
    print(f"📅 Date: {date}")
    print(f"📝 Title: {title}")
    print(f"🧾 ChatID: {chatid}")
    
    query_filter = {"username": username}

    update = {
        "$push": {f"{chatid}.chat": chat},
        "$set": {}
    }

    if date:
        update["$set"][f"{chatid}.date"] = date
    if title:
        update["$set"][f"{chatid}.title"] = title

    print("🚀 Update Query:", update)

    result = chat_history.update_one(query_filter, update, upsert=True)

    print("✅ Matched:", result.matched_count)
    print("✅ Modified:", result.modified_count)



def get_chat_history(chatid, username):
    response = chat_history.find_one({"username": username}, {f"{chatid}.chat": 1})
    print(response)
    return response.get(chatid)

def append_journal(username, data, metadata=None):
    today = str(datetime.date.today())
    
    query_filter = {
        "username": username,
        "date": today
    }

    update = {
        "$push": {
            "journal": data
        },
        "$setOnInsert": {
            "username": username,
            "date": today
        }
    }

    if metadata:
        update["$set"] = {"metadata": metadata}

    result = journal.update_one(query_filter, update, upsert=True)

    print("✅ Matched:", result.matched_count)
    print("✅ Modified:", result.modified_count)
    return result.acknowledged


if __name__ == "__main__":
    chat = {
        "you": "Describe my day",
        "mirror_you": "Okay, so, reading between the lines of what *we* wrote...\n\nOur day, huh? Well, let's just say it was a tale of two extremes, wasn't it? One moment, we're practically floating on a cloud of love, sunshine, and daisy-infused happiness, feeling like we could conquer the world... and the next, we're drowning in a swamp of bug reports, passive-aggressive comments, and the crushing weight of professional responsibility.\n\nIt's like we experienced both the best and worst versions of ourselves within 24 hours. On one hand, we were a giggling, head-over-heels romantic, utterly captivated by the person we love. On the other hand, we were a stressed-out, overwhelmed professional, feeling like we were failing on every front.\n\nThe whiplash must have been intense! I bet that dreamy day with her felt like a distant memory by the time we were staring at that Slack message at 7:45 PM, right? And honestly, that's the really tough part. How do *we* reconcile those two extremes? How do we hold onto that feeling of joy and connection when the work world is trying to drag us down?\n\nI know, I know, easier said than done. But maybe that's something *we* can unpack a little more. What specifically felt so crushing about the workday? And what made that day with her so incredibly special? Was it just her presence, or was there something else at play?",
    }

    append_chat_history_data("123456", "alex", chat)
    print(get_chat_history("123456", "alex"))
