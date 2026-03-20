from flask import request, jsonify

# Import YOUR TEAM modules
from pqc.keygen import generate_keys
from pqc.sign import sign_data
from blockchain.transaction import send_transaction
from blockchain.balance import get_balance


def register_routes(app):

    @app.route('/create-wallet', methods=['POST'])
    def create_wallet():
        public_key, private_key = generate_keys()

        return jsonify({
            "public_key": public_key,
            "private_key": private_key
        })


    @app.route('/sign-transaction', methods=['POST'])
    def sign_transaction():
        data = request.json

        message = data["message"]
        private_key = data["private_key"]

        signature = sign_data(message, private_key)

        return jsonify({
            "signature": signature
        })


    @app.route('/send-transaction', methods=['POST'])
    def send_tx():
        data = request.json

        sender = data["sender"]
        receiver = data["receiver"]
        amount = data["amount"]

        tx_hash = send_transaction(sender, receiver, amount)

        return jsonify({
            "tx_hash": tx_hash
        })


    @app.route('/balance', methods=['GET'])
    def balance():
        address = request.args.get("address")

        bal = get_balance(address)

        return jsonify({
            "balance": bal
        })