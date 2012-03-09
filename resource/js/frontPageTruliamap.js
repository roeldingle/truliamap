var frontPageTruliamap = {
		
		APP_NAME: "truliamap",
		
		/*
		 * initialize and define the map for preview
		 */
		initialize: function(){ 
			
			
			
				/*get the size of parent div*/
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
				frontPageTruliamap.create_map();			
		
			
			
		},
		
		/*
		 * create the map
		 */	
		create_map: function(){
			
			/*give center lat lng *last marker*/
			var iLat = $("."+frontPageTruliamap.APP_NAME+"_lat").val();
			var iLng = $("."+frontPageTruliamap.APP_NAME+"_lng").val();
			
			/*get the maptype*/
			var map_type = $("."+frontPageTruliamap.APP_NAME+"_maptype").val();
			
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
			
			var zoom = $("."+frontPageTruliamap.APP_NAME+"_zoom").val();
			
			/*setmap options*/
			 var myOptions = {
				disableDefaultUI: true,
				panControl: false,
			    zoom: parseInt(zoom),
			    center: new google.maps.LatLng(iLat ,iLng),
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
				var aCity = frontPageTruliamap.get_locations();
				
				/*loop and create markers in map*/
				$.each(aCity, function(key, val){
					Googlemap.marker_init(val.loc,val.lat,val.lng, 1);
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
			var id = $("."+frontPageTruliamap.APP_NAME+"_location_wrap").children("div").size();
			
			$.each($("input[name='"+frontPageTruliamap.APP_NAME+"_marker[]']"), function(){
				idx = $(this).val();
				 strid += "+"+idx;
		
				location_str = strid.substr(1);
				locations = location_str.split("+");
				
				$.each(locations, function(index){
					aLocation = locations[index].split("(");
					aLocation.loc = aLocation[0];
					aLocation.latlng = aLocation[1];
								
					aLatlng = aLocation.latlng.split(",");
					lat = parseFloat(aLatlng[0]);
					lng = parseFloat(aLatlng[1]);
					
					sData[i] = {lat: lat, lng: lng,loc: aLocation.loc};
				});
				i++;
			});	
			
			return sData;
		},
		
		show: function(location){
			/*widget type*/
			var type = $("."+frontPageTruliamap.APP_NAME+"_type").val();
			/*gather data*/
			var loc = location.split(",");
			var price_to = $("."+frontPageTruliamap.APP_NAME+"_price_to").val();
			var price_from = $("."+frontPageTruliamap.APP_NAME+"_price_from").val();
			var speed = $("."+frontPageTruliamap.APP_NAME+"_speed").val();
			var bed = $("."+frontPageTruliamap.APP_NAME+"_bed").val();
			var bath = $("."+frontPageTruliamap.APP_NAME+"_bath").val();
			var show = $("."+frontPageTruliamap.APP_NAME+"_show").val();
			var size = $("."+frontPageTruliamap.APP_NAME+"_size").val();
			
			if(type == "map"){
				$(".truliamap_design_container").dialog({
					width: 500,
					modal: true
				});
				
				size = 450;
			}
			
			
			var url = "";
				url += "http://www.trulia.com/tools/slideshow/?mode=preview";
				url += "&state="+$.trim(loc[1]);
				url += "&city="+$.trim(loc[0]);
				url += "&style=default"+size;
				url += "&tpl_uri=for_sale";
				url += "/"+$.trim(location);
				
				if(price_from == "0" || parseInt(price_to) > parseInt(price_from))
					price_from = price_to;
				
				if(price_to != "0" && price_from != "0")
				url += "/"+price_to+'-'+price_from+"_price";
				
				if(bed != "0")
					url += "/"+bed+"p_beds";
				
				if(bath != "0")
				url += "/"+bath+"p_baths";
				
				url += "/&city_uri="+$.trim(loc[0]);
				url += "&tpl_width="+size;
				
				url += "&refresh_speed="+speed;
				
				url += "&user_id="+show;
			
	
		$("."+frontPageTruliamap.APP_NAME+"_design_container").html("<iframe class='"+frontPageTruliamap.APP_NAME+"_frame' src='"+url+"'  ></iframe>");
		
	}
};

$(function(){
	var agree_flag = $("."+frontPageTruliamap.APP_NAME+"_agree_flag").val();
	if(agree_flag == 1){
		
		var type = $("."+frontPageTruliamap.APP_NAME+"_type").val();
		
		switch(type){
		case "map":
			frontPageTruliamap.initialize();
			break;
			
		case "slide":
			var aCity = frontPageTruliamap.get_locations();
			frontPageTruliamap.show(aCity[0].loc);
			break;
			
		case "calc":
			var size = $("."+frontPageTruliamap.APP_NAME+"_size").val();
			var url= "";
			url += "http://www.trulia.com/tools/calculator/?mode=preview";
			url += "&graph=&title=title_Mortgage_Calculator";
			url += "&style=default"+size;
			url += "&tpl_style=default"+size;
			url += "&tpl_width="+size;
			url += "&calculator_uri=mortgage/calculator/payment/&";
			$("."+frontPageTruliamap.APP_NAME+"_design_container").html("<iframe class='"+frontPageTruliamap.APP_NAME+"_frame' src='"+url+"'  ></iframe>");
			break;
		}
		
	}else{
		
		$("body").prepend('<div class="'+frontPageTruliamap.APP_NAME+'_err" />');
		var sErr_Mess = 'You must agree in Trulia\'s terms & conditions to use the widgets.';
		$("."+frontPageTruliamap.APP_NAME+"_err").html(sErr_Mess);
	
	}
	
});
