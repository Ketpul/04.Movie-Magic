import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('It Works')
});


app.listen(5000, () => console.log('Server is listening on htpp://localhost:5000...'));