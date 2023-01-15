const LazyNFT = artifacts.require('LazyNFT');


module.exports=async function(deployer, network, accounts){
    await deployer.deploy(LazyNFT, accounts[1])
};