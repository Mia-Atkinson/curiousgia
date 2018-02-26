
var albumBucketName = 'neil-life';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:d7fe84e1-7d9d-4171-8eb5-334d2e277891';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: albumBucketName}
});

var params = {
    Bucket: "neil-life",
    Delimiter: '/',
    //Prefix: 'Series/'
}

function getList(callback) {
    options = { scope : 'profile' };
    s3.listObjects(params, function (err, data) {
        if(err)throw err;
        else
        {
            var t_urls=[];
            for (i = 0; i < data.Contents.length; i++) {
                t_urls[i] = data.Contents[i].Key;
            }
            //0th element is the folder if a subfolder
            var to_print = "";
            //adjust i=0 or 1 depending if base folder or child folder
            for (i = 0; i < t_urls.length-1; i++) {
                //console.log(t_urls[i]);
                to_print = to_print + t_urls[i] + "\n";
            }
        }
        callback(t_urls);
    });
}

function one(result) {
    var urls = result;
    //console.log(urls.length);
    //console.log(urls[0]);
    AWS.config.credentials.get(function(err) {
        if (err) console.log(err);
        else console.log(AWS.config.credentials);
    });

    div = document.getElementById( 'myrow' );

    for (i = 0; i < urls.length; i++) {
        colDiv = document.createElement("DIV");
        colDiv.className = "col-sm-4 thumbnail"
        x = document.createElement("IMG");
        //http://d3qe819fh6emdz.cloudfront.net/*IMG_2514-2.jpg
        x.src = "https://d3qe819fh6emdz.cloudfront.net/" + urls[i];
        x.className  = "img-responsive rounded"
        colDiv.appendChild(x);
        div.appendChild(colDiv);
    }
}
window.onload = getList(function(t_urls){ one(t_urls); });
