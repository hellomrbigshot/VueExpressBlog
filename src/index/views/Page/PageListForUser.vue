<template>
  <div>
    <Timeline>
      <TimelineItem color="#aaaaaa">
        <span>嗯..! 目前共计 {{total}} 篇日志。 继续努力。</span>
      </TimelineItem>
      <template v-for="(year, i) in pageList">
        <TimelineItem
          color="#aaa"
          :key="i+'a'"
        >
          <span class="year">{{year.year}}</span>
        </TimelineItem>
        <TimelineItem
          color="#aaa"
          v-for="(page,j) in year.pagelist"
          :key="j+'b'+i"
        >
          <router-link :to="{name: 'PageDetail', params: {id: page._id}}">
            <div class="content">
              <span class="time">{{ page.create_time.substring(5,10) }}</span>
              <span class="draft-title">{{ page.title }}</span>
              <template v-if="page.secret">
                <span :style="{fontSize: '16px'}">|</span>
                <Badge
                  text="私密"
                  :offset="[-5, -20]"
                >
                  <a
                    href="#"
                    class="demo-badge"
                  ></a>
                </Badge>
              </template>
            </div>
          </router-link>
        </TimelineItem>
      </template>

    </Timeline>
    <div
      class="pagination"
      style="margin-bottom: 20px;"
    >
      <Pagination
        v-if="pageSize<total"
        :total="total"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageList: [],
      pageSize: 10,
      page: 1,
      total: 0,
      username: this.Cookies.get('user')
    }
  },
  mounted () {
    this.getPageList()
  },
  methods: {
    getPageList () {
      const postData = {
        type: 'create_user',
        status: 'normal',
        content: this.username,
        pageSize: this.pageSize,
        page: this.page
      }
      this.Common.axios('/api/page/limitpagelist', postData).then(res => {
        this.pageList = this.seperateByYear(res.data.data.result)
        this.total = res.data.data.total
      })
    },
    seperateByYear (pagelist) {
      // 将文章按照创建年份分类
      const yearArr = []
      pagelist.forEach(page => {
        const year = page.create_time.substring(0, 4)
        if (!yearArr.includes(year)) {
          yearArr.push(year)
        }
      })
      return yearArr.map(year => {
        const single = {}
        single.year = year
        single.pagelist = pagelist.filter(
          page => page.create_time.substring(0, 4) === year
        )
        return single
      })
    },
    pageChange (page) {
      this.page = page
      this.getPageList()
    }
  }
}
</script>
<style lang="scss" scoped>
.year {
  font-size: 22px;
  color: #555;
}
.content {
  color: #666;
  padding: 0 0 10px;
  border-bottom: 1px dashed #cccccc;
  &:hover {
    border-color: #666;
  }
  .time {
    font-size: 12px;
  }

  .draft-title {
    // padding-right: 5px;
    padding-left: 5px;
    width: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
  }
}
</style>
