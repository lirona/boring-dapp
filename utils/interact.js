require("dotenv").config();
const rpcURL = "https://rpc.ankr.com/eth";
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);
const Web3 = require("web3");
const web3 = new Web3(rpcURL);

// const contractABI = require("../artifacts/contracts/Greeter.json");
// const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"; // you need this from Liron

// export const helloWorldContract = new web3.eth.Contract(
//   contractABI.abi,
//   contractAddress
// );

function ascii_to_hex(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

export const callTransfer = async (sender, recipient, message) => {
  const hex = ascii_to_hex(message);

  console.log(sender, recipient, hex);
  const res = await web3.eth.sendTransaction({
    from: sender,
    to: recipient, // new wallet address
    val: web3.utils.toWei("1", "ether"),
    data: hex, // todo turn this into hex
  });

  console.log(res);
  return res;
};

export const loadCurrentMessage = async () => {
  // const message = await helloWorldContract.methods.message().call();
  // return message;
  return "hallohalloo";
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }
  //set up transaction parameters
  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: address, // must match user's active address.
  //   data: helloWorldContract.methods.update(message).encodeABI(),
  // };

  //sign the transaction
  try {
    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [transactionParameters],
    // });
    const txHash = "0xajdjjs"; // change this back once you have the contract abi
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
