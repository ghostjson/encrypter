// list of all pages
const pages = document.getElementsByClassName('page')
const keyInput = document.getElementById('private_key')
const encryptButton = document.getElementById('encryptButton')
const decryptButton = document.getElementById('decryptButton')
const pageButtons = document.getElementsByClassName('menu-button')
const recipients_public_list = document.getElementById('recipients-public-list')
const key_container = document.getElementById('key')

let current_key = ''

//show only specified page
function showPage(name) {


    console.log(pages)

    for (let i = 0; i < 3; i++) {
        if (pageButtons[i].id === `${name}-button`) {
            pageButtons[i].classList.add('active')
        } else {
            pageButtons[i].classList.remove('active')
        }
    }


    for (let i = 0; i < pages.length; i++) {
        console.log(pages[i].id)
        if (pages[i].id === name) {
            console.log(pages[i])
            pages[i].style.display = 'flex'
        } else {
            ``
            pages[i].style.display = 'none'
        }
    }
}

// list all keys
async function listPublicKeys() {
    console.log(eel.listPublicKeys())
}

// generate a new key
async function generateKey() {

    let name = document.getElementById('name').value
    let password = document.getElementById('password').value


    let status = await eel.generateKey(name, password)();
    console.log(status)

    showPage('dashboard')

    await run()

    addLog('New key is generated')
}


// encrypt file
async function encrypt(event) {
    event.preventDefault()

    let file_path = document.getElementById('file_path').value
    let save_file_path = document.getElementById('save_file_path').value
    let key = document.getElementById('key').value

    let status = await eel.encryptFile(file_path, key, save_file_path)();
    addLog(status)
}


// decrypt file function
async function decrypt(event) {
    event.preventDefault()

    let file_path = document.getElementById('file_path_decrypt').value
    let save_file_path = document.getElementById('save_file_path_decrypt').value
    let status = await eel.decryptFile(file_path, save_file_path)();


    addLog(status)
}


//initial connect with backend
async function run() {

    // fetch keys
    let public_keys = await eel.listPublicKeys()();

    // add data to keys table in dashboard
    recipients_public_list.innerText = ''

    // add fingerprints to encrypt page
    key_container.innerHTML = ''

    public_keys.forEach((recipient) => {

        recipients_public_list.innerHTML += `<tr>
                <th scope="row">${recipient['keyid']}</th>
                <td>${recipient['uids'][0].slice(19, -1)}</td>
                <td>${recipient['fingerprint']}</td>
               <td style="cursor: pointer" onclick="showPage('deleteKey'); current_key='${recipient['fingerprint']}'">x</td> 
            </tr>`;

        key_container.innerHTML += `
            <option value="${recipient['fingerprint']}">${recipient['uids'][0].slice(19, -1)} - ${recipient['fingerprint']}</option>
        `;
    })


}

// Delete a key
async function deleteKey(fingerprint, password) {
    let status = await eel.deleteKey(fingerprint, password)()
    console.log(status)


    run()
}

// delete submit function
function deleteSubmit(event) {
    event.preventDefault();
    let password = document.getElementById('confirm_password').value

    showPage('dashboard')

    deleteKey(current_key, password)

    return false;
}

// add notification
function addLog(content) {
    document.getElementById('notification').style.display = 'block'
    document.getElementById('notification-content').innerText = content

    setTimeout(() => closeNotification(), 5000)
}

// close notification
function closeNotification() {
    document.getElementById('notification').style.display = 'none'
}

// select file
async function selectFile() {
    return await eel.getFileDialog()()
}

function openFileAt(id) {
    selectFile().then(path => {
        document.getElementById(id).value = path
    })
}

async function saveFile() {
    let path = await eel.saveFileDialog()()
    return path
}

function saveFileAt(id) {
    saveFile().then(path => {
        document.getElementById(id).value = path
    })
}

window.onload = () => run()
