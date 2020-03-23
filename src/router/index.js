import Vue from 'vue'
import Router from 'vue-router'
import EditorPage from '../pages/EditorPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'editorPage',
      component: EditorPage
    }
  ]
})
