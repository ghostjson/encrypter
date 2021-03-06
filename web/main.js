// list of all pages
const pages = document.getElementsByClassName('page')
const keyInput = document.getElementById('private_key')
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
}

async function saveKey(){
    key = await eel.saveKey()();
}

async function loadKey(){
    key = await eel.loadKey()();
    keyInput.value = key
}


//initial connect with backend
async function run() {
    key = await eel.getKey()();
    keyInput.value = key
}


window.onload = () => run()
