const express = require('express');
const router = express.Router();

//import database
const connection = require('../config/db');

router.get('/', function (req,res){
    connection.query('SELECT * FROM mahasiswa ORDER BY id_m DESC', function(err, rows){
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Mahasiswa',
                data: rows
            })
        }
    })
});

module.exports = router;