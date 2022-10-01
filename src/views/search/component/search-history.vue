<template>
  <div class="search-history">
     
  <van-cell title="历史记录" value="内容" >
    <div v-if="isDeleteShow">
    <span class="red" @click="$emit('clear-data-delete')">全部删除</span>
    &nbsp;&nbsp;&nbsp;
    <span @click="isDeleteShow=false">完成</span>
    </div>
    <van-icon name="delete" @click="isDeleteShow=true" v-else/>
  </van-cell>
  <!-- 下面是内容 -->
   <van-cell 
   :title="items" 
   v-for="(items,index) in Historylists"
   :key="index"
   @click="delItem(items,index)"
   >
    <van-icon name="close" v-show="isDeleteShow"/>
  </van-cell>

  </div>
</template>

<script>

export default {
name:'SearchHistory',
props:{
  Historylists:{
    type:Array,
    required:false
  }
},
data(){
  return{
    isDeleteShow:false
  }
},
methods:{
  delItem(item,index){
    if(this.isDeleteShow){
         Historylists.splice(index,1)
   }else{
    console.log(item)
     this.$emit('search',item)
     
   }
  }
  
}
}
</script>

<style lang="less">
.search-history{
  .red{
    color: orangered;
  }
}
</style>