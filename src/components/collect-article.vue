<template>
  
 <!-- <van-icon
  :class="{
        collected:value
    }"
        color="#777"
        name="star-o"
         :loading="loading"
        :icon="value ? 'star' : 'star-o'"
        @click="onCollect"
      /> -->
    <van-button
 
    :class="{
        collected:value
    }"
    :loading="loading"
        :icon="value ? 'star' : 'star-o'"
        @click="onCollect"
      />
  
</template>

<script>
import {deletecollectarticleAPI, collectarticleAPI } from '@/Api'
export default {
  name:'CollectArticle',
  data(){
    return{
        loading:false
    }
  },
  props:{
    value:{
        type:Boolean,
        required:true
    },
    acrticleId:{
        type:[Number,Object,String],
        required:true
        }
  }
  // props:['value','articleId']
  ,methods:{
    async onCollect () {
        this.loading=true
        try{
            if(this.value){
              await deletecollectarticleAPI(this.acrticleId)
              console.log(this.value)
              console.log(this.acrticleId)
              
              console.log('11111')
            }else{
              const{data} =  await collectarticleAPI(this.acrticleId)
              console.log(data)
                console.log('22222')
            }
            this.$emit('input',!this.value)
            this.$toast.success(!this.value ? '收藏成功': '取消收藏')
        }catch(err){
           console.log(err)
        } 
        this.loading=false
    }
  }
}
</script>

<style>
.collected{
  cursor: pointer;
   color: #ffa500;
}
</style>