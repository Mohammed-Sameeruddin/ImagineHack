App = {
    contracts: {},

    load: async ()=> {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.renderTasks()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
          // Modern dapp browsers...
          if (window.ethereum) {
            
            window.web3 = new Web3(ethereum)
            try {
              // Request account access if needed
              // await ethereum.enable()
              await eth_requestAccounts()
              // Acccounts now exposed
              await web3.eth.sendTransaction({})
              
              
              
            } catch (error) {
              // User denied account access...
            }

          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
             await web3.eth.sendTransaction({})
          }
          // Non-dapp browsers...
          else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        const myacc = await web3.eth.getAccounts();
       //App.account = web3.eth.accounts[1]
       // console.log(App.account);
       //console.log(myacc);
        
       App.account = myacc;

       // const acc = document.getElementById("myhash");
        //acc.innerHTML=myacc;
      },


    loadContract: async () => {
        const media = await $.getJSON('Media.json');
        App.contracts.Media = TruffleContract(media)
        App.contracts.Media.setProvider(App.web3Provider)

        App.media = await App.contracts.Media.deployed()
    },

    renderTasks: async () => {
        
        const taskCount = await App.media.totalpost();
        //console.log(taskCount);
        //const $tasklist = $('.taskList');
       //var ul = document.getElementById('myul');
       //const $taskTemplate = $(".card");
       var div = document.getElementById("unique");
      //  div.className = "my";
      var container = document.getElementById("my");
        for(var i=1;i<=taskCount;i++){
            const post = await App.media.userpost(App.account[0],i);


         const postDes = post[1];  
          const sender = post[2];
            

            console.log(postDes);
              ////container.appendChild(div.cloneNode(document.getElementById("pname").innerHTML=App.account[0]));
              //container.appendChild(div.cloneNode(document.getElementById("postContent").innerHTML=postDes));
              div.appendChild(container.cloneNode(document.getElementById("pname").innerHTML=sender,document.getElementById("postContent").innerHTML=postDes));

        }
    },

     addTask: async () => {
        const content = $('#mytext').val();
        console.log(content);
        console.log(App.account);
        const temp = App.account;
        console.log(temp[0])
        await App.media.addPost(content,{from: temp[0] });
        console.log("success");
        window.location.reload(); 
     },
    //  count:0,
    //  like: () => {
    //    count = 1;
    //   if(count%2==0){
    //      temp = temp + 1;
    //      count++;
    //    }
    //    else{
    //      temp = temp - 1;
    //    }
    //    console.log(temp)
    //    document.getElementById("like").innerHTML = temp;
    //  }
}


$(() => {
    $(window).load(() => {
      App.load()
    })
  })