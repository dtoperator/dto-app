<template>
    <div v-if="hash">
        <h1>Your transaction has been broadcast to network!</h1>
        <h3>
            <a :href="`https://etherscan.io/tx/${hash}`" target="_blank">View transaction in Etherscan</a>
        </h3>
    </div>
</template>

<script>
export default {
    name: "Broadcast",
    props: ["hash"],
}
</script>

<style scoped>
a {
    color: #5f40e6;
    text-decoration: none;
}
</style>