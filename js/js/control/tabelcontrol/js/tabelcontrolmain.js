(function($){
	$.TabelControlMain = function(){
		var self = this;

		this.localObjCache = undefined;
		this.parentId = undefined;
		this.searchBoxId = undefined;
		this.tabelBoxId = undefined;
		this.btnBoxId = undefined;
		this.listHeader = [];

		// input 控件集合
		var listInputObj = {};
		var PopShadeMain  = undefined;

		// check or uncheck
		var checkIdCache = [];

		// 表格内容cache
		this.localDataCache = [];
		
		this.init = function(obj){
			// TODO: 初始化清除缓存，如listInputObj = {}；

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
				bIsCheckBox: obj.bIsCheckBox,
				checkBoxWidth: obj.checkBoxWidth,
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

			// 是否有勾选
			$("#" + obj.parentId + ">ul:eq(0)").append('<li></li>');
			if(obj && obj.bIsCheckBox){
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(0)").append('<input type="checkbox" name="checkAll" />');
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(0)").width(obj.checkBoxWidth);
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(0)>input").click(function(){
					// console.log($("#" + obj.parentId + ">ul:eq(0)>li:eq(0)>input:[name='checkAll']").is(':checked'));
					var bIsCheckAll = $("#" + obj.parentId + ">ul:eq(0)>li:eq(0)>input:[name='checkAll']").is(':checked');
					var len = $("#" + obj.parentId + ">#tabelDataArea" + ">ul").length;
					if(bIsCheckAll){
						checkIdCache = [];
						for(var j = 0; j < self.localDataCache.length; j++){
							checkIdCache[j] = self.localDataCache[j];
						}
						// console.log(checkIdCache);

						for(var k = 0; k < len; k++){
							$("#" + obj.parentId + ">#tabelDataArea>ul:eq(" + k + ")>li:eq(0)>input").attr("checked", "checked");
						}
					}
					else{
						checkIdCache = [];
						// console.log(checkIdCache);

						for(var k = 0; k < len; k++){
							$("#" + obj.parentId + ">#tabelDataArea>ul:eq(" + k + ")>li:eq(0)>input").attr("checked", false);
						}
					}
				});
			}
			
			// 表头
			for(var i = 0; i < obj.tabelObj.items.length; i++){
				$("#" + obj.parentId + ">ul:eq(0)").append('<li>' + obj.tabelObj.items[i].id + '</li>');
				$("#" + obj.parentId + ">ul:eq(0)>li").addClass("tabelHeadLi");
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(" + (i+1) + ")" ).width(obj.tabelObj.items[i].width);

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

					// 添加到本地缓存
					self.localDataCache.push(datas[i]);
					
					// 是否有checkbox
					$("#tabelDataArea" + ">ul:eq(" + i + ")").append('<li></li>');
					if(self.localObjCache.bIsCheckBox){
						$("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(0)").append('<input type="checkbox" />');
						$("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(0)").width(self.localObjCache.checkBoxWidth);
						$("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(0)>input").click(function(){
							// console.log($("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(0)>input").is(':checked'));
							// console.log(i);
							var bIsChecked = $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(0)>input").is(':checked');
							if(bIsChecked){
								checkIdCache[i] = datas[i];
							}
							else{
								delete checkIdCache[i];
							}
							// console.log(checkIdCache);
						});
					}

					let k = 1;
					for(let j = 0; j < self.listHeader.length; j++){
						for(var a in datas[i]){
							// console.log(datas[i][a]);
							if(a == self.listHeader[j].id){
								$("#tabelDataArea" + ">ul:eq(" + i + ")").append('<li>' + datas[i][a] + '</li>');
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li").addClass("tabelLi");
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").width(self.listHeader[j].width);
								(i%2==0) ? $("#tabelDataArea" + ">ul:eq(" + i + ")>li").css("background", "#fff") 
									: $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").css("background", "#ddd") ;
								k++;
							}
						}	
					}
				};
			}
		};

		this.drowTabelByData = function(data){
			if(data && !_isEmptyMap(data)){
				$("#tabelDataArea").append('<ul></ul>');
				var len = $("#tabelDataArea" + ">ul").length;

				// 添加到本地缓存
				self.localDataCache.push(data);

				// 是否有checkbox
				$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")").append('<li></li>');
				if(self.localObjCache.bIsCheckBox){
					$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)").append('<input type="checkbox" />');
					$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)").width(self.localObjCache.checkBoxWidth);
					$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)>input").click(function(){
						// console.log($("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)>input").is(':checked'));
						// console.log(len-1);
						var bIsChecked = $("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)>input").is(':checked');
						if(bIsChecked){
							checkIdCache[len-1] = data;
						}
						else{
							delete checkIdCache[len-1];
						}
						// console.log(checkIdCache);
					});
				}

				let k = 1;
				for(var key in data){
					for(let j = 0; j < self.listHeader.length; j++){
						if(key == self.listHeader[j].id){
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")").append('<li>' + data[key] + '</li>');
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li").addClass("tabelLi");
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(" + k + ")").width(self.listHeader[j].width);
							((len-1)%2==0) ? $("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li").css("background", "#fff") 
								: $("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(" + k + ")").css("background", "#ddd") ;
							k++;
						}
					};
				}
			}
		};

		this.drowTabelByDatas = function(datas){
			if(datas && datas.length>0){
				self.localDataCache = [];
				for(let d in datas){
					if(!_isEmptyMap(datas[d])){
						$("#tabelDataArea").append('<ul></ul>');
						var len = $("#tabelDataArea" + ">ul").length;

						// 添加到本地缓存
						self.localDataCache.push(datas[d]);

						// 是否有checkbox
						$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")").append('<li></li>');
						if(self.localObjCache.bIsCheckBox){
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)").append('<input type="checkbox" />');
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)").width(self.localObjCache.checkBoxWidth);
							$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)>input").click(function(){
								// console.log($("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(0)>input").is(':checked'));
								// console.log(len-1);
								var bIsChecked = $("#tabelDataArea" + ">ul:eq(" + d + ")>li:eq(0)>input").is(':checked');
								if(bIsChecked){
									checkIdCache[d] = datas[d];
								}
								else{
									delete checkIdCache[d];
								}
								// console.log(checkIdCache);
							});
						}

						let k = 1;
						for(var key in datas[d]){
							for(let j = 0; j < self.listHeader.length; j++){
								if(key == self.listHeader[j].id){
									$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")").append('<li>' + datas[d][key] + '</li>');
									$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li").addClass("tabelLi");
									$("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(" + k + ")").width(self.listHeader[j].width);
									((len-1)%2==0) ? $("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li").css("background", "#fff") 
										: $("#tabelDataArea" + ">ul:eq(" + (len-1) + ")>li:eq(" + k + ")").css("background", "#ddd") ;
									k++;
								}
							};
						}
					}
				}
				
			}
		};

		var _isEmptyMap = function(e){
			for(var key in e){
				if(key && e[key].length!=0){
					return false;
				}
				return true;
			}
		};

		this.add = function(){
			PopShadeMain = new $.PopShadeMain();
			var obj = {
				width: "400",
				height: "300",
				callback: function(messageBoxId, popShadeBoxFootId){
					_addInputBox(messageBoxId);
					_addFootBtn(popShadeBoxFootId);
				}
			}
			PopShadeMain.init(obj);
		};

		var _addInputBox = function(messageBoxId){
			for(var i = 0; i < self.localObjCache.tabelObj.items.length; i++){
				var tabelItemId = self.localObjCache.tabelObj.items[i].id;
				var strHtml = '<div id="' + tabelItemId + "_messageBox" + '"></div>';
				$("#" + messageBoxId).append(strHtml);
				$("#" + tabelItemId + "_messageBox").addClass("addMargin");
				listInputObj[tabelItemId + "InputBox"] = new $.InputBoxMain();
				var obj = {
					width: 300,
					inputBoxId: tabelItemId + "_messageBox",
					label: tabelItemId
				};
				listInputObj[tabelItemId + "InputBox"].init(obj);
			}
		};
		var _addFootBtn = function(popShadeBoxFootId){
			var strHtml = '<div id="popShadeFootBtnBox" class="popShadeFootBtnBox"><button id="footBtnConfirm">确定</button></div>';
			$("#" + popShadeBoxFootId).append(strHtml);
			$("#" + popShadeBoxFootId).click(function(){
				_getAddMessage();
				PopShadeMain.closePopShade();
			});
		};
		var _getAddMessage = function(){
			var addMessageObj = {};
			for(var i = 0; i < self.localObjCache.tabelObj.items.length; i++){
				var tabelItemId = self.localObjCache.tabelObj.items[i].id;
				var val = listInputObj[tabelItemId + "InputBox"].getInputValue();
				// if(val && val!=null){
					addMessageObj[tabelItemId] = val;
				// }
			};
			self.drowTabelByData(addMessageObj);
		};

		this.del = function(){
			var afterDelObj = self.localDataCache;
			for(var key in checkIdCache){
				for(var i = 0; i < afterDelObj.length; i++){
					if(afterDelObj[i] == checkIdCache[key]){
						afterDelObj.splice(i, 1);
						// $("#" + self.parentId + ">#tabelBox>#tabelDataArea" + ">ul:eq(" + i + ")").remove();
						break;
					}
				}
			}
			
			$("#" + self.parentId + ">#tabelBox>#tabelDataArea").empty();
			self.drowTabelByDatas(afterDelObj);

			checkIdCache = [];

			console.log(afterDelObj);
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