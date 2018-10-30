import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import index from '../page/index.vue'
import login from '../page/login.vue'
import Omanagement from '../components/pages/Omanagement.vue'
import test from '../components/pages/test.vue'
import Rmanagement from '../components/pages/Rmanagement.vue'
import User from '../components/user/user.vue'
import Totail from '../components/user/totail.vue'
import Ischeck from '../components/user/ischeck.vue'
import Banner from '../components/base/Banner.vue'
import Question from '../components/base/question.vue'
import Questionnum from '../components/base/questionable/questionnum.vue'
import Textlable from '../components/base/textlable.vue'
import Textnum from '../components/base/textable/textnum.vue'
import Backtext from '../components/article/backtext.vue'
import Grounding from '../components/article/grounding.vue'
import Mytask from '../components/article/mytask.vue'
import Task from '../components/article/task.vue'
import MyArticle from '../components/article/myArticle.vue'
import Textlist from '../components/article/textlist.vue'
import Backmeet from '../components/meeting/backmeet.vue'
import Meetnew from '../components/meeting/meetnew.vue'

import Goods from '../components/tatal/goods/goods.vue'
import Template from '../components/tatal/template.vue'
import Questionnaire from '../components/tatal/questionnaire.vue'
import Newdiscuss from '../components/tatal/discuss/discuss.vue'
import Wish from '../components/tatal/wish.vue'
import Search from '../components/tatal/search.vue'
import Report from '../components/tatal/report.vue'
import Taskischeck from '../components/article/task/taskischeck.vue'
import backtextTaskischeck from '../components/article/backtext/backtextTaskischeck.vue'
import Tasktotal from '../components/article/task/tasktotal.vue'
import Meetnewadd from '../components/meeting/meetnewadd.vue'
import Meetdetail from '../components/meeting/meetdetail.vue'
import MeetChange from '../components/meeting/meetChange.vue'
import Backadd from '../components/meeting/backadd.vue'
import QuestNewAdd from '../components/tatal/questNewAdd.vue'
//import addnewdiscuss from '../components/tatal/addnewdiscuss'
import Statistics from '../components/tatal/statisticsTel.vue'
import StatisticsDetails from '../components/tatal/statisticsDetails.vue'
import ScrollsDetails from '../components/tatal/scrollsDetails.vue'
//**********************会议管理新增开始******************** */
//问卷统计
import quesDetail from '../components/meeting/quesDetail.vue'
//回答人数列表
import answerPer from '../components/meeting/answerper.vue'
//问卷回答详情页面
import meetquestionnaire from '../components/meeting/questionnaire.vue'
//**********************会议管理新增结束******************** */
export default new Router({
    routes: [{
            path: '/backtextTaskischeck',
            name: 'backtextTaskischeck',
            component: backtextTaskischeck
        }, {
            path: '/MyArticle',
            name: 'MyArticle',
            component: MyArticle
        }, {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/',
            name: 'login',
            component: login
        }, {
            path: '/omanagement',
            name: 'Omanagement',
            component: Omanagement
        }, {
            path: '/rmanagement',
            name: 'Rmanagement',
            component: Rmanagement
        }, {
            path: '/user',
            name: 'User',
            component: User
        }, {
            path: '/banner',
            name: 'Banner',
            component: Banner
        }, {
            path: '/question',
            name: 'Question',
            component: Question
        }, {
            path: '/questionable/questionnum',
            name: 'Questionnum',
            component: Questionnum
        }, {
            path: '/textlable',
            name: 'Textlable',
            component: Textlable
        }, {
            path: '/textnum',
            name: 'Textnum',
            component: Textnum
        }, {
            path: '/backtext',
            name: 'Backtext',
            component: Backtext
        }, {
            path: '/grounding',
            name: 'Grounding',
            component: Grounding
        }, {
            path: '/mytask',
            name: 'Mytask',
            component: Mytask
        }, {
            path: '/task',
            name: 'Task',
            component: Task
        }, {
            path: '/textlist',
            name: 'Textlist',
            component: Textlist
        }, {
            path: '/backmeet',
            name: 'Backmeet',
            component: Backmeet
        }, {
            path: '/meetnew',
            name: 'Meetnew',
            component: Meetnew
        }, {
            path: '/goods',
            name: 'Goods',
            component: Goods
        }, {
            path: '/template',
            name: 'Template',
            component: Template
        }, {
            path: '/questionnaire',
            name: 'Questionnaire',
            component: Questionnaire
        }, {
            path: '/newdiscuss',
            name: 'Newdiscuss',
            component: Newdiscuss
        }, {
            path: '/wish',
            name: 'Wish',
            component: Wish
        }, {
            path: '/search',
            name: 'Search',
            component: Search
        }, {
            path: '/report',
            name: 'Report',
            component: Report
        }, {
            path: '/ischeck',
            name: 'Ischeck',
            component: Ischeck
        }, {
            path: '/totail',
            name: 'Totail',
            component: Totail
        }, {
            path: '/taskischeck',
            name: 'Taskischeck',
            component: Taskischeck
        }, {
            path: '/tasktotal',
            name: 'Tasktotal',
            component: Tasktotal
        },

        {
            path: '/meetnewadd',
            name: 'meetnewadd',
            component: Meetnewadd
        },
        {
            path: '/meetdetail',
            name: 'meetdetail',
            component: Meetdetail
        },
        {
            path: '/backadd',
            name: 'backadd',
            component: Backadd
        },
        {
            path: '/meetChange',
            name: 'meetChange',
            component: MeetChange
        },
        {
            name: "backdetail",
            path: "/meeting/backdetail",
            component: () =>
                import ("@/components/meeting/backdetail")
        },
        {
            name: "backChange",
            path: "/meeting/backChange",
            component: () =>
                import ("@/components/meeting/backChange")
        },

        {
            path: "/questionManage/list",
            component: () =>
                import ("@/components/question/myQuestion/list")
        },
        {
            name: "questionDetail",
            path: "/questionManage/detail",
            component: () =>
                import ("@/components/question/myQuestion/detail")
        },
        {
            path: "/approveManage/list",
            name: "approveList",
            component: () =>
                import ("@/components/question/approveManage/list")
        },
        {
            path: "/approveManage/detail",
            name: "approveDetail",
            component: () =>
                import ("@/components/question/approveManage/detail")
        },
        {
            path: "/launchManage/list",
            name: "launchList",
            component: () =>
                import ("@/components/question/launchManage/list")
        },
        {
            path: "/launchManage/detail",
            name: "launchDetail",
            component: () =>
                import ("@/components/question/launchManage/detail")
        },
        {
            path: "/textlist/saveArticle",
            name: "saveArticle",
            component: () =>
                import ("@/components/article/tasklist/saveArticle")
        },
        {
            path: "/grounding/groundTasktotal",
            name: "groundTasktotal",
            component: () =>
                import ("@/components/article/grounding/groundTasktotal")
        }, {
            path: "/mytask/mytasktasktotal",
            name: "mytasktasktotal",
            component: () =>
                import ("@/components/article/mytask/mytasktasktotal")
        }, {
            path: "/grounding/groundTasktotal",
            name: "groundTaskischeck",
            component: () =>
                import ("@/components/article/grounding/groundTaskischeck")
        }, {
            path: "/tasklist/tasklistTaskischeck",
            name: "tasklistTaskischeck",
            component: () =>
                import ("@/components/article/tasklist/tasklistTaskischeck")
        },
        {
            path: '/questNewAdd', // htf
            name: 'questNewAdd',
            component: QuestNewAdd
        },
        // {
        //     path: "/tatal/addnewdiscuss",
        //     name: "addnewdiscuss",
        //     component: addnewdiscuss
        // }, 
        {
            path: "/statistics",
            name: "statistics",
            component: Statistics
        }, {
            path: "/statisticsDetails",
            name: "statisticsDetails",
            component: StatisticsDetails
        }, {
            path: "/scrollsDetails",
            name: "scrollsDetails",
            component: ScrollsDetails
        },
        // 正在讨论 开始----------
        {
            path: "/tatal/discuss/addDiscuss",
            name: "addDiscuss",
            component: () =>
                import ("@/components/tatal/discuss/addDiscuss")
        },
        {
            path: "/tatal/discuss/discussDetail",
            name: "discussDetail",
            component: () =>
                import ("@/components/tatal/discuss/discussDetail")
        },
        {
            path: "/tatal/discuss/editDiscuss",
            name: "editDiscuss",
            component: () =>
                import ("@/components/tatal/discuss/editDiscuss")
        },
        // 正在讨论 结束------------
        {
            path: "/quesDetail",
            name: "quesDetail",
            component: quesDetail
        },

        {
            path: "/answerPer",
            name: "answerPer",
            component: answerPer
        },

        {
            path: '/meetquestionnaire',
            name: 'meetquestionnaire',
            component: meetquestionnaire
        },
        // 商品
        {
            path: "/tatal/goods/goodsDetail",
            name: "goodsDetail",
            component: () =>
                import ("@/components/tatal/goods/goodsDetail")
        },
        {
            path: "/tatal/goods/editGoods",
            name: "editGoods",
            component: () =>
                import ("@/components/tatal/goods/editGoods")
        },
        {
            name: "applicants",
            path: "/meeting/applicants",
            component: () =>
                import ("@/components/meeting/applicants")
        },

        {
            name: "applicantDetail",
            path: "/meeting/applicantDetail",
            component: () =>
                import ("@/components/meeting/applicantDetail")
        },
        {
            name: "checkApplicant",
            path: "/meeting/checkApplicant",
            component: () =>
                import ("@/components/meeting/checkApplicant")
        }
        // 商品-----------

    ]
})