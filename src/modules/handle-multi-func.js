import { store } from '../store'
import ClickIndicator from './click-indicator'

class HandleMultiFunc {
  multiDelete() {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    ClickIndicator.instances.forEach(instance => {
      instance.target.parentElement.removeChild(instance.target)
      instance.removeBorder()
      ClickIndicator.instances.delete(instance)
      let moveIcon = document.querySelector('.move-icon')
      let copyIcon = document.querySelector('.copy-icon')
      let deleteIcon = document.querySelector('.delete-icon')
      moveIcon.style.display = 'none'
      deleteIcon.style.display = 'none'
      copyIcon.style.display = 'none'
    })

    let afterHtmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let newWork = new Work(htmlSrc, afterHtmlSrc)
    store.dispatch('workStackPush', newWork)
  }
  calcAverageWidth() {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let totalWidth = 0
    ClickIndicator.instances.forEach(instance => {
      totalWidth += parseInt(getComputedStyle(instance.target).width)
    })
    let avgWidth = totalWidth / ClickIndicator.instances.size
    ClickIndicator.instances.forEach(instance => {
      instance.target.style.width = avgWidth + 'px'
    })

    let afterHtmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let newWork = new Work(htmlSrc, afterHtmlSrc)
    store.dispatch('workStackPush', newWork)
  }
  calcAverageHeight() {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let totalHeight = 0
    ClickIndicator.instances.forEach(instance => {
      totalHeight += parseInt(getComputedStyle(instance.target).height)
    })
    let avgHeight = totalHeight / ClickIndicator.instances.size
    ClickIndicator.instances.forEach(instance => {
      instance.target.style.height = avgHeight + 'px'
    })

    let afterHtmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let newWork = new Work(htmlSrc, afterHtmlSrc)
    store.dispatch('workStackPush', newWork)
  }
}

export default new HandleMultiFunc()
