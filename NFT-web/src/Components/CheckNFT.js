import axios from "axios";
import { ethers } from 'ethers';
const ETHERSCAN_API_KEY = 'Q72YBZH6TBIX1HQX2H16CR564VW3RJU1XB'; // Replace with your key
const ETHERSCAN_API = 'https://api.etherscan.io/api';

const ERC721_ABI =[
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]


export async function getTokenURI(contractAddress, tokenId) {
  try {
    const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/OgX2oq12FWRTYy5zEJj9_5BHxL_JktB0");
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
    console.log("consoling the contract")
    console.log(contract)
    const tokenURI = await contract.tokenURI(tokenId);
    return { success: true, tokenURI };
  } catch (error) {
    return { success: false, error: `Error fetching tokenURI: ${error.message}` };
  }
}


export async function verifyNFT(contractAddress, tokenId) {
  try {
    console.log(`\nChecking NFT at contract: ${contractAddress}, token ID: ${tokenId}`);
    
    // Validate inputs
    if (isNaN(parseInt(tokenId)) || parseInt(tokenId) < 0) {
      return { 
        isValid: false, 
        reason: 'Invalid token ID: Token IDs must be non-negative integers' 
      };
    }
    
    const normalizedTokenId = String(parseInt(tokenId));
    
    const contractStatusCheck = await axios.get(ETHERSCAN_API, {
      params: {
        module: 'contract',
        action: 'getabi',
        address: contractAddress,
        apikey: ETHERSCAN_API_KEY
      }
    });
    
    if (contractStatusCheck.data.status === "0" && 
        contractStatusCheck.data.message === "NOTOK") {
      return { 
        isValid: false, 
        reason: 'Contract does not exist or is not verified' 
      };
    }
    
    // Known contract verification
    // BAYC verification
    if (contractAddress.toLowerCase() === '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'.toLowerCase()) {
      console.log("Recognized as BAYC contract");
      // BAYC has exactly 10,000 tokens with IDs 0-9999
      if (parseInt(normalizedTokenId) >= 0 && parseInt(normalizedTokenId) <= 9999) {
        const tokenURI = await getTokenURI(contractAddress, tokenId);
        return {
          isValid: true,
          contractAddress,
          tokenId: normalizedTokenId,
          collectionName: "Bored Ape Yacht Club",
          note: "Verified based on BAYC collection parameters",
          tokenURI: tokenURI
        };
      } else {
        return {
          isValid: false,
          reason: "Invalid token ID for BAYC (valid range: 0-9999)"
        };
      }
    }
    
    // CryptoPunks verification
    if (contractAddress.toLowerCase() === '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'.toLowerCase()) {
      console.log("Recognized as CryptoPunks contract");
      // CryptoPunks has exactly 10,000 tokens with IDs 0-9999
      if (parseInt(normalizedTokenId) >= 0 && parseInt(normalizedTokenId) <= 9999) {
        const tokenURI = await getTokenURI(contractAddress, tokenId); 
        return {
          isValid: true,
          contractAddress,
          tokenId: normalizedTokenId,
          collectionName: "CryptoPunks",
          note: "Verified based on CryptoPunks collection parameters",
          tokenURI: tokenURI
        };
      } else {
        return {
          isValid: false,
          reason: "Invalid token ID for CryptoPunks (valid range: 0-9999)"
        };
      }
    }
    
    // For other contracts, use the API to verify
    // Step 2: Check token transfers for this specific token ID
    console.log("Checking for specific NFT token transfers...");
    const tokenTransfersResponse = await axios.get(ETHERSCAN_API, {
      params: {
        module: 'account',
        action: 'tokennfttx',
        contractaddress: contractAddress,
        page: 1,
        offset: 100,
        sort: 'desc',
        apikey: ETHERSCAN_API_KEY
      }
    });
    
    // Check if we got valid NFT transfer data
    if (tokenTransfersResponse.data.status === "1" && 
        tokenTransfersResponse.data.result && 
        Array.isArray(tokenTransfersResponse.data.result) && 
        tokenTransfersResponse.data.result.length > 0) {
      
      // Look for our specific token ID in the transfers
      const tokenExists = tokenTransfersResponse.data.result.some(tx => 
        String(tx.tokenID) === normalizedTokenId
      );
      
      if (tokenExists) {
        // Get collection details from the transfer data
        const tokenInfo = tokenTransfersResponse.data.result.find(tx => 
          String(tx.tokenID) === normalizedTokenId
        );
        const tokenURI = await getTokenURI(contractAddress, tokenId);
        console.log("TokenInfo: ",tokenInfo)
        return {
          isValid: true,
          contractAddress,
          tokenId: normalizedTokenId,
          collectionName: tokenInfo.tokenName || "NFT Collection",
          tokenSymbol: tokenInfo.tokenSymbol || "NFT",
          transactionCount: tokenTransfersResponse.data.result.filter(tx => 
            String(tx.tokenID) === normalizedTokenId
          ).length,
          tokenURI: tokenURI
        };
      } else {
        // Contract exists and has NFTs, but not this specific one
        const maxTokenId = Math.max(...tokenTransfersResponse.data.result.map(tx => parseInt(tx.tokenID)));
        
        return { 
          isValid: false, 
          reason: `Token ID ${normalizedTokenId} not found in this NFT contract (highest seen: ${maxTokenId})`,
          contractExists: true,
          contractType: "NFT",
          collectionName: tokenTransfersResponse.data.result[0].tokenName || "Unknown Collection"
        };
      }
    }
    
    // If no NFT transfers found, check if it might be a different type of token
    console.log("No NFT transfers found, checking if it's another token type...");
    const tokenTxResponse = await axios.get(ETHERSCAN_API, {
      params: {
        module: 'account',
        action: 'tokentx',
        address: contractAddress,
        page: 1,
        offset: 10,
        sort: 'desc',
        apikey: ETHERSCAN_API_KEY
      }
    });
    
    if (tokenTxResponse.data.status === "1" && 
        tokenTxResponse.data.result && 
        tokenTxResponse.data.result.length > 0) {
      // This is a token contract, but not an NFT
      return { 
        isValid: false, 
        reason: 'Contract exists but appears to be a fungible token, not an NFT',
        contractExists: true,
        contractType: "ERC20",
        tokenName: tokenTxResponse.data.result[0].tokenName || "Unknown Token",
        tokenSymbol: tokenTxResponse.data.result[0].tokenSymbol || "???"
      };
    }
    
    // Final fallback - contract exists but we can't determine much about it
    return { 
      isValid: false, 
      reason: 'Contract exists but no token transactions found',
      contractExists: true
    };
    
  } catch (error) {
    console.error('Error verifying NFT:', error);
    return { 
      isValid: false, 
      reason: `Error verifying NFT: ${error.message}` 
    };
  }
}

async function checkNFT() {
  try {
    // Test cases
    const testCases = [
      // Valid NFTs
      { contract: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', tokenId: '8817', desc: "BAYC #8817" },
      { contract: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', tokenId: '7804', desc: "CryptoPunk #7804" },
      
      // Invalid token IDs
      { contract: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', tokenId: '9999', desc: "BAYC Invalid Range" },
      { contract: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', tokenId: '-1', desc: "Negative Token ID" },
      
      // Test a random contract
      { contract: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d', tokenId: '1785113', desc: "CryptoKitties #1785113" },
      { contract: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5', tokenId: '9816', desc: "idk #69" },
      { contract: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e', tokenId: '9956', desc: "idk #1" },
    ];
    
    for (const test of testCases) {
      const result = await verifyNFT(test.contract, test.tokenId);
      console.log(`\n${test.desc} Result:`);
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (mainError) {
    console.error("Critical error in main function:", mainError);
  }
}

checkNFT();