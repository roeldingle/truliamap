/*
 * Googlemap functions
 */
var Googlemap = {
		
	/*global variables*/
	map : null,
		
	
	/*
	 * create the map object and display in map_canvas
	 */
	map_init : function(myOptions)
	{
	 Googlemap.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);	
	},
	
	
	marker_init: function(locations,lat,lng, bFunc){
		
		
		
		/*image*/
		var image_icon = '/_sdk/img/truliamap/truliamap_icon.png';
	
		Googlemap.markers = new google.maps.Marker({
			  position: new google.maps.LatLng(lat,lng),
			  map: Googlemap.map,
			  title: locations,
			  clickable: true,
			  draggable: true,
			  icon: image_icon
			});
		
		if(bFunc == 1){
			/*Show infowindow on mouseove*/
			  google.maps.event.addListener(Googlemap.markers, 'click', function(){
				  frontPageTruliamap.show(locations);
				  	
			 });
		}	
	}
};

