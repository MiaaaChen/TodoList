# TodoList
It's a to-do list application using Node.js.
[![Watch the video](https://imgur.com/cRZzIMf.png)](https://youtu.be/O4BguKbO254)

## Installation
### 1. Express framework
```
npm install express
```

### 2. EJS (Embedded JavaScript) template engine
```
npm install ejs
npm install ejs-locals
npm install nodemon
```

"scripts" in package.json
```
"watch": "nodemon app"
```
run in command line:
```
npm run watch
```
The server can automatically restart when there are changes.

### 3. Firebase
```
npm install firebase
```

## Database
### Step 1. Create a Realtime Database and connect to the app
![](https://imgur.com/pi6mnzC.png)
![](https://imgur.com/m2xFAB2.png)

### Step2. Set up SDK and configuration
Put the following information in app.js
![](https://imgur.com/UKGdkjK.png)

##### NOTE: change the format as const {} = require('firebase/) format in CommonJS
![](https://imgur.com/D7hiRkx.png)

## Run the app
Run in command line
```
node app.js
```
Open the browser and type the following URL
```
http://localhost:3000
```

