
function aidKeyUpEvent(contentVal){
  aidAJaxCall(contentVal);
  if(contentVal == ''){
    $("#falcon-aid-show-content").hide();
  }else{
    $("#falcon-aid-show-content").show();
  }
}
function aidAJaxCall(contentVal){
  var mockData = [{
    "title":"baidu site"
    ,"url":"http://www.baidu.com"
  },{
    "title":"google site"
    ,"url":"http://www.google.com"
  }];
  //http://100.98.63.151:8081/logai/classificationByMjd
  //data.data[0].exceptionType
  //logUrl:'https://tgfweb.rnd.ki.sw.ericsson.se/executions/24141/24141535/jcat/testcase.html?index=7 '
  $.ajax({
    type: 'post',
    url:'/mini-profiler-resources/results',
    contentType:'application/x-www-form-urlencoded',
    data:{
      title:contentVal
    },
    dataType:'json',
    success:function (data) {

    }
  });

  var renderData = "<ul>";
  for(var i = 0;i<mockData.length;i++){
    renderData +="<li><a target='_blank' href='"+mockData[i].url+"'>"+mockData[i].title+"</a></li>";
  }
  renderData += "</ul>";
  $("#falcon-aid-show-content-topics").html(renderData);

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
        aidKeyUpEvent($("#reply-title").val());
        $("#reply-title").keyup(function(){
          var contentVal = $(this).val();
          aidKeyUpEvent(contentVal);
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

