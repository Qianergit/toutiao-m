<template>
  <div class="search-suggestion">
    <van-cell 
    icon="search"
    value="内容" 
    v-for="(arr,index) in suggesslist"
    :key="index"
    @click="$emit('ChangeSearch',arr)"
    >
    <span slot="title" v-html="heightlight(arr)"></span>
  </van-cell>

  </div>
</template>

<script>
import{searchSuggesstionAPI}from '@/Api'
export default {
name:'SearchSuggesTion',
data(){
    return{
     suggesslist:[],
      set:false,
      istime:''
    }
   
},
props:{
    SearchList:{
      type:String,
      required:true
    }
},


watch:{
    
    SearchList:{
        
        handler(value){
            if(this.set){    
                clearInterval(this.istime) 
                console.log(111)
                this.set=false   
            }else{
                 this.istime = setTimeout(() => {
                 this.getsearchSuggesstion(value)
                
            }, 500)
             this.set=true
            }
           
        },
        immediate:true
    }
},
created(){
    
},
methods:{
    async getsearchSuggesstion(q){
        try{
        const {data} = await searchSuggesstionAPI(q)
        console.log(data)
         this.suggesslist=data.data.options

        }catch(err){
            console.log(err)
        }
    },
    heightlight(text){
        if(text===null){
            text.trim()
        }
    const heighlightStr = `<span class="active">${this.SearchList}<span>`
    const reg = new RegExp(this.SearchList,'gi')
    console.log(text)
      return text.replace(reg,heighlightStr)
    }
}
}
</script>

<style lang="less" scope>
.search-suggestion{
    span.active{
        color: #3296fa;
    }
}
</style>