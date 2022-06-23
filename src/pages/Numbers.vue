<template>
    <div>
        <div class="numbers" v-if="numbers.length > 0">
            <a v-for="(obj) in numbers" v-bind:key="obj.id" :href="`https://etherscan.io/nft/${dtoAddr}/${obj.prefix}${obj.number}`" target="_blank">
                <img src="https://app.dto.tech/img/metadata.jpg" />
                <p>{{ prefixs[obj.prefix.toString()] }} {{ obj.number }}</p>
            </a>
        </div>
        <div v-else>
            <h1>You don't have the numbers.</h1>    
        </div>
    </div>
</template>

<script>
export default {
    name: "Numbers",
    data() {
        return {
            dtoAddr: this.walletManager.dtoAddr,
            walletStatus: false,
            walletAddr: '',
            numbersLoading: false,
            prefixs: {
                "10000000": "DTO",
            },
            numbers: [],
        }
    },
    mounted() {
        setInterval(async () => {
            this.walletStatus = this.walletManager.walletStatus;
            if (this.walletStatus) {
                this.getNumbers();
            }
        }, 100);
    },
    methods: {
        async getNumbers() {
            await this.walletManager.checkId();
            let signer = await this.walletManager.web3Global.getSigner();
            this.walletAddr = await signer.getAddress();

            if (!this.numbersLoading) {
                this.numbersLoading = true;

                const mybalance = await this.walletManager.dto.balanceOf(this.walletAddr);
                for (let i = 0; i < mybalance; i++) {
                    const id = await this.walletManager.dto.tokenOfOwnerByIndex(this.walletAddr, i);
                    const idString = this.walletManager.ethers.BigNumber.from(id).toString();

                    const prefix = idString.substring(0, 8);
                    this.getPrefixName(prefix);

                    const number = idString.substring(8, idString.length);

                    this.numbers.push({
                        id: i,
                        prefix,
                        number,
                    });
                }
            }
        },
        async getPrefixName(id) {
            if (!this.prefixs.hasOwnProperty(id.toString())) {
                const name = await this.walletManager.dto.prefixName(id);
                this.prefixs[id.toString()] = name;
            }
        },
    },
}
</script>

<style scoped>
a {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.44), 0px 1722px 482px rgba(255, 255, 255, 0.01), 0px 1102px 441px rgba(255, 255, 255, 0.04), 0px 620px 372px rgba(255, 255, 255, 0.15), 0px 276px 276px rgba(255, 255, 255, 0.26), 0px 13px 152px rgba(255, 255, 255, 0.29);
    color: #5f40e6;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    text-decoration: none;
    width: 300px;
}

a > img {
    width: 100%;
    margin-bottom: 10px;
}

a > p {
    padding: 0;
    padding-left: 20px;
}

.numbers {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 2rem;
    justify-content: center;
}
</style>
