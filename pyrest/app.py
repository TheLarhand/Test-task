from flask import Flask, request, jsonify
import time, random

app = Flask(__name__)

users = {
    "aleksei@example.com": {
        "password": "lkJlkn8hj",
        "fullname": "Aleksei K",
        "token": "fb566635a66295da0c8ad3f467c32dcf"
    },
    "test@example.com": {
        "password": "123",
        "fullname": "Test User",
        "token": "testtoken"
    }
}

authors = [
    {"authorId": 1, "name": "Walt Disney"},
    {"authorId": 2, "name": "Mark Twain"},
    {"authorId": 3, "name": "Albert Einstein"}
]

quotes = [
    {"quoteId": 1, "authorId": 1, "quote": "The more you like yourself, the less you are like anyone else, which makes you unique."},
    {"quoteId": 2, "authorId": 1, "quote": "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money."},
    {"quoteId": 3, "authorId": 1, "quote": "I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter."},
    {"quoteId": 4, "authorId": 2, "quote": "The secret of getting ahead is getting started."},
    {"quoteId": 5, "authorId": 2, "quote": "Part of the secret of a success in life is to eat what you like and let the food fight it out inside."},
    {"quoteId": 6, "authorId": 2, "quote": "You can't depend on your eyes when your imagination is out of focus."},
    {"quoteId": 7, "authorId": 3, "quote": "Look deep into nature, and then you will understand everything better."},
    {"quoteId": 8, "authorId": 3, "quote": "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."},
    {"quoteId": 9, "authorId": 3, "quote": "The only source of knowledge is experience."}
]

@app.route('/info', methods=['GET'])
def get_info():
    return jsonify({
        "success": True,
        "data": {
            "info": "Some information about the <b>company</b>."
        }
    })

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"success": False, "data": {"message": "Username and password are required."}}), 400
    email = data['email']
    password = data['password']
    if email in users and users[email]['password'] == password:
        return jsonify({
            "success": True,
            "data": {"token": users[email]['token']}
        })
    return jsonify({"success": False, "data": {"message": "Invalid credentials."}}), 401

@app.route('/profile', methods=['GET'])
def get_profile():
    token = request.args.get('token')
    for email, user in users.items():
        if user['token'] == token:
            return jsonify({
                "success": True,
                "data": {
                    "fullname": user['fullname'],
                    "email": email
                }
            })
    return jsonify({"success": False, "data": {"message": "Access denied."}}), 403

@app.route('/author', methods=['GET'])
def get_author():
    token = request.args.get('token')
    if not token or token not in [user['token'] for user in users.values()]:
        return jsonify({"success": False, "data": {"message": "Access denied."}}), 403
    time.sleep(5)
    author = random.choice(authors)
    return jsonify({
        "success": True,
        "data": author
    })

@app.route('/quote', methods=['GET'])
def get_quote():
    token = request.args.get('token')
    author_id = request.args.get('authorId', type=int)
    if not token or not author_id or token not in [user['token'] for user in users.values()]:
        return jsonify({"success": False, "data": {"message": "Access denied."}}), 403
    time.sleep(5)
    filtered_quotes = [quote for quote in quotes if quote['authorId'] == author_id]
    if filtered_quotes:
        return jsonify({
            "success": True,
            "data": random.choice(filtered_quotes)
        })
    return jsonify({"success": False, "data": {"message": "No quotes found for this author."}})

@app.route('/logout', methods=['DELETE'])
def logout():
    token = request.args.get('token')
    if not token or token not in [user['token'] for user in users.values()]:
        return jsonify({"success": False, "data": {"message": "Access denied."}}), 403
    return jsonify({"success": True, "data": {}})

if __name__ == '__main__':
    app.run(debug=True)