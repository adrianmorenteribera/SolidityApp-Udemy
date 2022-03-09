import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// const a = JSON.parse(abi);
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x8Cac0997A9668667594301469D81197771D9B307"
);

export default instance;
