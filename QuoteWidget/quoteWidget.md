0. package.json

```javascript
{
    "name": "QuoteWidget",
    "version": "1.0.0",
    "main": "main.js",
    "devDependencies": {
        "electron": "^7.1.1"
    },
    "scripts": {
        "start": "electron ."
    },
    "dependencies": {
        "request": "^2.88.0"
    }
}

```

0. 1. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quote Widget</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="quote">
    </div>
    <script type="module">
        import './index.js';
    </script>
</body>
</html>
```
1. styles.css
```css
body {

    background-color: #222233;
    color: #AACCFF;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    height: 150px;
    overflow: hidden;
    border-radius: 5px;
    -webkit-app-region: drag; /* dragable */
}
```

2. install request

```cmd
$ npm install request --save
```

2. call random quote

```javascript
let request = require("request");

request("http://quotes.stormconsultancy.co.uk/random.json", function(
  err,
  response,
  body
) {
  let bodyJson = JSON.parse(body);
  let randomQuote = bodyJson["quote"];
  document.getElementById("quote").innerHTML = randomQuote;
});
```

3. iterable call 

```javascript
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

```

4. draggable body

styles.css
``` css
body {

    background-color: #222233;
    color: #AACCFF;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    height: 150px;
    overflow: hidden;
    border-radius: 5px;
    -webkit-app-region: drag; /* dragable */
}
```