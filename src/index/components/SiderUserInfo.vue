<template>
  <div class="sider-inner">
    <section>
      <transition name="fade">
        <div
          class="site-author"
          v-show="imgShow"
        >
          <router-link :to="{ name: 'UserDetail', params: { username: user.username }}">
            <img
              :src="imgUrl"
              alt="头像"
              ref="img"
              class="site-author-img"
            >
            <p class="site-author-name">{{ user.username }}</p>
          </router-link>
        </div>
      </transition>
      <p class="site-description">{{ user.bio }}</p>
      <nav class="user-state">
        <div class="site-item">
          <router-link :to="{ name: 'PageListForUser' }">
            <span class="site-item-count">
              <count-up
                idName="page_num"
                countSize="18px"
                :countWeight="500"
                color="#999"
                :endVal="page_num"
              ></count-up>
            </span>
            <span class="site-item-name">文章</span>
          </router-link>
        </div>
        <div class="site-item">
          <router-link :to="{ name: 'PageListForDraft' }">
            <span class="site-item-count">
              <count-up
                idName="draft_num"
                countSize="18px"
                :countWeight="500"
                color="#999"
                :endVal="draft_num"
              ></count-up>
            </span>
            <span class="site-item-name">草稿</span>
          </router-link>
        </div>
        <div class="site-item">
          <router-link :to="{ name: 'CommentList' }">
            <span class="site-item-count">
              <count-up
                idName="comment_num"
                countSize="18px"
                :countWeight="500"
                color="#999"
                :endVal="comment_num"
              ></count-up>
            </span>
            <span class="site-item-name">留言</span>
          </router-link>
        </div>
      </nav>
      <div class="site-operate">
        <!-- <router-link :to="{name: 'normalNew'}">写文章</router-link> -->
        <a @click="signout">注销</a>
      </div>
    </section>
  </div>
</template>
<script>
import defaultImg from '@/assets/logo.png'
export default {
  components: {
    CountUp: () => import('@/components/common/countUp')
  },
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      imgUrl: defaultImg,
      imgShow: false,
      defaultImg: defaultImg,
      i: 0
      // page_num: this.$store.state.user.page_num || JSON.parse(localStorage.getItem('user')).page_num,
      // draft_num: this.$store.state.user.draft_num || JSON.parse(localStorage.getItem('user')).draft_num
    }
  },
  mounted () {
    this.showAvatar()
  },
  computed: {
    page_num () {
      return this.$store.state.user.page_num || this.user.page_num
    },
    draft_num () {
      return this.$store.state.user.draft_num || this.user.draft_num
    },
    comment_num () {
      return this.$store.state.user.comment_num || this.user.comment_num
    },
    avatar () {
      return this.$store.state.user.avatar || this.user.avatar
    }
  },
  watch: {
    avatar (newVal) {
      this.showAvatar()
    }
  },
  methods: {
    signout () {
      this.Common.axios('/api/signout').then(res => {
        this.Cookies.remove('user')
        this.Cookies.remove('token')
        this.Cookies.remove('refreshToken')
        location.reload()
      })
    },
    showAvatar () {
      if (this.avatar) {
        this.imgUrl = '/api/file/avatar/user/?username=' + this.user.username
      } else {
        const Item = this.user.oauthinfo.find(item => item.avatar_url)
        this.imgUrl = Item ? Item.avatar_url : this.defaultImg
      }
      this.$refs.img.onerror = () => {
        this.imgUrl = this.defaultImg
      }
      this.$refs.img.onload = () => {
        this.imgShow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-inner {
  padding: 20px 10px;
  position: relative;
  text-align: center;
  color: #999;
  a {
    color: #999;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .site-author {
    display: block;
    overflow: hidden;
    img.site-author-img {
      max-width: 99px;
      max-height: 99px;
      margin: 0 auto;
      border: 1px solid #333;
      height: auto;
      border-radius: 50%;
      box-sizing: unset;
      padding: 2px;
    }
    p.site-author-name {
      margin: 5px 0 0;
      color: #f5f5f5;
      font-size: 14px;
    }
  }
  .site-description {
    margin: 5px 0 25px;
    font-size: 14px;
    text-align: center;
    color: #555;
  }
  .user-state {
    line-height: 1.4;
    .site-item {
      padding: 0 15px;
      display: inline-block;
      .site-item-count,
      .site-item-name {
        display: block;
        text-align: center;
      }
      .site-item-count {
        font-size: 18px;
      }
      .site-item-name {
        font-size: 12px;
      }
      &:nth-child(2),
      &:nth-child(3) {
        border-left: 1px solid #333;
      }
      &:hover {
        a {
          color: #fff;
        }
      }
    }
  }
  .site-operate {
    margin-top: 20px;
    a:hover {
      color: #fff;
    }
  }
}
</style>
