<template>
  

    <van-button

    :class="{
        liked:value===1
    }"
    class="fontsize"
    :loading="loading"
        :icon="value===1 ? 'good-job' : 'good-job-o'"
        @click="onCollect"
      />
  
</template>

<script>
import {deletelikearticleAPI, likearticleAPI } from '@/Api'
export default {
  name:'lickarticle',
  data(){
    return{
        loading:false
    }
  },
  props:{
    value:{
        type:Number,
        required:true
    },
    acrticleId:{
        type:[Number,Object,String],
        required:true
        }
  }
  ,methods:{
    async onCollect () {
        this.loading=true
        try{
            let status=-1
            if(this.value===1){
              await deletelikearticleAPI(this.acrticleId)
              console.log('11111')
              
            }else{
               await likearticleAPI(this.acrticleId)
                console.log('22222')
                status=1
                
            }
            this.$emit('input',status)
            this.$toast.success(status===1 ? '点赞成功': '取消点赞')
        }catch(err){
           console.log(err)
        } 
        this.loading=false
    }
  }
}
</script>

<style>
.liked{
color: #ffa500;
}
</style>