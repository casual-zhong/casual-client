<template>
    <div>
        <button @click="send">测试</button>
    </div>
</template>

<script setup>
import api from '@/api/index.js'

const send = ()=>{
    api.mail({
      mail:'tansyjane9@gmail.com'
    }).then(res=>{
    
    })
} 
</script>

<style lang="scss" scoped>

</style>