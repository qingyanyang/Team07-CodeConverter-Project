//import function
const mySelect_s = document.getElementById("my-select-in");
const mySelect_t = document.getElementById("my-select-out");
//get source language selection
let selectedValue_s = mySelect_s.value;
//get target language selection
let selectedValue_t = mySelect_t.value;



//convert-btn
const convertBtn = document.getElementById('convert-btn');
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

convertBtn.addEventListener('click', () => {
    const text = selectedValue_s + "@" + selectedValue_t + "@" + input.getValue();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reply = this.responseText;
            const responseObject = JSON.parse(reply);
            console.log(responseObject.result)
            output.setValue(responseObject.result);
            console.log(output.getValue())
        }
    };
    xhttp.open("POST", "/test/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("X-CSRFToken", csrfToken); // include CSRF token in headers
    xhttp.send(`text=${text}&csrfmiddlewaretoken=${csrfToken}`);
});


function updateValue() {
    const inputLanguage = inputLanguageSelector.value;
    const outputLanguage = outputLanguageSelector.value;

    inputCodeMirror.setOption("mode", getModeFromLanguage(inputLanguage));
    outputCodeMirror.setOption("mode", getModeFromLanguage(outputLanguage));
}

//save functions
const saveButton = document.querySelector('.export');
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
    console.log("Click!")
    const textToSave = output.getValue();
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


// Create CodeMirror instances for input and output textareas
const input = CodeMirror.fromTextArea(document.getElementById("input_textarea"), {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "3024-night",
});

const output = CodeMirror.fromTextArea(document.getElementById("output_textarea"), {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "3024-night",
    readOnly: true,
});

//get file.suffix from local
let file = document.querySelector(".file_import");

file.addEventListener("change", (e) => {
    let file_input = e.target.files[0];
    let file_name = file_input.name;
    let file_suffix = file_name.split(".")[1];

    if (file_suffix === selectedValue_s) {
        let reader = new FileReader();
        reader.readAsText(file_input);
        reader.onload = function () {
            //input.value = reader.result;
            input.setValue(reader.result);  
        }
    } else {
        alert("not match! Please reselect.");
        file.value = "";
    }
})
input.addEventListener("change", function () {
    file.value = "";
})


function getModeFromLanguage(language) {
    switch (language) {
        case "java":
            return "text/x-java";
        case "py":
            return "python";
        case "cpp":
            return "text/x-c++src";
        default:
            return "text/x-java";
    }
}

const inputTextarea = document.getElementById("input_textarea");
const outputTextarea = document.getElementById("output_textarea");
const inputLanguageSelector = document.getElementById("my-select-in");
const outputLanguageSelector = document.getElementById("my-select-out");

const inputCodeMirror = CodeMirror.fromTextArea(inputTextarea, {
    lineNumbers: true,
    mode: getModeFromLanguage(inputLanguageSelector.value),
    theme: "default",
    matchBrackets: true,
});

const outputCodeMirror = CodeMirror.fromTextArea(outputTextarea, {
    lineNumbers: true,
    mode: getModeFromLanguage(outputLanguageSelector.value),
    theme: "default",
    matchBrackets: true,
    readOnly: true, // 设置为只读，因为这是一个输出框
});

updateValue()