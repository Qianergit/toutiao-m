<template>
  
 
  <van-cell  
   class="article-item"
    :to="'/articlebug/' + article.art_id"
  >
      <div slot='title' class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot='label'>
       <div  v-if="article.cover.type === 3" class="item-warp">
        <!-- 三张图片的位置 -->
        <div  class="threeImage"
      v-for="(obj,index) in article.cover.images "
    :key="index">
     <van-image 
     class="cover-item-image"
      fit="cover"
      :src="obj"
       />
       </div>
       </div>
          <div class="label-info-warp">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}</span>
            <span>{{article.pubdate|relativeTime}}</span>
          </div>
      </div>
      <van-image 
      class="oneImage"
      v-if="article.cover.type === 1"
      slot="default" 
      fit="cover"
      :src="article.cover.images[0]"
/>
    </van-cell>
   
</template>

<script>
export default {
name:'ArticleItem',
props:{
    article:{
        type:Object,
        required:true
    }
},
data(){
    return{
       
           
        
    }
},
methods:{
   
}
}
</script>

<style lang="less" >
.article-item{
    min-height: 150px;
   .label-info-warp{
    position: absolute;
    bottom: 5px;
   }
    .label-info-warp span{
        margin-right: 24px;
        font-size: 23px;
        color: #999;
    }
    
    .van-cell__label{
        margin-top:0px
    }
    .title{
        padding-bottom:10px ;

        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
    padding-left: 25px;
    flex: unset;
    }
    .oneImage{
        width: 232px;
        height: 146px;
    }
    .item-warp{
         padding:30px 0 ;
        display: flex;
        .threeImage{
            flex: 1;
            justify-content: center;
            align-items: center;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-image{
               width: 100%;
	           height: 146px;
    }
        }
    }
}
</style>