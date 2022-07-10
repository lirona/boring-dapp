import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
  callTransfer,
} from "../utils/interact";

require("dotenv").config();
const rpcURL = "https://rpc.ankr.com/eth";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message
  const [newMessage, setNewMessage] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newWalletAddress, setWalletAddress] = useState("");

  console.log(newWalletAddress);

  //called only once
  useEffect(async () => {
    const message = await loadCurrentMessage();
    setMessage(message);
    addSmartContractListener();

    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addSmartContractListener() {
    // helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    //   if (error) {
    //     setStatus("😥 " + error.message);
    //   } else {
    //     setMessage(data.returnValues[1]);
    //     setNewMessage("");
    //     setStatus("🎉 Your message has been updated!");
    //   }
    // });
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onUpdatePressed = async () => {
    const sender = window.ethereum.selectedAddress;
    const recipient = newWalletAddress;
    const message = newMessage;
    const val = newAmount;
    const status = await callTransfer(sender, recipient, message, val);
    setStatus(status);
  };

  function ascii_to_hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }

  const Web3 = require("web3");
  const web3 = new Web3(Web3.givenProvider);

  const callTransfer = async (sender, recipient, message, val) => {
    const hex = ascii_to_hex(message);

    console.log(sender, recipient, hex, val);

    const res = await web3.eth.sendTransaction({
      from: sender,
      to: recipient, // new wallet address
      val: web3.utils.toWei("0.000002"),
      // data: web3.utils.utf8ToHex(message),
    });

    console.log(res);
    return res;
  };

  //the UI of our component
  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>onchain</title>
        <meta
          name="description"
          content="Interact with a simple smart contract from the client-side."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="container">
        <h1 className="text-4xl font-semibold mb-8">
          Send messages on chain :)
        </h1>
        <img id="logo" src="public/onchainlogo.png"></img>
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
            <p>{message}</p>

            <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

            <input
              type="text"
              className="border p-4 w-100 text-center"
              placeholder="Update the message in your smart contract."
              onChange={e => setNewMessage(e.target.value)}
              value={newMessage}
            />

            <input
              type="text"
              className="border p-4 w-100 text-center"
              placeholder="Send ETH"
              onChange={e => setNewAmount(e.target.value)}
              value={newAmount}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="border p-4 w-100 text-center"
              placeholder="Enter wallet address"
              onChange={e => setWalletAddress(e.target.value)}
              value={newWalletAddress}
            />
          </div>

          <p id="status">{status}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
            onClick={onUpdatePressed}
          >
            Send message{" "}
          </button>
        </div>
        <footer className="mt-20">
          <a
            href="https://github.com/tomhirst/solidity-nextjs-starter/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            Read the docs
          </a>
        </footer>
      </div>
    </div>
  );
};

export default HelloWorld;
