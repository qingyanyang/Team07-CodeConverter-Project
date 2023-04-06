document.getElementById("import").onchange = function () {

    document.getElementById("form1").submit();

    let check = document.getElementsByName('input').value;
    console.log(check);

    if (check == '1') {
        alert("invalid suffix!");
    }

};

var titleElements = document.getElementsByClassName("option");
for (var i = 0; i < titleElements.length; i++) {
    titleElements[i].onclick = function () {

        for (var i = 0; i < titleElements.length; i++) {
            titleElements[i].style.color = 'black';
        }

        this.style.color = 'red';

        document.getElementsByName("selected_option").value = this.value;
    }
}