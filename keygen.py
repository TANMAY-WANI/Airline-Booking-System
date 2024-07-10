import secrets

def generate_jwt_secret_key(length=32):
    secret_key = secrets.token_hex(length)
    return secret_key

# Example usage
jwt_secret_key = generate_jwt_secret_key()

import os
os.chdir('Backend')
with open(".env",'a+') as file:
    file.write("\nJWT_SECRET=\""+jwt_secret_key+"\"")


