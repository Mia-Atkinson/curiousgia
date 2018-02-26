
var albumBucketName = 'neil-life';
var delimiter = '/';
var prefix = 'katara/';
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
    params: {
        Bucket: albumBucketName,
        Delimiter: delimiter,
        Prefix: prefix
    }
});

var params = {
    Bucket: "neil-life",
    Delimiter: '/',
    Prefix: 'Katara/'
}

function getList() {
    options = { scope : 'profile' };
    console.log("getlist");
    s3.listObjects(params, function (err, data) {
        if(err)throw err;
        else
        {
            var urls=[];
            for (i = 0; i < data.Contents.length; i++) {
                urls[i] = data.Contents[i].Key;
            }
            //0th element is the folder if a subfolder
        }
        populate(urls);
    });
}

function populate(result) {
    var urls = result;
    console.log(urls.length);
    div = document.getElementById( 'myrow' );
    for (i = 0; i < urls.length; i++) {
        colDiv = document.createElement("DIV");
        colDiv.className = "col-sm-4 thumbnail"
        x = document.createElement("IMG");
        x.src = "https://d3qe819fh6emdz.cloudfront.net/" + urls[i];
        x.className  = "img-responsive rounded"
        colDiv.appendChild(x);
        div.appendChild(colDiv);
    }
}
document.ready = getList();
