import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/551dc6dcbfde4498813c89d6edc24a0a"
  );
  web3 = new Web3(provider);
}

export default web3;
