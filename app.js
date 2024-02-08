const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const firebase = require('firebase/app');
const { getDatabase, ref, push, set, update, remove, onValue } = require('firebase/database');


const firebaseConfig = {
    apiKey: "AIzaSyDlcHr_NQY1cTYm1Vm7AfDTv50H70hwXYM",
    authDomain: "todolist-92a67.firebaseapp.com",
    databaseURL: "https://todolist-92a67-default-rtdb.firebaseio.com",
    projectId: "todolist-92a67",
    storageBucket: "todolist-92a67.appspot.com",
    messagingSenderId: "549481328589",
    appId: "1:549481328589:web:8df4d77dc50f8417c19e84"
};
firebase.initializeApp(firebaseConfig);


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = getDatabase();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(express.json())

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
});

app.get('/', function (req, res) {
    const todosRef = ref(db, 'todos');

    // async
    const fetchData = new Promise((resolve, reject) => {
        onValue(todosRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });

    fetchData
        .then((data) => {
            try {
                res.render('index', {
                    todolist: data,
                });
            } catch (error) {
                console.error('Error rendering template:', error);
                res.status(500).send('Internal Server Error');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        });
});



app.post('/create-item', function (req, res) {
    const item = req.body.item;
    const todosRef = ref(db, 'todos');
    const itemRef = push(todosRef);

    set(itemRef, { item })
    .then(() => {
      io.emit('dataUpdated', { message: 'Data updated' });
      res.json({ success: true });

    })
    .catch((error) => {
      console.error('Error writing to database:', error);
      res.status(500).send('Internal Server Error');
    });

});


let engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');


app.post('/update-item', function (req, res) {
    const id = req.body.id;
    const dbRef = ref(getDatabase(), 'todos/' + id);

    update(dbRef, {
        item: req.body.text
    }).then(() => {
        // res.send("Updated Success");
        io.emit('updateSuccess', { message: 'Update Success' });
        res.json({ success: true });

    }).catch((error) => {
        console.error("Error updating item:", error);
        res.status(500).send("Internal Server Error");
    });
});

app.post('/delete-item', function (req, res) {
    const id = req.body.id;
    const dbRef = ref(getDatabase(), 'todos/' + id);

    remove(dbRef).then(() => {
        // res.send("Delete Success");
        io.emit('deleteSuccess', { message: 'Delete Success' });
        res.json({ success: true });

    }).catch((error) => {
        console.error("Error deleting item:", error);
        res.status(500).send("Internal Server Error");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});