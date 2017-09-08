;(function($){
	var opts = {};
	var selectbox={
		init:function(o){
			var $o=$(o);
			if($o.find('.opts > a.selected').html()){
				_selectHtml=$o.find('.opts > a.selected').html()
			}else{
				if(bFlag){
					_selectHtml='选择省份'
				}else{
					_selectHtml='选择城市'
				}
			}
			//var _selectHtml=$o.find('.opts > a.selected').html()? $o.find('.opts > a.selected').html():$o.find('.opts > a:first').html();
			$('<div class="selected">' + _selectHtml + '</div>').insertBefore($o.children(':first'));
			$o.off('click').on('click', selectbox.toggle);
			$o.off('click', '.opts  a').on('click', '.opts  a', selectbox.select);
			$o.find('.opts').off('mouseenter mouseleave').on('mouseenter', selectbox.mouseenter).on('mouseleave', selectbox.mouseleave);
			$(document).off('click', selectbox.hide).on('click', selectbox.hide);
		},
		toggle:function(e){
			e.stopPropagation();
			var $o = $(this);
			var $opts = $o.children('.opts');
			$o.find('a.selected').removeClass('none');
			selectbox.hide(null, $('.sb').not($o));
			$opts.toggle();
		},
		hide:function(e,objs){
			var $o = objs ? objs : $('.sb');
			$o.removeClass('sb_active').children('.opts').hide().find('a.selected').removeClass('none');
		},
		select:function(e){
			e.stopPropagation();
			var $o = $(this).parents('.sb:first');
			$o.trigger('click');
			$o.find('a.selected').removeClass('selected');
			$(this).addClass('selected');
			$o.find('div.selected').html($(this).html());
		},
		mouseenter:function(e){
			e.stopPropagation();
			var $o = $(this);
			$o.find('a.selected').addClass('none');
		},
		mouseleave: function(e){
			e.stopPropagation();
			var $o = $(this);
			$o.find('a.selected').removeClass('none');
		},
		_init:function(o){
			var name=$(o).attr('name');
			if(name=='province'){
				bFlag=true;
				selectbox.init(o);
			}else if(name=='city'){
				bFlag=false;
				selectbox.init(o);
			}
		}
	}
	$.fn.inputbox=function(){
		 //opts = $.extend({}, options);
		selectbox._init(this)
	}
})(jQuery);