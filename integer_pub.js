//Get the numbers from the publisher
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Mam = require('../lib/mam.client.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: `http://NODE'S_IP:14265` })

// Initialise MAM State - PUBLIC
let mamState = Mam.init(iota)

// Publish to tangle
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const message = Mam.create(mamState, packet)

    // Save new mamState
    mamState = message.state

    // Attach the payload.
    console.log('Root: ', message.root)
    console.log('Address: ', message.address)

    await Mam.attach(message.payload, message.address)
}

rl.question('Introduce the numbers you want to send.', (nums) => {
  var arrElems = nums.split(" ");
  for(i = 0; i < arrElems.length; i++){
        publish(iota.utils.toTrytes(arrElems[i]+""));
  }
  rl.close();
});
