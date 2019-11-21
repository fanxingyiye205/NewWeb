$(function(){
	function imgpolling()
	{
		var polling_time = 3000;
		var timeout;
		var img1_left = 0;
		var imglist = $("#title_img").find("img");
		if(imglist.length<=0)
			return;
		var img_w = $(imglist[0]).width();
		var time1 ;
		var imgname=["pzscq_gb.jpg","pgqrd.jpg","pzscq.jpg"];


		function resetimgcircle()
		{
			var cur_src = $(imglist[1]).attr("src");
			var index = 0;
			for(i=0;i<3;i++)
			{
				if(cur_src.indexOf(imgname[i])>=0)
				{
					index=i;
					break;
				}
			}
			var imgc_list = $(".img_circle").find(".img_c");
			for(i=0;i<imgc_list.length;i++)
				$(imgc_list[i]).removeClass("img_c_select");
			$(imgc_list[index]).addClass("img_c_select");
		}

		function resetimgsrc(flag)
		{
			var curimg_src = "0";

			if(flag==1)
			{
				curimg_src = $(imglist[2]).attr("src")
			}
			else if(flag==-1)
			{
				curimg_src = $(imglist[0]).attr("src")
			}
			var imgpath = "";
			var img_index =0;
			console.log(curimg_src);
			for(i=0;i<3;i++)
			{
				if(curimg_src.indexOf(imgname[i])>=0)
				{
					img_index = i;
					imgpath = curimg_src.substring(0,curimg_src.indexOf(imgname[i]));
					break;
				}
			}
			var preimg_i=0;
			var nextimg_i = 0;

			if(img_index-1<0)
				preimg_i=2;
			else
				preimg_i=(img_index-1);
			if(img_index+1>2)
				nextimg_i=0;
			else
				nextimg_i=(img_index+1);


			$(imglist[0]).attr("src",imgpath+imgname[preimg_i]);
			$(imglist[0]).attr("style","margin-left:-25%");
			$(imglist[1]).attr("src",imgpath+imgname[img_index]);
			$(imglist[1]).attr("style","margin-left:0");

			$(imglist[2]).attr("src",imgpath+imgname[nextimg_i]);

			resetimgcircle();
		}

		function polling_left()
		{

			time1=setInterval(function()
			{
				if((img_w+img1_left)<=0)
				{
					resetimgsrc(1);
					clearInterval(time1);
					clearTimeout(timeout);
					img1_left = 0;
					timeout = setTimeout(polling_left,polling_time);
				}
				else
				{
					img1_left-=10;
					var str = "margin-left:"+img1_left+"px";
					$(imglist[1]).attr("style",str)
				}

			},1);
		}
		timeout = setTimeout(polling_left,polling_time);

		var x= 0;
		var y=0;
		var mleft=0;

		$("#title_img").mousedown(function(event){ 
			x = event.pageX;
			y = event.pageY;
			clearInterval(time1);
			$("#title_img").mousemove(function(event){
				mleft = event.pageX-x;

				if(mleft>0)
				{
					var img0_mleft=-$(imglist[0]).width()+(mleft);
					var str2="margin-left:"+img0_mleft+"px";
					$(imglist[0]).attr("style",str2);
				}
				else
				{
					var str = "margin-left:"+mleft+"px";
					$(imglist[1]).attr("style",str);
				}
			});
		});
		$("#title_img").mouseup(function(event){
			var newX = event.pageX;
			$("#title_img").off('mousemove')

			var time2 = setInterval(function(){
				if(newX<x)
				{
					if((img_w+mleft)<=0)
					{
						resetimgsrc(1);
						clearInterval(time2);
						clearTimeout(timeout);
						timeout = setTimeout(polling_left,polling_time);
					}
					else
					{
						mleft-=10;
						var str = "margin-left:"+mleft+"px";

						$(imglist[1]).attr("style",str)
					}

				}
				else if(newX>x)
				{
					if(img_w-mleft<=0)
					{
						resetimgsrc(-1);
						clearInterval(time2);
						clearTimeout(timeout);
						timeout = setTimeout(polling_left,polling_time);
					}
					else
					{
						mleft+=10;
						var img0_mleft=-$(imglist[0]).width()+(mleft);
						var str2="margin-left:"+img0_mleft+"px";
						$(imglist[0]).attr("style",str2);

					}
				}

			},1);
		});
	}
	imgpolling();

	// var page[]={"#pgqrd","#pgqrd_jjkc","#pzscq","#pzscq_bq","#pzscq_gb","#psrrd","#pkjzc","#pkjzc_text","#pcontact","#pabout"};

	function page_init(hashs)
	{
		console.log("hashs:"+hashs.length);
		if(hashs.length<=0)
			return;
		var hash = hashs.split("#");
		var mid = "div[mid='"+hash[1]+"']";
		$(".mid").hide();
		$(mid).show();
		
		$("#p_img").find("img").attr("src","./images/"+hash[1]+".jpg");

		var did_text = hash[1].split("_")[0];
		


		var did = "div[did='"+did_text+"']";
		var dcpid="p[dcpid='"+hash[1]+"']";

		console.log($(did).length);
		console.log($(dcpid).length);
		$(".d_select").removeClass("d_select");
		$(".dc_select_p").removeClass("dc_select_p");
		$(did).addClass("d_select");
		if(dcpid.length>0)
		{
			$(dcpid).addClass("dc_select_p");
		}

	}

	$(".dropdown").find("a").click(function()
	{
		var href = $(this).attr("href");
		var i = href.indexOf("#");
		
		page_init(href.substring(i));

	});

	var hashs =  window.location.hash;
	page_init(hashs);
})
