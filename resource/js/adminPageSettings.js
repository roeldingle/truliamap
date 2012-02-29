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
				
				var aData ={
						get_seq: $("#SEQ").val(),
						get_map_type: $("#"+devTools.APP_NAME+"_maptype").val(),
						get_zoom: parseInt($("#"+devTools.APP_NAME+"_zoom").val()),
						get_state: $("#"+devTools.APP_NAME+"_states").val(),
						get_city: adminPageSettings.get_locations(),
						get_slideshow_opt: {
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
		
		search_state: function(){
			
			/*prep the func*/
			devTools.close_popup(devTools.APP_NAME+"_popupbox");
			devTools.open_popup(devTools.APP_NAME+"_popupbox",300,"Search");
			$(".search_state_container").empty();
			
			/*give a loader while wating for ajax response*/
			$(".search_state_container").append('<div id="loader_container" style="margin-top:60px" ><img src="/_sdk/img/'+devTools.APP_NAME+'/loader.gif" /></div>');
			
			/*gather variables*/
			var apiUrl = "apiGetLocations"; 
			
			var aData ={
				get_state: $("#"+devTools.APP_NAME+"_states").val()	
			}
			
			var aSuccess ={
				result: function(data){
					if(data){			
						var sState = $("#"+devTools.APP_NAME+"_states").val();
						
						/*loop and create markers in map*/
						var sData = '';
						sData += '<ul class="search_states">';
							$.each(data, function(key, val){
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
			
			return sData;

		},
		
		add_city: function(){
		
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
			
		}
	
};


$(function(){
	
	$('#truliamap_maptype, #truliamap_zoom').change(function() {
		adminPageSettings.initialize();
	});
	
	$('#truliamap_states').change(function() {
		devTools.close_popup(devTools.APP_NAME+"_popupbox");
		
	});
	
	adminPageSettings.initialize();

});
