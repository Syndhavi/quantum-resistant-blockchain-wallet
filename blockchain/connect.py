from web3 import Web3

# 🔹 Ganache Local Blockchain URL
GANACHE_URL = "http://127.0.0.1:7545"

# 🔹 Create Web3 instance
w3 = Web3(Web3.HTTPProvider(GANACHE_URL))


def get_web3():
    return w3


def is_connected():
    return w3.is_connected()


# 🔹 Run test
if __name__ == "__main__":
    if is_connected():
        print("✅ Connected to Ganache Blockchain")
    else:
        print("❌ Connection failed")