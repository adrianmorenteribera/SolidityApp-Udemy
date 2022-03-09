const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "keep order hour enter loan response sentence fetch swarm belt harvest artefact",
  "https://rinkeby.infura.io/v3/551dc6dcbfde4498813c89d6edc24a0a"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: 5000000 });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop(); // To prevent a hanging deployment
};

deploy();
