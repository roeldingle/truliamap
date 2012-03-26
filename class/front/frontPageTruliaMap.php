<?php
class frontPageTruliaMap extends Controller_Front{

	protected $oGet;

    protected function run($aArgs){

    require_once('builder/builderInterface.php');
    usbuilder()->init($this, $aArgs);
    
 	/*assign objects*/
    $this->oGet = new modelGet;
    
	$this->display($aArgs);

    }

    protected function display($aArgs){
    	
    	/*define page*/
    	$APP_NAME = "truliamap";
    	
    	$this->assign("APP_NAME",$APP_NAME);
    	
    	$this->externalJS("http://maps.google.com/maps/api/js?sensor=false");
    	
    	$this->importCSS(__CLASS__);
    	
    	/*set the user setting*/
    	$aUserSetting = $this->oGet->getRow(2,"seq =".$this->getSequence());
    	
    	/*set default values*/
    	if(empty($aUserSetting) || isset($aArgs['truliamap_reset'])){
    		$aUserSetting = array(
    				'agree_flag' => 0,
    				'type' => "map",
    				'size' => 0,
    				'map_type' => "Normal",
    				'zoom' => 1,
    				'state' => 'CA',
    				'city' => '[{"loc":"Los Angeles,CA","lat":"34.0522342","lng":"-118.2436849"}]',
    				'slideshow_option' => '{"show":"0","speed":"3","price":"0+0","bed":"0","bath":"0"}'
    			);
    	}

    	
    	$aCity = json_decode($aUserSetting['city'],true);
    	$iLen = (count($aCity)-1);
    	
    	$aSlideshow_opt = json_decode($aUserSetting['slideshow_option'],true);
    	$aPrice = explode("+",$aSlideshow_opt['price']);
    	
    	
    	//give the string data
    	$sData = '';
    	//$sData .= '<input type="hidden"  id="APP_NAME" value="'.$APP_NAME.'" />';
    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_agree_flag" value="'.$aUserSetting['agree_flag'].'" />';
    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_type" value="'.$aUserSetting['type'].'" />';
    	
    	if($aUserSetting['agree_flag'] == 1){
    		
			 //map container	
			if($aUserSetting['type'] == "map"){	$sData .= '<div class="map_canvas" style="width:100%;height:100%;" ></div>'; }
			    	
			    	//markers
			    	$sData .= '<div id="'.$APP_NAME.'_location_wrap" >';
			  
			    		$counter=0;
			    		
			    		foreach($aCity as $val){
			    			$sData .='<div class="'.$APP_NAME.'_marker_con_'.$counter.'" style="display:none;"  >';
			    			$sData .='<input type="text"  value="'.$val['loc'].' ('.$val['lat'].','.$val['lng'].','.$val['marker'].')" name="'.$APP_NAME.'_marker[]"   />';
			    			$sData .='</div>';
			    			$counter++;
			    		}
			    	
			    	$sData .= '</div>';
			    	
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_maptype" value="'.$aUserSetting['map_type'].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_zoom" value="'.$aUserSetting['zoom'].'" />';
			    	$sData .= '<input type="hidden"  class="'.$APP_NAME.'_lat" value="'.$aCity[$iLen][lat].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_lng" value="'.$aCity[$iLen][lng].'" />';
			    	
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_size" value="'.$aUserSetting['size'].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_price_to" value="'.$aPrice[0].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_price_from" value="'.$aPrice[1].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_show" value="'.$aSlideshow_opt['show'].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_speed" value="'.$aSlideshow_opt['speed'].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_bed" value="'.$aSlideshow_opt['bed'].'" />';
			    	$sData .= '<input type="hidden" class="'.$APP_NAME.'_bath" value="'.$aSlideshow_opt['bath'].'" />';
			    		
	    	/*slideshow/dialogbox container*/
	    	$sData .= '<div class="'.$APP_NAME.'_design_container" ></div>';
    	}else{
			$sData .= '<div class="'.$APP_NAME.'_err" ></div>';
		}
    	
    	$this->assign("display",$sData);
    	
    	$this->init_js($aArgs);
    
    }
    
    protected function init_js($aArgs){
    
    	$sJs = '
    	sdk_Module("'.usbuilder()->getModuleSelector().'").ready(function($M){
    	
		    var Googlemap = {
		
				/*global variables*/
				map : null,
				/*
				 * create the map object and display in map_canvas
				 */
				map_init : function(myOptions){
				 Googlemap.map = new google.maps.Map($M(".map_canvas").get(0), myOptions);	
				},
				
				marker_init: function(locations,lat,lng, bFunc){
					
					/*image*/
					var image_icon = "/_sdk/img/truliamap/truliamap_icon.png";
				
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
						var url = frontPageTruliamap.show(locations);
						
						var infowindow = new google.maps.InfoWindow({
    							content: "<div  class=\'truliamap_infowindow_div\'  ><iframe  frameBorder=0 class=\'truliamap_frame_infowindow\' src=\'"+url+"\'   ></iframe></div>"
							});
							
						  google.maps.event.addListener(Googlemap.markers, \'click\', function(){
							  infowindow.open(Googlemap.map,this);
						 });
					}	
				}
			};
			
			var frontPageTruliamap = {
		
					APP_NAME: "truliamap",
					
					initialize: function(){ 
						
							var iMapWidth = $M(".map_canvas").parent().width();
							var iMapHeight = $M(".map_canvas").parent().height();
							
							var iMinheigth = 200;
							
							if(iMapHeight == 0){
								iMapHeight = iMinheigth;
							}
							
							$M(".map_canvas").css("width",iMapWidth);
							$M(".map_canvas").css("height",iMapHeight);
							
							frontPageTruliamap.create_map();			
					
					},
					
					create_map: function(){
						
						var iLat = $M("."+frontPageTruliamap.APP_NAME+"_lat").val();
						var iLng = $M("."+frontPageTruliamap.APP_NAME+"_lng").val();
						
						/*get the maptype*/
						var map_type = $M("."+frontPageTruliamap.APP_NAME+"_maptype").val();
						
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
						
						var zoom = $M("."+frontPageTruliamap.APP_NAME+"_zoom").val();
						
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
						 
							var aCity = frontPageTruliamap.get_locations();
							
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
						var id = $M("."+frontPageTruliamap.APP_NAME+"_location_wrap").children("div").size();
						
						$.each($M("input[name=\'"+frontPageTruliamap.APP_NAME+"_marker[]\']"), function(){
							idx = $M(this).val();
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
					
					var type = $M("."+frontPageTruliamap.APP_NAME+"_type").val();
					
					var loc = location.split(",");
					var price_to = $M("."+frontPageTruliamap.APP_NAME+"_price_to").val();
					var price_from = $M("."+frontPageTruliamap.APP_NAME+"_price_from").val();
					var speed = $M("."+frontPageTruliamap.APP_NAME+"_speed").val();
					var bed = $M("."+frontPageTruliamap.APP_NAME+"_bed").val();
					var bath = $M("."+frontPageTruliamap.APP_NAME+"_bath").val();
					var show = $M("."+frontPageTruliamap.APP_NAME+"_show").val();
					var size = $M("."+frontPageTruliamap.APP_NAME+"_size").val();
					
					if(type == "map"){
						size = 180;
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
						url += "/"+price_to+"-"+price_from+"_price";
						
						if(bed != "0")
							url += "/"+bed+"p_beds";
						
						if(bath != "0")
						url += "/"+bath+"p_baths";
						
						url += "/&city_uri="+$.trim(loc[0]);
						url += "&tpl_width="+size;
						
						url += "&refresh_speed="+speed;
						
						url += "&user_id="+show;
					
 				if(type == "map"){
 				 return url;			
 				}
 				
 				var iMapWidth = $M("."+frontPageTruliamap.APP_NAME+"_design_container").parent().width();
 				var iMapHeight = $M("."+frontPageTruliamap.APP_NAME+"_design_container").parent().height();
 				
 				var iMinheigth = 200;
							
				if(iMapHeight == 0){
					iMapHeight = iMinheigth;
				}
 				
 				$M("."+frontPageTruliamap.APP_NAME+"_design_container").css("width",iMapWidth);
 				$M("."+frontPageTruliamap.APP_NAME+"_design_container").css("height",iMapHeight);
 				
				$M("."+frontPageTruliamap.APP_NAME+"_design_container").html("<iframe  style=\'width:"+iMapWidth+"px;height:"+iMapHeight+"px;\' frameBorder=0 class=\'"+frontPageTruliamap.APP_NAME+"_frame\' src=\'"+url+"\'  ></iframe>");
				
				}
			
			};
   
		   	var agree_flag = $M("."+frontPageTruliamap.APP_NAME+"_agree_flag").val();
		   	
			if(agree_flag == 1){
				
				var type = $M("."+frontPageTruliamap.APP_NAME+"_type").val();
				
				switch(type){
				case "map":
					frontPageTruliamap.initialize();
					break;
					
				case "slide":
					var aCity = frontPageTruliamap.get_locations();
					frontPageTruliamap.show(aCity[0].loc);
					break;
					
				case "calc":
					var size = $M("."+frontPageTruliamap.APP_NAME+"_size").val();
					
					var url= "";
					url += "http://www.trulia.com/tools/calculator/?mode=preview";
					url += "&graph=&title=title_Mortgage_Calculator";
					url += "&style=default"+size;
					url += "&tpl_style=default"+size;
					url += "&tpl_width="+size;
					url += "&calculator_uri=mortgage/calculator/payment/&";
					
					var iMapWidth = $M("."+frontPageTruliamap.APP_NAME+"_design_container").parent().width();
		 			var iMapHeight = $M("."+frontPageTruliamap.APP_NAME+"_design_container").parent().height();
		 			
		 			var iMinheigth = 200;
									
					if(iMapHeight == 0){
						iMapHeight = iMinheigth;
					}
		 				
		 			$M("."+frontPageTruliamap.APP_NAME+"_design_container").css("width",iMapWidth);
		 			$M("."+frontPageTruliamap.APP_NAME+"_design_container").css("height",iMapHeight);
									
					$M("."+frontPageTruliamap.APP_NAME+"_design_container").html("<iframe style=\'width:"+iMapWidth+"px;height:"+iMapHeight+"px;\' frameBorder=0 class=\'"+frontPageTruliamap.APP_NAME+"_frame\' src=\'"+url+"\'  ></iframe>");
									
					break;
				}

			}else{
				
				$M("body").prepend(\'<div class="\'+frontPageTruliamap.APP_NAME+\'_err" />\');
				var sErr_Mess = "You must agree in Trulia\'s terms & conditions to use the widgets.";
				$M("."+frontPageTruliamap.APP_NAME+"_err").html(sErr_Mess);
			
			}
			
		    });';

    	$this->writeJs($sJs);
    
    }
}
