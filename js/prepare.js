function prepare(){
    let array = [
        {name: "Maxus",fps: "30",video: "3840x2160",image: "Maxus.jpg"},
        {name: "Maxus",fps: "120",video: "1440x1080",image: "Eufy.jpg"},        
        {name: "A-plus",fps: "60",video: "2560x1440",image: "A-plus.jpg"},
        {name: "Xmas",fps: "45",video: "3840x2160",image: "Xmas.jpg"},
        {name: "Sokol",fps: "60",video: "1920x1080",image: "Sokol.jpg"},
    ]
    localStorage.clear() 
    
    for (let i=0; i<array.length; i++) {   
        let row = array[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }
    location.reload();  
}
