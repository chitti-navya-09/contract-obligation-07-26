from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

mock_db = {
    "contracts": [
        {"id": "CTR-2026-001", "vendor": "Acme Corp", "type": "NDA", "status": "Active", "value": "$50,000", "owner": "Jane Doe", "date": "Jul 12, 2026"},
        {"id": "CTR-2026-002", "vendor": "TechFlow Inc", "type": "MSA", "status": "Pending", "value": "$120,000", "owner": "John Smith", "date": "Jul 10, 2026"},
        {"id": "CTR-2026-003", "vendor": "Global Logistics", "type": "SLA", "status": "Active", "value": "$85,000", "owner": "Jane Doe", "date": "Jul 05, 2026"},
        {"id": "CTR-2026-004", "vendor": "CloudSystems", "type": "Vendor", "status": "Expired", "value": "$10,000", "owner": "Alice Wong", "date": "Jun 28, 2026"},
        {"id": "CTR-2026-005", "vendor": "Marketing Pros", "type": "NDA", "status": "Active", "value": "$25,000", "owner": "John Smith", "date": "Jun 15, 2026"}
    ],
    "users": []
}

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    if data and data.get("email") and data.get("password"):
        return jsonify({"token": "mock-jwt-token-12345", "user": {"email": data.get("email")}}), 200
    return jsonify({"detail": "Invalid credentials"}), 400

@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.json
    mock_db["users"].append(data)
    return jsonify({"token": "mock-jwt-token-67890", "message": "User created successfully"}), 201

@app.route("/api/auth/reset-password", methods=["POST"])
def reset_password():
    return jsonify({"message": "If the email exists, a reset link has been sent."}), 200

@app.route("/api/contracts", methods=["GET"])
def get_contracts():
    return jsonify(mock_db["contracts"]), 200

@app.route("/api/contracts", methods=["POST"])
def create_contract():
    data = request.json
    new_contract = data
    new_contract["id"] = f"CTR-2026-00{len(mock_db['contracts']) + 1}"
    new_contract["date"] = datetime.now().strftime("%b %d, %Y")
    mock_db["contracts"].append(new_contract)
    return jsonify(new_contract), 201

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
