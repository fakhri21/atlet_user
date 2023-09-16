const base_url='https://wismaatlet.000webhostapp.com/'

const routes = [
  
  
  {
    name: 'daftar pesanan',
    path: '/daftar_pesanan',
    component: httpVueLoader('assets/page/list_pesanan.vue'),  
  },
  {
    name: 'detail pesanan',
    path: '/detail_pesanan/:id',
    component: httpVueLoader('assets/page/detail_pesanan.vue'),  
  },
 
  {
    name: 'daftar reservasi',
    path: '/daftar_reservasi',
    component: httpVueLoader('assets/page/list_reservasi.vue'),  
  },
  {
    name: 'detail reservasi',
    path: '/detail_reservasi/:id',
    component: httpVueLoader('assets/page/detail_reservasi.vue'),  
  },

  //front
  {
    name: 'login',
    path: '/login',
    component: httpVueLoader('assets/page/login.vue'),
    meta: {
      login: true
    },
    
  },
  {
    name: 'register',
    path: '/register',
    component: httpVueLoader('assets/page/register.vue'),
    meta: {
      login: true
    },
    
  },
  {
    name: 'home',
    path: '/',
    component: httpVueLoader('assets/page/home.vue'),
    meta:{
      requiresAuth: true,
    }
    
  },
  
  {
    name: 'kamar',
    path: '/kamar',
    component: httpVueLoader('assets/page/kamar.vue'),
    
  },
  {
    name: 'produk',
    path: '/produk',
    component: httpVueLoader('assets/page/produk.vue'),
    
  },
    
]

const router = new VueRouter({
    routes // short for `routes: routes`
  })

   router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.matched.some(record => record.meta.requiresAuth)) {
      
      if (localStorage.getItem('jwt') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      }
      else{
        next()
      }
    }
    else{
      next()
    }
  }) 

// Filters
Vue.filter('currency', function (value) {
  return   accounting.formatNumber(value);
});
Vue.filter('tanggal', function (value) {
  return   moment(value).format('L');
});

var v = new Vue({
    router,
    el: '#app',
    data: {
        title:"belajar vue",
        nama_user:localStorage.getItem('nama_user'),
        cards: ['Today', 'Yesterday'],
    drawer: false,    
        
    },
    created() {

    },
    computed: {
        hal_login(){
          return this.$route.meta.login
        },
        config_axios(){
          var config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          }
          return config
          
        }

    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      },
      
    }
})

