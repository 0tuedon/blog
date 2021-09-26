const   path                        =   require('path'),
        expressEdge                 =   require('express-edge'),
        express                     =   require('express'),
        mongoose                    =   require('mongoose'),
        bodyParser                  =   require('body-parser'),
        Post                        =   require('./models/post'),
        fileUpload                  =   require('express-fileupload'),
        auth                        =   require('./middleware/auth'),
        storePost                   =   require('./middleware/storePost'),
        expressSession              =   require('express-session'),
        MongoStore                  =   require('connect-mongo'),
        app                         =   express(),

        port                        =   process.env.PORT || 4000

// Connection of Mongoose to the server
let         severMongoose           =   process.env.DATABASE || 'mongodb://localhost/emutBlog';
mongoose.connect(severMongoose, {useNewUrlParser:true})
    .then(()=> 'You are Now Connected to Mongo')
    .catch(err=> console.error('There was an Error SomeWhere' , err))


app.use(express.static('public'))
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(expressSession({
    secret:'jnjrefnj',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({mongoUrl:'mongodb://localhost/emutBlog'})
}))
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(fileUpload());

// Routes
const   createPostRoute         =   require('./routes/createPost'),
        getPostRoute            =   require('./routes/getPost'),
        homePageRoute           =   require('./routes/homePage'),
        storePostRoute          =   require('./routes/storePost'),
        registerRoute           =   require('./routes/register'),
        storeUserRoute          =   require('./routes/createUser'),
        loginUserRoute          =   require('./routes/loginUser'),
        getLoginUserRoute       =   require('./routes/getLoginUser');


app.get('/',homePageRoute);
app.get('/post/new',createPostRoute);
app.get('/post',auth,getPostRoute);
app.get('/auth/register',registerRoute);
app.get('/auth/login',getLoginUserRoute)
app.post('/users/register',storeUserRoute);
app.post('/post/store',auth, storePostRoute);
app.post('/users/login',loginUserRoute);


app.get('/about', (req,res)=>{
    res.render('about');
});

app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/post',(req,res)=>{
    res.render('index.js');
});
app.get('/post/:id', async (req,res)=>{
    var id = req.params.id
    const post = await Post.findById(id)
    res.render('post',{
        post
    });
})
app.listen(port,()=>{
    console.log('App Listening on port ' + port);
})