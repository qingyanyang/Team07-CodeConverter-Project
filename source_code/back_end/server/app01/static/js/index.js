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

/*
convert-btn function
*/
const convertBtn = document.getElementById('convert-btn');
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

convertBtn.addEventListener('click', () => {
    output.setValue("");
    if (!input.getValue() || input.getValue().trim().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Empty Input',
            text: 'No code detected! Enter your code.',
        });
    } else {
        //data need to send
        let text = {
            raw_code: input.getValue(),
            toLanguage: selectedValue_t,
            fromLanguage: selectedValue_s
        }
        console.log('selectedValue_t', selectedValue_t)
        console.log('selectedValue_s', selectedValue_s)
        //ajax send request
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/codeConverter/api/submit/", true);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status >= 200 && xhttp.status < 300) {
                    console.log('拿到了')
                    //get response
                    const res = xhttp.response;
                    //check if it is 'No'
                    if (res.startsWith('No')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Language Mismatch',
                            text: 'Selected ' + selectedValue_s + ' does not match input. Please check.',
                        })
                    }
                    else { output.setValue(xhttp.response); }
                }
            }
        }
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(text))
        console.log('发送啦');
    }
});

/*
file export
*/
const saveButton = document.querySelector('.export');
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
    console.log("Click!")
    const textToSave = output.getValue();
    const defaultFileName = "my_file." + selectedValue_t;

    if (!textToSave) {
        Swal.fire({
            title: 'Empty Content',
            text: 'Unable to export empty content! Please provide valid code.',
            icon: 'error'
        });
        return;
    }

    Swal.fire({
        title: 'Missing Filename',
        input: 'text',
        inputValue: defaultFileName,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'No filename! Please provide one.'
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

/*
file import
*/
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
        Swal.fire({
            icon: 'error',
            title: 'Type Mismatch',
            text: 'File type does not match chosen language. Please reselect.',
        });
        file.value = "";
    }
})

/*
word limit function
 */
let input_count = document.getElementById('input_count');
input.on('change', (cm, changeObj) => {
    file.value = "";
    let current_value = cm.getValue();
    let len_input = current_value.length;

    if (len_input > 1000) {
        Swal.fire({
            icon: 'warning',
            title: 'Exceeded Limit',
            text: 'Code exceeds 1000 characters. Please shorten.',
        });
        cm.setValue(current_value.slice(0, 1000));  // Trim the content to the first 1000 characters
        len_input = 1000;  // Update the length
        input_count.style.color = "#018955";
    }

    input_count.innerText = len_input;
});

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

function updateValueCodeMirror() {
    const inputLanguage = mySelect_s.value;
    const outputLanguage = mySelect_t.value;

    input.setOption("mode", getModeFromLanguage(inputLanguage));
    output.setOption("mode", getModeFromLanguage(outputLanguage));
}

updateValue()
updateValueCodeMirror()