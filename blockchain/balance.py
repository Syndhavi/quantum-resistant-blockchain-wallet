from web3 import Web3
from connect import get_web3

w3 = get_web3()


def get_balance(address):
    balance_wei = w3.eth.get_balance(address)

    balance_eth = w3.from_wei(balance_wei, 'ether')

    return balance_eth


if __name__ == "__main__":
    wallet = input("Enter wallet address: ")

    balance = get_balance(wallet)

    print("Wallet Balance:", balance, "ETH")