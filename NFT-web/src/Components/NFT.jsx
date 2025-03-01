import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, Search } from 'lucide-react';
import { verifyNFT } from './CheckNFT';

const NFT = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Example NFT images for successful verification
  const nftImages = {
    "Bored Ape Yacht Club": "/api/placeholder/300/300",
    "CryptoPunks": "/api/placeholder/300/300",
    "CryptoKitties": "/api/placeholder/300/300",
    "Milady": "/api/placeholder/300/300",
    "Default": "/api/placeholder/300/300"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVerificationResult(null);
    
    if (!contractAddress || !tokenId) {
      setError('Please enter both contract address and token ID');
      return;
    }

    setIsLoading(true);

    try {
      // Get the verification result from the API
      const result = await verifyNFT(contractAddress, tokenId);
      console.log(result);
      // Set the verification result (don't hardcode to false)
      setVerificationResult(result);
    } catch (err) {
      setError('Error verifying NFT: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">NFT Verification Tool</h1>
        <p className="text-gray-600">Verify the authenticity of any NFT on Ethereum</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Verify an NFT</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="contractAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Contract Address
              </label>
              <input
                id="contractAddress"
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700 mb-1">
                Token ID
              </label>
              <input
                id="tokenId"
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter token ID (e.g., 8817)"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="mr-2" size={20} />
                  Verify NFT
                </>
              )}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
                {error}
              </div>
            )}
          </form>
          
          <div className="mt-8">
            <h3 className="text-gray-700 font-medium mb-2">Popular Collections</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button 
                onClick={() => {
                  setContractAddress('0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D');
                  setTokenId('8817');
                }}
                className="p-2 text-left hover:bg-gray-100 rounded"
              >
                BAYC #8817
              </button>
              <button 
                onClick={() => {
                  setContractAddress('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');
                  setTokenId('7804');
                }}
                className="p-2 text-left hover:bg-gray-100 rounded"
              >
                CryptoPunk #7804
              </button>
              <button 
                onClick={() => {
                  setContractAddress('0x5Af0D9827E0c53E4799BB226655A1de152A425a5');
                  setTokenId('8000');
                }}
                className="p-2 text-left hover:bg-gray-100 rounded"
              >
                Milady #8000
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Display */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Verification Results</h2>
          
          {!verificationResult && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Search size={48} className="mb-4 text-gray-400" />
              <p className="text-center">Enter a contract address and token ID to verify an NFT</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 size={48} className="animate-spin mb-4 text-blue-500" />
              <p className="text-center text-gray-700">Verifying NFT...</p>
            </div>
          ) : verificationResult?.isValid ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-500 mr-2" size={24} />
                <h3 className="text-lg font-medium text-green-800">Valid NFT</h3>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                {/* <div className="w-full md:w-1/2 mb-4 md:mb-0 flex justify-center">
                  <img 
                    src={nftImages[verificationResult.collectionName] || nftImages.Default} 
                    alt="NFT Preview" 
                    className="rounded-lg shadow w-36 h-36 object-cover"
                  />
                </div> */}
                
                <div className="w-full md:w-1/2">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Collection:</span>
                    <p className="font-semibold text-gray-800">{verificationResult.collectionName}</p>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Token ID:</span>
                    <p className="font-mono bg-gray-100 p-1 rounded text-gray-800">{verificationResult.tokenId}</p>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Contract:</span>
                    <p className="font-mono bg-gray-100 p-1 rounded text-xs text-gray-800 overflow-hidden text-ellipsis">
                      {verificationResult.contractAddress}
                    </p>
                  </div>
                  
                  {verificationResult.transactionCount && (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-600">Transactions:</span>
                      <p className="text-gray-800">{verificationResult.transactionCount}</p>
                    </div>
                  )}
                  
                  {verificationResult.note && (
                    <div className="text-xs text-gray-600 mt-2 italic">
                      {verificationResult.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <XCircle className="text-red-500 mr-2" size={24} />
                <h3 className="text-lg font-medium text-red-800">Invalid NFT</h3>
              </div>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">Reason:</span>
                <p className="text-red-700">{verificationResult?.reason || "Unknown error"}</p>
              </div>
              
              {verificationResult?.contractExists && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Contract Status:</span>
                  <p className="text-gray-800">
                    {verificationResult.contractExists ? "Contract exists" : "Contract not found"}
                    {verificationResult.contractType ? ` (${verificationResult.contractType})` : ""}
                  </p>
                </div>
              )}
              
              {verificationResult?.collectionName && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Collection:</span>
                  <p className="text-gray-800">{verificationResult.collectionName}</p>
                </div>
              )}
              
              <div className="text-xs text-gray-600 mt-4">
                This token either does not exist or cannot be verified on the blockchain.
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-500 text-center">
        <p>Powered by Etherscan API • Use for verification purposes only</p>
        <p className="mt-1">Results are based on on-chain data and may take time to reflect recent transactions</p>
      </div>
    </div>
  );
};

export default NFT;