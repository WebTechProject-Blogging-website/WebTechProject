var d = new Date();
var n = d.toISOString();
document.getElementById("date").value = n;

function validateForm() {
    var title = document.forms["editBlog"]["title"].value;
    var text= document.forms["editBlog"]["text"].value;
    var signature= document.forms["editBlog"]["signature"].value;
    if (title == "") {
        alert("Title must be filled out");
        return false;
    }
    if (text == "") {
        alert("Blog Text must be filled out");
        return false;
    }
    if (signature == "") {
        alert("Please sign!");
        return false;
    }
    }