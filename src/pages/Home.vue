<template>
    <div class="home">
        <h1>
            <a href="https://dto.tech">
                <img src="/img/dto-logo.png" width="300" />
            </a>
        </h1>
        <div class="phone">
            <div class="number">
                <p v-if="number.length > 0">DTO</p>
                <input v-model="number" type="number" />
                <button v-if="number.length > 0" @click="del()">
                    <img src="/img/delete.svg" alt="Delete" />
                </button>
            </div>
            <div class="error">
                <p v-if="error">This number is taken</p>
            </div>
            <div class="digits">
                <button @click="numpad(1)">1</button>
                <button @click="numpad(2)">2</button>
                <button @click="numpad(3)">3</button>
                <button @click="numpad(4)">4</button>
                <button @click="numpad(5)">5</button>
                <button @click="numpad(6)">6</button>
                <button @click="numpad(7)">7</button>
                <button @click="numpad(8)">8</button>
                <button @click="numpad(9)">9</button>
                <button>*</button>
                <button @click="numpad(0)">0</button>
                <button>#</button>
            </div>
            <div class="pick">
                <button v-if="number.length > 0" @click="pickNumber()">Pick</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            number: "",
            prefix: "10000000",
            error: false
        }
    },
    computed: {
        prefixNumber() {
            return this.walletManager.ethers.BigNumber.from(this.prefix + this.number);
        }
    },
    watch: {
        number: function (val) {
            if (val.length > 10) {
                this.number = val.slice(0, -(val.length - 10));
            } else {
                this.number = val;
            }
            this.error = false;
        }
    },
    methods: {
        numpad(num) {
            this.number = this.number + num;
        },
        del() {
            this.number = this.number.slice(0, -1);
        },
        async checkNumber() {
            try {
                await this.walletManager.dto.ownerOf(this.prefixNumber);
                this.error = true;
                return false
            } catch (e) {
                return true
            }
        },
        async pickNumber() {
            let signer = await this.walletManager.web3Global.getSigner();
            let dtoSigner = this.walletManager.dto.connect(signer);

            if (await this.checkNumber()) {
                try {
                    await dtoSigner
                        .registerNumber(
                            this.prefixNumber,
                            31536000,
                            {
                                value: this.walletManager.ethers.utils.parseUnits((100).toString(), 'finney'),
                                gasLimit: 250000
                            }
                        );
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("This number is taken");
            }
        }
    },
};
</script>

<style scoped>
h1 {
    color: black;
    font-weight: 300;
    font-size: 60px;
    line-height: 70px;
}

.home {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
}

.phone {
    background: rgb(255,255,255);
    background: linear-gradient(134deg, rgba(255,255,255,1) 0%, rgba(192,192,192,1) 100%);
    border-bottom: none;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.44), 0px 1722px 482px rgba(255, 255, 255, 0.01), 0px 1102px 441px rgba(255, 255, 255, 0.04), 0px 620px 372px rgba(255, 255, 255, 0.15), 0px 276px 276px rgba(255, 255, 255, 0.26), 0px 13px 152px rgba(255, 255, 255, 0.29);
    border-radius: 24px 24px 0 0;
    width: 360px;
    /* min-height: 711px; */
    min-height: 640px;
}

.number {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 77px;
    margin-bottom: 75px;
    min-height: 102px;
}

.number > p {
    color: black;
    font-weight: 300;
    font-size: 26px;
    line-height: 50px;
    margin-right: 5px;
}

.number > input {
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 26px;
    line-height: 38px;
    width: 190px;
}

/* Chrome, Safari, Edge, Opera */
.number > input::-webkit-outer-spin-button,
.number > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.number > input[type=number] {
  -moz-appearance: textfield;
}

.number > button {
    background-color: rgba(255, 255, 255, 0);
    border: 0;
}

.number > button:hover {
    cursor: pointer;
}

.number > button > img {
    width: 25px;
    color: black;
}

.error {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 51px;
}

.digits {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 56px;
}

.digits > button {
    background-color: rgba(255, 255, 255, 0);
    color: black;
    border: 0;
    width: 100px;
    height: 60px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 44px;
    line-height: 52px;
}

.digits > button:hover {
    cursor: pointer;
}

.digits > button:nth-child(10) {
    padding-top: 12.5px;
}

.pick {
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 46px;
    margin-bottom: 44px;
}

.pick > button {
    background: rgb(255,112,174);
    background: linear-gradient(90deg, rgba(255,112,174,1) 0%, rgba(183,55,236,1) 50%, rgba(93,92,226,1) 100%);
    color: white;
    border: none;
    box-sizing: border-box;
    border-radius: 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    padding: 8px 18px;
}

.pick > button:hover {
    cursor: pointer;
}
</style>
