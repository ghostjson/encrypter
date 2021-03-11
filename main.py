import eel

from gpg import GPGEncrypt

# interface

gpg = GPGEncrypt()


# List public keys
@eel.expose
def listPublicKeys():
    return gpg.listPublicKeys()


# List private keys
@eel.expose
def listPrivateKeys():
    return gpg.listPrivateKeys()


# Delete public keys
@eel.expose
def deleteKey(fingerprint, password):
    return gpg.deleteKey(fingerprint, password)


# Generate key
@eel.expose
def generateKey(name, password):
    return gpg.generateKey(name, password)


# Encrypt File
@eel.expose
def encryptFile(path, recipient):
    with open(path, 'rb') as f:
        return str(gpg.encryptFile(f, recipient))


@eel.expose
def getFileDialog():



# eel initial
eel.init('web')
eel.start('main.html', port=0, size=(900, 500))
