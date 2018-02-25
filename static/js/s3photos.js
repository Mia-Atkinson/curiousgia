
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Configure the credentials provider to use your identity pool
//AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //IdentityPoolId: 'us-east-1_sJhAijhqQ',
//});


AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1_sJhAijhqQ'
    })
});

var params = {
    Bucket: "neil-life",
    Delimiter: '/',
    //Prefix: 'Series/'
}

function getList(callback) {
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
            /*
            fs.writeFile(path.join(__dirname, "../../urls/curious_gia.txt"), to_print, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            */
        }
        callback(t_urls);
    });
}

function one(result) {
    var urls = result;
    for (i=0; i<urls.length; i++){
        //console.log(urls[i]);
    }
    //console.log(urls.length);
    //console.log(urls[0]);

    //console.log(AWS.config.credentials.get());
    AWS.config.credentials.get(function(err) {
        if (err) console.log(err);
        else console.log(AWS.config.credentials);
    });

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

getList(function(t_urls){ one(t_urls); });
//window.onload = getList(function(t_urls){ one(t_urls); });
