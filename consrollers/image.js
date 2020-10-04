const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "8f59dc8c0ac04441bce46e976865a166",
   });

const handleApiCall = (req, res) =>{
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API', err))
};
  

const handleImage = (req, res, db) => {
    const { id } = req.body;
    console.log(id);
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries :('))
}

module.exports = {
    handleImage,
    handleApiCall
}