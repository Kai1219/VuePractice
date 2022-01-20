import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'kate-hexschool';
createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            //發送api至遠端並登入
            axios.post(`${url}/admin/signin`, this.user)

            //接收成功結果
            .then((res) => {
                    console.log(res);
                    const { token, expired } = res.data;
                    //儲存Token在cookie
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                    //轉頁
                    window.location = 'products.html';
                })
                //接收失敗結果
                .catch((error) => {
                    console.dir(error.data);

                });
        },
    },
}).mount('#app');