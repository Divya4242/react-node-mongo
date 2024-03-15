require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongo = require('./connectToMongo');
const User = require('./models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
var fs = require('fs');
const middleware = require('./middleware/middleware');
const Post = require('./models/PostModel');

connectToMongo();
const app = express();
app.use(cors({credentials: true, origin: "http://localhost:8080"}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// for multer
const upload = multer({ dest: 'uploads/' });

// Register route
app.post('/register', async (req, res) => {
    const {userName, password} = req.body;

    try {
        //If user already exists
        let userExists = await User.findOne({userName});
        if(userExists) {
            console.log(userName + " inside1" + password)
            return res.status(400).json("User Already Exists");
        }

        //Creating hashed Pass
        const salt = await bcrypt.genSalt(11);
        const hashedPass = await bcrypt.hash(password, salt);

        //Storing user to database
        const user = await User.create({userName, password:hashedPass});
        jwt.sign({userName, id: user._id}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err){
            console.log(userName + " inside2" + password)
                return res.status(500).json("Internal Server Error. Try again later");
            }
            user.save();
            res.status(200).json(token);
        });
    } catch (error) {
        console.log(userName + " inside" + password)

        res.status(500).json("Internal Server Error. Try again later" + error);
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const {userName, password} = req.body;

        //User exists or not
        const userExists = await User.findOne({userName});
        if(userExists){
            const passwordCompare = await bcrypt.compare(password, userExists.password);

            //Comparing password
            if(passwordCompare){
                //signing jwt
                jwt.sign({userName, id: userExists._id}, process.env.JWT_SECRET, {}, (err, token) => {
                    if(err){
                        return res.status(500).json("Internal Server Error. Try again later");
                    }

                    //updating token value in database
                    const updateToken = User.updateOne({userName}, {
                        $set: {
                            token
                        }
                    }, () => {});

                    //sending token to frontend
                    res.status(200).json(token);
                });
            }else{
                res.status(400).json("Password not match");
            }
        }else{
            res.status(400).json("User Not Exists");
        }
    } catch (error) {
        res.status(500).json("Internal Server Error. Try again later");
    }
});

// Profille route
app.get('/profile', (req, res) => {
    const token = req.headers.authorization;
    try {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
            if(err){
                return res.status(400).json(err);
            }
    
            res.status(200).json(data);
        })
    } catch (error) {
        return res.status(500).json('Internal server Error. Try again later');
    }
});

// Adding new post route
app.post('/addpost', upload.single('file'), (req, res) => {
    
    try{
        const {token} = req.body;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err){
                return res.status(400).json(err);
            }

            const {title, summary, content} = req.body;
            const {originalname, path} = req.file;
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            fs.renameSync(path, path+ '.' + extension);
            
            const postDoc = await Post.create({
                title,
                summary,
                content,
                coverImg: path + '.' + extension,
                author: data.id
            });
            postDoc.save();
            res.status(200).json("Sucessfully posted");
        })
    }catch(err){
        return res.status(500).json('Internal server Error. Try again later');
    }
});

// Geeting only my posts + authentication
app.get('/getmyposts', (req, res) => {
    const token = req.headers.authorization;

    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err){
                return res.status.apply(400).json(err);
            }
            const allPosts = await Post.find().populate('author', 'userName').sort({createdAt: -1});
            res.status(200).json(allPosts);
        })
    }catch(error){
        return res.status(500).json('Internal server Error. Try again later');
    }
});

// Getting all pages
app.get('/getAllPost', async (req, res) => {
    const allPosts = await Post.find().populate('author', 'userName').sort({createdAt: -1});
    res.status(200).json(allPosts);
});

// Getting details of specific post
app.get('/post/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const data = await Post.findById(id).populate('author', 'userName');
        res.status(200).json(data);
    }catch(err){
        return res.status(500).json('Internal server Error. Try again later');
    }
});

app.get('/edit/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json(id);
});

app.put('/post/:id', upload.single('file'), async (req, res) => {
    const token = req.headers.authorization;
    const {id} = req.params;

    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err){
                return res.status(400).json(err);
            }

            const sameUser = await Post.findById(id);
            // console.log(sameUser.author.toString(), data.id);

            if(sameUser.author.toString() === data.id){
                const {title, summary, content} = req.body;

                if(req.file){
                    const {originalname, path} = req.file;
                    const parts = originalname.split('.');
                    const ext = parts[parts.length - 1];
                    fs.renameSync(path, path+ '.' + ext);

                    const postDoc = await Post.findOneAndUpdate({_id: id}, {
                        title,
                        summary,
                        content,
                        coverImg: path + '.' + ext
                    });

                    res.status(200).json("Sucessfully Updated");
                }else{
                    const postDoc = await Post.findOneAndUpdate({_id: id}, {
                        title,
                        summary,
                        content,
                    });

                    res.status(200).json("Sucessfully Updated");
                }
            }
            else{
                return res.status(400).json("You can't update someone's post");
            }
        })
    }catch(err){
        return res.status(500).json('Internal server Error. Try again later');
    }

});
app.get('/',(req,res)=>{
    res.send("Hello");
})
// Deleting post route
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if(err){
                return res.status(400).json(err);
            }

            const sameUser = await Post.findById(id);
            console.log(sameUser)

            if(sameUser.author?.toString() === data.id){
                const deletePost = await Post.findOneAndDelete({_id: id});
                res.status(200).json("Sucessfully Deleted");
            }else{
                return res.status(400).json("You can't delete someone's post");
            }
        });
    } catch (error) {
        return res.status(500).json('Internal server Error. Try again later');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});