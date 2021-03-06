import eel

from tkinter import *
from tkinter import filedialog

from cryptography.fernet import Fernet

key = ''
data = ''


#
#
#
# message = "hello world"
# encoded = message.encode()
#
# f = Fernet(key)
# encrypted = f.encrypt(encoded)
#
# print(encrypted)
#
# f2 = Fernet(key)
# decrypted = f2.decrypt(encrypted)
# print(decrypted.decode())

# get key from file
@eel.expose
def getKey():
    global key
    file = open('key.key', 'rb')
    key = file.read()
    file.close()
    return key.decode()


# generate a new key
@eel.expose
def generateKey():
    global key
    key = Fernet.generate_key()
    return key.decode()


# save current key to file
@eel.expose
def saveKey():
    global key
    print(key)
    file = open('key.key', 'wb')
    file.write(key)
    file.close()


# load a key from specified file
@eel.expose
def loadKey():

    global key

    window = Tk()
    window.iconify()
    filepath = filedialog.askopenfilename()

    try:
        file = open(filepath, 'rb')
        key = file.read()
        file.close()
        window.destroy()
    except FileNotFoundError:
        window.destroy()

    return key.decode()


# upload file to encrypt
@eel.expose
def upload():

    global data

    window = Tk()
    window.iconify()
    filepath = filedialog.askopenfilename()

    try:
        with open(filepath, 'rb') as f:
            data = f.read()
            window.destroy()
            return True
    except FileNotFoundError:
        window.destroy()
        return False


# Encrypt current file
@eel.expose
def encrypted():

    global key
    global data

    fernet = Fernet(key)
    _encrypted = fernet.encrypt(data)

    try:
        window = Tk()
        window.iconify()
        filepath = filedialog.asksaveasfilename()

        if filepath == '':
            window.destroy()
            return False

        with open(filepath + '.encrypted', 'wb') as f:
            f.write(_encrypted)

        window.destroy()
        return True
    except FileNotFoundError:
        window.destroy()
        return False
