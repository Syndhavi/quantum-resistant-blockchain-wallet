from pqcrypto.sign import dilithium2


def generate_dilithium_keys():
    public_key, private_key = dilithium2.generate_keypair()

    return public_key, private_key


if __name__ == "__main__":
    pk, sk = generate_dilithium_keys()

    print("Public Key:", pk[:20])
    print("Private Key:", sk[:20])