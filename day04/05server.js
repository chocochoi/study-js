const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/get', (req, res) => {
    // setTimeout(() => {
        res.end(JSON.stringify("2"));
    // }, 1000);

});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});


