var adminPageSettings = {
		
		/*set global variables*/
		APP_NAME: $("#APP_NAME").val(),
		
		/*
		 * initialize and define the map for preview
		 */
		initialize: function(){
			/*give the map canvas its size*/
			$("#map_canvas").css("width","600px");
			$("#map_canvas").css("height","450px");
			 
			/*call the map init func*/
			adminPageSettings.create_map();	
		},
		
		/*
		 * create the map
		 */	
		create_map: function(){
			
			/*get the maptype*/
			var map_type = $("#"+adminPageSettings.APP_NAME+"_maptype").val();
			switch(map_type){
			case "Normal":
				maptype = google.maps.MapTypeId.ROADMAP;
				break;
			case "Satellite":
				maptype = google.maps.MapTypeId.SATELLITE;
				break;
			case "Hybrid":
				maptype = google.maps.MapTypeId.HYBRID;
				break;
			case "Terrain":
				maptype = google.maps.MapTypeId.TERRAIN;
				break;
			}
			
			/*setmap options*/
			 var myOptions = {
				disableDefaultUI: true,
				panControl: false,
			    zoom: 1,
			    center: new google.maps.LatLng(34.4841944990312,-118.177722496673),
			    mapTypeId: maptype,
			    scaleControl: true,
			    mapTypeControl: true,
			    streetViewControl: true,
			    zoomControl: true,
			    zoomControlOptions: {
			        style: "small"
			    } 
			  }
			 
			 Googlemap.map_init(myOptions);
			 
			 /*get the markers or locations*/
				var aCity = adminPageSettings.get_locations();
				
				/*loop and create markers in map*/
				$.each(aCity, function(key, val){
					Googlemap.marker_init(val.loc,val.lat,val.lng);
				
				});
			 
			
			 
			
		},
		
		show: function(location){
			
			adminPageSettings.open_popup("truliamap_add_marker",800,"Slideshow");
			
			var url = 'http://synd.trulia.com/tools/slideshow/id_0/style_default450/type_5/for_sale/'+location+'/widget.js';
			
		},

		
		
		
		
		/*save settings*/
		setting_submit: function(form){
			
			
			//if(oValidator.formName.getMessage(adminPageSettings.APP_NAME+'_form')){
				
				/*gather variables*/
				var iSeq = $("#SEQ").val();
				var map_type = $("#"+adminPageSettings.APP_NAME+"_maptype").val();
				var state = $("#"+adminPageSettings.APP_NAME+"_states").val();
				var city = adminPageSettings.get_locations();
				var display =  $("input[name='"+adminPageSettings.APP_NAME+"_display_type']:checked").val();
				
					/*ajax submit*/
					$.ajax({  
						url: usbuilder.getUrl("apiExec"),
						type: 'post',
						dataType: 'json',
						data: {
						action: 'setting_submit',
						get_seq: iSeq,
						get_map_type: map_type,
						get_state: state,
						get_city: city,
						get_display: display
						
					},
						success: function(data){
						
						if(data.Data === true){
							adminPageSettings.close_popup(adminPageSettings.APP_NAME+"_popupbox");
							oValidator.generalPurpose.getMessage(true, "Saved successfully");
							scroll(0,0);
							
							}else{
								oValidator.generalPurpose.getMessage(false, "Failed");
								scroll(0,0);
							}
					
						}
					});
			//}
			
		},
		
		search_state: function(){
			
			$(".search_state_container").empty();
			
			var sState = $("#"+adminPageSettings.APP_NAME+"_states").val();
			
			var sContainer = adminPageSettings.APP_NAME+"_popupbox";
			var iWidth = 300;
			var sTitle = "Search";
			adminPageSettings.close_popup(sContainer);
			adminPageSettings.open_popup(sContainer,iWidth,sTitle);
			
			$(".search_state_container").append('<div id="loader_container" style="margin-top:60px" ><img src="/_sdk/img/'+adminPageSettings.APP_NAME+'/loader.gif" /></div>');
			
			 /*get json*/
			 $.ajax({  
					url: usbuilder.getUrl("apiGetLocations"),
					type: 'post',
					dataType: 'json',
					data: {
					action: 'setting_submit',
					get_state: sState
					
				},
				success: function(data){
					if(data.Data){						
					
						/*loop and create markers in map*/
						var sData = '';
						sData += '<ul class="search_states">';
						$.each(data.Data, function(key, val){
							//Googlemap.marker_init(val.name+","+state,val.latitude,val.longitude);
							
							sData += '<li><input type="radio" name="'+adminPageSettings.APP_NAME+'_city" value="'+val.name+','+sState+'+'+val.latitude+'+'+val.longitude+'" >';
							sData += '<label>'+val.name+','+sState+'</label></li>';
							
						});
						sData += '</ul>';
						$(".search_state_container").empty().append(sData);
					}
					
				}
			});
			
			
		},
		
		get_locations: function(){
			
			var strid = "";
			var lat;
			var lng;
			var lng_len;
			var marker;
			var location_str;
			var idx;
			var locations = new Array();
			var sData = new Array;
			var aLocation = new Array();
			var aLatlng = new Array();
			var aMarCap = new Array();
			var i = 0;
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			$.each($("input[name='"+adminPageSettings.APP_NAME+"_marker[]']"), function(){
				idx = $(this).val();
				 strid += "+"+idx;
		
				location_str = strid.substr(1);
				
				locations = location_str.split("+");
				
				$.each(locations, function(index){

					aLocation = locations[index].split("(");
					aLocation['loc'] = aLocation[0];
					aLocation['latlng'] = aLocation[1];
								
					aLatlng = aLocation['latlng'].split(",");
					lat = parseFloat(aLatlng[0]);
					lng = parseFloat(aLatlng[1]);
					
					

					sData[i] = {lat: lat, lng: lng,loc: aLocation['loc']};
				});
				i++;
			});	
			
			return sData;

		},
		
		add_city: function(){
		
			var sCity = $("input[name='"+adminPageSettings.APP_NAME+"_city']:checked").val();
			var aCity = sCity.split("+");
			
			
			 
			// Googlemap.marker_init(aCity[0],aCity[1],aCity[2]);
			 
			/*get the size of the div con*/
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			var sData = '';
			sData += '<div class="add_location" id="'+adminPageSettings.APP_NAME+'_marker_con_'+id+'" style="width:700px;height:40px;" >';
			sData += '<input type="text"  value="'+aCity[0]+'('+aCity[1]+','+aCity[2]+')" readonly name="'+adminPageSettings.APP_NAME+'_marker[]"  class="textbox" value="" style="float:left;width:350px;margin-top:3px" />';
			sData += '<a  href="javascript:adminPageSettings.remove_marker('+id+');"  ><img src="/_sdk/img/'+adminPageSettings.APP_NAME+'/close_btn.png" class="close_btn" style="float:left;margin-top:4px;margin-left:5px;vertical-align:middle;display:inline-block" /></a>	';
			sData += '</div>';
			
			$("#"+adminPageSettings.APP_NAME+"_location_wrap").append(sData);
			
			adminPageSettings.initialize();
					
			
			
		},
		
		/*remove marker*/
		remove_marker: function(div_id){
			
			var id = $("#"+adminPageSettings.APP_NAME+"_location_wrap").children("div").size();
			
			if(id > 1){
				$("#"+adminPageSettings.APP_NAME+"_marker_con_"+div_id).remove();
				adminPageSettings.initialize();
				
			}else{
				$("#"+adminPageSettings.APP_NAME+"_marker_con_"+div_id).append("<span style='color:red;font-style:italic;' class='err_div_loc' >You must maintain at least one(1) marker.</span>");
				$(".err_div_loc").delay(1500).fadeOut(400).slideUp();
			}
			
			
			
		},
		
		/*reset to default*/
		reset_default: function(){
			
			$("#"+adminPageSettings.APP_NAME+"_form_reset").submit();
			
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
		}
	
};


$(document).ready(function(){
	
	$('#truliamap_maptype').change(function() {
		adminPageSettings.initialize();
	});
	
	$('#truliamap_states').change(function() {
		adminPageSettings.close_popup(adminPageSettings.APP_NAME+"_popupbox");
		
	});
	
	
	adminPageSettings.initialize();

});
