var adminPageSettings = {
		
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
		
		set_type: function(){
			
			var type = $("input[name='"+devTools.APP_NAME+"_type']:checked").val();
			
			
			
			switch(type){
			case "map":
				$("#"+devTools.APP_NAME+"_wrap").show();
				$("#"+devTools.APP_NAME+"_map_options").show();
				$("#slideshow_options").show();
				$("#"+devTools.APP_NAME+"_slide_search_loc").hide();
				$("#"+devTools.APP_NAME+"_widget_size").hide();
				adminPageSettings.initialize();
				break;
			case "slide":
				$("#"+devTools.APP_NAME+"_wrap").hide();
				$("#"+devTools.APP_NAME+"_map_options").hide();
				$("#slideshow_options").show();
				$("#"+devTools.APP_NAME+"_widget_size").show();
				$("#"+devTools.APP_NAME+"_slide_search_loc").show();
				break;
				
			case "calc":
				$("#"+devTools.APP_NAME+"_wrap").hide();
				$("#"+devTools.APP_NAME+"_map_options").hide();
				$("#slideshow_options").hide();
				$("#"+devTools.APP_NAME+"_widget_size").show();
				break;
			
			}
			
			
		},
		/*
		 * create the map
		 */	
		create_map: function(){
			
			 /*get the markers or locations*/
			var aCity = adminPageSettings.get_locations();
			
			var iLength = aCity.length - 1;
			
			/*give center lat lng *last marker*/
			var iLat = aCity[iLength]['lat'];
			var iLng = aCity[iLength]['lng'];
			
			/*get the maptype*/
			var map_type = $("#"+devTools.APP_NAME+"_maptype").val();
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
			
			var zoom = $("#"+devTools.APP_NAME+"_zoom").val();
			
			/*setmap options*/
			 var myOptions = {
				disableDefaultUI: true,
				panControl: false,
			    zoom: parseInt(zoom),
			    center: new google.maps.LatLng(iLat,iLng),
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
			 
				/*loop and create markers in map*/
				$.each(aCity, function(key, val){
					Googlemap.marker_init(val.loc,val.lat,val.lng, 0);
				
				});	 
			
		},
		
		/*save settings*/
		setting_submit: function(form){

			if(oValidator.formName.getMessage(devTools.APP_NAME+'_form')){
				/*gather variables*/
				var apiUrl = "apiExec"; 
				/*widget type*/
				var type = $("input[name='"+devTools.APP_NAME+"_type']:checked").val();
				
				/*show*/
				var show = ($("input[name='"+devTools.APP_NAME+"_show']:checked").val() == 0)?"0": $("#"+devTools.APP_NAME+"_user_id").val();
				
				var aData ={
						get_seq: $("#SEQ").val(),
						get_agree_flag: ($("#"+devTools.APP_NAME+"_agree:checked").val() !== undefined)?1:0,
						get_type: $("input[name='"+devTools.APP_NAME+"_type']:checked").val(),
						get_size: $("#"+devTools.APP_NAME+"_size").val(),
						get_map_type: $("#"+devTools.APP_NAME+"_maptype").val(),
						get_zoom: parseInt($("#"+devTools.APP_NAME+"_zoom").val()),
						get_state: $("#"+devTools.APP_NAME+"_states").val(),
						get_city: adminPageSettings.get_locations(),
						get_slideshow_opt: {
							show: show,
							speed: $("#"+devTools.APP_NAME+"_speed").val(),
							price: $("#"+devTools.APP_NAME+"_price_to").val()+"+"+$("#"+devTools.APP_NAME+"_price_from").val(),
							bed: $("#"+devTools.APP_NAME+"_bed").val(),
							bath: $("#"+devTools.APP_NAME+"_bath").val()
					}	
				}
				
				var aSuccess ={
					result: function(data){
						if(data === true){
							devTools.close_popup(devTools.APP_NAME+"_popupbox");
							oValidator.generalPurpose.getMessage(true, "Saved successfully");
							scroll(0,0);
						}else{
							oValidator.generalPurpose.getMessage(false, "Failed");
							scroll(0,0);
						}	
					}
				}
				
				/*ajax submit func*/
				devTools.ajax_submit(apiUrl,aData,aSuccess);
			}
			
		},
		
		open_search: function(){
			
			/*prep the func*/
			devTools.close_popup(devTools.APP_NAME+"_popupbox");
			devTools.open_popup(devTools.APP_NAME+"_popupbox",320,"Search");
			$(".search_state_container").empty();
			
		},
		
		search: function(){
			$(".search_state_container").empty();
			/*give a loader while wating for ajax response*/
			$(".search_state_container").append('<div id="loader_container" ><img src="/_sdk/img/'+devTools.APP_NAME+'/loader.gif" /></div>');
			
			/*gather variables*/
			var apiUrl = "apiGetLocations"; 
			
			var aData ={
				get_state: $("#"+devTools.APP_NAME+"_states").val(),
				get_search_key: $("#"+devTools.APP_NAME+"_search_key").val()
			}
			
			var aSuccess ={
				result: function(data){
					if(data['data'] != false){			
						var sState = $("#"+devTools.APP_NAME+"_states").val();
						
						/*loop and create markers in map*/
						var sData = '';
						
						sData += '<ul class="search_states">';
							$.each(data['data'], function(key, val){
								sData += '<li><input type="radio" name="'+devTools.APP_NAME+'_city" value="'+val.name+','+sState+'+'+val.latitude+'+'+val.longitude+'" >';
								sData += '<label>'+val.name+','+sState+'</label></li>';
							});
						sData += '</ul>';
						
						$(".search_state_container").html(sData);
						
					}else{
						var sData = "Error retriving data";
						$(".search_state_container").html(sData);
					}
					
				}
			}
			
			/*ajax submit func*/
			devTools.ajax_submit(apiUrl,aData,aSuccess);

		},
		
		
		
		get_locations: function(){
			
			/*widget type*/
			var type = $("input[name='"+devTools.APP_NAME+"_type']:checked").val();
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
			switch(type){
			case "map":
				
				var id = $("#"+devTools.APP_NAME+"_location_wrap").children("div").size();
				
				$.each($("input[name='"+devTools.APP_NAME+"_marker[]']"), function(){
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
				break;
			
			case "slide":
				var locations = $(".truliamap_slide_city").val();
				aLocation = locations.split("(");
				aLocation['loc'] = aLocation[0];
				aLocation['latlng'] = aLocation[1];
							
				aLatlng = aLocation['latlng'].split(",");
				lat = parseFloat(aLatlng[0]);
				lng = parseFloat(aLatlng[1]);
				
				sData[i] = {lat: lat, lng: lng,loc: aLocation['loc']};
				break;
				
			case "calc":
				var locations = $(".truliamap_slide_city").val();
				aLocation = locations.split("(");
				aLocation['loc'] = aLocation[0];
				aLocation['latlng'] = aLocation[1];
							
				aLatlng = aLocation['latlng'].split(",");
				lat = parseFloat(aLatlng[0]);
				lng = parseFloat(aLatlng[1]);
				
				sData[i] = {lat: lat, lng: lng,loc: aLocation['loc']};
				break;
			}
			
			return sData;

		},
		
		add_city: function(){
			
			var type = $("input[name='"+devTools.APP_NAME+"_type']:checked").val();
			
			switch(type){
			case "map":
				var sCity = $("input[name='"+devTools.APP_NAME+"_city']:checked").val();
				var aCity = sCity.split("+");
				
				/*get the size of the div con*/
				var id = $("#"+devTools.APP_NAME+"_location_wrap").children("div").size();
				
				var sData = '';
				sData += '<div class="add_location" id="'+devTools.APP_NAME+'_marker_con_'+id+'" style="width:700px;height:30px;" >';
				sData += '<img src="/_sdk/img/truliamap/truliamap_icon_small.png" class="truliamap_icon_marker" />';
				sData += '<input type="text"  value="'+aCity[0]+'('+aCity[1]+','+aCity[2]+')" readonly name="'+devTools.APP_NAME+'_marker[]"  class="textbox" value="" style="float:left;width:350px;margin-top:3px" />';
				sData += '<a  href="javascript:adminPageSettings.remove_marker('+id+');"  ><img src="/_sdk/img/'+devTools.APP_NAME+'/close_btn.png" class="close_btn" style="float:left;margin-top:4px;margin-left:5px;vertical-align:middle;display:inline-block" /></a>	';
				sData += '</div>';
				
				$("#"+devTools.APP_NAME+"_location_wrap").append(sData);
				
				adminPageSettings.initialize();
				break;
				
			case "slide":	
				var sCity = $("input[name='"+devTools.APP_NAME+"_city']:checked").val();
				var aCity = sCity.split("+");
				$(".truliamap_slide_city").val(aCity[0]+'('+aCity[1]+','+aCity[2]+')');
				break;
			}
			
					
		},
		
		show_option: function(){
			/*show button*/
			if($("input[name='"+devTools.APP_NAME+"_show']:checked").val() == "0"){
				$("#"+devTools.APP_NAME+"_user_id").attr("readonly",true);
				$("#"+devTools.APP_NAME+"_user_id").css("background","#D7DFDF");
			}else{
				$("#"+devTools.APP_NAME+"_user_id").attr("readonly",false);
				$("#"+devTools.APP_NAME+"_user_id").css("background","white");
				$("#"+devTools.APP_NAME+"_user_id").focus();
			}
		},
		
		/*remove marker*/
		remove_marker: function(div_id){
			
			var id = $("#"+devTools.APP_NAME+"_location_wrap").children("div").size();
			
			if(id > 1){
				$("#"+devTools.APP_NAME+"_marker_con_"+div_id).remove();
				adminPageSettings.initialize();
				
			}else{
				$("#"+devTools.APP_NAME+"_marker_con_"+div_id).append("<span style='color:red;font-style:italic;' class='err_div_loc' >You must maintain at least one(1) marker.</span>");
				$(".err_div_loc").delay(1500).fadeOut(400).slideUp();
			}
			
		},
		
		open_help: function(){
			
			devTools.open_popup(devTools.APP_NAME+"_popupbox_help",400,"Help");
			
		}
	
};


$(function(){
	
	$("."+devTools.APP_NAME+"_search_btn").click(function(){
		adminPageSettings.open_search();
	});
	
	
	$('input[name="'+devTools.APP_NAME+'_type"]').change(function() {
		adminPageSettings.set_type();
	});
	
	$('#truliamap_maptype, #truliamap_zoom').change(function() {
		adminPageSettings.initialize();
	});
	
	$('#truliamap_states').change(function() {
		devTools.close_popup(devTools.APP_NAME+"_popupbox");
	});
	
	adminPageSettings.set_type();
	adminPageSettings.show_option();
	
		

});
