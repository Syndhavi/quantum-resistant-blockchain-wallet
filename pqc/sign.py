from pqcrypto.sign import dilithium2


def sign_message(message, private_key):
    signature = dilithium2.sign(message.encode(), private_key)

    return signature