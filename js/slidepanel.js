var urls=[];
var numPages;
var slideIndex;

function populateURL() {
    var pageSize = 9;
    for (i = 0; i < 9; i++) {
        urls[i] = "https://s3.amazonaws.com/neil-life/Katara/IMG_0821-2.jpg";
    }
    for (i = 9; i < 18; i++) {
        urls[i] = "https://s3.amazonaws.com/neil-life/Katara/Sephora2.jpg";
    }
    urls[18] = "https://d3qe819fh6emdz.cloudfront.net/Resources/adventures.jpg";
    var numPages = Math.ceil(urls.length / pageSize);
    return numPages;
}


// Next/previous controls
function plusSlides(n) {
    console.log("plusslides one");
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {
    //Wrap the next/prev scrolling
    if (n > numPages) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = numPages;
    }
    setImages(slideIndex);
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex-1].className += " active";
}

function setImages(pageIndex) {
    for(i=0; i<9; i++) {
        document.getElementsByClassName('thumbnail')[i].getElementsByTagName("img")[0].src = urls[i+(pageIndex-1)*9];
    }
}

function initialLoad(){
    $("#myrow").html(function(slideIndex){
        return generateRow(1);
    });
    var dots = document.getElementsByClassName("dot");
    dots[0].className += " active";
}

function generateRow(n) {
    var toReturn = "";
    for (j=n-1; j<9*n; j++) {
        toReturn = toReturn + "<div class=\"col-sm-4 thumbnail\" imgId=\"";
        toReturn = toReturn + j;
        toReturn = toReturn + "\">"
        toReturn = toReturn + "<img src=\"";
        toReturn = toReturn + urls[j];
        toReturn = toReturn + "\" class=\"img-responsive rounded\">"
        toReturn = toReturn + "</div class=\"col-sm-4 thumbnail\">";
    }
    return toReturn;
}

$(function() {
    var pageSize = 9;
    numPages = populateURL();

    var dotHTML = "";
    //Generate Dots
    $("#dots").html(function(n){
        for (i=0; i<numPages; i++) {
            dotHTML = dotHTML + "<span class=\"dot\" onclick=\"currentSlide("
            dotHTML = dotHTML + (i+1);
            dotHTML = dotHTML + ")\"> </span>";
        }
        return dotHTML;
    });

    slideIndex = 1;
    initialLoad();

});

