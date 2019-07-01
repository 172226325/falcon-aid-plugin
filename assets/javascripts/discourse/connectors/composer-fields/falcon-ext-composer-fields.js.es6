
function aidKeyUpEvent(contentVal){
  $("#falcon-aid-show-content").html(contentVal);
  if(contentVal == ''){
    $("#falcon-aid-show-content").hide();
  }else{
    $("#falcon-aid-show-content").show();
  }
}
export default {
  actions: {
    setContent(content){
      //$("#falcon-aid-show-content").html(content);
    },
    setAidEnabled(){
      //alert("click me ");
      //falcon-aid-is-enable-btn
      //alert($("#reply-title").val());
      //alert($("div[class='title-and-category'] > input[id='reply-title']").val());
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
        $("#falcon-aid-show-content").html("welcome to use falcon aid");
        $("#falcon-aid-show-content").hide();
      }
    }
  }
};
// $(function(){
//   $("div[class='title-and-category'] > input[id='reply-title']").change(function(){
//     $("#falcon-aid-show-content").html($(this).val());
//   });
// });
