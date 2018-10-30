import fetch from '../config/fetch'
import * as meeting from './tempdata/meeting'
import "fetch-ie8"
import "fetch-detector"
/**
 * 模拟json数据
 */
const setpromise = data => {
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }
    /**
     * 请求超时的处理
     *
     */
function _fetch(fetch, timeout) {
    return Promise.race([
        fetch,
        new Promise(function(resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), timeout);
        })
    ]);
}
/**
 * 登录人员信息
 */
//暂时设置production模式development()
if (process.env.NODE_ENV == 'development') {
    /*var  Login = (data) => _fetch('GET', 'historyWeather/province', data);*/
    var Meeting = () => setpromise(meeting.meeting);

} else {

    var Meeting = () => setpromise(meeting.meeting);
    // var  Login = (data) => _fetch('POST', '/static/userinfo.json', data);
}
//**********************************会议管理接口开始**********************************
//新增会议
var NewMeetingSave = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/save', data, 'ajax', false, true);
//修改会议
var ChangeMeetingApi = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/updateMeetInfo', data, 'ajax', false, true);
//根据会议id查询会议信息
var GetMeetingDetail = (data) => fetch('GET', 'http://39.106.49.2:8078/meet/getMeetInfo', data, 'ajax');
//查询问卷列表
var searchQuesList = (data) => fetch('GET', 'http://39.106.49.2:8078/ballot/getAllBallots', data, 'ajax');
//推送问卷
var PushBalloApi = (data) => fetch('GET', 'http://39.106.49.2:8078/ballot/pushBallotToUsers', data, 'ajax');
//问卷统计列表
var PushBalloListApi = (data) => fetch('GET', 'http://39.106.49.2:8078/ballot/getBallotsByMeetId', data, 'ajax');
//获取问卷回答人数列表
var PushAnswerPerListApi = (data) => fetch('GET', 'http://39.106.49.2:8078/ballot/getAnswersByBallotId', data, 'ajax');
//获取问卷回复详情
var meetQuesNaireApi = (data) => fetch('GET', 'http://39.106.49.2:8078/ballot/getAnswerInfoByBallotIdAndUserId', data, 'ajax');
//根据会议id批量删除会议
var DeleteMeetingApi = (data) => fetch('GET', 'http://39.106.49.2:8078/meet/deleteBatch', data, 'ajax');
//根据会议id批量上架、下架会议
var UpDownMeetingApi = (data) => fetch('GET', 'http://39.106.49.2:8078/meet/operateMeetBatch', data, 'ajax');
//根据会议id开始报名、结束报名会议
var StartEndMeetingApi = (data) => fetch('GET', 'http://39.106.49.2:8078/meet/updateMeetSignStatus', data, 'ajax');
//根据会议id获取报名人员列表
var getAttendmeetByCondition = (data) => fetch('GET', 'http://39.106.49.2:8078/attend/getAttendmeetByCondition', data, 'ajax');
//根据会议id获取报名人员列表
var getAttendmeetByCondition = (data) => fetch('GET', 'http://39.106.49.2:8078/attend/getAttendmeetByCondition', data, 'ajax');
//给报名人员发送短信或站内信
var sendMeetMessage = (data) => fetch('GET', 'http://39.106.49.2:8078/attend/sendMessage', data, 'ajax');
//根据会议id和用户id获取报名人员以及会议详细信息
var getAttendmeetByMeetIdAndUserId = (data) => fetch('GET', 'http://39.106.49.2:8078/attend/getAttendmeetByMeetIdAndUserId', data, 'ajax');
//**********************************会议管理接口结束**********************************

var Login = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/login', data, 'ajax');
var Adds = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/save', data, 'ajax');
var Listheads = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/getAdminsByCondition', data, 'ajax');
var Change = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/updateAdmin', data, 'ajax');
var Addsr = (data) => fetch('POST', 'http://39.106.49.2:8078/role/save', data, 'ajax');
var GetRolesByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/role/getRolesByCondition', data, 'ajax');
var Changer = (data) => fetch('POST', 'http://39.106.49.2:8078/role/updateRole', data, 'ajax');
var Del = (data) => fetch('POST', 'http://39.106.49.2:8078/role/deleterole', data, 'ajax');
var Forupdate = (data) => fetch('POST', 'http://39.106.49.2:8078/menu/forupdate', data, 'ajax');
var Forsave = (data) => fetch('POST', 'http://39.106.49.2:8078/menu/forsave', data, 'ajax');
var Save = (data) => fetch('POST', 'http://39.106.49.2:8078/role/save', data, 'ajax');
var Rdel = (data) => fetch('POST', 'http://39.106.49.2:8078/role/deleterole', data, 'ajax');
var Rupdate = (data) => fetch('POST', 'http://39.106.49.2:8078/role/updateRole', data, 'ajax');
var Rstop = (data) => fetch('POST', 'http://39.106.49.2:8078/role/stopRole', data, 'ajax');
var Rstart = (data) => fetch('POST', 'http://39.106.49.2:8078/role/startRole', data, 'ajax');
var Getusers = (data) => fetch('POST', 'http://39.106.49.2:8078/users/getUsersByCondition', data, 'ajax');
var GetDetails = (data) => fetch('POST', 'http://39.106.49.2:8078/users/getDetails', data, 'ajax');
var stopUser = (data) => fetch('POST', 'http://39.106.49.2:8078/users/stopUser', data, 'ajax');
var updateUser = (data) => fetch('POST', 'http://39.106.49.2:8078/users/updateUser', data, 'ajax');
var sendMessage = (data) => fetch('POST', 'http://39.106.49.2:8078/users/sendMessage', data, 'ajax');
var startUser = (data) => fetch('POST', 'http://39.106.49.2:8078/users/startUser', data, 'ajax');
var getCheckPendingArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getCheckPendingArticle', data, 'ajax');
var startUser = (data) => fetch('POST', 'http://39.106.49.2:8078/users/startUser', data, 'ajax');
var resetAdminPwd = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/resetAdminPwd', data, 'ajax');
var beginCheckArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/beginCheckArticle', data, 'ajax');
var quitCheckArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/quitCheckArticle', data, 'ajax');
var saveCheckArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/saveCheckArticle', data, 'ajax');
var endCheckArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/endCheckArticle', data, 'ajax');
var getLabelsByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/label/getLabelsByCondition', data, 'ajax');
var getArticleInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getArticleInfo', data, 'ajax');
var getArticleOperate = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getArticleOperate', data, 'ajax');
var getArticleByAdmin = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getArticleByAdmin', data, 'ajax');
var revokeCheckBackArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/revokeCheckBackArticle', data, 'ajax');
var operateArticleBatch = (data) => fetch('POST', 'http://39.106.49.2:8078/article/operateArticleBatch', data, 'ajax');
var getOneLabels = (data) => fetch('POST', 'http://39.106.49.2:8078/label/getOneLabels', data, 'ajax');
var deleteLabel = (data) => fetch('POST', 'http://39.106.49.2:8078/label/deleteLabel', data, 'ajax');
var getCheckedArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getCheckedArticle', data, 'ajax');
var updatePro = (data) => fetch('POST', 'http://39.106.49.2:8078/label/update_pro', data, 'ajax');
var GetArticleByAdmin = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getArticleByAdmin', data, 'ajax');
var getBackedArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getBackedArticle', data, 'ajax');
var save = (data) => fetch('POST', 'http://39.106.49.2:8078/label/save', data, 'ajax');
var update = (data) => fetch('POST', 'http://39.106.49.2:8078/label/update', data, 'ajax');
var updateAdmin = (data) => fetch('POST', 'http://39.106.49.2:8078/admin/updateAdmin', data, 'ajax');
var getAllRoles = (data) => fetch('POST', 'http://39.106.49.2:8078/role/getAllRoles', data, 'ajax');
//文章
var operateCheckArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/operateCheckArticle', data, 'ajax');
var articleSave = (data) => fetch('POST', 'http://39.106.49.2:8078/article/save', data, 'ajax');
var getAllArticleLabel = (data) => fetch('POST', 'http://39.106.49.2:8078/label/getAllArticleLabels', data, 'ajax');
var getAllUsersInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/users/getAllUsersInfo', data, 'ajax');
var setArticleHot = (data) => fetch('POST', 'http://39.106.49.2:8078/article/setArticleHot', data, 'ajax');
var updateArticleByArticleId = (data) => fetch('POST', 'http://39.106.49.2:8078/article/updateArticleByArticleId', data, 'ajax');
var updateCheckedArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/updateCheckedArticle', data, 'ajax');
//我的投稿
var getMySaveArticle = (data) => fetch('POST', 'http://39.106.49.2:8078/article/getMySaveArticle', data, 'ajax');
var saveAgain = (data) => fetch('POST', 'http://39.106.49.2:8078/article/saveAgain', data, 'ajax');
//会议咨询
var getMeetsByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/getMeetsByCondition', data, 'ajax');
var getReplaysByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/replay/getReplaysByCondition', data, 'ajax');
var operateMeetBatch = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/operateMeetBatch', data, 'ajax');
var getMeetInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/getMeetInfo', data, 'ajax');
var Meetsave = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/save', data, 'ajax');
var getReplayInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/replay/getReplayInfo', data, 'ajax');
//往期回顾
var getEndMeets = (data) => fetch('POST', 'http://39.106.49.2:8078/meet/getEndMeets', data, 'ajax');
//上传附件
var uploadAttach = (data) => fetch('POST', 'http://39.106.49.2:8078/upload/upload_img?suffix=.jpg', data, 'ajax', true);

// 问题管理 > 我的提问查询列表
var getMyQuestionListByCondition = (data) => fetch('GET', 'http://39.106.49.2:8078/question/getQuesOwnByCondition', data, 'ajax');
// > 查询新增页面信息
var getAllLabelsName = (data) => fetch('GET', 'http://39.106.49.2:8078/label/getAllLabelsName', data, 'ajax');
// > 新增问题保存
var saveQuestionInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/question/save', data, 'ajax');
//问题管理 查询审核管理和上架管理
const getQuestionList = data => fetch("GET", "http://39.106.49.2:8078/question/getQuesByCondition", data, "ajax");
//问题管理 详情页 审批通过
const updateQuesCheck = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesCheck", data, "ajax");
//问题管理-上架管理-设为热门
const updateQuesHot = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesHot", data, "ajax");
//问题管理-上架管理-设为不热门
const updateQuesNotHot = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesNotHot", data, "ajax");
//问题管理-上架管理-设为上架
const updateQuesUp = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesUp", data, "ajax");
//问题管理-上架管理-设为下架
const updateQuesDownp = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesDownp", data, "ajax");
//问题管理-上架管理-问题删除
const deleteQues = data => fetch("POST", "http://39.106.49.2:8078/question/deleteQues", data, "ajax");
// > 新增问题编辑
var eDitQuestionInfo = (data) => fetch('POST', 'http://39.106.49.2:8078/question/updateQues', data, 'ajax');
//问题回答列表
const getAllAnswer = data => fetch("POST", "http://39.106.49.2:8078/question/getAllAnswer", data, "ajax");
const updateQuesDown = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesDown", data, "ajax");
//问题管理 详情页 拒接审批通过
const updateQuesFail = data => fetch("POST", "http://39.106.49.2:8078/question/updateQuesFail", data, "ajax");
//正在讨论
var getKeydisByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/getKeydisByCondition', data, 'ajax');
var saveDiscuss = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/save', data, 'ajax');
var deleteDisById = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/delete', data, 'ajax');
var publicKeydis = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/publicKeydis', data, 'ajax');
var getDisDetail = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/getKeydisInfo', data, 'ajax');
var updateDiscuss = (data) => fetch('POST', 'http://39.106.49.2:8078/keydis/update', data, 'ajax');

//商品
var getSaveGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/save', data, 'ajax');
var getGoodsList = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/getGoodsByCondition', data, 'ajax');
var getGoodsDetail = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/getGoodsDetail', data, 'ajax');
var updateGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/updateGoods', data, 'ajax');
var uploadGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/uploadGoods', data, 'ajax');
var downGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/downGoods', data, 'ajax');
var deleteGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/deleteGoods', data, 'ajax');
var getGoodsExByCondition = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/getGoodsExByCondition', data, 'ajax');
var exchangeGoods = (data) => fetch('GET', 'http://39.106.49.2:8078/goods/exchangeGoods', data, 'ajax');

// 模板管理/问卷管理得接口 -- htf-start
var getVotethemesByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/votetheme/getVotethemesByCondition', data, 'ajax');
var addTelHtf = (data) => fetch('POST', 'http://39.106.49.2:8078/votetheme/save', data, 'ajax');
var delTelHtf = (data) => fetch('POST', 'http://39.106.49.2:8078/votetheme/delete', data, 'ajax');
var getBallotsByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getBallotsByCondition', data, 'ajax');
var getVotethemeNamesList = (data) => fetch('POST', 'http://39.106.49.2:8078/votetheme/getVotethemeNames', data, 'ajax');
var saveTelHtf = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/save', data, 'ajax', false, true);
var delQuestList = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/deleteBatch', data, 'ajax');
var getBallotInfoReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getBallotInfo', data, 'ajax');
var updateBallotInfoReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/update', data, 'ajax', false, true);
var updateBallotInfoReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/update', data, 'ajax', false, true);
var getCountBallotReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getCountBallot', data, 'ajax');
var getAnswersByIdReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getAnswersById', data, 'ajax');
var getAnswerInfoByBallotIdAndUserIdReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getAnswerInfoByBallotIdAndUserId', data, 'ajax');
var addOptionSupportReq = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/addOptionSupport', data, 'ajax');
// 模板管理得接口 -- htf-end
//  许愿管理
var queryWishes = (data) => fetch('GET', 'http://39.106.49.2:8078/wish/getWishByCondition', data, 'ajax');
var dealWishes = (data) => fetch('GET', 'http://39.106.49.2:8078/wish/updateWish', data, 'ajax');
//  搜索管理
var queryKeyword = (data) => fetch('GET', 'http://39.106.49.2:8078/search/getSearchByCondition', data, 'ajax');
var setHot = (data) => fetch('GET', 'http://39.106.49.2:8078/search/updateSearchHot', data, 'ajax');
var cancelHot = (data) => fetch('GET', 'http://39.106.49.2:8078/search/updateSearchCold', data, 'ajax');
//  举报管理
var queryReport = (data) => fetch('GET', 'http://39.106.49.2:8078/report/getReportByCondition', data, 'ajax');
var deleteReport = (data) => fetch('GET', 'http://39.106.49.2:8078/report/updateReportDelete', data, 'ajax');
var setReportSafe = (data) => fetch('GET', 'http://39.106.49.2:8078/report/updateReportSafe', data, 'ajax');
// banner
var getBannersByCondition = (data) => fetch('POST', 'http://39.106.49.2:8078/banner/getBannersByCondition', data, 'ajax');
var saveBanner = (data) => fetch('POST', 'http://39.106.49.2:8078/banner/save', data, 'ajax');
var deleteBanner = (data) => fetch('POST', 'http://39.106.49.2:8078/banner/delete', data, 'ajax');
var publicBanner = (data) => fetch('POST', 'http://39.106.49.2:8078/banner/publicBanner', data, 'ajax');
var getAllBallots = (data) => fetch('POST', 'http://39.106.49.2:8078/ballot/getAllBallots', data, 'ajax');
var bannerUpdate = (data) => fetch('POST', 'http://39.106.49.2:8078/banner/update', data, 'ajax');
export {
    getAttendmeetByMeetIdAndUserId,
    sendMeetMessage,
    getAttendmeetByCondition,
    getAllAnswer,
    eDitQuestionInfo,
    getEndMeets,
    updateGoods,
    uploadGoods,
    downGoods,
    deleteGoods,
    getBallotInfoReq,
    delQuestList,
    getGoodsDetail,
    getGoodsList,
    getSaveGoods,
    getGoodsExByCondition,
    exchangeGoods,
    update,
    updateQuesDown,
    updateQuesFail,
    getMySaveArticle,
    saveAgain,
    saveQuestionInfo,
    updateQuesCheck,
    updateQuesHot,
    updateQuesNotHot,
    updateQuesUp,
    updateQuesDownp,
    deleteQues,
    getKeydisByCondition,
    saveDiscuss,
    deleteDisById,
    publicKeydis,
    getDisDetail,
    updateDiscuss,
    getMyQuestionListByCondition,
    getAllLabelsName,
    uploadAttach,
    updateCheckedArticle,
    updateArticleByArticleId,
    setArticleHot,
    getAllUsersInfo,
    getAllArticleLabel,
    articleSave,
    getAllRoles,
    updateAdmin,
    save,
    getBackedArticle,
    operateArticleBatch,
    GetArticleByAdmin,
    updatePro,
    deleteLabel,
    getCheckedArticle,
    getOneLabels,
    revokeCheckBackArticle,
    getArticleByAdmin,
    getArticleOperate,
    operateCheckArticle,
    getArticleInfo,
    getLabelsByCondition,
    endCheckArticle,
    saveCheckArticle,
    quitCheckArticle,
    beginCheckArticle,
    Meeting,
    Login,
    Adds,
    Listheads,
    Change,
    Forupdate,
    Addsr,
    GetRolesByCondition,
    Changer,
    Del,
    Forsave,
    Save,
    Rdel,
    Rupdate,
    Rstop,
    Rstart,
    Getusers,
    GetDetails,
    stopUser,
    updateUser,
    sendMessage,
    startUser,
    getCheckPendingArticle,
    resetAdminPwd,
    getMeetsByCondition,
    getReplaysByCondition,
    operateMeetBatch,
    getMeetInfo,
    Meetsave,
    getQuestionList,
    getReplayInfo,
    getVotethemesByCondition, // htf
    addTelHtf,
    delTelHtf,
    getBallotsByCondition,
    getVotethemeNamesList,
    saveTelHtf,
    updateBallotInfoReq,
    getCountBallotReq,
    getAnswersByIdReq,
    getAnswerInfoByBallotIdAndUserIdReq,
    addOptionSupportReq,
    //会议接口开始
    NewMeetingSave,
    GetMeetingDetail,
    searchQuesList,
    PushBalloApi,
    PushBalloListApi,
    PushAnswerPerListApi,
    meetQuesNaireApi,
    ChangeMeetingApi,
    DeleteMeetingApi,
    UpDownMeetingApi,
    StartEndMeetingApi,
    //会议接口结束
    //  许愿管理
    queryWishes,
    dealWishes,
    //  搜索管理
    queryKeyword,
    setHot,
    cancelHot,
    //  举报管理
    queryReport,
    deleteReport,
    setReportSafe,
    getBannersByCondition,
    saveBanner,
    deleteBanner,
    publicBanner,
    getAllBallots,
    bannerUpdate
}