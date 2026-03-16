from pqcrypto.sign import dilithium2


def verify_signature(message, signature, public_key):
    try:
        dilithium2.verify(message.encode(), signature, public_key)
        return True
    except:
        return False