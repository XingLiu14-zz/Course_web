const express = require('express')
const bodyParser = require('body-parser')

let articles = {articles: [
	{id: 0, author: "Xing", text: "This is Xing's hamdsome post"},
	{id: 1, author: "James", text: "I'm KING KONG"},
	{id: 2, author: "Howard", text: "D"}
]}

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

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
