
var fs = require("fs");
var path = require('path');
var urls = [];
var content;
fs.readFile(path.join(__dirname, "../../urls/curious_gia.txt"), "utf8", function read(err, data){
    if (err) {
        throw err;
    }
    content = data;
    console.log(content);
});


function func1(){
    /*
    $("#test1").html("<a href=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\">\n" +
        "<img src=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\" alt=\"\" class=\"img-responsive rounded\">\n" +
        "</a>"
    );

    $("#test2").html("<a href=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\">\n" +
        "<img src=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\" alt=\"\" class=\"img-responsive rounded\">\n" +
        "</a>"
    );

    $("#test3").html("<a href=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\">\n" +
        "<img src=\"https://s3.amazonaws.com/neil-life/closeup/Portrait-Mode.jpg\" alt=\"\" class=\"img-responsive rounded\">\n" +
        "</a>"
    );
    */


    div = document.getElementById( 'myrow' );

    for (i = 0; i < urls.length; i++) {
        colDiv = document.createElement("DIV");
        colDiv.className = "col-sm-4 thumbnail"
        x = document.createElement("IMG");
        x.src = "https://s3.amazonaws.com/neil-life/" + urls[i];
        x.className  = "img-responsive rounded"
        colDiv.appendChild(x);
        div.appendChild(colDiv);
    }

}




//window.onload = func1;
