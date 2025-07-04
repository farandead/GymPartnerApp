from firebase_functions import https_fn, options, firestore_fn
from firebase_admin import initialize_app, firestore
from firebase_functions.firestore_fn import Event, Change

initialize_app()
options.set_global_options(region=options.SupportedRegion.EUROPE_WEST1)

@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

# ---------------------------------------------------------------------------
# Authentication Triggers
# ---------------------------------------------------------------------------

# @auth_fn.on_user_created()
# def on_user_create(event: auth_fn.AuthUserRecord) -> None:
#     """
#     Triggered when a new user account is created.
#     Use this to create a corresponding user profile document in Firestore.
#     """
#     # db = firestore.client()
#     # user_id = event.uid
#     # user_email = event.email
#     # db.collection("users").document(user_id).set({
#     #     "email": user_email,
#     #     "createdAt": firestore.SERVER_TIMESTAMP,
#     #     # Add other initial profile fields here
#     # })
#     pass

# @auth_fn.on_user_deleted()
# def on_user_delete(event: auth_fn.AuthUserRecord) -> None:
#     """
#     Triggered when a user account is deleted.
#     Use this to clean up user data from Firestore and other services.
#     """
#     # db = firestore.client()
#     # user_id = event.uid
#     # # Delete user's profile
#     # db.collection("users").document(user_id).delete()
#     # # Add cleanup logic for other user data (swipes, matches, etc.)
#     pass

# ---------------------------------------------------------------------------
# Firestore Triggers for Core App Logic
# ---------------------------------------------------------------------------

@firestore_fn.on_document_created("swipes/{swipeId}")
def createMatchOnLike(event: Event[Change]) -> None:
    """
    Triggered when a new swipe is recorded.
    If the swipe is a 'like' and the other user has also liked back, create a match.
    """
    db = firestore.client()
    swipe_data = event.data.to_dict()
    swiper_id, swiped_id = event.params["swipeId"].split("_")

    if swipe_data.get("type") == "like":
        other_swipe_ref = db.collection("swipes").document(f"{swiped_id}_{swiper_id}")
        other_swipe_doc = other_swipe_ref.get()

        if other_swipe_doc.exists and other_swipe_doc.to_dict().get("type") == "like":
            match_id = "_".join(sorted([swiper_id, swiped_id]))
            db.collection("matches").document(match_id).set({
                "userIds": [swiper_id, swiped_id],
                "createdAt": firestore.SERVER_TIMESTAMP,
                "lastMessage": "",
                "lastMessageTimestamp": None
            })
            # TODO: Send a push notification to both users about the new match.

@firestore_fn.on_document_created("matches/{matchId}/messages/{messageId}")
def updateLastMessageOnNewMessage(event: Event[Change]) -> None:
    """
    Triggered when a new message is sent in a match.
    Updates the 'lastMessage' and 'lastMessageTimestamp' on the match document.
    """
    db = firestore.client()
    message_data = event.data.to_dict()
    match_id = event.params["matchId"]

    db.collection("matches").document(match_id).update({
        "lastMessage": message_data.get("text"),
        "lastMessageTimestamp": message_data.get("createdAt")
    })
    # TODO: Send a push notification to the recipient.

# @firestore_fn.on_document_updated("users/{userId}")
# def on_profile_update(event: Event[Change]) -> None:
#     """
#     Triggered when a user's profile is updated.
#     Use this to update denormalized data in other collections,
#     or to re-evaluate recommendations.
#     """
#     # before_data = event.data.before.to_dict()
#     # after_data = event.data.after.to_dict()
#     # if before_data.get("profileImageUrl") != after_data.get("profileImageUrl"):
#     #     # Logic to update the image URL in matches, etc.
#     pass

# ---------------------------------------------------------------------------
# Callable and HTTP Functions for Client-side Actions
# ---------------------------------------------------------------------------

# @https_fn.on_call()
# def report_user(data, context: https_fn.CallableContext):
#     """
#     Allows a user to report another user or a specific message.
#     Logs the report for moderation.
#     """
#     # reporting_user_id = context.auth.uid
#     # reported_user_id = data.get("reportedUserId")
#     # reason = data.get("reason")
#     # # Add logic to create a 'reports' document in Firestore.
#     return {"status": "success", "message": "Report submitted."}

# ---------------------------------------------------------------------------
# Scheduled Functions for Maintenance and Periodic Tasks
# ---------------------------------------------------------------------------

# @scheduler_fn.on_schedule(schedule="every 24 hours")
# def cleanup_old_swipes(event: scheduler_fn.ScheduledEvent) -> None:
#     """
#     Runs daily to delete old swipe documents that didn't result in a match
#     to keep the database clean.
#     """
#     # db = firestore.client()
#     # one_week_ago = datetime.now() - timedelta(days=7)
#     # old_swipes_query = db.collection("swipes").where("timestamp", "<", one_week_ago)
#     # for doc in old_swipes_query.stream():
#     #     doc.reference.delete()
#     pass

# @scheduler_fn.on_schedule(schedule="every 6 hours")
# def generate_recommendations(event: scheduler_fn.ScheduledEvent) -> None:
#     """
#     Periodically generates new recommendations for users based on their
#     preferences and location.
#     """
#     # This would contain complex logic to query users, apply matching
#     # algorithms, and write recommendations to a 'recommendations' subcollection
#     # for each user.
#     pass



