const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        user_name: req.body.uname,
        password: req.body.pass,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        createdAt: new Date()
    });
    res.status(201).send();
});


// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://ISuser1:cs461is@cluster1.hc6zx.mongodb.net/Infinity?retryWrites=true&w=majority',
        {
            useNewUrlParser: true
        }
    );

    return client.db('Infinity').collection('Users');
}

module.exports = router;