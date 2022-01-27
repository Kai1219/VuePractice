import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiurl = 'https://vue3-course-api.hexschool.io/v2';
const apipath = 'kate-hexschool';
createApp({
    //資料集合
    data() {
        return {
            //產品資料陣列容器
            products: [],
            //展示產品細節容器
            productsDetail: {}
        }
    },
    //方法集合
    methods: {
        //確認登入與否
        checkAdmin() {
            const url = `${apiurl}/api/user/check`;
            axios.post(url)
                .then((res) => {
                    this.getData();
                })
                .catch((error) => {
                    console.dir(error);
                    window.location = 'login.html';
                })
        },
        //從遠端api取得資料
        getData() {
            const url = `${apiurl}/api/${apipath}/admin/products`;
            axios.get(url)
                .then((res) => {
                    console.log(res.data.products);
                    //將產品資料放入產品資料陣列容器
                    this.products = res.data.products;
                })
                .catch((error) => {
                    console.dir(error);
                })

        },
        //展開產品細節
        openProduct(product) {
            this.productsDetail = product;

        }
    },

    //生命週期
    mounted() {
        //取得Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //下次發送axios的時候，預設會把Authorization-Token的內容直接加到headers裡面
        //headers夾帶完成
        axios.defaults.headers.common['Authorization'] = token;

        this.checkAdmin();

    }
}).mount('#app');