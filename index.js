const ethers = require("ethers");
const {AarcCore} = require ("@aarc-xyz/core");

const aarcSDK = new AarcCore(
    process.env.NEXT_PUBLIC_AARC_API_KEY
);

const provider = new ethers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const SOURCE_CHAIN_TOKEN_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC on Polygon PoS
const DESTINATION_CHAIN_TOKEN_ADDRESS = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const SOURCE_CHAIN_ID = 137; // Polygon PoS
const DESTINATION_CHAIN_ID = 42161; // Arbitrum 
const SOURCE_CHAIN_TOKEN_AMOUNT = 2000000; // 2 USDC
const RECIPIENT_ADDRESS = "0x1Cb30cb181D7854F91c2410BD037E6F42130e860";


async function main() {
    try {
        console.log("Performing Deposit...")
        console.log(`Transferring ${SOURCE_CHAIN_TOKEN_AMOUNT} USDC from Polygon PoS to Arbitrum`)
        let response = await aarcSDK.performDeposit({
            senderSigner: signer,
            fromChainId: SOURCE_CHAIN_ID,
            fromTokenAddress: SOURCE_CHAIN_TOKEN_ADDRESS,
            toChainId: DESTINATION_CHAIN_ID,
            toTokenAddress: DESTINATION_CHAIN_TOKEN_ADDRESS,
            fromAmount: SOURCE_CHAIN_TOKEN_AMOUNT,
            userAddress: signer.address,
            recipient: RECIPIENT_ADDRESS
        });

        console.log("Response: ", response);
    } catch (error) {
        console.log("Error: ", error);
    }

    for (i = 0; i < response.length; i++) {
        console.log("Transaction Link: ", `https://polygonscan.com/tx/${response[i].hash}`);
    }
}

main();