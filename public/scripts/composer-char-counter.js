$(document).ready(function(){
    $("#tweet-text").on("keyup",function(){
        const max = 140;
        let len = $(this).val().length;
        $(".counter").text(max-len);
        //console.log($(this).closest("form"));
        //console.log($(this).closest("form").find(".counter"));
        if(max <= len){
            $(".counter").css("color","red");
        }else{
            $(".counter").css("color","#545149");
        }
    })
})