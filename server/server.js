const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.get('/api/getRows', (req, res) =>{
    res.json({rows: ['A', 'B', 'C', 'D', 'E', 'F']})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
