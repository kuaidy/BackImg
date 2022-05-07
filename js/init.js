$(function(){
    //改变宽度
    $("#bgwidth").keyup(function(){
        var width=$("#bgwidth").val();
        ChangeWidth(width);
    });
    //改变高度
    $("#bgheight").keyup(function(){
        var height=$("#bgheight").val();
        ChangeHeight(height);
    });

    //改变背景色
    $("#bgcolor").change(function(){
        var bgcolor=$("#bgcolor").val();
        ChangeColor(bgcolor);
    });

    //添加背景图片
    $("#localbgimg").change(function(e){
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=function(){
            var imagedata=reader.result;
            //console.log(imagedata);
            $("#Imageid").css({"background-image":"url("+imagedata+")","background-repeat":"no-repeat"});
        };
    });
    //拖动背景图片
    $("#localbgimg").mousedown(function(e){
        var startx=e.pageX;
        var starty=e.pageY;
        $("#localbgimg").mousemove(function(e){
            //$("#Imageid").css({""});
        })
    });
    //改变背景图案
    $("#SelectPattern").change(function(e){
        ChangePattern();
    });

    //传统色
    $("#fenhong").click(function(){
        var bgcolor=$("#fenhong").val();
        ChangeColor(bgcolor);
    });
    $("#ehuang").click(function(){
        var bgcolor=$("#ehuang").val();
        ChangeColor(bgcolor);
    });
    $("#nenglv").click(function(){
        var bgcolor=$("#nenglv").val();
        ChangeColor(bgcolor);
    });
    $("#lan").click(function(){
        var bgcolor=$("#lan").val();
        ChangeColor(bgcolor);
    });
    $("#cang").click(function(){
        var bgcolor=$("#cang").val();
        ChangeColor(bgcolor);
    });
    $("#shui").click(function(){
        var bgcolor=$("#shui").val();
        ChangeColor(bgcolor);
    });
    $("#xiangyabai").click(function(){
        var bgcolor=$("#xiangyabai").val();
        ChangeColor(bgcolor);
    });
    $("#xuan").click(function(){
        var bgcolor=$("#xuan").val();
        ChangeColor(bgcolor);
    });
    $("#chijin").click(function(){
        var bgcolor=$("#chijin").val();
        ChangeColor(bgcolor);
    });

    //网络图标
    $("#bgicon").change(function(){
        var bgicon=$("#bgicon").val();
        DownLoadReportIMG(bgicon);
    });
    //本地图标
    $("#localbgicon").change(function(e){
        ChangeLocalIcon(e);
        $("#lb_note").hide();
    });
    //图标宽度
    $("#bgiconwidth").change(function(){
        ChangeIconWidth();
    });
    //图标宽度
    $("#bgiconheight").change(function(){
        ChangeIconHeight();
    });
    //字体内容设置
    $("#TextContent").change(function(){
        ChangeTextContent();
        $("#lb_note").hide();
    });
    //字体大小
    $("#TextSize").change(function(){
        ChangeTextSize();
    });
    //字体颜色
    $("#TextColor").change(function(){
        ChangeTextColor();
    });

    //字体类型
    $("#TextFontFamily").change(function(){
        ChangeTextFontFamily();
    });

    //下载
    $("#download").click(function(){
        DownLoad();
    });
    //重制
    $("#reset").click(function(){
        Reset();
    });
    //下拉框选择事件
    $("#ChangeType").change(function(){
        ChangeItem();
    });

    $('#iconurl').load('selecticon.html');

    $('#colorurl').load('selectcolor.html');

    //图标推荐
    $("#SelectIcon").click(function(){
        ShowIcon();
    });
    //颜色推荐
    $("#SelectColor").click(function(){
        ShowColor();
    });

    //设置阴影
    $("#SetShadowX").change(function(){
        SetPicShadow();
    });
    $("#SetShadowY").change(function(){
        SetPicShadow();
    });
    $("#SetShadowSize").change(function(){
        SetPicShadow();
    });
    $("#SetShadowColor").change(function(){
        SetPicShadow();
    });
    //获取图标主题颜色
    $("#GetMainColor").click(function(){
        var ImageIconColor=document.getElementById("ImageIconColor");
        var childs = ImageIconColor.childNodes; 
        for(var i = childs .length - 1; i >= 0; i--) {
            ImageIconColor.removeChild(childs[i]);
        }
        GetRgbData();
    });

    //使用水印
    $("#ip_UseWaterMark").change(function(){
        if(($("#ip_UseWaterMark").is(":checked"))){
            SetWaterMark();
        }else{
            $("div").remove(".div_WaterMarkText");
        }
    });

    //选择文字的风格
    $("#TextStyleType").change(function(){
        SetTextStyle();
    });
});