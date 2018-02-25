function one(result) {
    var test = result;
    // Do anything you like
}

function getPhp(number, callback) {
    this.serviceBroker = new dojo.rpc.JsonService(baseUrl + '/index/json-rpc/');
    result.addCallback(
        function (response)
        {
            if (response.result == 'success')
            {
                callback(response.description);
            }
        }
    );
}

getPhp(number, function(result) { one(result); });