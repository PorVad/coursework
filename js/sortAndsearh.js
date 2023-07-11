function getArrayFromLocalStorage() {
    let keyNumbers = Object.keys(localStorage).length;
    let elm = {}
    let incomingArr = []
    
    for (let i = 0; i < keyNumbers; i++) {
        let keyName = localStorage.key(i)
        let row = JSON.parse(localStorage.getItem(keyName))

        elm = {}
        elm.id = keyName;
        elm.name = row.name;
        elm.fps = row.fps;
        elm.video = row.video;
        elm.image = row.image;

        incomingArr.push(elm)
    }

    return incomingArr
}

function sortEl(){
    let checkBox = document.getElementById("sortcheckbox");
    
    if (checkBox.checked == true){
       let sortArr = getArrayFromLocalStorage()

        function byField(field) {
            return (a, b) => +a[field] > +b[field] ? 1 : -1;
          }
        sortArr.sort(byField('fps'));
        document.getElementsByClassName("displayzone")[0].innerHTML = '';

        for (let n = 0; n <sortArr.length; n++){
            let tempEl = sortArr[n]
            buildElement(tempEl.id, tempEl)
        }
    } 
    else{
        setTimeout(location.reload(), 1000)
    }
}

function searchEl(){
  document.getElementsByClassName("displayzone")[0].innerHTML = '';

  let searchtArr = getArrayFromLocalStorage();
  let str = document.querySelector("#csearch").value;
  let serchStr = str.toLowerCase();
  let  regExp = new RegExp(`${serchStr}`, "gi");
  let isFounded = false;

  for (let i=0; i<searchtArr.length; i++) {
      let row = searchtArr[i];
      let strN = row.name.toLowerCase();
      let strV = row.fps;
      let strM = row.video;

      if (regExp.test(strN) || regExp.test(strV) || regExp.test(strM)) {
        buildElement(row.id, row)
        isFounded = true
      }
  }

  if (!isFounded) {
    document.getElementsByClassName("displayzone")[0].innerHTML = '<h1 style="color:red; width:100%; text-align: center;" >No matches found</h1>';
  }
}
refresh = () => location.reload()

sortcheckbox.addEventListener('click', sortEl)
searchbtn.addEventListener('click', searchEl)
cancelbtn.addEventListener('click', refresh)