import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from pqc.keygen import generate_pqc_keys
from pqc.sign import sign_message
from pqc.verify import verify_signature


def test_pqc_crypto():

    public_key, private_key = generate_pqc_keys()

    message = "Send 10 coins"

    signature = sign_message(message, private_key)

    result = verify_signature(message, signature, public_key)

    print("Verification:", result)


if __name__ == "__main__":
    test_pqc_crypto()