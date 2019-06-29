
function aidKeyUpEvent(contentVal,reqUrl,title,mockEnable){
  aidAJaxCall(contentVal,reqUrl,title,mockEnable);
  if(contentVal == ''){
    $("#falcon-aid-show-content").hide();
  }else{
    $("#falcon-aid-show-content").show();
  }
}
function aidRenderData(renderData){
  if(renderData == undefined || renderData == null || renderData.length == 0){
    return;
  }
  var renderResult = "<ul>";
  for(var i = 0;i<renderData.length;i++){
    renderResult +="<li><a target='_blank' href='"+renderData[i].url+"'>"+renderData[i].title+"</a></li>";
  }
  renderResult += "</ul>";
  $("#falcon-aid-show-content-topics").html(renderResult);
}
function aidAJaxCall(contentVal,reqUrl,title,mockEnable){
  var mockData = [{
    "title":"baidu site"
    ,"url":"http://www.baidu.com"
  },{
    "title":"google site"
    ,"url":"http://www.google.com"
  }];

  if(mockEnable){
    aidRenderData(mockData);
  }else{
    var urlSuffix = "";
    if(title != ""){
      urlSuffix += "?"+title+"="+contentVal;
    }
    $.ajax({
      type: 'post',
      url:reqUrl+urlSuffix,
      contentType:'application/x-www-form-urlencoded',
      data:{
        title:contentVal
      },
      dataType:'json',
      success:function (data) {
        aidRenderData(data.data);
      }
    });
  }

}
export default {
  actions: {
    setContent(content){
    },
    setAidEnabled(){
      var btnElm = $("#falcon-aid-is-enable-btn");
      var ef = btnElm.attr("enable-flag");

      if(ef == "0"){
        btnElm.attr("enable-flag","1")
        btnElm.text("disable aid");
        var reqUrl = this.siteSettings.falcon_aid_similar_topic_req_url;
        var title = this.siteSettings.falcon_aid_similar_topic_req_param;
        var mockEnable = this.siteSettings.falcon_aid_similar_topic_enable_mock;
        aidKeyUpEvent($("#reply-title").val(),reqUrl,title,mockEnable);
        $("#reply-title").keyup(function(){
          var contentVal = $(this).val();
          aidKeyUpEvent(contentVal,reqUrl,title,mockEnable);
        });

      }else{
        btnElm.attr("enable-flag","0")
        btnElm.text("enable aid");
        $("#reply-title").unbind("keyup");
        $("#falcon-aid-show-content").hide();
      }
    }
  }
};

