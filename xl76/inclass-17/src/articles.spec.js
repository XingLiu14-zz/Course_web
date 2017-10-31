/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles.length).to.be.above(2)
        })
			.then(done)
			.catch(done)
		//done(new Error('Not implemented'))
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		const newArti0 = {author: "BillyKing", text: "YoYoYo"}
		const newArti1 = {author: "BananaDragon", text: "HIGH"}

		fetch(url('/articles'), {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newArti0)
        })
        .then(res =>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then((newArti) => {
            expect(newArti).to.have.ownProperty('id')
            expect(newArti.author).to.eql(newArti0.author)
            expect(newArti.text).to.eql(newArti0.text)
            return newArti.id
        })
        .then(lastID => {
                fetch(url('/articles'),{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(newArti1)
                })
                .then(res => {
                    expect(res.status).to.eql(200)
                    return res.json()
                })
                .then(newNewArti => {
                    expect(newNewArti).to.have.ownProperty('id')
                    expect(newNewArti.author).to.eql(newArti1.author)
                    expect(newNewArti.text).to.eql(newArti1.text)
                    expect(newNewArti.id).to.eql(lastID + 1)
                })
            }
        )
        .then(done)
        .catch(done)
		//done(new Error('Not implemented'))
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
        fetch(url("/articles"))
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            return (body.articles[0].id)
        })
        .then(id => {
            fetch(url(`/articles/${id}`))
            .then(res => {
                expect(res.status).to.eql(200)
                return res.json()
            })
            .then(body => {
                expect(body.id).to.eql(id)
            })
        })
        .then(done)
        .catch(done)
		//done(new Error('Not implemented'))
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
        fetch(url("/articles/-1"))
        .then(res => {
            return res.text()
        })
        .then( text => {
            expect(text).to.eql('')
        })
        .then(done)
        .catch(done)
		//done(new Error('Not implemented'))
	}, 200)

});