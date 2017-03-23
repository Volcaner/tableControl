(function($){
	$.TabelControlMain = function(){
		var self = this;

		this.localObjCache = undefined;
		this.parentId = undefined;
		this.searchBoxId = undefined;
		this.tabelBoxId = undefined;
		this.btnBoxId = undefined;
		this.listHeader = [];
		
		this.init = function(obj){
			self.localObjCache = obj;
			self.parentId = obj.selfId;
			self.searchBoxId = "searchBox";
			self.tabelBoxId = "tabelBox";
			self.btnBoxId = "btnBox";

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
			_drowTabelByDatas(obj.tabelObj.datas);
		};

		var _tabelHead = function(obj){
			var strHtml = '<ul></ul>';
			$("#" + obj.parentId).append(strHtml);
			for(var i = 0; i < obj.tabelObj.items.length; i++){
				$("#" + obj.parentId + ">ul:eq(0)").append('<li>' + obj.tabelObj.items[i].id + '</li>');
				$("#" + obj.parentId + ">ul:eq(0)>li").addClass("tabelHeadLi");
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(" + i + ")" ).width(obj.tabelObj.items[i].width);

				self.listHeader.push({
					id: obj.tabelObj.items[i].id,
					width: obj.tabelObj.items[i].width
				});
			}
		};
		var _tableBtn = function(obj){
			var strHtml = '<div id="btnContain" class="btnContain"></div>';
			$("#" + obj.parentId).append(strHtml);
			for(let i = 0; i < obj.btnObj.items.length; i++){
				$("#btnContain").append('<button>' + obj.btnObj.items[i].id + '</button>');
				$("#btnContain>button:eq(" + i + ")").click(function(){
					obj.btnObj.items[i].callback(obj.btnObj.items[i].id);
				});
			}
		};
		var _drowTabelByDatas = function(datas){
			if(datas && datas.length > 0){
				var strHtml = '<div id="tabelDataArea"></div>';
				$("#" + self.tabelBoxId).append(strHtml);
				for(let i = 0; i < datas.length; i++){
					$("#tabelDataArea").append('<ul></ul>');
					let k = 0;
					for(let j = 0; j < self.listHeader.length; j++){
						for(var a in datas[i]){
							// console.log(datas[i][a]);
							if(a == self.listHeader[j].id){
								$("#tabelDataArea" + ">ul:eq(" + i + ")").append('<li>' + datas[i][a] + '</li>');
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li").addClass("tabelLi");
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li").width(self.listHeader[j].width);
								(i%2==0) ? $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").css("background", "#fff") : $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").css("background", "#ddd") ;
								k++;
							}
						}	
					}
				};
			}
		};

		this.add = function(){
			var PopShadeMain = new $.PopShadeMain();
			var obj = {
				width: "400",
				height: "300",
				callback: function(messageBoxId){
					$("#" + messageBoxId).append("aaa");
				}
			}
			PopShadeMain.init(obj);
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