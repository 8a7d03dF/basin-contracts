const ethers = require("ethers");
const axios = require("axios");

// Connection setup
const BASE_RPC = "https://mainnet.base.org";
// Address of keeper is: 0x9D3C484c7352bee187732aBF9b9829446e6b0caf
const KEEPER_PK =
  "05f4bd81362a4aa5ebaba11ed9190d0e9572c3841cb2c03e6a21e5431c2f3952";
// Bots Channel
const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1136739121004556448/Jt6-PqLtpXttmjfAVQvtSrVSvdfFPa2mE3tg-5CET8EuhyWR2GDHsKCJV9VoQYFncKNN";
const ADMIN_ROLE_ID = "1135347290631061564";
const ORACLE_BASIN = "0x9Cd9e8f826646bC408F5BA070d7510A7ff3D38Bb";
// bETH address
const CTOKEN_ADDRESS = "0x1D1293Fa7F61dCde7B16bd6482558fC80C4080f5"; // Address of CToken

const provider = new ethers.providers.JsonRpcProvider(BASE_RPC);
const wallet = new ethers.Wallet(KEEPER_PK, provider);

// Send a ping to the webhook
function sendPing(message) {
  axios.post(WEBHOOK_URL, { text: message }).catch((error) => {
    console.error(error);
    sendPing(
      `Error: ${error.message} \n ${error.stack} \n <@${ADMIN_ROLE_ID}>`
    );
  });
}

// Contract setup
const ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "cToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setFixedPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new ethers.Contract(ORACLE_BASIN, ABI, wallet);

// Coingecko API URL for Ethereum
const url =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

// Initialize price
let oldPrice;
axios
  .get(url)
  .then((response) => {
    oldPrice = response.data.ethereum.usd;
  })
  .catch((error) => {
    console.error(error);
    sendPing(
      `Error: ${error.message} \n ${error.stack} \n <@${ADMIN_ROLE_ID}>`
    );
  });

setInterval(() => {
  // Fetch new price
  axios
    .get(url)
    .then((response) => {
      const newPrice = response.data.ethereum.usd;

      // Check ETH balance, ping if it's low
      wallet
        .getBalance()
        .then((balance) => {
          const ethBalance = ethers.utils.formatEther(balance);
          if (ethBalance < "0.01") {
            sendPing(`ETH balance is low. Please top up. <@${ADMIN_ROLE_ID}>`);
          }
        })
        .catch((error) => {
          console.error(error);
          sendPing(
            `Error: ${error.message} \n ${error.stack} \n <@${ADMIN_ROLE_ID}>`
          );
        });

      // Check price change
      const priceChange = Math.abs((newPrice - oldPrice) / oldPrice);

      if (priceChange > 0.02) {
        // More than 2% change

        // Call setFixedPrice() function
        const tx = contract.setFixedPrice(
          CTOKEN_ADDRESS,
          ethers.utils.parseEther(newPrice.toString()),
          { gasPrice: ethers.utils.parseUnits("0.03", "gwei") } // Set the gas price here
        );
        tx.wait()
          .then((receipt) => {
            console.log(receipt);
            sendPing(
              "Price change detected: " +
                priceChange +
                "%" +
                "\n" +
                "New price: $" +
                newPrice +
                "\n" +
                "Transaction hash: " +
                receipt.transactionHash +
                "\n" +
                "Link: https://basescan.org/tx/" +
                receipt.transactionHash
            );
          })
          .catch((error) => {
            console.error(error);
            sendPing(
              `Error: ${error.message} \n ${error.stack} \n <@${ADMIN_ROLE_ID}>`
            );
          });
      }

      // Update old price
      oldPrice = newPrice;
    })
    .catch((error) => {
      console.error(error);
      sendPing(
        `Error: ${error.message} \n ${error.stack} \n <@${ADMIN_ROLE_ID}>`
      );
    });
}, 7.5 * 60 * 1000); // Run every 7.5 minutes
