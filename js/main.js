const modal = $.modal({
    title: 'Camera options',
    closable: true,
    content: `
        <div class="modal-form">
            <label for="name">Назва камери</label><br>
            <input type="text" id="name" name="name" class="modal-form-field" placeholder="Введіть назву камери"/><br><br>
            <label for="fps">Виберіть кількість fps</label><br>
            <select id="fps" name="fps" class="modal-form-field">
                <option value="120">120</option>
                <option value="60">60</option>
                <option value="45">45</option>
                <option value="30">30</option>
            </select><br><br>
            <label for="video">
                Розширення відео
                <img src="img/ico/monitor.png" width="18px" style="margin-left: 7px">
            </label><br>
            <select id="video" name="video" class="modal-form-field">
                <option value="3840x2160">3840x2160</option>
                <option value="2560x1440">2560x1440</option>
                <option value="1920x1080">1920x1080</option>
                <option value="1440x1080">1440x1080</option>
            </select><br><br>
            <div id= "img-prev-section">
                <img id="imgprev" src="" >
            </div>   
                <label for="file" id="select-img">
                    Виберіть зображення
                </label><br>
                <input type="file" id="imgfile" name="imgfile"><br><br>
            <button id="modal-btn" class="blue-btn" onclick="myFunction()">Click me</button>
        </div> 
    `,
    width: '500px'
})