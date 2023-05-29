//import function
const mySelect_s = document.getElementById("my-select-in");
const mySelect_t = document.getElementById("my-select-out");
//get source language selection
let selectedValue_s = mySelect_s.value;
//get target language selection
let selectedValue_t = mySelect_t.value;
function updateValue(){
    selectedValue_s = mySelect_s.value;
    selectedValue_t = mySelect_t.value;
}

let input = document.querySelector("#input_textarea");
let output = document.querySelector("#output_textarea");
//get file.suffix from local
let file = document.querySelector(".file_import");

file.addEventListener("change",(e)=>{
    let file_input = e.target.files[0];
    let file_name = file_input.name;
    let file_suffix = file_name.split(".")[1];

    if(file_suffix === selectedValue_s){
        let reader = new FileReader();
        reader.readAsText(file_input);
        reader.onload = function(){
            input.value=reader.result;
        }
    }else{
        alert("not match! Please reselect.");
        file.value = "";
    }
})
input.addEventListener("change",function (){
    file.value = "";
})

//save functions
const saveButton = document.querySelector('.export');
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
    const textToSave = outTextarea.value;
    const defaultFileName = "my_file." + selectedValue_t;
    const filename = prompt("Enter filename:",defaultFileName);

    if (filename !== null) {
        const blob = new Blob([textToSave], { type: "text/plain" });
        const link = document.createElement("a");
        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }
});

//convert-btn
const convertBtn = document.getElementById('convert-btn');
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

convertBtn.addEventListener('click', () => {
    const text = selectedValue_s + "@" + selectedValue_t + "@" + input.value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reply = this.responseText;
            const responseObject = JSON.parse(reply);
            output.value = responseObject.result;
        }
    };
    xhttp.open("POST", "/test/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("X-CSRFToken", csrfToken); // include CSRF token in headers
    xhttp.send(`text=${text}&csrfmiddlewaretoken=${csrfToken}`);
});

