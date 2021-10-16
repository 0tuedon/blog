require('dotenv').config();

const   express                     =   require('express'),
        mongoose                    =   require('mongoose'),
        passport                    =   require('passport'),
        passportLocal               =   require('passport-local'),
        bodyParser                  =   require('body-parser'),
        methodOverride              =   require('method-override'),
        cookie                      =   require('cookie-parser'),
        Post                        =   require('./models/post'),
        User                        =   require('./models/user'),
        fileUpload                  =   require('express-fileupload'),
        flash                       =   require('connect-flash'),
        auth                        =   require('./middleware/auth'),
        authorizeUser               =   require('./middleware/authorization'),
        expressSession              =   require('express-session'),
        app                         =   express(),
        port                        =   process.env.PORT
// Connection of Mongoose to the server
let         severMongoose           =    process.env.DATABASE
mongoose.connect(severMongoose, {useNewUrlParser:true})
    .then(()=> 'You are Now Connected to Mongo')
    .catch(err=> console.error('There was an Error SomeWhere' , err))


app.use(express.static('public'))
app.use(cookie())
app.use(express.json());
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(flash());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret:'jnjrefnj',
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: 60*60*1000}
}))

// PASSPORT CONFIGURATION 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
app.use((req,res,next)=>{
    res.locals.userDetails = req.user;
    res.locals.success =req.flash('success')
    res.locals.error  = req.flash('error');
    next();
})
app.use(fileUpload());

;
// Routes
const   createPostRoute         =   require('./routes/createPost'),
        getPostRoute            =   require('./routes/getPost'),
        homePageRoute           =   require('./routes/homePage'),
        storePostRoute          =   require('./routes/storePost'),
        registerRoute           =   require('./routes/register'),
        storeUserRoute          =   require('./routes/createUser'),
        loginUser               =   require('./routes/loginUser'),
        getLoginUserRoute       =   require('./routes/getLoginUser'),
        getEditForm             =   require('./routes/getEditForm'),
        editRoute               =   require('./routes/editRoute'),
        deletePostRoute         =   require('./routes/deletePost'),
        createNewCommentRoute   =   require('./routes/createNewComment'),
        contactMessageRoute     =   require('./routes/contactmessage'),
        logoutRoute             =   require('./routes/logoutRoute'),
        searchedUser            =   require('./routes/searchedUser'),
        userDashBoardRoute      =   require('./routes/userDashboard'),
        postLikeRoute           =   require('./routes/likePost');
const verifyEmail = require('./routes/verify-user');


app.get('/',homePageRoute);
app.get('/post/new', authorizeUser,createPostRoute);
app.get('/post',auth,getPostRoute);
app.get('/auth/register',registerRoute);
app.get('/login',getLoginUserRoute)
app.get('/post/:id/edit', getEditForm);
app.get('/logout',logoutRoute);
app.get('/dashboard/:id',authorizeUser, userDashBoardRoute)
// app.get('/user/:id',searchedUser)
app.get('/user/verify-email',verifyEmail)
app.put('/post/:id',editRoute);
app.delete('/post/:id', deletePostRoute);
app.post('/users/register',storeUserRoute);
app.post('/contact/message',contactMessageRoute)
app.post('/post/store',authorizeUser, storePostRoute);
app.post('/users/login',loginUser,(req,res)=>{});
app.post('/post/:id/comment',auth,createNewCommentRoute);
app.post('/post/like', postLikeRoute);


// API CALLING
app.get('/1234567890Jsonfile',(req,res)=>{
let page =  parseInt(req.query.currentPage),
    limit = 2 * page
    offset= 2
    Post.paginate({},{
        offset:offset,limit:limit,sort:[['date',-1]]},(err,result)=>{
          res.send({results:result.docs})
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
    console.log(res.statusCode)
    try{
        let id = req.params.id
        const post = await Post.findById(id).populate('comment').exec();
        const user = await User.find({username:post.username})
    }
    catch(e){
        res.render("error");
    }
   
    
})

app.use('*',(req,res)=>{
    res.render("error");
})
app.listen(port,()=>{
    console.log('App Listening on port ' + port);
    console.log("App Listening Port ");
})
