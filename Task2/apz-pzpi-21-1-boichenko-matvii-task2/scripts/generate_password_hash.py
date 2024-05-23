import sys

from fastapi_users.password import PasswordHelper

if len(sys.argv) != 2:
    raise ValueError("Pass a password value to the script")

helper = PasswordHelper()
hash = helper.hash(sys.argv[1])
print("Hash:", hash)

inpt = input("Re-enter pwd to check:")
print("Res:", helper.verify_and_update(inpt, hash))
