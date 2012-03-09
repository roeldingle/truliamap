var devTools ={
	

	/*set global variables*/
	APP_NAME: $("#APP_NAME").val(),
	
	/*ajax submit*/
	ajax_submit: function(apiUrl,aData,aSuccess){
		
		/*ajax submit*/
		$.ajax({  
			url: usbuilder.getUrl(apiUrl),
			type: "post",
			dataType: "json",
			data:  aData,
			success: function(data){
				aSuccess.result(data.Data);
			}
		});
		
	},
	
	/* pagination for main post*/
	pagination: function(page,record_count,per_page,func){
		$(".pagi").empty();
		
		var max_pages = Math.ceil(record_count / per_page);
		var interval = 2;
		var sPageNum = "";
		for(var i=1; i <= max_pages; i++)
		{
			if (i == 2 && page >= (interval + 3)){
				sPageNum += '<a href="javascript:void(0);" onclick ="'+func+'(1)" style ="text-decoration:none">1</a>&nbsp;&hellip;&nbsp;';
			}
			else if(i == 1 && page == (interval + 2)){
				sPageNum += '<a href="javascript:void(0);" onclick ="'+func+'(1)" style ="text-decoration:none">1</a>&nbsp;';
			}
			if (i == page){
				sPageNum += '<strong>'+page+'</strong>&nbsp;'
			}
			else if (i >= (page - interval)){
				sPageNum += '<a href="javascript:void(0);" onclick ="'+func+'('+i+')" style ="text-decoration:none">'+ i +'</a>&nbsp;';
			}
			if (i >= (page + interval) && (max_pages - (interval + 2)) >= page){
				 sPageNum += '&hellip;&nbsp;<a href="javascript:void(0);" onclick="'+func+'('+max_pages+')">'+ max_pages +'</a>';
				break;	
			}	
		}
		$(".pagi").append(sPageNum);
	
	},
	
	/*reset to default*/
	reset_default: function(){
		$("#"+devTools.APP_NAME+"_form_reset").submit();
		
	},
	
	/*
	 * display a dialog box
	 * @param aDecs = define the description for the dialog box
	 */
	open_popup: function(sContainer,iWidth,sTitle){
		
		/*create popup*/
		sdk_popup.load(sContainer).skin("admin").layer({
			width: iWidth,
			title: sTitle,
			resize: false,
			draggable: true	
		});
		
	},
	
	/*
	 * close dialog box 
	 *  @param sConId = dialog box container id
	 */
	close_popup: function(sConId){
		
		var bVisible = $("#"+sConId).is(":visible");
		
		if(bVisible === false){
			return false;
		}
		
		sdk_popup.close(sConId);
	},
	
	/*
	 * check if valid url
	 *  @param str = string url
	 */
	validURL: function(str) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(str);
	}

}