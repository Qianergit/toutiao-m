<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    >
   
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" >
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loadings">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articles.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articles.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false" >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div slot="title" class="user-name">{{articles.aut_name}}</div>
          <div slot="label" class="publish-date">{{articles.pubdate | relativeTime}}</div>
          <!-- 这里是关注 -->
          <user-follows 
          v-model="articles.is_followed"
          :userId="articles.aut_id"
          
          class="follow-btn"
          ></user-follows>
         
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" 
        v-html="this.articles.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 这个部分是评论区 -->
         <comment-list
         :source="articles.art_id"
          @totalComment="totalCommentCount=$event.total_count"
          :list="commentpushlists"
          @reply-click="replyclick"
           />
           <!-- 底部区域 -->
      </div>
       <div  class="error-wrap" v-else-if="errStatus === 404" >
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button 
        class="retry-btn"
        @click="getarticlesmain()"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
     </div>
     <div class="article-bottom" v-if="articles.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="popupshows()"
      >写评论</van-button>
      
      <van-icon
        name="comment-o"
        :info="totalCommentCount"
        color="#777"
        
      />
      <!-- 收藏 -->
      <collect-article
      class="btn-item"
      :acrticleId="articles.art_id"
      v-model="articles.is_collected"
     
      />
     <!-- //点赞 -->
      <LikeArticle 
      v-model="articles.attitude"
      :acrticleId=articles.art_id
     
      />
     
      <van-icon name="share" color="#777777"></van-icon>
      
      
    </div>
      <!-- /加载完成-文章详情 -->
      

 
    <!-- /底部区域 -->
    <!-- 评论框组件 -->
    
   <van-popup
      v-model="popupshow"
       position="bottom"
       >
       <comment-post 
       :target="articles.art_id"
       @commentnewlist="commentpushlist"
       />
      </van-popup>
   <!-- 评论回复弹窗 -->
   <van-popup
   v-if="isreplyshow"
      v-model="isreplyshow"
       position="bottom"
       :style="{ height: '100%' }"
       >
       <comment-reply
       :comment="currentcomment"
       @close="isreplyshow = false"
       ></comment-reply>
      </van-popup>
  </div>
</template>

<script>
import UserFollows from '@/components/userfollow.vue'
import {getarticlesmainAPI,} from '@/Api'
import { ImagePreview } from 'vant';
import CollectArticle from '@/components/collect-article.vue'
import LikeArticle from '@/components/like-article.vue';
import CommentList from '@/components/comment-list.vue';
import CommentPost from '@/components/commentpost.vue'
import CommentReply from './components/commentreply.vue'

// ImagePreview([
//   'https://img01.yzcdn.cn/vant/apple-1.jpg',
//   'https://img01.yzcdn.cn/vant/apple-2.jpg',
// ]);
export default {
  name:'ArticleIndex',
  components: {
    UserFollows,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  provide:function() {
    return {
      articleID:this.articleid
    }
  },
  props: {
      articleid: {
      type: [Number,String],
      required: true
    }
  },
  data () {
    return {
      articles:{},
      loadings:true,
      errStatus:0,
      followLoading:false,
      totalCommentCount:0,
      popupshow:false,
      commentpushlists:[],
      isreplyshow:false,
      currentcomment:{} //这个是传到评论的评论的数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getarticlesmain()
  },
  mounted () {},
  methods: {
    async getarticlesmain(){
      this.loadings=true
     try{ 
      const {data} = await getarticlesmainAPI(this.articleid)
      this.articles= data.data
      console.log(this.articleid)
      console.log(data.data)
      //图片预览
      setTimeout(()=>{
        this.gitimagePreview()
      },1)
      
     }catch(err){
      if(err.response && err.response.status===404){
        this.errStatus=404
      }
      console.log(err)
     }
     this.loadings=false //操纵哪个东西显示
    },
    gitimagePreview(){
    const articleContent = this.$refs['article-content']
    const imgs = articleContent.querySelectorAll('img')
    const images=[]
    imgs.forEach((img,index)=>{
      images.push(img.src)
      img.onclick=()=>{
        console.log('777')
         ImagePreview({
          images,
          startPosition: index,

         });
      }
    })
  },
  popupshows(){
    this.popupshow=!this.popupshow
  },
  commentpushlist(data){
      this.commentpushlists.unshift(data.new_obj)
      this.popupshows()
  },
  replyclick(data){
    this.isreplyshow=true
    this.currentcomment=data
  }
  },
 
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-button{
      border: none;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>