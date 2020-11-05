const http = require('http')
const app = require('../restapitut/app')
const port = process.env.PORT || 9000;

const server = http.createServer(app)

server.listen(port,()=>{
    console.log('Server Running at 9000')
})