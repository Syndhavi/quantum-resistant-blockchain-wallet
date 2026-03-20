from web3 import Web3

INFURA_URL = "https://sepolia.infura.io/v3/4c18ce04642142589a36df4048c97ff0"

w3 = Web3(Web3.HTTPProvider(INFURA_URL))


def get_web3():
    return w3


def is_connected():
    return w3.is_connected()


if __name__ == "__main__":
    if is_connected():
        print("Connected to Ethereum Sepolia Testnet")
    else:
        print("Connection failed")