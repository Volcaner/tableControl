(function($){
	$.PopShadeMain = function(){
		var self = this;

		this.init = function(obj){
			$("body").append('<div id="popShade" class="popShade"></div>');
			$("#popShade").height($(window).height());

			strHtml = '<div id="popShadeBox" class="popShadeBox">\
				<div id="popShadeBoxHead" class="popShadeBoxHead">\
					<div id="closeBtn" class="closeBtn">×</div>\
				</div>\
				<div id="popShadeBoxContent" class="popShadeBoxContent">\
					<div id="messageBox" class="messageBox"></div>\
				</div>\
				<div id="popShadeBoxFoot" class="popShadeBoxFoot"></div>\
			</div>';
			$("#popShade").append(strHtml);

			// pop message box width & height
			if(obj && obj.width!=undefined && obj.width!=null){
				var strMesW = 0;
				var tw = setInterval(function(){
					strMesW += 20;
					if($("#popShadeBox").width() <= obj.width){
						$("#popShadeBox").width(strMesW + "px");
					}
					else{
						window.clearInterval(tw);
					}
				}, 5);
			}
			if(obj && obj.height!=undefined && obj.height!=null){
				var strMesH = 0;
				var strMesT = obj.height/2 + 100;
				$("#popShadeBox").css("margin-top", strMesT + "px");
				var th = setInterval(function(){
					strMesH += 20;
					strMesT -= 10;
					if($("#popShadeBox").height() <= obj.height){
						$("#popShadeBox").height(strMesH + "px");
						$("#popShadeBox").css("margin-top", strMesT + "px");
					}
					else{
						window.clearInterval(th);
					}
				}, 5);
			}
			if(obj && obj.callback){
				obj.callback("messageBox");
			}

			$("#closeBtn").click(function(){
				self.closePopShade();
			});
		};

		this.closePopShade = function(){
			$("#popShade").remove();
		};
	};
})(jQuery);