from pqcrypto.sign.ml_dsa_44 import verify


def verify_signature(message, signature, public_key):

    if isinstance(message, str):
        message = message.encode()

    try:
        verify(public_key, message, signature)
        return True
    except Exception:
        return False