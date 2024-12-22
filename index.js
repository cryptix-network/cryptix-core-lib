'use strict';


const secp256k1 = require('secp256k1-wasm');
const blake2b = require('blake2b-wasm');

var cryptixcore = module.exports;

cryptixcore.secp256k1 = secp256k1;

// module information
cryptixcore.version = 'v' + require('./package.json').version;
cryptixcore.versionGuard = function(version) {
	if (version !== undefined) {
		var message = 'More than one instance of cryptixcore-lib found. ' +
			'Please make sure to require cryptixcore-lib and check that submodules do' +
			' not also include their own cryptixcore-lib dependency.';
		throw new Error(message);
	}
};
cryptixcore.versionGuard(global._cryptixcoreLibVersion);
global._cryptixcoreLibVersion = cryptixcore.version;


const wasmModulesLoadStatus = new Map();
cryptixcore.wasmModulesLoadStatus = wasmModulesLoadStatus;
wasmModulesLoadStatus.set("blake2b", false);
wasmModulesLoadStatus.set("secp256k1", false);

const setWasmLoadStatus = (mod, loaded) => {
	//console.log("setWasmLoadStatus:", mod, loaded)
	wasmModulesLoadStatus.set(mod, loaded);
	let allLoaded = true;
	wasmModulesLoadStatus.forEach((loaded, mod) => {
		//console.log("wasmModulesLoadStatus:", mod, loaded)
		if (!loaded)
			allLoaded = false;
	})

	if (allLoaded)
		cryptixcore.ready();
}


blake2b.ready(() => {
	setWasmLoadStatus("blake2b", true);
})

secp256k1.onRuntimeInitialized = () => {
	//console.log("onRuntimeInitialized")
	setTimeout(() => {
		setWasmLoadStatus("secp256k1", true);
	}, 1);
}

secp256k1.onAbort = (error) => {
	console.log("secp256k1:onAbort:", error)
}
const deferred = ()=>{
	let methods = {};
	let promise = new Promise((resolve, reject)=>{
		methods = {resolve, reject};
	})
	Object.assign(promise, methods);
	return promise;
}
const readySignal = deferred();

cryptixcore.ready = ()=>{
	readySignal.resolve(true);
}
cryptixcore.initRuntime = ()=>{
	return readySignal;
}


// crypto
cryptixcore.crypto = {};
cryptixcore.crypto.BN = require('./lib/crypto/bn');
cryptixcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
cryptixcore.crypto.Schnorr = require('./lib/crypto/schnorr');
cryptixcore.crypto.Hash = require('./lib/crypto/hash');
cryptixcore.crypto.Random = require('./lib/crypto/random');
cryptixcore.crypto.Point = require('./lib/crypto/point');
cryptixcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
cryptixcore.encoding = {};
cryptixcore.encoding.Base58 = require('./lib/encoding/base58');
cryptixcore.encoding.Base58Check = require('./lib/encoding/base58check');
cryptixcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
cryptixcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
cryptixcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
cryptixcore.util = {};
cryptixcore.util.buffer = require('./lib/util/buffer');
cryptixcore.util.js = require('./lib/util/js');
cryptixcore.util.preconditions = require('./lib/util/preconditions');
cryptixcore.util.base32 = require('./lib/util/base32');
cryptixcore.util.convertBits = require('./lib/util/convertBits');
cryptixcore.setDebugLevel = (level)=>{
	cryptixcore.util.js.debugLevel = level;
}

// errors thrown by the library
cryptixcore.errors = require('./lib/errors');

// main bitcoin library
cryptixcore.Address = require('./lib/address');
cryptixcore.Block = require('./lib/block');
cryptixcore.MerkleBlock = require('./lib/block/merkleblock');
cryptixcore.BlockHeader = require('./lib/block/blockheader');
cryptixcore.HDPrivateKey = require('./lib/hdprivatekey.js');
cryptixcore.HDPublicKey = require('./lib/hdpublickey.js');
cryptixcore.Networks = require('./lib/networks');
cryptixcore.Opcode = require('./lib/opcode');
cryptixcore.PrivateKey = require('./lib/privatekey');
cryptixcore.PublicKey = require('./lib/publickey');
cryptixcore.Script = require('./lib/script');
cryptixcore.Transaction = require('./lib/transaction');
cryptixcore.URI = require('./lib/uri');
cryptixcore.Unit = require('./lib/unit');

// dependencies, subject to change
cryptixcore.deps = {};
cryptixcore.deps.bnjs = require('bn.js');
cryptixcore.deps.bs58 = require('bs58');
cryptixcore.deps.Buffer = Buffer;
cryptixcore.deps.elliptic = require('elliptic');
cryptixcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
cryptixcore.Transaction.sighash = require('./lib/transaction/sighash');
