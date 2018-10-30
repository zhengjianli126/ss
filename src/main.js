// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入路由
import router from './router'
import { Emit } from './emit/emit.js'
Vue.prototype.Emit = Emit;
//引入vuex
import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex);
//引入Cookies
import Cookies from 'js-cookie'
Vue.prototype.Cookies = Cookies;
//按需引入element-ui
import {
    Cascader,
    Container,
    Badge,
    Input,
    Tag,
    Button,
    Tabs,
    TabPane,
    Checkbox,
    Submenu,
    MenuItem,
    Menu,
    MenuItemGroup,
    Upload,
    DatePicker,
    Pagination,
    Table,
    TableColumn,
    Tree,
    Dialog,
    Form,
    Option,
    Select,
    FormItem,
    Radio,
    Loading,
    TimePicker,
    Collapse,
    CollapseItem,
    CheckboxMenu,
    Row,
    Col,
    header,
    main,
    RadioGroup, // htf
    RadioButton, // htf
    Message,
    Notification,
    MessageBox,
    alert,
    confirm,
    prompt,
} from 'element-ui';
Vue.component(Button.name, Button);
Vue.use(Cascader)
Vue.use(Container)
Vue.use(main)
Vue.use(header)
Vue.use(Badge)
Vue.use(Loading)
Vue.use(Radio)
Vue.use(Tabs)
Vue.use(Select)
Vue.use(Option)
Vue.use(FormItem)
Vue.use(Form, Form.item)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Row);
Vue.use(Col);
Vue.use(RadioGroup); // htf
Vue.use(RadioButton) // htf
Vue.use(RadioGroup); // htf
Vue.use(RadioButton); // ht
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
//重置css
import 'minireset.css'

//es6-promise的兼容性搭配
var Promise = require('es6-promise').Promise;

// Vue.use(MintUI);

Vue.config.productionTip = false

Vue.directive('trigger', {
        inserted(el, binging) {
            binging.value ? el.click() : ''
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount("#app");