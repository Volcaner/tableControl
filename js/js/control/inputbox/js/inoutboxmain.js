/** input控件
 ** 调用InputBoxMain的方法即可
 ** init初始化
 **/
(function($){
	$.InputBoxMain = function(){
		var self = this;

		this.objCache = undefined;

		this.init = function(obj){
			// 本地保存cache
			self.objCache = obj;

			var strHtml = '\
			<div id="inputBoxGroup" class="inputBoxGroup">\
				<div id="inputLabel"></div>\
				<div id="dropDownMenu"></div>\
				<input /><br />\
				<select></select>\
			</div>';
			$("#" + obj.inputBoxId).append(strHtml);

			if(obj && obj.width){
				$("#" + obj.inputBoxId + ">#inputBoxGroup>input:eq(0)").width(obj.width*0.6-26);
				$("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").css("width", obj.width*0.6 + "px");
			}

			if(obj && obj.label){
				if(obj && obj.width){
					$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").css("width", obj.width*0.4 + "px");
				}
				else{
					$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").css("max-width", "100px");
				}

				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").addClass("inputLabel");
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").text(obj.label);
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").attr("title", obj.label);
			}
			else{
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#inputLabel").remove();
			}

			if(obj && obj.selectItems && obj.selectItems.length>0){
				$("#" + obj.inputBoxId + ">#inputBoxGroup>input:eq(0)").val(obj.selectItems[0]);
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").addClass("dropDownMenu");
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").text(">");
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").click(function(){
					$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").css({"transform":"rotate(90deg)", "-ms-transform":"rotate(90deg)", 
						"-moz-transform":"rotate(90deg)", "-webkit-transform":"rotate(90deg)", "-o-transform":"rotate(90deg)"});
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").css("visibility", "visible");
				});

				if(obj.size){
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select")[0].size = obj.size;
				}
				else if(obj.selectItems.length < 5){
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select")[0].size = obj.selectItems.length;
				}
				else{
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select")[0].size = 5;
				}

				for(var i = 0; i < obj.selectItems.length; i++){
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").append('<option value="' + obj.selectItems[i] + '">' + obj.selectItems[i] + '</option>')
				}
				$("#" + obj.inputBoxId + ">#inputBoxGroup>select")[0].onclick = function(){
					var selectVal = $("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").val();
					$("#" + obj.inputBoxId + ">#inputBoxGroup>input:eq(0)").val(selectVal);
					$("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").css("visibility", "hidden");
					$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").css({"transform":"rotate(0deg)", "-ms-transform":"rotate(0deg)", 
						"-moz-transform":"rotate(0deg)", "-webkit-transform":"rotate(0deg)", "-o-transform":"rotate(0deg)"});
				};
			}
			else{
				$("#" + obj.inputBoxId + ">#inputBoxGroup>div#dropDownMenu").remove();
				$("#" + obj.inputBoxId + ">#inputBoxGroup>select:eq(0)").remove();
			}
		};

		this.getInputValue = function(){
			var selectVal = $("#" + self.objCache.inputBoxId + ">#inputBoxGroup>input:eq(0)").val();
			return selectVal;
		};
	};
})(jQuery);