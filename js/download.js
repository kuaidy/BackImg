//绘制图像
function DownLoad(){
    var width=$("#Imageid").width();
    var height=$("#Imageid").height();
    var bgcolor=$("#Imageid").css("background-color");

    //获取span的宽度
    var spanwidth=$("#ImageText").width();
    var spanheight=$("#ImageText").height();

    var img=document.getElementById("ImageBgicon");
    var imgbase64="";
    
    var image = new Image();
    image.crossOrigin = '';
    image.src = img.src;

    image.onload = function(){
        if(!img.src.indexOf("base64"))
        {
            imgbase64 = GetBase64Image(image);
            image.src=imgbase64;
        }
    }

    //设置阴影
    var shadowx=$("#SetShadowX").val();
    var shadowy=$("#SetShadowY").val();
    var shadowsize=$("#SetShadowSize").val();
    var shadowcolor=$("#SetShadowColor").val();
    var recaddsize=Math.max(shadowx,shadowy,shadowsize);

    var canvas = document.createElement('canvas');
    canvas.id = "BackCanvas";
    canvas.width = width+2*recaddsize;
    canvas.height = height+2*recaddsize;
    canvas.style.zIndex = 8;
    var ctx=canvas.getContext("2d");

    ctx.shadowOffsetX = shadowx; // 阴影Y轴偏移
    ctx.shadowOffsetY = shadowy; // 阴影X轴偏移
    ctx.shadowBlur = shadowsize; // 模糊尺寸
    ctx.shadowColor = shadowcolor; // 颜色
    

    ctx.fillStyle=bgcolor;
    ctx.fillRect(0+recaddsize,0+recaddsize,width,height);

    DrawPattern(ctx,recaddsize,width,height);

    ctx.drawImage(img,(width-img.width-spanwidth)/2,(height-img.height)/2,img.width,img.height);

    var value=$("#TextStyleType").find("option:selected").attr("value");
    switch(value){
        case "youtube":
            DrawYoutubeText(ctx);
            break;

        case "google":
            DrawGoogleText(ctx);
            break;

        default:
            DrawText(ctx);
    }

    if(($("#ip_UseWaterMark").is(":checked"))){
        // 绘制水印
        var WaterMarkText=$(".p_WaterMarkText").text();
        var WaterMarkWith=$(".p_WaterMarkText").width()
        var WaterMarkHeight=$(".p_WaterMarkText").height();
        console.log(WaterMarkText);
        console.log(WaterMarkHeight);
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.4;
        ctx.fillText(WaterMarkText,width-WaterMarkWith-15, height-WaterMarkHeight);
    }

    //获取选中的图片格式
    var pictype=$("#ChangePicType").find("option:selected").attr("data-type");
    var mime="image/"+pictype;
    // document.body.appendChild(canvas);
    var imgdata=canvas.toDataURL(mime,1);
    var date=new Date();
    // console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getTime());
    var filename=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getTime()+"."+pictype;
    
    if(pictype=="svg"){
        var ctxsvg=new C2S(canvas.width,canvas.height);
        var canvasimg=new Image(canvas.width,canvas.height);
        canvasimg.src=imgdata;
        ctxsvg.drawImage(canvasimg,0,0);
        var svgdoc = ctxsvg.getSerializedSvg(true);
        console.log(svgdoc);
        // $("#ImageShow").html(svgdoc);
    }else{
        savaImage(imgdata,filename);
    }
}
//图片转base64
function GetBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}
//将图像保存到本地
function savaImage(data,filename)
{
    var save_link = document.createElement('a');
    save_link.href=data;
    save_link.download=filename;
    save_link.click();
};
//绘制YouTube风格的文字
function DrawYoutubeText(ctx){
    var Imagewidth=$("#Imageid").width();
    var Imageheight=$("#Imageid").height();
    var Iconwidth=$("#ImageText").width();
    var Iconheight=$("#ImageText").height();
    var textcontent=$("#TextContent").val();
    var arrstr=textcontent.split(' ');
    var leftwidth=Iconwidth*(arrstr[0].length/(arrstr[0].length+arrstr[1].length));
    var rightwidth=Iconwidth*(arrstr[1].length/(arrstr[0].length+arrstr[1].length));

    ctx.fillStyle='#FF0000';
    //ctx.fillRect((Imagewidth-Iconwidth)/2+leftwidth,(Imageheight-Iconheight)/2,rightwidth,Iconheight);
    // drawRoundRectPath(ctx,0,0,100,100,5);
    DrawFillRoundRect(ctx,(Imagewidth-Iconwidth)/2+leftwidth,(Imageheight-Iconheight)/2,rightwidth,Iconheight,5,"#ff0000");
    //设置文字
    var textcontent=$("#ImageText").text();
    var textsize=$("#ImageText").css("font-size");
    var textfamily=$("#ImageText").css("font-family");
    // 设置字体
    ctx.font = textsize+" "+textfamily;
    // 设置颜色
    ctx.fillStyle = "#000000";
    // 设置水平对齐方式
    ctx.textAlign = "middle";
    // 设置垂直对齐方式
    ctx.textBaseline = "middle";

    ctx.fillText(arrstr[0],((Imagewidth-Iconwidth)/2), (Imageheight)/2);
    ctx.fillStyle="#ffffff";
    ctx.fillText(arrstr[1],((Imagewidth-Iconwidth)/2+leftwidth+(rightwidth-righttxtwidth)/2), (Imageheight)/2);
}
//绘制谷歌风格字体
function DrawGoogleText(ctx){
    var Imagewidth=$("#Imageid").width();
    var Imageheight=$("#Imageid").height();
    var Iconwidth=$("#ImageText").width();
    var Iconheight=$("#ImageText").height();
    var textcontent=$("#TextContent").val();
    var textlength=textcontent.length;
    //每个字所占的宽度
    var eachlength=Iconwidth/textlength;
    var textsize=$("#ImageText").css("font-size");
    var textfamily=$("#ImageText").css("font-family");
    ctx.font = textsize+" "+textfamily;
    for(var i=0;i<textlength;i++){
        var num=i%6;
        switch(num){
            case 0:
                ctx.fillStyle="#4283F6";
                break;
            case 1:
                ctx.fillStyle="#FF373A";
                break;
            case 2:
                ctx.fillStyle="#FDBB02";
                break;
            case 3:
                ctx.fillStyle="#4283F6";
                break;

            case 4:
                ctx.fillStyle="#33A851";
                break;
            case 5:
                ctx.fillStyle="#FF373A";
                break;
        }

        ctx.fillText(textcontent[i],((Imagewidth-Iconwidth)/2+eachlength*i), (Imageheight)/2);
    }
}
//无风格文字
function DrawText(ctx){
    var Imagewidth=$("#Imageid").width();
    var Imageheight=$("#Imageid").height();
    var Textwidth=$("#ImageText").width();
    var Textheight=$("#ImageText").height();
    var img=document.getElementById("ImageBgicon");
    //设置文字
    var textcontent=$("#ImageText").text();
    var textsize=$("#ImageText").css("font-size");
    var textfamily=$("#ImageText").css("font-family");
    // 设置字体
    ctx.font = textsize+" "+textfamily;
    // 设置颜色
    ctx.fillStyle = $("#ImageText").css("color");
    // 设置水平对齐方式
    ctx.textAlign = "middle";
    // 设置垂直对齐方式
    ctx.textBaseline = "middle";

    ctx.fillText(textcontent,((Imagewidth-img.width-Textwidth)/2+img.width), (Imageheight)/2);

}
//绘制背景图案
function DrawPattern(ctx,recaddsize,width,height){
    var pattern=$("#SelectPattern").val();
    if(pattern!="None"){
        var url="./image/pattern/"+pattern+".svg";
        var image = new Image();
        image.src=url;
        var pat=ctx.createPattern(image,"repeat");
        ctx.fillStyle=pat;
        ctx.fillRect(0+recaddsize,0+recaddsize,width,height);
    }
}