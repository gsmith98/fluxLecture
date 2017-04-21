var express = require('express');
var app = express();
var path = require('path'); //node native, no npm install

app.use(express.static('build'));

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(3000, function() {
console.log("Express running on port 3000");
})
