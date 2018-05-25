const Mam = require('../lib/mam.client.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: `http://NODE'S_IP:14265` })

// Init State
let root = 'ROOT_OF_THE_FIRST_MSG_OF_THE_STREAM'

// Initialise MAM State
let mamState = Mam.init(iota)

const execute = async () => {
	// Fetch the messages syncronously
	const resp = await Mam.fetch(root, 'public')
	/*while(true){
		const resp = await Mam.fetch(root, 'public')
		root = resp.nextRoot;
		conso
	}*/
	//var bytes = iota.utils.transactionObject(resp.message)
	console.log(resp.messages)
	console.log(resp.nextRoot)
}

execute()

