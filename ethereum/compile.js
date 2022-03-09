const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Create a reference to the build folder and empty it befor compiling the contract again
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Create a reference to the Campaign contract and read it
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Campaign.sol"
];

// Check if the path exists, if not creates it.
fs.ensureDirSync(buildPath);

// Creates a JSON file in the specified folder for each of the contracts in the output object
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + ".json"),
    output[contract]
  );
}

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   "Campaign.sol"
// ].Campaign;

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//     "Campaign.sol"
//   ].CampaignFactory;
