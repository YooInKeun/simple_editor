<template>
  <div id="sitemap">
    <div @mousedown="moveSitemap" class="sitemap-text-box">
      <span @mousedown.stop class="sitemap-text">Sitemap</span>
      <img
        @mousedown.stop
        @click="closeSitemap"
        class="close-btn"
        src="../assets/images/close.svg"
      />
    </div>
    <vue-custom-scrollbar class="sitemap-scroll-area">
      <div
        ref="dash"
        @mousedown="refineSitemap"
        @mouseup="mouseRightClick"
        class="title-map"
      >
        <div :key="title.id" v-for="title in titles" class="titles">
          {{ title.text }}
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: { vueCustomScrollbar },
  data() {
    return {
      titles: [],
      sitemapMove: false,
      sameTitle: null,
      xInter: 0,
      yInter: 0,
      moveTarget: null,
      target: null,
      targetId: null,
      position: null,
      positionId: null,
      contextTarget: null
    }
  },
  mounted() {
    document.addEventListener('mousemove', e => {
      if (this.sitemapMove) {
        this.moveTarget.style.left = e.clientX - this.xInter + 'px'
        this.moveTarget.style.top = e.clientY - this.yInter + 'px'
        let leftPanel = document.querySelector('.left-panel')
        if (parseInt(getComputedStyle(this.moveTarget).left) < 25) {
          leftPanel.style.backgroundColor = '#3a3a50'
          this.isStickSitemap = true
        } else {
          leftPanel.style.backgroundColor = '#292931'
          this.isStickSitemap = false
        }
      }
    })
    document.addEventListener('mouseup', () => {
      if (this.sitemapMove) {
        let leftPanel = document.querySelector('.left-panel')
        leftPanel.style.backgroundColor = '#292931'
        if (this.isStickSitemap) {
          this.moveTarget.style.left = '3.5%'
          this.moveTarget.style.top = '3.5%'
        }
        this.sitemapMove = false
      }
    })
  },
  methods: {
    deleteTitle() {
      console.log(this.contextTarget)
      let i
      let titles = document.querySelectorAll('.titles')
      for (i = 0; i < titles.length; i++) {
        console.log(titles[i])
        if (titles[i] === this.contextTarget) {
          break
        }
      }
      console.log(i)
      this.titles.splice(i, 1)
      console.log(this.titles)
      this.$emit('reset-title', this.titles)
    },
    movePosition(payload, tar) {
      this.position = payload
      let i
      if (tar === 'titles') {
        let titles = document.querySelectorAll('.titles')
        let boards = document.querySelectorAll('.board')
        for (i = 0; i < titles.length; i++) {
          if (titles[i] === payload) {
            this.positionId = i
            // titles[this.targetId].style.marginLeft = '0'
            break
          }
        }
        let target = this.titles.splice(this.targetId, 1)
        let parent = boards[this.targetId].parentElement
        let child = boards[this.targetId]
        if (this.targetId < i) {
          parent.removeChild(child)
          parent.insertBefore(child, parent.childNodes[this.positionId])
          this.titles.splice(this.positionId, 0, target[0])
        } else {
          parent.removeChild(boards[this.targetId])
          parent.insertBefore(child, parent.childNodes[this.positionId + 1])
          this.titles.splice(this.positionId + 1, 0, target[0])
        }
      }
    },
    mouseRightClick(e) {
      if (e.button === 2) {
        this.contextTarget = e.target
        this.$emit('right-click', e)
      }
    },
    moveSitemap(e) {
      e.target.parentElement.style.position = 'fixed'
      let initX = e.clientX
      let initY = e.clientY
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left)
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top)
      this.xInter = initX - initLeft
      this.yInter = initY - initTop
      this.sitemapMove = true
      this.moveTarget = e.target.parentElement
    },
    refineSitemap(e) {
      if (e.button === 0) {
        this.target = e.target
        if (e.target.className === 'titles') {
          let i
          let titles = document.querySelectorAll('.titles')
          for (i = 0; i < titles.length; i++) {
            if (titles[i] === e.target) {
              this.targetId = i
              break
            }
          }
        }
        this.$emit('copy-title', e)
      }
    },
    closeSitemap() {
      this.$emit('close-sitemap')
    },
    loadSitemap(titles) {
      this.titles = titles
    }
  }
}
</script>

<style lang="scss">
#sitemap {
  .sitemap-text-box {
    height: 7%;
    background-color: #292931;
    justify-content: center;
    position: relative;
    cursor: move;
    .sitemap-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
      position: absolute;
      left: 0.4rem;
    }
    .close-btn {
      width: 1.1rem;
      right: 0.4rem;
      top: 0.4rem;
      cursor: pointer;
      position: absolute;
    }
  }
  .sitemap-scroll-area {
    padding: 0.4rem;
    height: 93%;
    .title-map {
      background-color: #292931;
      color: #e7e4e4;
      padding-left: 0.4rem;
      align-items: left;
      .titles {
        height: 1.5rem;
        display: flex;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        align-items: left;
        &:hover {
          background-color: #505557;
          cursor: pointer;
        }
      }
    }
  }
}
.same-title {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
