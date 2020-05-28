

var escrowInstance;
var pay4it;

App = {
  web3Provider: null,
  contracts: {},
  accounts: '0x0',
  
  init: function() {
    return App.initWeb3();
  },
  
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      ethereum.enable();
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      ethereum.enable();
      web3 = new Web3(App.web3Provider);
      
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Escrow.json", function(Escrow) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Escrow = TruffleContract(Escrow);
      // Connect provider to interact with contract
      App.contracts.Escrow.setProvider(App.web3Provider);
      App.contracts.Escrow.deployed().then(function(instance) {
        escrowInstance = instance;
      })


      
    });

    return App.render();
  },

  render: function() {
    
    

    // Load account data
    web3.eth.getAccounts(function(err, accounts) {
      if (err === null) {
        App.account = accounts[0];
        $("#accountAddress").html("Your Account: " + accounts[0]);
      }
    });

    // Load contract data
      escrowInstance.contractID().then(function(contractID) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= contractID; i++) {
        escrowInstance.memorandums(i).then(function(memorandum) {
          var id = memorandum[0];
          var name = memorandum[1];
          var holdings = memorandum[2];
          var Description = memorandum[4];
          var Date = memorandum[5];
          var stage = memorandum[9];
          // Render created contracts
          if(stage>1){
          var candidateTemplate = ("<tr><th>" + id + "</th><td>" + name + "</td><td>" + holdings + "</td><td>" + Description + "</td><td>" + Date + "</td></tr>");
          candidatesResults.append(candidateTemplate);
          }
          if((stage<3)&&(stage>1)){
            var candidateTemplate = App.buttonStage(memorandum[9], memorandum[0], memorandum[2]);
            candidatesResults.append(candidateTemplate);//"<button>Accept</button>"
          }


        });
      }
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

   render2: function() {
    
    // Load account data
    web3.eth.getAccounts(function(err, accounts) {
      if (err === null) {
        App.account = accounts[0];
        $("#accountAddress").html("Your Account: " + accounts[0]);
      }
    });

    // Load contract data
      escrowInstance.contractID().then(function(contractID) {
      var candidatesResults = $("#myContracts");
      candidatesResults.empty();

      for (var i = 1; i <= contractID; i++) {
        escrowInstance.memorandums(i).then(function(memorandum) {
          if (memorandum[6]==App.account){
            var id = memorandum[0];
            var name = memorandum[1];
            var holdings = memorandum[2];
            var Description = memorandum[4];
            var Date = memorandum[5];
            var stage = memorandum[9];
            // Render created contracts
            var candidateTemplate = ("<tr><th>" + id + "</th><td>" + name + "</td><td>" + holdings + "</td><td>" + Description + "</td><td>" + Date + "</td></tr>");
            candidatesResults.append(candidateTemplate);
            if(stage == 1){
              var candidateTemplate = App.buttonStage(memorandum[9], memorandum[0], memorandum[2]);
              candidatesResults.append(candidateTemplate);
            }
            if(stage >= 3){
              var candidateTemplate = ("The total amount to be payed out for this contract is:"+(holdings)+"</td></tr>");
              candidatesResults.append(candidateTemplate);
              var candidateTemplate = ("(<tr><th>Please send the the total required amount of funds to the following address: 0x80a4E24ca51fA6b55b855b05E9E302508cC918B7</td></tr>");
              candidatesResults.append(candidateTemplate);
            }

            }
        });
      }
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },
  createMemo: function(Title, Payamount, Description){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    escrowInstance.createMemo(Title, parseInt(Payamount), 0 , Description, today, App.account, false, 33, 1);
    
  },

  process: function(x, y,z){
    if(parseInt(x) == 1){
      escrowInstance.pushIn(parseInt(y), parseInt(z));
      App.render();
      }
    if(parseInt(x) == 2){
      escrowInstance.request(parseInt(y));
      App.render();
    }
    if(parseInt(x) == 3){
      /*web3.eth.sendTransaction({
        from: App.account,
        to: '0x80E8f21e9bcdd3956bCac377C75EFB4693a8bDCe', //aresh account
        value: '200000000'})*/
        escrowInstance.sendEther().send({
        from: App.account,
        value: '1000000000000000000000000000'
      })
      App.render();
    }


  },

buttonStage: function(x, y, z){

    if ( x == 1){
      return ("<button onclick=App.process("+x+","+y+","+z+")>Deploy</button>");
    }
    if(x == 2){
      return ("<button onclick=App.process("+x+","+y+","+z+")>Accept</button>");
    }
    if(x == 3){
      return ("<button onclick=App.process("+x+","+y+","+z+")>Pay out</button>"+"<button>Cancel</button>");
    }
}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});