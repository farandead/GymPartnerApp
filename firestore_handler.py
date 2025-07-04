import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import uuid

# --- Firebase Initialization ---
# Initialize the app with a service account, granting admin privileges
try:
    cred = credentials.Certificate("gympartner-a30f8-firebase-adminsdk-fbsvc-95cbeb2290.json")
    firebase_admin.initialize_app(cred)
except FileNotFoundError:
    print("Error: The Firebase Admin SDK JSON file was not found.")
    print("Please make sure 'gympartner-a30f8-firebase-adminsdk-fbsvc-95cbeb2290.json' is in the same directory as this script.")
    exit()
except Exception as e:
    print(f"An error occurred during Firebase initialization: {e}")
    exit()


db = firestore.client()

# --- Data Models and Creation Functions ---

def create_user(uid, email, phone_number, name, birthdate, gender, city):
    """Creates a new user document in Firestore."""
    users_ref = db.collection('users')
    user_doc = users_ref.document(uid)

    user_data = {
        "uid": uid,
        "email": email,
        "phoneNumber": phone_number,
        "createdAt": datetime.datetime.now(datetime.timezone.utc),
        "lastSeen": datetime.datetime.now(datetime.timezone.utc),
        "isOnline": True,
        "profile": {
            "name": name,
            "birthdate": birthdate,
            "bio": "",
            "gender": gender,
            "height": None,
            "location": None, # Geopoint can be added later
            "city": city,
            "profileCompletion": 40  # Initial completion
        },
        "photos": [],
        "preferences": {
            "showGender": True,
            "gymMode": "Looking for a partner",
            "preferredPartners": [],
            "workoutGoals": [],
            "interests": []
        },
        "verification": {
            "isVerified": False,
            "emailVerified": False,
            "phoneVerified": False,
            "photoVerified": False
        },
        "settings": {
            "dateMode": True,
            "snoozeMode": False,
            "incognitoMode": False,
            "autoSpotlight": True,
            "videoAutoplay": True,
            "notifications": {
                "newMatch": True,
                "newMessage": True,
                "promotions": False
            }
        }
    }
    user_doc.set(user_data)
    print(f"Successfully created user: {name} ({uid})")
    return user_doc.id

def record_swipe(swiper_id, swiped_id, action):
    """Records a swipe action and checks for a match if the action is a 'like'."""
    if action not in ['like', 'nope']:
        print("Invalid action. Must be 'like' or 'nope'.")
        return

    swipes_ref = db.collection('swipes')
    swipe_doc_id = f"{swiper_id}_{swiped_id}"
    swipe_data = {
        "swiperId": swiper_id,
        "swipedId": swiped_id,
        "action": action,
        "timestamp": datetime.datetime.now(datetime.timezone.utc)
    }
    swipes_ref.document(swipe_doc_id).set(swipe_data)
    print(f"User {swiper_id} swiped '{action}' on {swiped_id}")

    # If it was a "like", check for a mutual like to create a match
    if action == 'like':
        reverse_swipe_doc_id = f"{swiped_id}_{swiper_id}"
        reverse_swipe_doc = swipes_ref.document(reverse_swipe_doc_id).get()

        if reverse_swipe_doc.exists and reverse_swipe_doc.to_dict().get('action') == 'like':
            print(f"Mutual like detected between {swiper_id} and {swiped_id}!")
            create_match(swiper_id, swiped_id)

def create_match(user1_id, user2_id):
    """Creates a match document when a mutual like occurs."""
    matches_ref = db.collection('matches')
    match_data = {
        "userIds": [user1_id, user2_id],
        "matchedAt": datetime.datetime.now(datetime.timezone.utc),
        "lastMessage": None  # Will be updated when a message is sent
    }
    match_doc_ref = matches_ref.add(match_data)
    print(f"Match created with ID: {match_doc_ref[1].id}")
    return match_doc_ref[1].id

def send_message(match_id, sender_id, text):
    """Sends a message in a conversation and updates the lastMessage in the match document."""
    match_doc_ref = db.collection('matches').document(match_id)
    messages_subcollection_ref = match_doc_ref.collection('messages')

    message_data = {
        "senderId": sender_id,
        "text": text,
        "timestamp": datetime.datetime.now(datetime.timezone.utc),
        "type": "text",
        "isRead": False
    }
    messages_subcollection_ref.add(message_data)

    # Update the lastMessage field in the parent match document
    last_message_snapshot = {
        "text": text,
        "senderId": sender_id,
        "timestamp": message_data["timestamp"]
    }
    match_doc_ref.update({"lastMessage": last_message_snapshot})
    print(f"Message sent in match {match_id}: \"{text}\"")

# --- Example Usage ---
if __name__ == '__main__':
    print("--- Setting up demo users ---")
    # Create two users
    user_a_id = "user_a_" + str(uuid.uuid4())[:8]
    user_b_id = "user_b_" + str(uuid.uuid4())[:8]

    create_user(
        uid=user_a_id,
        email="alice@example.com",
        phone_number="+15551112222",
        name="Alice",
        birthdate=datetime.datetime(1995, 10, 20, tzinfo=datetime.timezone.utc),
        gender="Woman",
        city="New York"
    )

    create_user(
        uid=user_b_id,
        email="bob@example.com",
        phone_number="+15553334444",
        name="Bob",
        birthdate=datetime.datetime(1994, 5, 15, tzinfo=datetime.timezone.utc),
        gender="Man",
        city="New York"
    )

    print("\n--- Simulating swipe actions ---")
    # User A likes User B -> No match yet
    record_swipe(user_a_id, user_b_id, 'like')

    # User B likes User A -> This should trigger a match
    record_swipe(user_b_id, user_a_id, 'like')

    print("\n--- Finding the match and starting a conversation ---")
    # To find the match, we query the matches collection
    matches_query = db.collection('matches').where('userIds', 'array_contains', user_a_id).stream()
    
    # In a real app, you'd filter to find the specific match with user_b_id
    # For this demo, we'll assume it's the first one found
    match_document = next(matches_query, None)

    if match_document:
        match_id = match_document.id
        print(f"Found match document with ID: {match_id}")
        
        print("\n--- Simulating a conversation ---")
        send_message(match_id, user_a_id, "Hey! We matched. Great profile!")
        send_message(match_id, user_b_id, "Thanks! You too. Up for a workout this weekend?")
        send_message(match_id, user_a_id, "Absolutely! Saturday morning?")
    else:
        print("Could not find a match document for the users.")
