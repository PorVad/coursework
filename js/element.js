function buildElement(id, el) {                               
    const element = document.createElement('div');
    element.classList.add('element');
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-content">
        <div class="element-name">${el.name}</div>
        <img src="img/${el.image}" class="element-img">
        <p class="element-text">Кількість кадрів на секунду: <span class="element-fps"><b>${el.fps}</b></span></p> 
        <p class="element-text">Розширення відео: <span class="element-video"><b>${el.video}</b></span></p> 
    </div>
    <div class="element-footer">
        <button class="blue-btn" onclick="modalInEdit(${id})">Редагувати</button><span> </span>
        <button class="red-btn" onclick="removeElementFromLocalStorage(${id})">Видалити</button>
    </div>
    <p></p>
    `);
    document.getElementsByClassName("displayzone")[0].appendChild(element);
}

function modalInCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Створити нову камеру";
    document.getElementById("modal-btn").setAttribute("onclick", `addElementToLocalStorage()`);
    document.getElementById("modal-btn").innerText = "Створити";
    document.getElementById("name").value = '';   
    document.getElementById("fps").value = '';   
    document.getElementById("video").value = ''; 
    document.getElementById("img-prev-section").setAttribute("style", "display: none");
    document.getElementById("select-img").innerText = "Виберіть зображення";
    
    modal.open();
}

function modalInEdit(id) {
    let edElem = JSON.parse(localStorage.getItem(id));

    document.getElementsByClassName("modal-title")[0].innerText = "Редагувати";
    document.getElementById("modal-btn").innerText = "Змінити";
    document.getElementById("modal-btn").setAttribute("onclick", `editElementInLocalStorage(${id})`);

    document.getElementById("name").value = edElem.name;   
    document.getElementById("fps").value = edElem.fps;   
    document.getElementById("video").value = edElem.video;   
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.image}`);
    document.getElementById("select-img").innerText = "Ви можете вибрати нове зображення";
    document.getElementById("img-prev-section").setAttribute("style", "display: block");
    
    modal.open();
}

function showLessImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, '');
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`);
    document.getElementById("select-img").innerText = "Ви можете вибрати нове зображення";
    document.getElementById("img-prev-section").setAttribute("style", "display: block");
}
document.getElementById("imgfile").addEventListener("change", showLessImg);

function validation(){
    let valid = true;
    let showMsg = '';
    let formName = document.getElementById("name").value.trim();
    let formFPS = document.getElementById("fps").value.trim();
    
    if (!formName) {
        showMsg = 'Field is empty. INPUT NAME . '
        valid = false;
    }  
    
    if (!formFPS) {
        showMsg = showMsg + 'Field is empty. INPUT the FPS. '
        valid = false;
    }
    
    if (valid) {
        return valid
    } else {
        alert (showMsg)
    }
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("The image was not selected. SELECT an IMAGE. ")
        return false;
    }
}

function addElementToLocalStorage(){
    if (validation() && validImg()) {
        let keyArr = [];

        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }

        const freeKey = Math.max(...keyArr) + 1;
        const newEl = {}; 

        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, '');

        newEl.name =  document.getElementById("name").value;   
        newEl.fps = document.getElementById("fps").value;   
        newEl.video = document.getElementById("video").value;   
        newEl.image = filename;   
        let rowSt = JSON.stringify(newEl)

        localStorage.setItem(`${freeKey}`, rowSt)

        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
function editElementInLocalStorage(id) {
    if (validation()) {
        let edElem = JSON.parse(localStorage.getItem(id))

        edElem.name =  document.getElementById("name").value;   
        edElem.fps = document.getElementById("fps").value;   
        edElem.video = document.getElementById("video").value;

        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, '');

            edElem.image = filename; 
        }
        let rowSt = JSON.stringify(edElem)

        localStorage.setItem(`${id}`, rowSt);
        
        modal.close();
        setTimeout(location.reload(), 1000);
    }
   
}

function removeElementFromLocalStorage(id){
    if (confirm("Ви впевнені що хочете видалит товар?")) {
        localStorage.removeItem(id)
        location.reload();
    }

} 
let keyNumbers = Object.keys(localStorage).length

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))

    buildElement(keyName, row)
}

