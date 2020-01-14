<template>
    <div>
        <sui-comment>{{message}}</sui-comment>
        <sui-segment v-for="color in colorList" :color="color" inverted>{{color}}</sui-segment>
    </div>
</template>

<script>
    'use strict'

    export default {
        name: "Home",
        components: {},
        data: () => {
            return {
                message: 'Have a Beautiful Day!!',
                colorList: [
                    'red', 'orange', 'yellow', 'olive', 'green',
                    'teal', 'blue', 'violet', 'purple', 'pink',
                    'brown', 'grey', 'black'
                ]
            }
        },
        created: function(){

        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
