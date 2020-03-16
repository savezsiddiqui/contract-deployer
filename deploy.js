const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'bounce biology skirt tuna marriage tower treat echo usual hollow orient before',
    'https://ropsten.infura.io/v3/be76cd96bbba4cb8bc7ef15a6af1db14'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    let result;

    try {
        result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: '0x' + bytecode })
            .send({ gas: '1000000', from: accounts[0] });
    }
    catch (err) {
        console.log('Error: ', err.message);
    }

    if (result) {
        console.log('Contract deployed to', result.options.address);
    }
}

deploy();