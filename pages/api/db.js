import db from '../../db.json'

const dbHeader = (req, res) => {
    if(req.methotd === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    res.json(db);
}

export default dbHeader