const express = require('express')
const router = express.Router()

router.get('/users', (req,res)=>{
    const userData = [{
        "name":"Fatima Zahra",
        "email":"fatima.z0773@gmail.com",
        "password":"fatima123",
        "age": 22,
        "dateOfBirth":"01-01-2001",
        "contact":"0303-9362877",
        "city":"Islamabad",
        "Qualification":"O/A Levels"
    }
    ]
    res.send(userData)
})
module.exports = router