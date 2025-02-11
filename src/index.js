const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');


// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {

    res.send('home');

});


let users = [];

app.post('/users', (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "please insert name and email" });
    }

    const newUser = { id: uuidv4(), name, email };

    users.push(newUser);

    return res.status(201).json(newUser);
});


app.get('/users/:id', (req, res) => {

    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ error: "user wasn't found" });
    }

    return res.status(200).json(user);
});

app.get('/users', (req, res) => {
    return res.status(200).json(users);
});


app.put('/users/:id', (req, res) => {

    const { name, email } = req.body;
    const userInfo = users.findIndex(u => u.id === req.params.id);

    if (userInfo === -1) {

        return res.status(404).json({ error: " user wasn't found" });
    }

    if (!name || !email) {

        return res.status(400).json({ error: "please insert name and email" });
    }

    const updatedUser = { id: req.params.id, name, email };
    users[userInfo] = updatedUser;
    return res.status(200).json(updatedUser);

});

app.delete('/users/:id', (req, res) => {

    const userInfo = users.findIndex(u => u.id === req.params.id);

    if (userInfo === -1) {

        return res.status(404).json({ error: "user wasn't found" });
    }

    users.splice(userInfo, 1);
    return res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing