const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts, inbox;

// beforeEach(async () => {
//     accounts = await web3.eth.getAccounts();
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//         .deploy({ data: bytecode, arguments: ['Hi There !'] })
//         .send(({ from: accounts[0], gas: '1000000' }));
// });

// describe('Inbox', () => {

//     it('deploys a contract', () => {
//         assert.ok(inbox.options.address);
//     });

//     it('has a default message', async () => {
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'Hi There !');
//     })

//     it('can change the message', async () => {
//         await inbox.methods.setMessage('bye').send({ from: accounts[0] })
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'bye');
//     })
// });

describe('Lottery', () => {

    it('requires a minimum amount of ether', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('Only manager can pick the winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch (err) {
            assert(err)
        }
    });

});