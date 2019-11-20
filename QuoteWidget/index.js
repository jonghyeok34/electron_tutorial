let request = require("request");

var randomRequest = function() {
  request("http://quotes.stormconsultancy.co.uk/random.json", function(
    err,
    response,
    body
  ) {
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson["quote"];
    document.getElementById("quote").innerHTML = randomQuote;
  });
};
randomRequest();
setInterval(randomRequest, 5000);
