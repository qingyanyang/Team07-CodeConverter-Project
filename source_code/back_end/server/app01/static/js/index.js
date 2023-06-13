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
//function to switch suffix into language name
function switchSuffixToName(suffix) {
  switch (suffix) {
    case "java":
      return "Java";
    case "py":
      return "Python3";
    case "cpp":
      return "C++";
    // case "cs":
    //     return "C#";
    // case "js":
    //     return "Javascript";
    default:
      return "Java";
  }
}
// method to send http request
function sendHttpRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          resolve(xhttp.response);
        } else {
          reject(new Error("Request failed"));
        }
      }
    };
    xhttp.send(JSON.stringify(data));
  });
}
/*
convert-btn function
*/
const convertBtn = document.getElementById("convert-btn");
const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

convertBtn.addEventListener("click", () => {
  output.setValue("");
  if (!input.getValue() || input.getValue().trim().length === 0) {
    Swal.fire({
      icon: "error",
      title: "Empty Input",
      text: "No code detected! Enter your code.",
    });
  } else if (input.getValue().length > 1000) {
    Swal.fire({
      icon: "error",
      text: "Input should be maximum of 1000 characters!",
    });
  } else {
    //data need to send
    let text = {
      raw_code: input.getValue(),
      toLanguage: switchSuffixToName(selectedValue_t),
      fromLanguage: switchSuffixToName(selectedValue_s),
    };
    console.log("selectedValue_t", switchSuffixToName(selectedValue_t));
    console.log("selectedValue_s", switchSuffixToName(selectedValue_s));
    //ajax send request
    sendHttpRequest("/codeConverter/api/submit/", "POST", text)
      .then((response) => {
        console.log("拿到啦");
        // Handle the response
        //get response
        const res = response;
        //check if it is 'No'
        if (res.startsWith("No")) {
          Swal.fire({
            icon: "error",
            title: "Language Mismatch",
            text:
              "Input doesn't match selected " +
              switchSuffixToName(selectedValue_s) +
              ". Please retry.",
          });
        } else if (res.startsWith("Yes")) {
          Swal.fire({
            title: "Code Error",
            text: "Unable to convert before correcting!\n\r Do you want AI to correct it?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            cancelButtonText: "No, I'll do it",
          }).then((result) => {
            if (result.isConfirmed) {
              //send correct request to server
              let textReq = {
                raw_code: input.getValue(),
              };
              sendHttpRequest("/codeConverter/api/correct/", "POST", textReq)
                .then((response) => {
                  console.log("拿到啦2");
                  // Handle the response
                  input.setValue(response);
                })
                .catch((error) => {
                  console.error("Error:", error);
                  // Handle the error
                  Swal.fire({
                    icon: "warning",
                    title: "500 server lost",
                  });
                });
            }
          });
        } else {
          output.setValue(response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
        Swal.fire({
          icon: "warning",
          title: "500 server lost",
        });
      });
  }
});

/*
file export
*/
const saveButton = document.querySelector(".export");
const outTextarea = document.getElementById("output_textarea");

saveButton.addEventListener("click", () => {
  console.log("Click!");
  const textToSave = output.getValue();
  const defaultFileName = "my_file." + selectedValue_t;

  if (!textToSave) {
    Swal.fire({
      title: "Empty Content",
      text: "Unable to export empty content! Please retry.",
      icon: "error",
    });
    return;
  }

  Swal.fire({
    title: "Enter Filename",
    input: "text",
    inputValue: defaultFileName,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "No filename! Please provide one.";
      }
    },
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
const input = CodeMirror.fromTextArea(
  document.getElementById("input_textarea"),
  {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "3024-night",
  }
);

const output = CodeMirror.fromTextArea(
  document.getElementById("output_textarea"),
  {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "3024-night",
    readOnly: true,
  }
);

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
    };
  } else {
    Swal.fire({
      icon: "error",
      title: "Type Mismatch",
      text:
        "The file you have chosen is not a " +
        switchSuffixToName(selectedValue_s) +
        " file." +
        "\n\r" +
        "Please reselect.",
    });
    file.value = "";
  }
});

/*
word limit function
 */
let input_count = document.getElementById("input_count");
input.on("change", (cm, changeObj) => {
  file.value = "";
  let current_value = cm.getValue();
  let len_input = current_value.length;

  if (len_input > 1000) {
    //if the length of code exceed 1000, it turns red
    //and convert button disabled, give a notice
    input_count.style.color = "red";
  } else {
    input_count.style.color = "white";
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
    // case "cs":
    //     return "text/x-csharp";
    // case "js":
    //     return "javascript";
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

updateValue();
updateValueCodeMirror();
