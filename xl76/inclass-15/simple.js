const http = require('http')

const host = '127.0.0.1'
const port = process.env.PORT || 3333

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)


     if(req.method == 'GET') {
          if(req.url == '/') {
               const payload = { 'hello': 'world' }
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end(JSON.stringify(payload))
          }
          if(req.url == 'articles') {
               const payload = { 'articles': [{
                    'id': 1,
                    'author': 'James',
                    'body': 'A post'
               }, {
                    'id': 2,
                    'author': 'Howard',
                    'body': 'Another post'
               }, {
                    'id': 3,
                    'author': 'Duncan',
                    'body': 'Another another post'
               }]}
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end(JSON.stringify(payload))
          }
     }
     if(req.method == 'PUT') {
          if(req.url == '/logout') {
               res.end(JSON.stringify('OK'))
          }
     }
     if(req.method == 'POST') {
          if(req.url == '/login') {
               var obj = JSON.parse(req.body)
               const payload = { 'username': obj.username,
               'result': 'success' }
               res.end(JSON.stringify(payload))
          }
     }


}