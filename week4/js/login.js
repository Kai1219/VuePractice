import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'kate-hexschool';

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                passward: ''
            },
        }
    },

    methods: {
        //發送api至遠端並登入
        login() {
            axios.post(`${apiUrl}/admin/signin`, this.user)
                //接收成功結果
                .then((res) => {
                    const token = res.data.token;
                    const expired = res.data.expired;
                    //儲存Token在cookie
                    document.cookie = `KateCookieName=${token}; expires=${expired};`;
                    //轉頁
                    window.location.replace("admin_products.html");
                })

            //接收失敗結果
            .catch((error) => {
                //console.dir(error);
                alert(error.data.message);
            })
        }

    },

    mounted() {

    }
});
app.mount('#app');