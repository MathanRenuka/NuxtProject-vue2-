
import { createRouter,createWebHistory } from 'vue-router';
import stuform from './components/stuform'
import stutable from './components/stutable'
const routes=[{
    path:'/:id?',
    component:stuform,
    name:'stuform'
},{
    path:'/stu',
    component:stutable,
    name:'stutable'
},];
const router=createRouter({
    history:createWebHistory(),
    routes
}
)
export default router;
