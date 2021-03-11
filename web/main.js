// list of all pages
const pages = document.getElementsByClassName('page')
const keyInput = document.getElementById('private_key')
const logger = document.getElementById('logger')
const encryptButton = document.getElementById('encryptButton')
const decryptButton = document.getElementById('decryptButton')
const pageButtons = document.getElementsByClassName('menu-button')
const recipients_public_list = document.getElementById('recipients-public-list')

let current_key = ''

//show only specified page
function showPage(name) {


    console.log(pages)

    for (let i=0;i<3;i++){
        if (pageButtons[i].id === `${name}-button`){
            pageButtons[i].classList.add('active')
        }else{
            pageButtons[i].classList.remove('active')
        }
    }


    for (let i=0;i<pages.length;i++){
        console.log(pages[i].id)
        if(pages[i].id === name){
            console.log(pages[i])
            pages[i].style.display = 'flex'
        }else{``
            pages[i].style.display = 'none'
        }
    }
}


async function listPublicKeys(){
    console.log(eel.listPublicKeys())
}


async function generateKey(){

    let name = document.getElementById('name').value
    let password = document.getElementById('password').value


    let status = await eel.generateKey(name, password)();
    console.log(status)

    showPage('dashboard')

    await run()

    addLog('New key is generated')
}

async function saveKey(){
    key = await eel.saveKey()();

    addLog('Private key is saved.')
}

async function loadKey(){
    key = await eel.loadKey()();

    if(keyInput.value !== key){
        keyInput.value = key
        addLog('New private key is loaded, please save it to use.')
    }

}

async function upload(){
    let uploaded = await eel.upload()();
    if(uploaded){
        addLog('File is uploaded for encryption, click encrypt to encrypt.')

        encryptButton.classList.remove('disabled')
    }
}

async function encrypt(event){ event.preventDefault()

    let file_path = document.getElementById('file_path')

    console.log(file_path)
    // let key = document.getElementById('key').value
    //
    // let status = await eel.encryptFile(file_path, key)();
    // console.log(status)
    // if(status){
    //     addLog('File is encrypted successfully')
    // }
}

async function uploadDecrypt(){
    let uploaded = await eel.uploadDecrypted()();
    if(uploaded){
        addLog('File is uploaded for encryption, click encrypt to encrypt.')

        decryptButton.classList.remove('disabled')
    }
}

async function decrypt(){
    let status = await eel.decrypted()();
    if(status){
        addLog('File is decrypted successfully')
        decryptButton.classList.add('disabled')
    }
}


//initial connect with backend
async function run() {

   let public_keys = await eel.listPublicKeys()();


   recipients_public_list.innerText = ''

   public_keys.forEach((recipient) => {
       recipients_public_list.innerHTML += `<tr>
                <th scope="row">${recipient['keyid']}</th>
                <td>${recipient['uids'][0].slice(19, -1)}</td>
                <td>${recipient['fingerprint']}</td>
               <td style="cursor: pointer" onclick="showPage('deleteKey'); current_key='${recipient['fingerprint']}'">x</td> 
            </tr>`;
   })

// <td style="cursor: pointer" onclick="deleteKey('${recipient['fingerprint']}')">x</td>


}

// Delete a key
async function deleteKey(fingerprint, password) {
    let status = await eel.deleteKey(fingerprint, password)()
    console.log(status)

    run()
}

function deleteSubmit(event) { event.preventDefault();
    let password = document.getElementById('confirm_password').value

    showPage('dashboard')

    deleteKey(current_key, password)

    return false;
}


function addLog(msg){
    logger.innerHTML += `<li>${msg}</li>`
}

function addLog(content){
    document.getElementById('notification').style.display = 'block'
    document.getElementById('notification-content').innerText = content

    setTimeout(() => closeNotification(), 5000)
}

function closeNotification(){
    document.getElementById('notification').style.display = 'none'
}

window.onload = () => run()
