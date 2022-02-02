//註冊元件(自定義名稱、元件程式碼)
export const pagination = {
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: !pages.has_pre }">
        <a class="page-link" href="#" @click="$emit('getdata',pages.current_page-1)">Previous</a>
      </li>
      <li class="page-item" :class="{active:page===pages.current_page}" v-for='page in pages.total_pages' :key="page+'page'" >
      <a class="page-link" href="#" @click="$emit('getdata',page)">
      {{page}}
      </a>
      </li>
      <li class="page-item" :class="{disabled:!pages.has_next}">
        <a class="page-link" href="#" @click="$emit('getdata',pages.current_page+1)">Next</a>
      </li>
    </ul>
  </nav>`,
    props: ['pages'],

}