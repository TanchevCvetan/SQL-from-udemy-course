const   express     = require("express"),
        mysql       = require("mysql"),
        bodyParser  = require("body-parser");
        
        
const app = express();  

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


//CONNECTING DB
const connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'tanchevc',
    database: 'join_us'
    
});



app.get('/',(req, res)=>{
    //find count of users in db
    const q = 'SELECT COUNT(*) as total FROM users';
    connection.query(q,(err,results)=>{
        const count = results[0].total;
        if(err)throw err;
        res.render('home',{count: count});
    });
});


app.post('/register',(req, res)=>{
    const person = {
        email: req.body.email
    };
    const q ='INSERT INTO users SET ?';
    connection.query(q,person,(err, result)=>{
        if(err)throw err;
        res.redirect('/');
    });
});



























app.listen(process.env.PORT, process.env.IP,()=>console.log('Serving Server...')
);

