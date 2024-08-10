import {
  createWebHashHistory,
  createWebHistory,
  createRouter,
} from "vue-router"; //导入路由系列：

const routes = [
  {
    // 页面逻辑
    path: "/", //路由分配的 URL
    name: "home", //当路由指向此页面时显示的名字
    component: () => import("@/views/Home/index.vue"), //路由调用这个页面时加载的组件名
  }, {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
  }, {
    path: "/AddPosts",
    name: "AddPosts",
    component: () => import("@/views/AddPosts/index.vue"),
  }, {
    path: "/MyPosts",
    name: "MyPosts",
    component: () => import("@/views/MyPosts/index.vue"),
  },
  {
    path: "/PostsDetails",
    name: "PostsDetails",
    component: () => import("@/views/PostsDetails/index.vue"),
  },
  {
    path: '/:error*',
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

//创建路由
const router = createRouter({
  // history: createWebHashHistory(), //hash模式
  history: createWebHistory(), //History模式
  routes, //路由路径
  scrollBehavior(to, from, savedPosition) {
    //滚动行为
    // 滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

//全局前置守卫
// router.beforeEach(async (to, from,next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // 如果用户未能验证身份，则 `next` 会被调用两次
//   else  next()
// })

// 全局后置钩子
router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
});

export default router;
