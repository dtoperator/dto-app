const ethers = require('ethers');
const dtoAbi = require('./abi/DTO.json');

const TESTNET = {
    method: 'wallet_addEthereumChain',
    params: [{
        chainId: '0x4'
    }]
};

const MAINNET = {
    method: 'wallet_addEthereumChain',
    params: [{
        chainId: '0x1'
    }]
}

class _walletManager {
    // status
    // null     => not connected
    // false    => trying to connect
    // true     => connect

    walletStatus = false;
    web3Global = false;
    ethers = ethers;

    dtoAddr = "0x7fE96348FCaa539824438785de130bd31d3c2062";

    constructor() {
        this.connectToMetamask();

        this.connectToContract();
    }

    async connectToMetamask() {
        let err = "";
        if (window.ethereum) {
            this.web3Global = new ethers.providers.Web3Provider(window.ethereum);
            try {
                await window.ethereum.enable();
                this.walletStatus = true;
            } catch (error) {
                err = error;
            }
        } else {
            // this.web3Global = new ethers.providers.JsonRpcProvider(MAINNET.params[0].rpcUrls[0]);
            err = "Metamask not found!";
        }

        if (window.ethereum) {
            await window.ethereum.request(MAINNET).catch((error) => {
                this.walletStatus = false;
                err = error;
            });

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                // params: [{ chainId: '0x1' }], // Ethereum Mainnet
                params: [{ chainId: '0x4' }], // Rinkeby Testnet
            }).catch((error) => {
                this.walletStatus = false;
                err = error;
            });
        }

        return err;
    }

    async connectToContract() {
        if (!this.dto) {
            this.dto = new ethers.Contract(this.dtoAddr, dtoAbi.abi, this.web3Global);
        }
    }

    async checkId() {
        let network = await this.web3Global.getNetwork();
        if (network.chainId != MAINNET.params[0].chainId) {
            await this.connectToMetamask();
        }
    }

    getStatus() {
        return this.walletStatus
    }
}

const walletManager = {
    install(Vue, options) {
        Vue.prototype.walletManager = new _walletManager();
    }
}

export default walletManager;