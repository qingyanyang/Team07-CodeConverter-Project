//import function
const mySelect_s = document.getElementById("my-select-in");
const mySelect_t = document.getElementById("my-select-out");
//get source language selection
let selectedValue_s = mySelect_s.value;
//get target language selection
let selectedValue_t = mySelect_t.value;

function updateValue() {
    selectedValue_s = mySelect_s.value;
    selectedValue_t = mySelect_t.value;

}

//convert-btn
const convertBtn = document.getElementById('convert-btn');
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

convertBtn.addEventListener('click', () => {

    let text = {
        'raw_code': `${input.getValue()}`,
        'toLanguage': `${selectedValue_t}`
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/codeConverter/api/submit/", true);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status >= 200 && xhttp.status < 300) {
                console.log('拿到了')
                //拿到response
                //const responseObject = JSON.parse(xhttp.response);
                //console.log(responseObject.result)
                output.setValue(xhttp.response);
                //console.log(output.getValue())
            }
        }
    }
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-CSRFToken", csrfToken); // include CSRF token in headers
    xhttp.send(`text=${JSON.stringify(text)}&csrfmiddlewaretoken=${csrfToken}`);
    console.log('发送啦');
});




//save functions
const saveButton = document.querySelector('.export');
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
    console.log("Click!")
    const textToSave = output.getValue();
    const defaultFileName = "my_file." + selectedValue_t;

    Swal.fire({
        title: 'Enter filename',
        input: 'text',
        inputValue: defaultFileName,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const filename = result.value;
            const blob = new Blob([textToSave], { type: "text/plain" });
            const link = document.createElement("a");
            link.download = filename;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        }
    });
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
    console.log(file_suffix)
    console.log(selectedValue_s)

    if (file_suffix === selectedValue_s) {
        let reader = new FileReader();
        reader.readAsText(file_input);
        reader.onload = function () {
            //input.value = reader.result;
            input.setValue(reader.result);  
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'File Type Mismatch',
            text: 'The file type does not match! Please reselect.',
        });
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
    readOnly: true,
});

function updateValue1() {
    const inputLanguage = inputLanguageSelector.value;
    const outputLanguage = outputLanguageSelector.value;

    inputCodeMirror.setOption("mode", getModeFromLanguage(inputLanguage));
    outputCodeMirror.setOption("mode", getModeFromLanguage(outputLanguage));
}

updateValue()
updateValue1()