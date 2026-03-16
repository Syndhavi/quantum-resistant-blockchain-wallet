from pqcrypto.sign.ml_dsa_44 import sign


def sign_message(message, private_key):

    if isinstance(message, str):
        message = message.encode()

    signature = sign(private_key, message)

    return signature