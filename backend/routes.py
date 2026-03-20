import base64
from flask import request, jsonify

# PQC Modules
from pqc.keygen import generate_pqc_keys
from pqc.sign import sign_message
from pqc.verify import verify_signature

# Blockchain Modules
from blockchain.transaction import create_transaction
from blockchain.balance import get_balance


def register_routes(app):

    # 🔹 Create Wallet
    @app.route('/create-wallet', methods=['POST'])
    def create_wallet():
        public_key, private_key = generate_pqc_keys()

        return jsonify({
            "public_key": base64.b64encode(public_key).decode(),
            "private_key": base64.b64encode(private_key).decode()
        })


    # 🔹 Sign Transaction
    @app.route('/sign-transaction', methods=['POST'])
    def sign_transaction():
        data = request.json

        message = data.get("message")
        private_key = data.get("private_key")

        if not message or not private_key:
            return jsonify({"error": "Missing data"}), 400

        try:
            # ✅ convert to bytes
            private_key_bytes = base64.b64decode(private_key)
            message_bytes = message.encode()

            # ✅ correct function call
            signature = sign_message(message_bytes, private_key_bytes)

            return jsonify({
                "message": message,
                "signature": base64.b64encode(signature).decode()
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500


    # 🔹 Verify Signature
    @app.route('/verify-signature', methods=['POST'])
    def verify():
        data = request.json

        message = data.get("message")
        signature = data.get("signature")
        public_key = data.get("public_key")

        if not message or not signature or not public_key:
            return jsonify({"error": "Missing fields"}), 400

        try:
            # ✅ convert to bytes
            message_bytes = message.encode()
            signature_bytes = base64.b64decode(signature)
            public_key_bytes = base64.b64decode(public_key)

            result = verify_signature(message_bytes, signature_bytes, public_key_bytes)

            return jsonify({"valid": result})

        except Exception as e:
            return jsonify({"error": str(e)}), 500


    # 🔹 Send Transaction
    @app.route('/send-transaction', methods=['POST'])
    def send_tx():
        data = request.json

        sender = data.get("sender")
        receiver = data.get("receiver")
        private_key = data.get("private_key")
        amount = data.get("amount")

        if not sender or not receiver or not private_key or not amount:
            return jsonify({"error": "Missing fields"}), 400

        try:
            tx_hash = create_transaction(
                sender,
                receiver,
                private_key,
                float(amount)
            )

            return jsonify({
                "status": "Transaction Sent",
                "tx_hash": tx_hash
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500


    # 🔹 Check Balance
    @app.route('/balance', methods=['GET'])
    def balance():
        address = request.args.get("address")

        if not address:
            return jsonify({"error": "Address required"}), 400

        try:
            bal = get_balance(address)

            return jsonify({
                "address": address,
                "balance": str(bal)
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500