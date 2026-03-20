from web3 import Web3
from connect import get_web3

w3 = get_web3()


def create_transaction(sender, receiver, private_key, amount_eth):

    nonce = w3.eth.get_transaction_count(sender)
    gas_estimate = w3.eth.estimate_gas({
    "from": sender,
    "to": receiver,
    "value": w3.to_wei(amount, "ether")
})
    tx = {
        "nonce": nonce,
        "to": receiver,
        "value": w3.to_wei(amount_eth, "ether"),
        "gas": gas_estimate,
        "gasPrice": w3.to_wei("20", "gwei"),
        "chainId": 11155111  # Sepolia
    }
   
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)

    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    return tx_hash.hex()


if __name__ == "__main__":

    
   
    private_key = input("Sender Private Key: ")

    account = w3.eth.account.from_key(private_key)
    sender = account.address

    print("Sender Address:", sender)
    receiver = input("Receiver Address: ")
    amount = float(input("Amount ETH: "))

    tx_hash = create_transaction(sender, receiver, private_key, amount)

    print("Transaction sent!")
    print("Transaction Hash:", tx_hash)