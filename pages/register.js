import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { ethers } from "ethers";

export default function register() {
  const [ticket, setTicket] = useState(false);
  let walletaddress;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    walletaddress = await signer.getAddress();
    console.log("Connected to " + walletaddress);

    const contractaddress = "0xdE39a8bb64DEA239Fe05C3ac11033A92d0c26eD8";
    const contractAbi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "TransferReceived",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "_destAddr",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "TransferSent",
        type: "event",
      },
      {
        inputs: [],
        name: "balance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_link",
            type: "string",
          },
        ],
        name: "transferERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "destAddr",
            type: "address",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ];

    const contract = new ethers.Contract(
      contractaddress,
      contractAbi,
      provider
    );

    console.log(await contract.owner());
    console.log(name);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <section class="min-h-screen pt-40">
        <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:py-12 lg:col-span-2">
              <h1 href="" class="text-2xl font-bold text-pink-600 mb-10">
                Event details
              </h1>
              <p class="max-w-xl text-lg text-white">
                Event description : The Solana Foundation Hacker House is a
                five-day offline event with in-person guidance from core Solana
                Labs engineers, as well as mentorship from other partners.
              </p>
              <p class="max-w-xl text-lg text-white mt-4">
                Event address : Sheraton Grand, Metaluru.
              </p>
            </div>

            {ticket != true ? (
              <div class="p-8 bg-gradient-to-br from-[#00D0B0] to-[#38003C] rounded-lg shadow-lg lg:p-12 lg:col-span-3">
                <div class="space-y-4">
                  <div className="space-y-4">
                    <label class="sr-only text-black" for="name">
                      Name
                    </label>
                    <input
                      class="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 pb-10">
                    <div>
                      <label class="sr-only" for="email">
                        Email
                      </label>
                      <input
                        class="w-full p-3 text-sm border-gray-200 rounded-lg"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    <div>
                      <label class="sr-only">Bio Link</label>
                      <input
                        class="w-full p-3 text-sm border-gray-200 rounded-lg"
                        placeholder="Bio link"
                        onChange={(event) => setBio(event.target.value)}
                        value={bio}
                      />
                    </div>
                  </div>

                  <div class="mt-20 flex space-x-5">
                    <button
                      onClick={() => connect()}
                      class="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto"
                    >
                      <span class="font-medium">Complete Registration</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div class="p-8 bg-gradient-to-br from-[#00D0B0] to-[#38003C] rounded-lg shadow-lg lg:p-12 lg:col-span-3">
                <h2 className="font-bold text-lg mb-4 text-center">
                  Scan the QR for entry
                </h2>
                <div className="flex justify-center items-center">
                  <QRCode
                    className="rounded-lg"
                    logoWidth={40}
                    logoHeight={40}
                    value="https://blocktrain.info"
                    logoImage="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                  />
                </div>
                <div className="flex justify-center items-center mt-5">
                  <button class="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto">
                    <span class="font-medium">Save ticket</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
