import 'mdb-vue-ui-kit/css/mdb.min.css'
import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
});

app.use(store).use(router).mount('#app')
