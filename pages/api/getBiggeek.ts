let data = [];
try {
    data = require('./data/biggeek.json');
} catch(e) {

}

export default (req, res) => {
    console.log(data)
    res.status(200).json(data);
};