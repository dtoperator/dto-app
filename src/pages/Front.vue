<template>
    <div>
        <header>
            <div>
                <a href="/">
                    <img src="/img/dto.png" height="88" />
                </a>
            </div>
            <div>
                <button v-if="walletStatus" @click="copyAddr" class="wallet">{{ walletAddr }}</button>
                <ConnectWallet v-else></ConnectWallet>
            </div>
        </header>
        <main>
            <div class="menu">
                <a href="/numbers">
                    <div class="hamburger">
                        <div></div>
                    </div>
                    My Numbers
                </a>
                <a href="/">
                    <div class="add">+</div>
                    Buy Number
                </a>
                <a href="/faq">
                    <div class="faq">?</div>
                    FAQ
                </a>
            </div>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import ConnectWallet from "../components/ConnectWallet.vue"

export default {
    name: "Front",
    data() {
        return {
            walletStatus: false,
            isAddrReceived: false,
            walletAddr: '',
        }
    },
    components: {
        ConnectWallet
    },
    mounted() {
        setInterval(async () => {
            this.walletStatus = this.walletManager.walletStatus;
            if (this.walletStatus && !this.isAddrReceived) {
                this.isAddrReceived = true;
                this.getAddr();
            }
        }, 100);
    },
    methods: {
        async getAddr() {
            await this.walletManager.checkId();
            let signer = await this.walletManager.web3Global.getSigner();
            this.walletAddr = await signer.getAddress();
        },
        async copyAddr() {
            try {
                await navigator.clipboard.writeText(this.walletAddr);
                console.log('Wallet address copied to clipboard');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        },
    },
}
</script>

<style scoped>
@media only screen and (max-width: 1024px) {
    .menu > a {
        font-size: 20px !important;
        line-height: 32px !important;
    }
}

@media only screen and (max-width: 768px) {
    main {
        flex-direction: column !important;
    }

    main > div:nth-child(2) {
        width: 100% !important;
    }

    .menu {
        flex-direction: row !important;
        justify-content: space-between;
        width: 100% !important;
        margin-bottom: 20px;
    }
}

@media only screen and (max-width: 425px) {
    .menu > a > div {
        display: none;
    }
}

header {
    background-color: #5f40e6;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-family: 'Space Grotesk', sans-serif;
}

main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-family: 'Space Grotesk', sans-serif;
    padding: 20px 40px;
}

main > div:nth-child(2) {
    width: 80%;
}

.wallet {
    background-color: rgba(255, 255, 255, 0);
    color: white;
    border: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    line-height: 30%;
    font-weight: 500;
    height: 30px;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.wallet:hover {
    cursor: pointer;
}

.menu {
    display: flex;
    flex-direction: column;
    width: 20%;
}

.menu > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #5f40e6;
    text-decoration: none;
    font-weight: 300;
    font-size: 24px;
    line-height: 42px;
}

.hamburger {
    width: 35px;
    margin-right: 20px;
}

.hamburger:before,
.hamburger:after,
.hamburger div {
    background: #5f40e6;
    content: "";
    display: block;
    height: 3px;
    border-radius: 3px;
    margin: 7px 0;
    transition: 0.5s;
}

.add, .faq {
    color: #5f40e6;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    width: 35px;
    margin-right: 20px;
}
</style>
