let firebase = require('firebase/app');
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

// const getDatabase = require('firebase/database');

let express = require('express');
let app = express();
let db = getDatabase();

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'))
app.use(express.json())


app.get('/', function (req, res) {
    var todosRef = ref(db, 'todos');

    let responded = false;

    onValue(todosRef, (snapshot) => {
        const data = snapshot.val();

        if (!responded) {
            try {
                res.render('index', {
                    "todolist": data
                });
                responded = true;
            } catch (error) {
                console.error('Error rendering template:', error);
                res.status(500).send('Internal Server Error');
                responded = true;
            }
        }
    });

});


app.post('/create-item', function (req, res) {
    var item = req.body.item;
    var todosRef = ref(db, 'todos');
    var itemRef = push(todosRef);

    let responded = false;

    set(itemRef, {
        "item": item
    }).then(function () {
        
        if (!responded) {
            responded = true;
            
            onValue(todosRef, (snapshot) => {
                const data = snapshot.val();
                res.send(data);

                setTimeout(() => {
                    res.redirect('/');
                }, 0);
            });
        }
    }).catch(function (error) {
        console.error("Error writing to database:", error);
        
        if (!responded) {
            responded = true;
            res.status(500).send("Internal Server Error");
        }
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
        res.send("Updated Success");
        
    }).catch((error) => {
        console.error("Error updating item:", error);
        res.status(500).send("Internal Server Error");
    });
});

app.post('/delete-item', function (req, res) {
    const id = req.body.id;
    const dbRef = ref(getDatabase(), 'todos/' + id);

    remove(dbRef).then(() => {
        res.send("Delete Success");

        if (!res.headersSent) {
            res.redirect('/');
        }

        return; 

    }).catch((error) => {
        console.error("Error deleting item:", error);
        res.status(500).send("Internal Server Error");
    });
});

app.listen(3000);