//import function
const mySelect_s = document.getElementById("my-select-in");
const mySelect_t = document.getElementById("my-select-out");
//get source language selection
let selectedValue_s = mySelect_s.value;
//get target language selection
let selectedValue_t = mySelect_t.value;
//invoked after selection onChange
function updateValue() {
    selectedValue_s = mySelect_s.value;
    selectedValue_t = mySelect_t.value;
}

//get value of input and output
let input = document.querySelector("#input_textarea");
let output = document.querySelector("#output_textarea");
//get file.suffix from local
let file = document.querySelector(".file_import");

file.addEventListener("change", (e) => {
    let file_input = e.target.files[0];
    if (file_input) {
        let file_name = file_input.name;
        let file_suffix = file_name.split(".")[1];

        if (file_suffix === selectedValue_s) {
            let reader = new FileReader();
            reader.readAsText(file_input);
            reader.onload = function () {
                input.value = reader.result;
            }
        } else {
            alert("not match! Please reselect.");
            file.value = "";
        }
    }
})
input.addEventListener("change", function () {
    file.value = "";
})

//save functions
const saveButton = document.querySelector('.export');
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
    const textToSave = outTextarea.value;
    const defaultFileName = "my_file." + selectedValue_t;
    const filename = prompt("Enter filename:", defaultFileName);

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
    let text = {
        'raw_code': input.value,
        'toLanguage': selectedValue_t
    }

    console.log('source:',selectedValue_s)
    console.log('target:', selectedValue_t)

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/codeConverter/api/submit/", true);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status >= 200 && xhttp.status < 300) {
                console.log('拿到了')
                //拿到response
                //const responseObject = JSON.parse(xhttp.response);
                //console.log(responseObject.result)
                output.innerHTML=xhttp.response;
                //console.log(output.getValue())
            }
        }
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-CSRFToken", csrfToken); // include CSRF token in headers
    xhttp.send(`text=${JSON.stringify(text)}&csrfmiddlewaretoken=${csrfToken}`);
    console.log('发送啦');
});



