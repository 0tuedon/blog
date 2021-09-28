require('dotenv').config();

const   path                        =   require('path'),
        expressEdge                 =   require('express-edge'),
        { MongoClient }             =   require('mongodb'),
        cloudinary                  =   require('cloudinary').v2,
        express                     =   require('express'),
        mongoose                    =   require('mongoose'),
        passport                    =   require('passport'),
        passportLocal               =   require('passport-local'),
        passportLocalMongoose       =   require('passport-local-mongoose'),
        bodyParser                  =   require('body-parser'),
        methodOverride              =   require('method-override'),
        Post                        =   require('./models/post'),
        User                        =   require('./models/user'),
        fileUpload                  =   require('express-fileupload'),
        auth                        =   require('./middleware/auth'),
        storePost                   =   require('./middleware/storePost'),
        expressSession              =   require('express-session'),
        MongoStore                  =   require('connect-mongo'),
        request                     =   require('request'),
        app                         =   express(),

        port                        =   process.env.PORT

// Connection of Mongoose to the server
let         severMongoose           =    process.env.DATABASE
mongoose.connect(severMongoose, {useNewUrlParser:true})
    .then(()=> 'You are Now Connected to Mongo')
    .catch(err=> console.error('There was an Error SomeWhere' , err))

app.use(express.static('public'))
app.set('view engine','ejs');
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret:'jnjrefnj',
    resave:false,
    saveUninitialized:false
}))
// PASSPORT CONFIGURATION 
app.use(passport.initialize());
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
app.use(fileUpload());

// Routes
const   createPostRoute         =   require('./routes/createPost'),
        getPostRoute            =   require('./routes/getPost'),
        homePageRoute           =   require('./routes/homePage'),
        storePostRoute          =   require('./routes/storePost'),
        registerRoute           =   require('./routes/register'),
        storeUserRoute          =   require('./routes/createUser'),
        loginUserRoute          =   require('./routes/loginUser'),
        getLoginUserRoute       =   require('./routes/getLoginUser'),
        getEditForm             =   require('./routes/getEditForm'),
        editRoute               =   require('./routes/editRoute'),
        deletePostRoute         =   require('./routes/deletePost');


app.get('/',homePageRoute);
app.get('/post/new',createPostRoute);
app.get('/post',auth,getPostRoute);
app.get('/auth/register',registerRoute);
app.get('/auth/login',getLoginUserRoute)
app.get('/post/:id/edit', getEditForm);
app.put('/post/:id',editRoute);
app.delete('/post/:id', deletePostRoute);
app.post('/users/register',storeUserRoute);
app.post('/post/store', storePostRoute);
app.post('/users/login',loginUserRoute);


// API CALLING

app.get('/1234567890Jsonfile',(req,res)=>{
    let posts = Post.find({},(error,data)=>{
        let     page        =       2,
                setLimit    =       5,
                startIndex  =       (page-1)*setLimit
                endIndex    =       page*setLimit,
                results      =       data.slice(startIndex,endIndex)

            res.send(results)
    })
})


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