<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
  <van-search
  class="search-form"
    v-model="SearchText"
    show-action
    placeholder="请输入搜索关键词"
    background=" #3296fa"
    @search="onSearch"
    @cancel="onCancel"
    @focus="SearchsResult=false"
  />
    <!--  搜索结果-->
<search-result v-if="SearchsResult"
:searchtext='SearchText'
></search-result>
   <!--  搜索结果-->
     <!-- 搜索联想 -->
<SearchSuggesTion 
 v-else-if="SearchText"
:SearchList=SearchText
@ChangeSearch="onSearch"
> </SearchSuggesTion>
  <!-- 搜索联想 -->
  <!-- 搜索历史 -->
<SearchHistory v-else 
:Historylists=searchHistorylist
@clear-data-delete="searchHistorylist=[]"
@search='onSearch'
></SearchHistory>
  <!-- 搜索历史 -->


 
</form>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/component/search-history.vue'
import SearchSuggesTion from '@/views/search/component/search-suggestion.vue'
import SearchResult from '@/views/search/component/search-result.vue'
export default {
name:'search_type',
data() {
    return {
      SearchText:'',
      SearchsResult:false,
      searchHistorylist:[]
    };
  },
  methods: {
    onSearch(val) {
      console.log(val)
      //更新文本框内容
      val=val.trim()
      if(val===''){
        this.$toast('不能为空')
        return
      }
      this.SearchText=val
     //历史搜索
     const indexs = this.searchHistorylist.indexOf(val)
      if(indexs !== -1 ){
        this.searchHistorylist.splice(indexs,1)
      }
      
      this.searchHistorylist.unshift(val)
 //渲染搜索结果
      this.SearchsResult=true
       if(this.searchText=== ''){
        this.SearchsResul=false
       }


      
      
    },
    onCancel() {
      this.$router.back()
    },
  },
components:{
    SearchHistory,
    SearchSuggesTion,
    SearchResult
}
}
</script>

<style lang='less' scope>
.search-container{
padding-top:108px ;
.van-search__action{
    color: aliceblue;
}
.search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
}

</style>