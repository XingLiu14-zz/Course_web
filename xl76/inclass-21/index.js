const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

let articles = {articles: [
	{id: 0, author: "Xing", text: "This is Xing's hamdsome post"},
	{id: 1, author: "James", text: "I'm KING KONG"},
	{id: 2, author: "Howard", text: "D"}
]}

const enableCORS = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
  	res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, X-Session-Id, Accept')
  	res.header('Access-Control-Expose-Headers','Location, X-Session-Id')
  	res.header('Access-Control-Allow-Credentials', 'true')
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  	if (req.method === 'OPTIONS'){
  	console.log("options")
  	res.status(200).send('OK')
  	}
  	else {
  		console.log("Next")
  		next()
  	}
}

const addArticle = (req, res) => {
	let newArticle = {
		id: articles.articles.length,
		author: "you",
		text: req.body.text
	}
	res.send(newArticle)
	articles = {articles: [...articles.articles, newArticle]}
    //console.log('Payload received', req.body)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle = (req, res) => {
	res.send(articles)
}

const headline = {headline: "yo"}
const getHeadline = (req, res) => {
	res.send(headline)
}

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)
app.get('/headlines', getHeadline)
app.use(enableCORS);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
