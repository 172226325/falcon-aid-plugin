
function aidActionEvent(contentVal,reqUrl,title,mockEnable,triggerNum){
  var ctVal1 = $("#reply-title").val();
  var ctVal2 = $(".d-editor-preview").html();
  var ctVal = ctVal1 + ctVal2
  var btnElm = $("#falcon-aid-is-enable-btn");
  var nf = btnElm.attr("num-flag");
  var numLvl = parseInt(nf);
  var ctLen = ctVal.length;
  // every n letters exec ajax call, otherwise ignore it
  // need record previous num
  var currentNumLvl = parseInt(ctLen / triggerNum);
  if(currentNumLvl != numLvl){
    btnElm.attr("num-flag",currentNumLvl + "")
    aidAJaxCall(ctVal1,reqUrl,title,mockEnable,ctVal2);
  }else{
    // ignore ajax
  }


  ;
  if(ctVal == '' || ctVal == '<!---->'){
    $("#falcon-aid-show-content").hide();
  }else{
    $("#falcon-aid-show-content").show();
  }
}
function aidRenderData(renderData){
  if(renderData == undefined || renderData == null){
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
      +"<span style='color:#222;'>"+renderData[i].title+"</span>"
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
      +"<span class=\"blurb\" style='margin-bottom:10px;'>"
      +"<span style='color:#646464;'>"+renderData[i].content+"</span>"
      +"</span>"
      +"</a>" +
      "</li>";
  }
  renderResult += "</ul>";
  $("#falcon-aid-show-content-topics").html(renderResult);
}
function aidAJaxCall(contentVal,reqUrl,title,mockEnable,ctVal2){
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
        ,content:ctVal2
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

      var reqUrl = this.siteSettings.falcon_aid_similar_topic_req_url;
      var title = this.siteSettings.falcon_aid_similar_topic_req_param;
      var mockEnable = this.siteSettings.falcon_aid_similar_topic_enable_mock;
      var triggerType = this.siteSettings.falcon_aid_similar_topic_trigger_type;
      var triggerNum = this.siteSettings.falcon_aid_similar_topic_trigger_num;

      if(ef == "0"){
        btnElm.attr("enable-flag","1")
        btnElm.text("disable aid");

        aidActionEvent($("#reply-title").val(),reqUrl,title,mockEnable,triggerNum);

        if(triggerType == "keyup"){
          //alert("keyup");
          $("#reply-title").keyup(function(){
            var contentVal = $(this).val();
            aidActionEvent(contentVal,reqUrl,title,mockEnable,triggerNum);
          });
          $(".d-editor-preview").bind("DOMNodeInserted",function(e){
            var contentVal = $(".d-editor-preview").html();
            aidActionEvent(contentVal,reqUrl,title,mockEnable,triggerNum);
          });

        }else{
          $("#reply-title").blur(function(){
           // alert("blur");
            var contentVal = $(this).val();
            aidActionEvent(contentVal,reqUrl,title,mockEnable,triggerNum);
          });
        }


      }else{
        btnElm.attr("enable-flag","0")
        btnElm.text("enable aid");
        if(triggerType == "keyup"){
          $("#reply-title").unbind("keyup");
          $(".d-editor-preview").unbind("DOMNodeInserted");
        }else{
          $("#reply-title").unbind("blur");
        }
        $("#falcon-aid-show-content").hide();
      }
    }
  }
};

