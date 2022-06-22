<template>
    <div>
        <button id="connect-wallet" @click="connect()" type="button">
            Connect Wallet
        </button>
    </div>
</template>

<script>
export default {
    name: "ConnectWallet",
    methods: {
        async connect() {
            let err = await this.walletManager.connectToMetamask();
            if (err != "") {
                window.location = "https://metamask.app.link/dapp/nft-meetup-example.github.io";
            }
        }
    }
}
</script>

<style scoped>
button {
    background-color: rgba(255, 255, 255, 0);
    color: white;
    border: 3px solid white;
    border-radius: 50px;
    padding: 24px 50px 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    line-height: 30%;
    font-weight: 500;
}

button:hover {
    background-color: white;
    color: #5f40e6;
    cursor: pointer;
}
</style>
