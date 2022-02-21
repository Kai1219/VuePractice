const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'kate-hexschool';
/*載入表單規則*/
VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
VeeValidate.defineRule('min', VeeValidateRules['min']);
VeeValidate.defineRule('max', VeeValidateRules['max']);
/*載入外部資源*/
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale設定與驗證的方式
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'), //語系設定
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = Vue.createApp({
    data() {
        return {
            cartData: {},
            products: [],
            productId: '',
            //讀取效果
            isLoadingItem: '',
            isLoadingAll: false,
            orderform: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
        };
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        openProductModal(id) {
            this.productId = id;
            this.$refs.productModal.openModal();
        },
        getCart() {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
                .then((res) => {
                    this.cartData = res.data.data;
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        addToCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty,
            };
            this.isLoadingItem = id;
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
                .then((res) => {
                    alert(res.data.message);
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
            this.$refs.productModal.closeModal();
            this.isLoadingItem = '';
        },
        deleteCartItem(id) {
            this.isLoadingItem = id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
                .then((res) => {
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
            this.isLoadingItem = '';
        },
        deleteCartAll() {
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
                .then((res) => {
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        updateCartItem(item) {
            const data = {
                product_id: item.id,
                qty: item.qty,
            };
            this.isLoadingItem = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
                .then((res) => {
                    this.getCart();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
            this.isLoadingItem = '';
            console.log(this.cartData);
        },
        submitorder() {
            if (this.cartData.carts.length <= 0) {
                alert('請加入商品');
            } else {
                const data = this.orderform;
                axios.post(`${apiUrl}/api/${apiPath}/order`, { data })
                    .then((res) => {
                        alert(res.data.message);
                        //this.deleteCartAll();
                        this.getCart();
                        this.$refs.form.resetForm();
                    })
                    .catch((error) => {
                        alert(error.data.message);

                    })
            }
        },
        addLoading() {
            this.isLoadingAll = true;
            setTimeout(() => {
                this.isLoadingAll = false
            }, 1000)
        },
    },
    mounted() {
        this.getProducts();
        this.getCart();
    },
});

// $refs
app.component('product-modal', {
    props: ['id'],
    template: '#userProductModal',
    data() {
        return {
            modal: {},
            productDetail: {},
            qty: 1,
        };
    },
    watch: {
        id() {
            this.getProduct();
            this.qty = 1;
        },
    },
    methods: {
        openModal() {
            this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        },
        getProduct() {
            axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
                .then((res) => {
                    this.productDetail = res.data.product;
                })
                .catch((error) => {
                    alert(error.data.message);
                })
        },
        addToCart() {
            this.$emit('addtocart', this.productDetail.id, this.qty)
        },
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);

    },
});
/*註冊表單元件*/
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.component('Loading', VueLoading.Component);
app.mount('#app');