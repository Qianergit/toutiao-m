<template>
  <div class="search-result">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="加载失败，请点击重试"
>
  <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
</van-list>
  </div>
</template>

<script>
import{SearchResultAPI} from'@/Api'
export default {
name:'SearchResult',
props:{
    searchtext:{
        type:String,
        require:true
    }
},
data() {
    return {
      list: [],
      loading:false,
      finished:false,
      page:1,
      perPage:20,
      error:false,
    };
  },
  methods: {
    async onLoad() {
        try{
          const{data} = await SearchResultAPI({
            page:this.page,
            per_page:this.perPage,
            q:this.searchtext
          })
        const{results}=data.data
          this.list.push(...results)
          console.log(data)

          this.loading=false
        if(results.length){
            this.page++
        }else{
            this.finished=true
        }
         
        }catch(err){
            console.log(err)
            this.error=true
            this.loading=false
             
        }
    //请求获取数据
    //将数据添加到数组列表中
    //将本次加载中的loading关闭
    //判断是否还有数据
    //如果有则更新获取下一个数据的页码
    //如果没有则将加载状态finished设置为结束
    },
  },
}
</script>
 
<style>

</style>