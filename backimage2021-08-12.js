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
        console.log(e);
        console.log(y);

        $("#localbgimg").mousemove(function(e){

            //$("#Imageid").css({""});
        })
    });
    //插件改变背景色
    var a = Colorpicker.create({
        el: "color-picker",
        color: "#cccccc",
        change: function (elem, hex) {
            elem.style.backgroundColor = hex;
            ChangeColor(hex);
        }
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
        var bgicon=$("#bgicon").val();
        DownLoad(bgicon);
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

function GenerateColor(){
    //背景颜色随机
    var x=Math.floor((Math.random()*100+1));
    var y=Math.floor((Math.random()*100+1));
    var z=Math.floor((Math.random()*100+1));
    $("#Imageid").css({
        "background-color":"#"+x+y+z
    });
    $("#ImageClone").css({
        "background-color":"#"+x+y+z
    });

    //图标随机
    var num=parseInt(Math.random()*10);
    
    // var img = "https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg";
    var img ="imgs/"+num+".png"
    
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    image.onload = function(){
        var base64 = getBase64Image(image);
        $("img").attr("src",base64);
        cutDiv();
    } 
}
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

function cutDiv(){
    html2canvas($("#Imageid"),{
        useCORS:true,
        onrendered:function(canvas){
            var url=canvas.toDataURL();
            $("#ImageDown").append(canvas);
        }
    });
} 

// function cutDiv(){
//     // html2canvas($("#Imageid")).then(canvas => {
//     //     $("#ImageDown").append(canvas)
//     // }); 
//     domtoimage.toPng($("#Imageid"))
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     });  
// } 

function GetBase64(img){
    var canvas=document.createElement('canvas');
    canvas.width=img.width;
    canvas.height=img.height;
    var ctx=canvas.getContext("2d");
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    var dataurl=canvas.toDataURL();
    return dataurl;
}
//实现将项目的图片转化成base64
function convertImgToBase64(url, callback, outputFormat){
   var canvas = document.createElement('CANVAS'),
　　ctx = canvas.getContext('2d'),
　　img = new Image;
　　img.crossOrigin = 'Anonymous';
　　img.onload = function(){
    　　canvas.height = img.height;
    　　canvas.width = img.width;
    　　ctx.drawImage(img,0,0);
    　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    　　callback.call(this, dataURL);
    　　canvas = null; 
    };
　　img.src = url;
} 

//改变背景宽度
function ChangeWidth(width){
    $("#Imageid").width(width);
}
//改变背景高度
function ChangeHeight(height){
    $("#Imageid").height(height);
}
//改变背景色
function ChangeColor(bgcolor){
    $("#Imageid").css("background-color",bgcolor);
}
//图标
function ChangeIcon(bgicon){
    $('#ImageBgicon').attr("src", bgicon);
    $.getJSON(bgicon,function(jsondata){
        console.log(jsondata);
    });
}
//改变图标宽度
function ChangeIconWidth(){
    var iconwidth=$("#bgiconwidth").val();
    var bgwidth=$("#Imageid").width();

    var Iconwidth=$("#ImageBgicon").width();
    if(iconwidth>bgwidth){
        $("#ImageBgicon").width(bgwidth);
    }else{
        $("#ImageBgicon").width(iconwidth);
    }
}
//改变图标高度
function ChangeIconHeight(iconheight){
    var iconheight=$("#bgiconheight").val();
    $("#ImageBgicon").height(iconheight);
}

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
    
    //console.log(recaddsize);
    
    ctx.fillStyle=bgcolor;
    ctx.fillRect(0+recaddsize,0+recaddsize,width,height);
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

    // document.body.appendChild(canvas);
    var imgdata=canvas.toDataURL();
    var date=new Date();
    // console.log(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getTime());
    var filename=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getTime()+".png";
    savaImage(imgdata,filename);


}
//将图像保存到本地
function savaImage(data,filename)
{
    var save_link = document.createElement('a');
    // var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href=data;
    save_link.download=filename;
    save_link.click();
    // var event=document.createEvent('MouseEvents');
    // event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
    // save_link.dispatchEvent(event);
};

//上传图片
function ChangeLocalIcon(e){
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        var imagedata=reader.result;
        $("#ImageBgicon").attr("src",imagedata);

        var bgwidth=$("#Imageid").width();
        // console.log(bgwidth);
        var img = new Image();
        img.onload = function () {
            // console.log(this.width);
            if(this.width>bgwidth){
                $("#ImageBgicon").width(bgwidth);
            }
        };
        img.src=imagedata;
    };
}
//重制
function Reset(){
   $("div input").val("");
}

//选择图片类型
function ChangeItem(){
    var width=$("#ChangeType").find("option:selected").attr("data-width");
    $("#Imageid").width(width);
    $("#bgwidth").val(width);
    var height=$("#ChangeType").find("option:selected").attr("data-height");
    $("#Imageid").height(height);
    $("#bgheight").val(height);
}
//设置字体内容
function ChangeTextContent(){
    var textcontent=$("#TextContent").val();
    $("#ImageText").text(textcontent);
}
//设置字体大小
function ChangeTextSize(){
    var textsize=$("#TextSize").val();
    // console.log(textsize);
    $("#ImageText").css("font-size", textsize + "px");
}
//设置字体颜色
function ChangeTextColor(){
    var textcolor=$("#TextColor").val();
    $("#ImageText").css("color",textcolor);
}

//设置字体类型
function ChangeTextFontFamily(){
    var textcolor=$("#TextFontFamily").val();
    $("#ImageText").css("font-family",textcolor);
}


//图标推荐
function ShowIcon(){
    $("#graybackground").css("display","flex");
    $("#iconurl").css("display","flex");
}
//颜色推荐
function ShowColor(){
    $("#graybackground").css("display","flex");
    $("#colorurl").css("display","flex");
}
//关闭图标推荐
function CloseIcon(){
    $("#graybackground").css("display","none");
    $("#iconurl").css("display","none");
    $("#colorurl").css("display","none");
}
//关闭颜色推荐
function CloseColor(){
    $("#graybackground").css("display","none");
    $("#colorurl").css("display","none");
}

//设置背景阴影
function SetPicShadow(){
    var shadowx=0;
    shadowx=$("#SetShadowX").val();
    var shadowy=0;
    shadowy=$("#SetShadowY").val();
    var shadowsize=0;
    shadowsize=$("#SetShadowSize").val();
    var shadowcolor=$("#SetShadowColor").val();
    console.log(shadowx);
    $("#Imageid").css("box-shadow", shadowx + "px" +" "+shadowy+"px"+" "+shadowsize+"px"+" "+shadowcolor);
}

//获取图片数据
function GetRgbData(){
    var imgicon=document.getElementById("ImageBgicon");
    var image=new Image();
    image.src=imgicon.src;
    var canvas=document.createElement("canvas");
    canvas.width = imgicon.width;
    canvas.height = imgicon.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imgicon,0,0);
    var data = ctx.getImageData(0, 0,image.width,image.height).data;//读取整张图片的像素。

    var rgbArray=new Array();
    for(var i=0;i<data.length;i+=4){
        var rdata=data[i]; //240-250
        var gdata=data[i+1]; //70-100
        var bdata=data[i+2];//80-120
        var adata=data[i+3];
        if(adata>125){
            rgbArray.push([rdata,gdata,bdata,adata]);
        }
        
    }
    console.log(rgbArray);
    GetColor(rgbArray);
}

//获取图片主题色
function GetColor(cube){
    var qulity=100;
    var divcolorsize="50px";
    var maxr=cube[0][0],minr=cube[0][0],maxg=cube[0][1],ming=cube[0][1],maxb=cube[0][2],minb=cube[0][2];
    for(var i=0;i<cube.length;i++)
    {
        if(cube[i][0]>maxr){
            maxr=cube[i][0];
        }
        if(cube[i][0]<minr){
            minr=cube[i][0];
        }
        if(cube[i][1]>maxg){
            maxg=cube[i][1];
        }
        if(cube[i][1]<ming){
            ming=cube[i][1];
        }
        if(cube[i][2]>maxb){
            maxb=cube[i][2];
        }
        if(cube[i][2]<minb){
            minb=cube[i][2];
        }
    }

    if((maxr-minr)<qulity&&(maxg-ming)<qulity&&(maxb-minb)<qulity){
        var r=0,g=0,b=0;
        for(var i=0;i<cube.length;i++){
            r+=cube[i][0];
            g+=cube[i][1];
            b+=cube[i][2];
        }
        var divcolor=document.createElement("div");
        var spancolor=document.createElement("span");
        divcolor.style.backgroundColor="rgba("+r/(cube.length)+","+g/(cube.length)+","+b/(cube.length)+")";
        divcolor.style.width=divcolorsize;
        divcolor.style.height=divcolorsize;

        var hex = "#" + ((1 << 24) + ((r/cube.length) << 16) + ((g/cube.length) << 8) +(b/cube.length)).toString(16).slice(1);
        spancolor.innerHTML=hex.split('.')[0];
        
        var ImageIconColor=document.getElementById("ImageIconColor");
        ImageIconColor.appendChild(divcolor);
        ImageIconColor.appendChild(spancolor);
    }else{
        var maxrgb=0;
        var rgbindex=0;
        var rgbmiddle=0;

        if((maxr-minr)>maxrgb)
        {
            maxrgb=(maxr-minr);
            rgbmiddle=(maxr+minr)/2
            rgbindex=0;
        }
        if((maxg-ming)>maxrgb)
        {
            maxrgb=(maxg-ming);
            rgbmiddle=(maxg+ming)/2;
            rgbindex=1;
        }
        if((maxb-minb)>maxrgb)
        {
            maxrgb=(maxb-minb);
            rgbmiddle=(maxb+minb)/2;
            rgbindex=2;
        }
        
        //排序
        cube.sort(function(x,y){
            return x[rgbindex]-y[rgbindex];
        });
        var cubea=new Array();
        var cubeb=new Array();
        for(var i=0;i<cube.length;i++){
            if(cube[i][rgbindex]<rgbmiddle){
                cubea.push(cube[i]);
            }else{
                cubeb.push(cube[i]);
            }
        }
    
        GetColor(cubeb);
        GetColor(cubea);
    }
        // 递归循环
        // 按照最长边排序，每次先取像素密集的进行切割，符合条件则保存颜色的中位值
}


function DownLoadReportIMG(imgPathURL) {
    //如果隐藏IFRAME不存在，则添加
    if (!document.getElementById("IframeReportImg"))

    $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="DoSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");

    if (document.all.IframeReportImg.src != imgPathURL) {
        //加载图片
        document.all.IframeReportImg.src = imgPathURL;
    }
    else {
        //图片直接另存为
        DoSaveAsIMG();
    }

}

function DoSaveAsIMG() {
    // if (document.all.IframeReportImg.src != "about:blank")
    document.execCommand("open");
}

//添加水印
function SetWaterMark(){
    var WaterMarkText=$("#ip_WaterMarkText").val();
    console.log(WaterMarkText);
    $("#lb_note").hide();
        var divobj=$('<div class="div_WaterMarkText"></div>');
        //for(var i=0;i<80;i++){
        //    var left=i*20;
        //    var top=i*0;
            var pobj='<p class="p_WaterMarkText" z-index:999;">'+WaterMarkText+'</p>';
        //    console.log(pobj);
            divobj.append(pobj);
        //}
        $("#Imageid").append(divobj);
}


//改变文字风格
function SetTextStyle(){
    var value=$("#TextStyleType").find("option:selected").attr("value");
    console.log(value);
    switch(value){
        case "youtube":
            YoutubeStyle();
            break;

        case "google":
            GoogleStyle();
            break;
        default:
            var textcontent=$("#TextContent").val();
            $("#ImageText").html(textcontent);
    }
}

var righttxtwidth;
//YouTube风格
function YoutubeStyle(){
    var width=$("#ImageText").width();
    var height=$("#ImageText").height();
    var textcontent=$("#TextContent").val();
    var arrstr=textcontent.split(' ');
    var leftwidth=width*(arrstr[0].length/(arrstr[0].length+arrstr[1].length));
    var rightwidth=width*(arrstr[1].length/(arrstr[0].length+arrstr[1].length));
    
    //空格右边的内容,目的获取宽度
    var righttext=$("<span style='display:hidden;'></span>").html(arrstr[1]);
    $("#ImageText").html(righttext);
    righttxtwidth=righttext.width();
    console.log(righttext.width());
    // //创建SVG
    var svg='<svg width="'+(width)+'" height="'+height+'" xmlns="http://www.w3.org/2000/svg" version="1.1">';
        svg+='<text x="" y="'+height/2+'" dominant-baseline="middle">'+arrstr[0]+'</text>'
        svg+='<rect x="'+(leftwidth)+'" width="'+(rightwidth)+'" height="'+height+'" rx="5" ry="5" fill="red"/>';
        svg+='<text fill="white" x="'+(leftwidth+(rightwidth-righttxtwidth)/2)+'" y="'+height/2+'" dominant-baseline="middle">'+arrstr[1]+'</text>';
        svg+='</svg>';
    $("#ImageText").html(svg);
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

//谷歌风格的字体
function GoogleStyle(){
    var content="";
    var textcontent=$("#TextContent").val();
    for(var i=0;i<textcontent.length;i++){
        var num=i%6;
        switch(num){
            case 0:
                content+="<span style='color:#4283F6;'>"+textcontent[i]+"</span>";
                break;
            case 1:
                content+="<span style='color:#FF373A;'>"+textcontent[i]+"</span>";
                break;
            case 2:
                content+="<span style='color:#FDBB02;'>"+textcontent[i]+"</span>";
                break;
            case 3:
                content+="<span style='color:#4283F6;'>"+textcontent[i]+"</span>";
                break;
            
            case 4:
                content+="<span style='color:#33A851;'>"+textcontent[i]+"</span>";
                break;
            
            case 5:
                content+="<span style='color:#FF373A;'>"+textcontent[i]+"</span>";
                break;
        }
    }
    
    $("#ImageText").html(content);
}

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


//绘制圆角矩形
function DrawRoundRect(cxt, x,y,w, h, r) {
    
    cxt.beginPath();
    //从左上角开始绘制
    cxt.arc(x + r, y + r, r, Math.PI, Math.PI * 3/2);
    
    //矩形上边线
    // cxt.moveTo(x+r,y);
    cxt.lineTo(x+w-r,y);

    //右上角圆弧 
    cxt.arc(x+w-r, y+r, r, Math.PI * 3/ 2, Math.PI*2);

    //矩形右边线
    // cxt.moveTo(x+w,y+r);
    cxt.lineTo(x+w, y+h-r);

    //右下角圆弧
    cxt.arc(x+w-r, y+h-r, r, Math.PI*0, Math.PI * 1 / 2);

    //矩形下边线
    // cxt.moveTo(x+w-r,y+h);
    cxt.lineTo(x+r, y+h);

    //左下角圆弧
    cxt.arc(x+r, y+h-r, r, Math.PI * 1 / 2, Math.PI);

    //矩形左边线
    // cxt.moveTo(x,y+h-r);
    cxt.lineTo(x,y+r);

    // cxt.stroke();
    cxt.closePath();
}


//绘制填充的圆角矩形

function DrawFillRoundRect(cxt,x,y,w,h,r,fillcolor)
{
    if (2 * r > w || 2 * r > h) { return false; }

    cxt.save();
    DrawRoundRect(cxt, x, y, w,h,r);
    cxt.fillStyle = fillcolor || "#000"; //若是给定了值就用给定的值否则给予默认值  
    cxt.fill();
    cxt.restore();
}
