from pqc.keygen import generate_dilithium_keys
from pqc.sign import sign_message
from pqc.verify import verify_signature


pk, sk = generate_dilithium_keys()

message = "Send 10 coins"

signature = sign_message(message, sk)

result = verify_signature(message, signature, pk)

print("Verification:", result)