<template>
    <div>
        <h1>FAQ</h1>
        <h2>General questions</h2>
        
        <p class="q" id="what-is-dto">What is DTO?</p>
        <p class="a">Decentralized Telecommunication Operator [DTO] is an Ethereum-based open, scalable, secure numbering system that aims to introduce the concept of cell phone numbers in the metaverse. In addition to this core offering, DTO also offers prefix creation services to brands and individuals in the metaverse.</p>

        <p class="q" id="what-wallets-are-supported">What wallets are supported?</p>
        <p class="a">Any Ethereum wallet available as a browser extension.</p>
        <p class="a">Also, you can mint a number with Trust Wallet on your smartphone.</p>

        <p class="q" id="can-i-purchase-a-wallet-prefix-with-fiat">Can I purchase a wallet/prefix with fiat?</p>
        <p class="a">Unfortunately, no. We accept only ETH as payment.</p>

        <p class="q" id="can-i-create-and-own-a-telecommunication-company">Can I create and own a telecommunication company?</p>
        <p class="a">Yes, you need to own a prefix to do this.</p>

        <p class="q" id="terms-number-prefix-owner-number-attributes">Terms (number, prefix, owner, number attributes)</p>
        <p class="a">Number - a phone number in ERC-721 format, which gives you access to communication, serves as a vcard and as a full-fledged analogue of your crypto wallet.</p>
        <p class="a">Prefix - it is the code of a telecommunication company you’ve seen in traditional phone numbers, +1, +34, +49, etc., for instance. Decentralized telecommunication company, DTO, have prefixes analogous to regular ones, but coming along with additional features. Unlike the regular numbers whose prefixes are limited to 6 characters with only 4 digits, DTO provides up to 10 characters including digits, letters, and symbols.</p>
        <p class="a">Owner - there are 3 types of owners in DTO: a contract owner (DTO), a prefix owner, and a number owner.</p>
        <p class="a">Number attributes - via a website functionality, users can add some additional information to their numbers, such as links to social media profiles, wallet addresses, etc. This information will be written in a separate smart contract.</p>
        <p class="a">Number range - a list of numbers related to a particular prefix.</p>

        <h2>About numbers</h2>
        
        <p class="q" id="how-much-does-minting-a-number-cost">How much does minting a number cost?</p>
        <p class="a">0.1 ETH + gas fee</p>
        
        <p class="q" id="where-can-i-sell-my-number">Where can I sell my number?</p>
        <p class="a">Any marketplaces supporting NFTs on Ethereum, OpenSea, for instance.</p>
        
        <p class="q" id="what-characters-can-a-number-consist-of">What characters can a number consist of?</p>
        <p class="a">There is a limit of 10 digits.</p>
        
        <p class="q" id="what-is-the-maximum-length-of-a-number">What is the maximum length of a number?</p>
        <p class="a">Number can consist of up to 10 digits.</p>

        <p class="q" id="how-can-i-use-a-number">How can I use a number?</p>
        <p class="a">It will be possible to use a number to contact other metaverse users, use it as a wallet address, buy and sell it on NFT marketplaces, etc.</p>

        <p class="q" id="what-are-number-attributes">What are number attributes?</p>
        <p class="a">They are the additional information, such as links to social media, tied to a number.</p>

        <p class="q" id="can-I-manage-the-attributes">Can I manage the attributes?</p>
        <p class="a">Yes, via your personal account on the website.</p>

        <p class="q" id="how-long-is-a-number-available-for">How long is a number available for?</p>
        <p class="a">As of now, a number is available for 1 year. It will be possible to extend it for a longer period.</p>

        <h2>About prefixes</h2>

        <p class="q" id="how-much-does-minting-a-prefix-cost">How much does minting a prefix cost?</p>
        <p class="a">100 ETH + gas fee</p>

        <p class="q" id="what-characters-can-a-prefix-consist-of">What characters can a prefix consist of? Can I use different letter cases? Can I put a space?</p>
        <p class="a">A prefix can consist of any characters, including letters, digits, smileys, etc. You can use uppercase and lowercase letters. You cannot put a space.</p>
        
        <p class="q" id="what-is-the-maximum-length-of-a-prefix">What is the maximum length of a prefix?</p>
        <p class="a">A prefix can consist of up to 10 characters.</p>

        <p class="q" id="how-many-numbers-are-attached-to-one-prefix">How many numbers are attached to one prefix?</p>
        <p class="a">Up to 10 billions unique numbers within one range (prefix).</p>

        <p class="q" id="can-i-price-each-number-individually">Can I price each number individually?</p>
        <p class="a">No, the price of the numbers within one range is the same.</p>

        <p class="q" id="how-long-does-a-prefix-ownership-last">How long does a prefix ownership last?</p>
        <p class="a">You own your prefix forever.</p>
    </div>
</template>

<script>
export default {
    name: "FAQ",
    mounted() {
        const qs = document.querySelectorAll(".q");
        qs.forEach(item => {
            item.innerHTML = item.innerHTML + ` <a href="${window.location.origin}/faq#${item.id}">
                <img src="/img/link.svg" height="15" />
            </a>`;
        });
    },
}
</script>

<style scoped>
.q {
    font-weight: 500;
}

.a {
    font-weight: 300;
}
</style>