//背景图案
function ChangePattern(){
    var pattern=$("#SelectPattern").val();
    var url="./image/pattern/"+pattern+".svg";
    $("#Imageid").css({
        "background-image":"url("+url+")"
    });
}
//随机颜色
function GetRandomColor(){
	var rgb=(Math.random()*0xffffff<<0).toString(16); 
	$("#Imageid").css("background-color","#"+rgb);
}