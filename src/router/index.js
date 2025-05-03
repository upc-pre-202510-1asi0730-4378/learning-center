import {createRouter, createWebHistory} from "vue-router";

const HomeComponent                 = () => import('../public/pages/home.component.vue');
const AboutComponent                = () => import('../public/pages/about.component.vue');
const CategoryManagementComponent   = () => import('../publishing/pages/category-management.component.vue');
const PageNotFoundComponent         = () => import('../public/pages/page-not-found.component.vue');

const routes = [
    { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home' } },
    { path: '/about',                   name: 'about',      component: AboutComponent,              meta: { title: 'About us' } },
    { path: '/publishing/categories',   name: 'categories', component: CategoryManagementComponent, meta: { title: 'Categories' } },
    { path: '/:pathMatch(.*)*',         name: 'not-found',  component: PageNotFoundComponent,       meta: { title: 'Page not found' } },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;