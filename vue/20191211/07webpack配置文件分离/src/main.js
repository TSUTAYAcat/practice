import Vue from "vue";
import app from "./vue/home.vue"

new Vue({
    el: "#app",
    template: "<app/>",
    components: {
        app
    }
})

document.write(`<span>哈哈哈</span>`)
