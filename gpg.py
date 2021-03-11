import gnupg


# GPGEncrypt Class
class GPGEncrypt:

    def __init__(self):
        # GPG instance
        self.gpg = gnupg.GPG(gnupghome='keys', gpgbinary='gpg/gpg.exe')

    # Generate a new public key
    def generateKey(self, name, password):

        input_data = self.gpg.gen_key_input(
            name_email=name,
            passphrase=password,
            key_type='RSA',
            key_length=2048
        )

        return str(self.gpg.gen_key(input_data))

    # delete a key
    def deleteKey(self, fingerprint, password):
        secret_key = str(self.gpg.delete_keys(fingerprint, True, passphrase=password))
        return str(self.gpg.delete_keys(fingerprint))

    # List all keys
    def listPublicKeys(self):
        return self.gpg.list_keys()

    # List private keys
    def listPrivateKeys(self):
        return self.gpg.list_keys(True)

    # Encrypt message
    def encrypt(self, data, recipients):
        encrypted_data = self.gpg.encrypt(data, recipients=recipients)
        return encrypted_data

    # Encrypt file
    def encryptFile(self, file, recipients):
        encrypted_data = self.gpg.encrypt_file(file, recipients=recipients)
        return encrypted_data

    # Encrypt message
    def decrypt(self, data):
        decrypted_data = self.gpg.decrypt(data)
        return decrypted_data

    # Decrypt from file
    def decryptFile(self, file):
        return self.gpg.decrypt_file(file)

    # Export Keys
    def exportKeys(self, keyids):
        public_keys = self.gpg.export_keys(keyids=keyids)

    # Return GPG Object
    def getGPGObject(self):
        return self.gpg


