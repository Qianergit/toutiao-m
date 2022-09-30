<template>
  <div class="article-list">


    <!-- 下拉刷新的组件 -->
    <van-pull-refresh 
    v-model="isreFreshLoading" 
    @refresh="onRefresh"
    :success-text="refreshSuccess"
    >
  
<!-- 这里是list的那个列表容器 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
<!-- 这里是列表的内容 -->
<ArticleItem
v-for="(article,index) in list" 
:key="index"
:article=article
></ArticleItem>
  <!-- <van-cell v-for="(item,index) in list" 
  :key="index"
   :title="item.title" /> -->
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import {getArticleListAPI} from '@/Api'
import ArticleItem from '@/components/article-item'
export default {
 name:'ArticleList',
 props:{
  channels:{
    type:Object,
    required:true
  }
 },
 components:{
  ArticleItem
 },
 data() {
    return {
      list: [],
      loading: false, //控股之加载中loading的状态
      finished: false, //控制数据加载结束的状态
      timestamp:null, //请求下一页数据的时间戳
      error:false,//控制列表加载失败的提示状态，这个是底部刷新的
      isreFreshLoading:false, //控制下拉刷新的loading状态
      refreshSuccess:'下拉刷新成功'
    }

},
    methods : {
      async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
       try{
       const {data} = await getArticleListAPI({
        channel_id:this.channels.id,
        timestamp:this.timestamp || Date.now() //这里就是做一个判断看有没有请求过来的时间戳
       })
       const {results} = data.data //这里就是data中的data的results给解构出来
        this.list.push(...results)
       
        this.loading=false
         if(results.length){ //这里写的是查看是否还有数据如果有那就将后台反应过来的时间戳赋值给timestamp
          this.timestamp=data.data.pre_timestamp
      }else{    //if的判断中如果为null或者undifind都会转到else中这时让finshed这个值为true停止加载
        this.finished=true
      }
        // if(Math.random()>0.5){
        //   JSON.parse('asjkhckxh')
        // }
       } catch(err){
         console.log(err)
         this.error=true
         this.loading=false
       }
       

        // 加载状态结束
    

        // 数据全部加载完成
 
       },
       async onRefresh(){
        try{
        const {data} = await getArticleListAPI({
          channel_id:this.channels.id,
          timestamp:Date.now()
        })
        const {results} = data.data
        this.list.unshift(...results)
        this.isreFreshLoading=false
        this.refreshSuccess=`下拉刷新成功更新了${results.length}条数据`
       }catch(err){
        this.isreFreshLoading=false
        this.refreshSuccess='刷新失败'
          
       }
       }
  }
}
</script>

<style lang="less" scope>
.article-list{
  height: 79vh;
  overflow: auto;
}

</style>