<template>
  <div class="comment-reply">
      <van-nav-bar
      :title="comment.reply_count>0 ? `${comment.reply_count}条回复`:'暂无回复'"
      >
      <van-icon 
      slot="left"
      name="cross"
      @click="$emit('close')"
      >
      </van-icon>
      
      </van-nav-bar>
   <div class="scroll-warp">
      <comment-item 
      :comment="comment"
      
      />
      <van-cell title="全部回复"></van-cell>
      <comment-list
      :list="commentlist"
      :types="types"
      :source="comment.com_id"
      @reply-click="replysclick"
      :commentcontent="commentcontent"
      ></comment-list>
      <div class="post-warp">
        <van-button
        class="post-btn"
        @click="popupshow=true"
        >写评论</van-button>
      </div>
      </div>
       <van-popup
       v-if="popupshow"
       v-model="popupshow"
       position="bottom"
       >
       <comment-post 
       :comment="comment"
       :commentcontent="commentcontent"
       :target="comment.com_id"
       @commentnewlist="commentnewlist"
       />
      </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item.vue'
import CommentList from '@/components/comment-list.vue'
import CommentPost from '@/components/commentpost.vue'
export default {
name:'CommentReply',
props:{
    comment:{
        type:Object,
        required:true
    }
},
components:{
    CommentItem,
    CommentList,
    CommentPost
},
data(){
    return {
        types:'c',
        popupshow:false,
        commentlist:[],
        commentcontent:false
    }
},
methods:{
    commentnewlist(data){
      this.popupshow=false
      this.comment.reply_count++
      this.commentlist.unshift(data.new_obj)
    },
    replysclick(){
        this.popupshow=true
        this.commentcontent=true
          this.comment.reply_count++
      this.commentlist.unshift(data.new_obj)

    }
}
}
</script>

<style lang="less">
 .scroll-warp{
     position: fixed;
     top: 92px;
     left: 0;
     right: 0;
     bottom: 88px;
     overflow-y:auto ;
    }
.post-warp{
    position:fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-top: solid 1px #d8d8d8;
    .post-btn{
        width: 60%;
        
    }
   
}
</style>