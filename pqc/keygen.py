from pqcrypto.sign.ml_dsa_44 import generate_keypair


def generate_pqc_keys():
    public_key, private_key = generate_keypair()
    return public_key, private_key


if __name__ == "__main__":
    pk, sk = generate_pqc_keys()

    print("Public Key:", pk[:20])
    print("Private Key:", sk[:20])