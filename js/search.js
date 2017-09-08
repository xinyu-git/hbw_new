;(function($){
		var defaultStr = '<a href="javascript:void(0);" val="-1">请选择</a>';
		var proOld=[];//省数据-初始数据
		var proNew=[];//市数据-去重数据
		function oldArr(obj,oldArr,tdNum){
			for(var i=0;i<obj.length;i++){
				var proHtml=obj.eq(i).find(tdNum).html();
				oldArr.push(proHtml);
			}
			return oldArr;
		}

		//去重
		function findInArr(n, arr){
		    for(var i=0; i<arr.length; i++){
		        if(n==arr[i])return true;
		    }
		    return false;
		}
		function qcArr(arrOld,arrNew){
			for(var i=0; i<arrOld.length; i++){
	            if(findInArr(arrOld[i], arrNew)==false){
	                arrNew.push(arrOld[i]);
	            }
	   		}
	   		return arrNew;
		}

		oldArr($("#stores_tab tr"),proOld,'td:first')//所有省--数组
		qcArr(proOld,proNew);//去重--省数组
		showPro();
		function showPro(){
			var tempStr = defaultStr;
			$.each(proNew,function(index,domEle){
				tempStr += '<a href="javascript:void(0);" >' + domEle + '</a>';
				$('div[name="province"]').html('<div class="opts mCustomScrollbar _mCS_1">'+ tempStr +'</div');
				$('div[name="province"]').inputbox();
			})
		}

		//市
		showCity1();
		//初始城市
		function showCity1(){
			var tempStr = defaultStr;
			$('div[name="city"]').html('<div class="opts mCustomScrollbar _mCS_1">'+ tempStr +'</div');
			$('div[name="city"]').inputbox();
		}
		function showCity(cityNew){
			var tempStr = defaultStr;
			$.each(cityNew,function(index,domEle){
				tempStr += '<a href="javascript:void(0);" >' + domEle + '</a>';
				$('div[name="city"]').html('<div class="opts mCustomScrollbar _mCS_1">'+ tempStr +'</div');
				$('div[name="city"]').find('.opts').mCustomScrollbar();
				console.log(tempStr)
				$('<div class="selected">选择城市</div>').insertBefore($('div[name="city"]').children(':first'));
			})
		}

		$('div[name="province"]').on('click','.opts a',function(){
			var opts_html=$(this).html();
			for(var i=0; i<proOld.length;i++){
				if(proOld[i]!=opts_html){
					if($(this).attr('val')==-1){
						$('#stores_tab tr').removeClass('hide');
						showCity1();
						return;
					}
					$('#stores_tab tr').eq(i).addClass('hide')
				}else{
					$('#stores_tab tr').eq(i).removeClass('hide');
				}
			}
			var cityOld=[];
			var cityNew=[];
			var showTr=$('#stores_tab tr').not('.hide');
			oldArr(showTr,cityOld,'td:nth-child(2)')
			qcArr(cityOld,cityNew);
			showCity(cityNew);
		})

		$('div[name="city"]').on('click','.opts a',function(){
			var opts_html=$(this).html();
			var areaOld=[];
			var showTr=$('#stores_tab tr')
			oldArr(showTr,areaOld,'td:nth-child(2)')
			for(var i=0;i<areaOld.length;i++){
				if(areaOld[i]!=opts_html){
					if($(this).attr('val')==-1){
						return;
					}
					showTr.eq(i).addClass('hide');
				}else{
					showTr.eq(i).removeClass('hide')
				}
			}
		})
})(jQuery)