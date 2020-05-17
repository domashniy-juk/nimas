const fs = require('fs');
import biggeek from '../../spiders/biggeek';

export default (req, res) => {
    biggeek().then(data => {
        console.log(data)
        if(data) {
            fs.writeFile('pages/api/data/biggeek.json', JSON.stringify(data, null, 4), err => err ? res.end('error') : res.end('success!!!'));
        }
    })
};