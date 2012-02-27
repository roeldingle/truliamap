var frontPageTruliamap = {
		
		/*set global variables*/
		APP_NAME: "truliamap",
		
		
		
		/*
		 * initialize and define the map for preview
		 */
		initialize: function(){ 
			//get the size of parent div
			var iMapWidth = $("#map_canvas").parent().width();
			var iMapHeight = $("#map_canvas").parent().height();
			
			/*set a minimum value if height is 0*/
			var iMinheigth = 200;
			
			if(iMapHeight == 0){
				iMapHeight = iMinheigth;
			}
			
			$("#map_canvas").css("width",iMapWidth);
			$("#map_canvas").css("height",iMapHeight);
			
			/*call the map init func*/
			frontPageGooglemapmarker.create_map();	
		},
		
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
			    zoom: 8,
			    center: new google.maps.LatLng(34.4841944990312,-118.177722496673),
			    mapTypeId: maptype,
			    zoomControl: true
			    
			    
			  }
			 
			 Googlemap.map_init(myOptions);
			 
			var state = "CA";
			 
			 /*get json*/
			 $.ajax({  
					url: usbuilder.getUrl("apiGetLocations"),
					type: 'post',
					dataType: 'json',
					data: {
					action: 'setting_submit',
					get_state: state
					
				},
				success: function(data){
					if(data.Data){						
						/*loop and create markers in map*/
						$.each(data.Data, function(key, val){
							Googlemap.marker_init(val.name+","+state,val.latitude,val.longitude);
						
						});
						
					}
					
				}
			});
			 
			 
			
		},

		
		
		/*
		 * get the locations from the div
		 */
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
			var id = $("#"+frontPageGooglemapmarker.APP_NAME+"_location_wrap").children("div").size();
			
			$.each($("input[name='"+frontPageGooglemapmarker.APP_NAME+"_marker[]']"), function(){
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
					lng_len = aLatlng[2].length;
					marker = aLatlng[2].substr(0,lng_len-1);

					sData[i] = {lat: lat, lng: lng,loc: aLocation['loc'],marker: marker};
				});
				i++;
			});	
			
			return sData;

		},
		/*give the position for the controllers*/
		position_option: function(val){
			
			switch(val) {
			case '1':
				pos = google.maps.ControlPosition.TOP_RIGHT;
				break;
			case '2':
				pos = google.maps.ControlPosition.TOP_CENTER;
				break;
			case '3':
				pos = google.maps.ControlPosition.LEFT_TOP;
				break;
			case '4':
				pos = google.maps.ControlPosition.LEFT_CENTER;
				break;
			case '5':
				pos = google.maps.ControlPosition.LEFT_BOTTOM;
				break;
			case '6':
				pos = google.maps.ControlPosition.RIGHT_TOP;
				break;
			case '7':
				pos = google.maps.ControlPosition.RIGHT_CENTER;
				break;
			case '8':
				pos = google.maps.ControlPosition.RIGHT_BOTTOM;
				break;
			case '9':
				pos = google.maps.ControlPosition.BOTTOM_LEFT;
				break;
			case '10':
				pos = google.maps.ControlPosition.BOTTOM_RIGHT;
				break;
			case '11':
				pos = google.maps.ControlPosition.BOTTOM_CENTER;
				break;
			default:
				pos = google.maps.ControlPosition.TOP_LEFT;	
		}
			return pos;
	}
	
};


$(document).ready(function(){
	frontPageGooglemapmarker.initialize();

});
