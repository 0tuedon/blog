const   path                        =   require('path'),
        expressEdge                 =   require('express-edge'),
        express                     =   require('express'),
        mongoose                    =   require('mongoose'),
        bodyParser                  =   require('body-parser'),
        Post                        =   require('./models/post');
        app                         =   express(),

        port                        =   process.env.PORT || 4000

// Connection of Mongoose to the server
let         severMongoose           =   'mongodb://localhost/emutBlog';
mongoose.connect(severMongoose, {useNewUrlParser:true})
    .then(()=> 'You are Now Connected to Mongo')
    .catch(err=> console.error('There was an Error SomeWhere' , err))
app.use(express.static('public'))
app.set('view engine','ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));
app.get('/', async (req,res)=>{
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});

app.get('/about', (req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/post',(req,res)=>{
    res.render('index.js');
})
app.get('/post/new',(req,res)=>{
    res.render('create')
})
app.post('/post/store', async (req,res)=>{
    console.log(req.body)
    await Post.create(req.body, 
         (error,post) =>{
             if(err){
                 console.log(err);
             }
             else{
            res.redirect('/');
            console.log(post);
             }
        })
})

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