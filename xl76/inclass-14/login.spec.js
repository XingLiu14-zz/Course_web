import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        let newMessage = "xl76";
        let input = findId('newHeadline');
        
        it('should update headline', (done) => {
            sleep(100)
            .then(input.sendKeys(newMessage))
            .then(findId('headline').click())
            .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('you are logged in as guest "xl76"')
            }))
            .then(input.clear())
        });

            sleep(100)
            .then(input.sendKeys('I am old'))
            .then(findId('headline').click())
            .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('you are logged in as guest "I am old"')
            }
            ))
        .then(done);
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })


})
