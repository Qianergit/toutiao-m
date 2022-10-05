<template>
<div>
  <!-- <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">用户名称</div>
      <van-button
        class="like-btn"
        icon="good-job-o"
      >赞</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">这是评论内容</p>
      <div class="bottom-info">
        <span class="comment-pubdate">4天前</span>
        <van-button
          class="reply-btn"
          round
        >回复 0</van-button>
      </div>
    </div>
  </van-cell> -->
   <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button
        class="like-btn"
        :class="{
            liked:comment.is_liking
        }"
        :loading="commentLoading"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onCommentLike"
      >{{comment.like_count>0 ? comment.like_count : '赞'}}</van-button>
    </div>

    <div slot="label">
      <!-- 这里是评论内容 -->
      <p class="comment-content" v-html="this.comment.content"></p> 
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button
        @click="$emit('reply-click',comment)"
          class="reply-btn"
          round
        >回复{{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
  </div>
</template>

<script>
import {deleteaddcommentLikeAPI,addcommentLikeAPI} from '@/Api'
export default {
  name: 'CommentItem',
  components: {
    
  },
  props: {
    comment:{
        type:Object,
        required:true
    },
    
  },
  data () {
    return {
      message:this.comment.content,
       commentLoading:false
    }
  },
 
  watch: {},
  created () {},
  mounted () {
    
  },
  methods: {
     async onCommentLike(){
        this.commentLoading=true
       try{
        if(this.comment.is_liking){
            await deleteaddcommentLikeAPI(this.comment.com_id)
            // this.comment.like_count--
        }else{
            await addcommentLikeAPI(this.comment.com_id)
            
        }
       }catch(err){
        this.$toast('点赞失败')
        console.log(err)
       }
       this.commentLoading=false
}

  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked{
        color: #e5645f;
    }
  }
}
</style>