//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definiar a rede
//criar uma variavel com a assinatura que recebe que é um teste
//bitcoin - rede principal - mainnet 
//testenet - rede de teste - testnet 
const network = bitcoin.networks.testnet

//derivacao de enderecos e carteiras HD - Hierachical deterministic
const path = `m/49'/1'/0'/0`

//gerar o conjunto de palavras aleatorias mnemonicos que formam a seed(palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criar a raiz da carteira hd
let root = bip32.fromSeed(seed, network)

//criando uma conta - par de pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//gerar um endereco
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereco: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", mnemonic)

