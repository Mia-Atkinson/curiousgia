var urls=[];
var numPages;
var slideIndex;
var pageSize = 9;

var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:d7fe84e1-7d9d-4171-8eb5-334d2e277891';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

// Next/previous controls
function plusSlides(n) {
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
    for(i=0; i<pageSize; i++) {
        if ((i+(pageIndex-1)*pageSize)>=urls.length){ //reached end of URL array
            document.getElementsByClassName('thumbnail')[i].getElementsByTagName("img")[0].src = "";
        }
        else {
            document.getElementsByClassName('thumbnail')[i].getElementsByTagName("img")[0].src = urls[i+(pageIndex-1)*pageSize];
        }
    }
}

function initialLoad(numPages){
    var dotHTML="";
    //Generate Dots
    $("#dots").html(function(n){
        for (i=0; i<numPages; i++) {
            dotHTML = dotHTML + "<span class=\"dot\" onclick=\"currentSlide("
            dotHTML = dotHTML + (i+1);
            dotHTML = dotHTML + ")\"> </span>";
        }
        return dotHTML;
    });

    var dots = document.getElementsByClassName("dot");
    dots[0].className += " active";
    //Generate Row 1
    $("#myrow").html(function(slideIndex){
        return generateRow(1);
    });
}

function generateRow(n) {
    var toReturn = "";
    for (j=n-1; j<pageSize*n; j++) {
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

function getList(_callback) {
    //S3 Prep
    var s3 = new AWS.S3();
    category = document.getElementById('pagecategory');
    var prefix = category.attributes.class.value + "/";
    var albumBucketName = "neil-life";
    var delimiter = '/';
    var params = {
        Bucket: albumBucketName,
        Delimiter: delimiter,
        Prefix: prefix
    }
    options = { scope : 'profile' };

    //S3 Request
    s3.listObjects(params, function (err, data) {
        if(err)throw err;
        else
        {
            for (i = 0; i < data.Contents.length; i++) {
                urls[i] = "https://d3qe819fh6emdz.cloudfront.net/" + data.Contents[i].Key;
            }
            numPages = Math.ceil(urls.length / pageSize);
            _callback(Math.ceil(urls.length / pageSize));
        }
    });
}

$(function() {
    slideIndex=1;
    getList(function(numPages){
        initialLoad(numPages);
    });
});

