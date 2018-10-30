var strToObj =  function(string){
    var str = eval('(' + string + ')');
    return str;
}
export{
    strToObj
}