(function($){
	$.TabelControlMain = function(){
		var self = this;
		
		this.init = function(obj){
			var strHtml = '\
			<div id="searchBox" class="searchBox"></div>\
			<div id="tabelBox" class="tabelBox"></div>\
			<div id="btnBox" class="btnBox"></div>';
			$("#" + obj.selfId).append(strHtml);

			_tabelHead({
				parentId: "tabelBox",
				tabelObj: obj.tabelObj
			});
			_tableBtn({
				parentId: "btnBox",
				btnObj: obj.btnObj
			});
		};

		var _tabelHead = function(obj){
			var strHtml = '<ul></ul>';
			$("#" + obj.parentId).append(strHtml);
			for(var i = 0; i < obj.tabelObj.items.length; i++){
				$("#" + obj.parentId + ">ul:eq(0)").append('<li>' + obj.tabelObj.items[i].id + '</li>');
				$("#" + obj.parentId + ">ul:eq(0)>li").addClass("tabelLi");
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(" + i + ")" ).width(obj.tabelObj.items[i].width);
			}
		};
		var _tableBtn = function(obj){
			var strHtml = '<div id="btnContain" class="btnContain"></div>';
			$("#" + obj.parentId).append(strHtml);
			for(var i = 0; i < obj.btnObj.items.length; i++){
				$("#btnContain").append('<button>' + obj.btnObj.items[i].id + '</button>');
			}
		};





		var _add = function(obj){

		};
		var _del = function(obj){

		};
		var _search = function(obj){

		};
		var _edit = function(obj){

		};
	};
})(jQuery);