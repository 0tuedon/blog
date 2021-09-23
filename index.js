const   path                        =   require('path'),
        expressEdge                 =   require('express-edge'),
        express                     =   require('express'),
        mongoose                    =   require('mongoose'),
        app                         =   express(),

        port                        =   process.env.PORT || 4000

// Connection of Mongoose to the server
let         severMongoose           =   'mongodb://localhost/emutBlog';
mongoose.connect(severMongoose, {useNewUrlParser:true})
    .then(()=> 'You are Now Connected to Mongo')
    .catch(err=> console.error('There was an Error SomeWhere' , err))
app.use(express.static('public'))
app.set('view engine','ejs');
app.get('/', (req,res)=>{
    res.render(path.resolve(__dirname, 'views/index.ejs'))
});

app.get('/about', (req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/post',(req,res)=>{
    res.render('post');
})
app.get('/post/new',(req,res)=>{
    res.render('create')
})
app.listen(port,()=>{
    console.log('App Listening on port ' + port);
})