var escrow = artifacts.require("./Escrow.sol");

module.exports = function(deployer) {
    deployer.deploy(escrow);

};