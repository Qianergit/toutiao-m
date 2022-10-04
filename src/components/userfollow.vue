<template>
   <van-button 
           @click="onFollow"
           :loading="followLoading"
           v-if="value"
            class="follow-btn"
            round
            size="small"
          >已关注</van-button>
          <van-button
          @click="onFollow"
           v-else
           :loading="followLoading"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
</template>

<script>
import {addFollowAPI,removeFollowAPI} from '@/Api'
export default {
    name:'FollowUser',
props:{
    value:{
        type:Boolean,
        required:true
    },
    userId:{
        type:[Number,String,Object],
        required:true
    }
},
data(){
    return{
        followLoading:false
    }
},
methods:{
    async onFollow(){
    this.followLoading=true
    try{
    if(this.value){
      const {data} = await removeFollowAPI(this.userId)
      
           console.log(data)
           console.log('4444')
          this.$emit('input',!this.value)
    }else{
      await addFollowAPI({
          target:this.userId
        })
         this.$emit('input',!this.value)
    }
    }catch(err){console.log(err)}
    this.followLoading=false
  }
}
}
</script>

<style>

</style>