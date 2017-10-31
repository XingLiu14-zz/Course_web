let articles = {articles: [
	{id: 0, author: "Xing", text: "This is Xing's hamdsome post"},
	{id: 1, author: "James", text: "I'm KING KONG"},
	{id: 2, author: "Howard", text: "D"}
]}

const reqHeaders = (req, res) => {
	console.log('req method      :',req.method)
	console.log('req url         :',req.url)
	console.log('req content-type:',req.headers['content-type'])
	console.log('req payload     :',req.body)
}

const getArticleById = (req, res) => {
	reqHeaders(req, res)
	let findArti = articles.articles.find(arti => {return arti.id == req.params.id})
	if(findArti) res.send(findArti)
	else res.end()
}

const postArticle = (req, res) => {
	const newId = articles.articles.length
	const newArticle = {id: newId, author: req.body.author, text: req.body.text}
	articles.articles.push(newArticle)
	res.send(newArticle)
}

const getAllArticles = (req, res) => {
	reqHeaders(req, res)
	res.send(articles)
}

module.exports = (app) => {
	app.get('/articles', getAllArticles)
	app.get('/articles/:id', getArticleById)
	app.post('/articles', postArticle)
}
