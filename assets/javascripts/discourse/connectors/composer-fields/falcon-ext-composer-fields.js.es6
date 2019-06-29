
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
  var renderResult = "<ul class='list'>";
  for(var i = 0;i<renderData.length;i++){
    renderResult +=
      "<li class='item'>" +
      "<a class='widget-link search-link' target='_blank' href='"+renderData[i].url+"'>"
      +"<span class=\"topic\" style='flex-direction:column;'>"
      +"<div class=\"first-line\">"
      +"<span class=\"topic-title\">"
      +"<span>"+renderData[i].title+"</span>"
      +"</span>"
      +"</div>"
      +"<div class=\"second-line\">"
      +"<span class=\"badge-wrapper bullet\">"
      +"<span class=\"badge-category-bg\" style=\"background-color: "+renderData[i].color+";\">"
      +"</span>"
      +"<span data-drop-close=\"true\" class=\"badge-category clear-badge\">"
      +"<span class=\"category-name\">"+renderData[i].category+"</span>"
      +"</span>"
      +"</span>"
      +"</div>"
      +"</span>"
      +"<span class=\"blurb\">"
      +"<span>"+renderData[i].content+"</span>"
      +"</span>"
      +"</a>" +
      "</li>";
  }
  renderResult += "</ul>";
  $("#falcon-aid-show-content-topics").html(renderResult);
}
function aidAJaxCall(contentVal,reqUrl,title,mockEnable){
  var mockData = [{
    "title":"BUG : theme name not updated"
    ,"url":"http://www.baidu.com"
    ,"color":"#e9dd00"
    ,"content":"Hello, I create a new theme and then I rename this theme but the name is not updated in the Profile"
    ,"category":"MJE"
  },{
    "title":"google site"
    ,"url":"http://www.google.com"
    ,"color":"green"
    ,"content":"hijglmnopqopqrst"
    ,"category":"en"
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

