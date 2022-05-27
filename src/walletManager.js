const ethers = require('ethers');
const dtoAbi = require('./abi/DTO.json');

const TESTNET = {
    method: 'wallet_addEthereumChain',
    params: [{
        chainId: '0x4',
        chainName: 'Rinkeby Test Network',
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        },
        // rpcUrls: [''],
        blockExplorerUrls: ['https://rinkeby.etherscan.io']
    }]
};

const MAINNET = {
    method: 'wallet_addEthereumChain',
    params: [{
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        },
        // rpcUrls: [''],
        blockExplorerUrls: ['https://etherscan.io']
    }]
}

// const NETWORK = TESTNET;
const NETWORK = MAINNET;

class _walletManager {
    // status
    // null     => not connected
    // false    => trying to connect
    // true     => connect

    walletStatus = false;
    web3Global = false;
    ethers = ethers;

    dtoAddr = "0x5DBA0D54d6819a7088D2dA758B6b8A4e1E7281a1";

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
            this.web3Global = new ethers.providers.JsonRpcProvider(NETWORK.params[0].rpcUrls[0]);
            err = "Metamask not found!";
        }

        if (window.ethereum) {
            // await window.ethereum.request(NETWORK).catch((error) => {
            //     this.walletStatus = false;
            //     err = error;
            // });

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: NETWORK.params[0].chainId }]
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
        if (network.chainId != NETWORK.params[0].chainId) {
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