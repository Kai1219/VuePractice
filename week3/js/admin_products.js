import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'kate-hexschool';
let productModal = '';
let delProductModal = '';

const app = createApp({

    data() {
        return {
            //產品資料陣列容器
            products: [],
            //暫存產品容器
            temporaryProducts: {
                imagesUrl: [],
            },
            status: "",
        }
    },

    methods: {
        //確認登入與否
        checkLogin() {
            axios.post(`${apiUrl}/api/user/check`)
                .then((res) => {
                    this.getData();
                })
                .catch((error) => {
                    alert(error.message);
                    window.location = 'login.html';
                })
        },
        //從遠端api取得資料
        getData() {
            axios.get(`${apiUrl}/api/${apiPath}/admin/products/all`)
                .then((res) => {
                    //將產品資料放入產品資料陣列容器
                    this.products = res.data.products;
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        //開啟產品Modal
        openProductModal(status, product) {
            if (status === 'create') {
                this.temporaryProducts = {
                    imagesUrl: [],
                };
                productModal.show();
                this.status = 'create';
            } else if (status === 'edit') {
                productModal.show();
                this.temporaryProducts = {...product };
                this.status = 'edit';
            } else if (status === 'delete') {
                this.temporaryProducts = {...product };
                this.status = 'delete';
                delProductModal.show();
            }
        },
        //關閉產品Modal
        closeProductModal() {
            if (this.status === 'create' || this.status === 'edit') {
                productModal.hide();
            } else if (this.status === 'delete') {
                delProductModal.hide();
            }
        },
        //按下確定儲存按鈕
        saveProduct() {

            if (this.status === 'create') {
                this.createProduct();
            } else if (this.status === 'edit') {
                this.editProduct();
            }
        },

        //新增產品
        createProduct() {
            axios.post(`${apiUrl}/api/${apiPath}/admin/product`, { data: this.temporaryProducts })
                .then((res) => {
                    alert(res.data.message);
                    this.getData();
                    this.closeProductModal();
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.data.message);
                })
        },
        //編輯產品
        editProduct() {
            axios.put(`${apiUrl}/api/${apiPath}/admin/product/${this.temporaryProducts.id}`, { data: this.temporaryProducts })
                .then((res) => {
                    alert(res.data.message);
                    this.getData();
                    this.closeProductModal();
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.data.message);
                })
        },
        //刪除產品
        deleteProduct() {
            delProductModal.hide();
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.temporaryProducts.id}`, { data: this.temporaryProducts })
                .then((res) => {
                    this.getData();
                    alert(res.data.message);
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.data.message);
                })
        },

        createImages() {
            this.temporaryProducts.imagesUrl = [];
            this.temporaryProducts.imagesUrl.push('');
        },

    },

    mounted() {
        //從cookie取得Token
        var mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)KateCookieName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //每次發送axios請求的時候，會自動帶上headers來驗證身分，夾帶內容是Token
        axios.defaults.headers.common['Authorization'] = mytoken;

        this.checkLogin();

        //bootstrap實體化，產生新的變數並儲存在productModal
        productModal = new bootstrap.Modal(document.querySelector('#productModal'))
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
    }
});

app.mount('#app');