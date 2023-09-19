const express = require('express')
const app = express()
const port = 3000


app.get('/', (req,res)=>{
    res.send('Halo Saya Fitria Evi Susana')
})

app.listen(port, () => {
    console.log(`aplikasi akan berjalan di http://localhost${port}`)
})