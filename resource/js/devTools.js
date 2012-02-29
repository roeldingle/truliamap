var devTools ={
	

	/*set global variables*/
	APP_NAME: $("#APP_NAME").val(),
	
	/*ajax submit*/
	ajax_submit: function(apiUrl,aData,aSuccess){
		
		/*ajax submit*/
		$.ajax({  
			url: usbuilder.getUrl(apiUrl),
			type: 'post',
			dataType: 'json',
			data:  aData,
			success: function(data){
				aSuccess.result(data.Data);
			}
		});
		
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