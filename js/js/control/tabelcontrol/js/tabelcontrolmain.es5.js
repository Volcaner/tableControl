"use strict";

(function ($) {
	$.TabelControlMain = function () {
		var self = this;

		this.localObjCache = undefined;
		this.parentId = undefined;
		this.searchBoxId = undefined;
		this.tabelBoxId = undefined;
		this.btnBoxId = undefined;
		this.listHeader = [];

		this.init = function (obj) {
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

		var _tabelHead = function _tabelHead(obj) {
			var strHtml = '<ul></ul>';
			$("#" + obj.parentId).append(strHtml);
			for (var i = 0; i < obj.tabelObj.items.length; i++) {
				$("#" + obj.parentId + ">ul:eq(0)").append('<li>' + obj.tabelObj.items[i].id + '</li>');
				$("#" + obj.parentId + ">ul:eq(0)>li").addClass("tabelHeadLi");
				$("#" + obj.parentId + ">ul:eq(0)>li:eq(" + i + ")").width(obj.tabelObj.items[i].width);

				self.listHeader.push({
					id: obj.tabelObj.items[i].id,
					width: obj.tabelObj.items[i].width
				});
			}
		};
		var _tableBtn = function _tableBtn(obj) {
			var strHtml = '<div id="btnContain" class="btnContain"></div>';
			$("#" + obj.parentId).append(strHtml);

			var _loop = function _loop(i) {
				$("#btnContain").append('<button>' + obj.btnObj.items[i].id + '</button>');
				$("#btnContain>button:eq(" + i + ")").click(function () {
					obj.btnObj.items[i].callback(obj.btnObj.items[i].id);
				});
			};

			for (var i = 0; i < obj.btnObj.items.length; i++) {
				_loop(i);
			}
		};
		var _drowTabelByDatas = function _drowTabelByDatas(datas) {
			if (datas && datas.length > 0) {
				var strHtml = '<div id="tabelDataArea"></div>';
				$("#" + self.tabelBoxId).append(strHtml);
				for (var i = 0; i < datas.length; i++) {
					$("#tabelDataArea").append('<ul></ul>');
					var k = 0;
					for (var j = 0; j < self.listHeader.length; j++) {
						for (var a in datas[i]) {
							// console.log(datas[i][a]);
							if (a == self.listHeader[j].id) {
								$("#tabelDataArea" + ">ul:eq(" + i + ")").append('<li>' + datas[i][a] + '</li>');
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li").addClass("tabelLi");
								$("#tabelDataArea" + ">ul:eq(" + i + ")>li").width(self.listHeader[j].width);
								i % 2 == 0 ? $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").css("background", "#fff") : $("#tabelDataArea" + ">ul:eq(" + i + ")>li:eq(" + k + ")").css("background", "#ddd");
								k++;
							}
						}
					}
				};
			}
		};

		this.add = function () {
			$("body").append('<div id="popShade" class="popShade"></div>');
			$("#popShade").height($(window).height());
		};

		var _add = function _add(obj) {};
		var _del = function _del(obj) {};
		var _search = function _search(obj) {};
		var _edit = function _edit(obj) {};
	};
})(jQuery);