import eel

from gpg import GPGEncrypt

import tkinter
import tkinter.filedialog

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
def encryptFile(path, recipient, save_path):
    encryptedData = ''
    with open(path, 'rb') as f:
        encryptedData = str(gpg.encryptFile(f, recipient))

    with open(save_path, 'w') as f:
        f.write(encryptedData)

    return 'Successfully encrypted file'


# Decrypt data from file.
@eel.expose
def decryptFile(path, save_file):
    decryptedData = ''
    with open(path, 'rb') as f:
        decryptedData = str(gpg.decryptFile(f))

    print(decryptedData)

    with open(save_file, 'w') as f:
        f.write(decryptedData)

    return "Successfully decrypted file"


# get file path
@eel.expose
def getFileDialog():
    top = tkinter.Tk()
    path = tkinter.filedialog.askopenfilename()
    top.destroy()
    return path


# Save file dialog
@eel.expose
def saveFileDialog():
    top = tkinter.Tk()
    path = tkinter.filedialog.asksaveasfilename()
    top.destroy()

    return path


# eel initial
eel.init('web')
eel.start('main.html', port=0, size=(900, 500))
