import Base from './views/Base/Base.vue'

const About = () => import('./components/About/About.vue')

export default [
  { path: '', component: Base },
  { path: '/about', component: About },
  { path: '*', component: Base }
]
