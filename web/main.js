// list of all pages
const pages = document.getElementsByClassName('page')
const keyInput = document.getElementById('private_key')
const logger = document.getElementById('logger')
const encryptButton = document.getElementById('encryptButton')
let key = '';


//show only specified page
function showPage(name) {

    if(name === 'dashboard'){

    }

    for (let i=0;i<3;i++){
        if(pages[i].id === name){
            console.log(pages[i])
            pages[i].style.display = 'flex'
        }else{``
            pages[i].style.display = 'none'
        }
    }
}


async function generateKey(){
    key =  await eel.generateKey()();
    keyInput.value = key

    addLog('New private key generated, save it to use.')
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

async function encrypt(){
    let status = await eel.encrypted()();
    console.log(status)
    if(status){
        addLog('File is encrypted successfully')
        encryptButton.classList.add('disabled')
    }
}


//initial connect with backend
async function run() {
    key = await eel.getKey()();
    keyInput.value = key
}

function addLog(msg){
    logger.innerHTML += `<li>${msg}</li>`
}

window.onload = () => run()
