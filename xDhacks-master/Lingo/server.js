var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');

http.createServer(function(req, res){
if(req.url === '/favicon.ico'){res.end();}
else{
res.writeHead(200, {'Content-Type': 'test/html'});
var q = url.parse(req.url, true).query;
var n = q.name;
var l1 = q.firstLanguage;
var l2 = q.secondLanguage;

console.log(n+" "+l1+" "+l2+"\n");
console.log(req.url);

fs.readFile('./main.html', function(err, data) {
if (err) {
res.writeHead(404, {'Content-Type': 'text/html'});
return res.end("404 Not Found");
}
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(data);
return res.end();
});
}
}).listen(8080);



let waitingList = [];


const checkForMatch = (input, person) => {
    if (input.firstLanguage == person.secondLanguage
    && input.secondLanguage == person.firstLanguage) {
        return true;
    }
    return false;
};

// returns match position OR false
const runThroughWaitingList = (input) => {
    for (let i = 0; i < waitingList.length; i++) {
        if (checkForMatch(input, waitingList[i])) return i;
    }
    return false;
};

const submitFunction = (input) => {
    let matchResults = runThroughWaitingList(input);
    if (matchResults === false) {
        waitingList.push(input);
    }
    else {
        let matchedPerson = waitingList[matchResults];
        waitingList.splice(matchResults, 1);
        // do something with input and matchedPerson
    }
};

let emitter = new events.EventEmitter();
emitter.on('submit_button', submitFunction);