var http = require("http");
var url = require('url');

var request = require("request");
var moment = require('moment');
var addDescription = require('./addDescription');


//Function  readTrxtFile from http://stackoverflow.com/a/14446538
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

var server = http.createServer(function (req, res) {
    
    var loginCookies = [];
    var query = url.parse(req.url, true).query;
    
    if (!!query.user && !!query.password) {
	
	// Required arguments for login
	var data = {
	    u: query.user,      // Username
	    p: query.password,  // Password
	};
	
	// Create a new cookie jar for each request
	request = request.defaults({ jar: request.jar() });
	
	request.post("https://www.campus.rwth-aachen.de/office/views/campus/redirect.asp", { form: data }, function (error, response) {
	    var start = moment().subtract(1, 'Month').format('DD.MM.YYYY');
	    var end   = moment().add(8, 'Month').format('DD.MM.YYYY');
	    
	    request.get('https://www.campus.rwth-aachen.de/office/views/calendar/iCalExport.asp?startdt='+start+'&enddt='+end+'%2023:59:59', function (error, response) {
		res.setHeader('Content-Type', 'text/calendar; charset=UTF-8'); // Set correct Content-Type
		res.setHeader('X-PUBLISHED-TTL', 'PT1H'); // Set update interval to 1h (Exchange MS)
		res.setHeader('REFRESH-INTERVAL', 'PT1H'); // Offical Spec
		res.setHeader('Content-Disposition', response.headers['content-disposition']);
		var ics = addDescription(response.body);
		res.write(ics);
		res.end();
	    });
	});
	
    } else {
	res.end('Du hast die Parameter user und/oder password vergessen.');
    }
    
});

server.listen(2014);

console.log("Server is listening");

