# Negotium
A Dapp, that aims to decentralize the global international investment sphere and provide a better system for buisness-level interactions between participating parties from different countries

#Instructions to run Dapp

To run the Dapp it is imperative for one to be using a macine that has Truffle and Npm installed. 
In addition for the DApp to work one must have MetaMask added on their default browser. Lastly, one needs to have Ganache installed whether it be the client version or AppImage. 

Before do anything, it is best if one first starts Ganache and and copies the private key of anaddress of their choosing. Afterwards it necessary to open an IDE like visual studio and/or open the terminal to navigate to the folder containing "Negotium". afterwards one muust run "truffle migrate --reset" to get the Smart contract deployed and haveit loaded wit the 2 preset data entries pushed inside the Smart Contract in its constructor. Afterwards once the 2 migrations have been deployed successfully and the execution of the command has finished, one must then run "npm run dev". This will open the Dapp on the default browser. Once the DApp pops up, unless Metamask was already  logged into on the browser, it won't be usable out the gate. Therefore, one must then open MetaMask, log into it, and refresh the browser. they may be prompted for connection to the smart contract and afterwards the DApp will be usable.
