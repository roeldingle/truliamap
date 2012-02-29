<?php
class frontPageTruliamap extends Controller_Front
{

	protected $oGet;

    protected function run($aArgs)
    {

    require_once('builder/builderInterface.php');
    

 	/*assign objects*/
    $this->oGet = new modelGet;
    
	$this->display($aArgs);

    }

    protected function display($aArgs){
    	
    	/*define page*/
    	$APP_NAME = "truliamap";
    	
    	$this->assign("APP_NAME",$APP_NAME);
    	$this->importJS("jquery-ui-1.8.16.custom.min");
    	$sGooglemaps_url = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true';
    	$this->externalJS($sGooglemaps_url);
    
    	$this->importJS("Googlemaps");
    	$this->importJS("devTools");
    	
    	$this->importJS(__CLASS__);
    	$this->importCSS('ui-lightness/jquery-ui-1.8.16.custom');
    	$this->importCSS(__CLASS__);
    	
    	/*set the user setting*/
    	$aUserSetting = $this->oGet->getRow(2,"seq =".$this->getSequence());
    	
    	/*set default values*/
    	if(empty($aUserSetting) || isset($aArgs['truliamap_reset'])){
    		$aUserSetting = array(
    				'map_type' => "Normal",
    				'zoom' => 1,
    				'state' => 'CA',
    				'city' => '[{"loc":"Los Angeles,CA","lat":"34.0522342","lng":"-118.2436849"}]',
    				'slideshow_option' => '{"price":"0+0","bed":"0","bath":"0"}'
    			);
    	}

    	
    	$aCity = json_decode($aUserSetting['city'],true);
    	$iLen = (count($aCity)-1);
    	
    	$aSlideshow_opt = json_decode($aUserSetting['slideshow_option'],true);
    	$aPrice = explode("+",$aSlideshow_opt['price']);
    	
    	
    	//give the string data
    	$sData = '';
    	
    	//map container
    	$sData .= '<div id="'.$APP_NAME.'_mapcontainer" style="width:100%;height:100%;">';
    	$sData .= '<div id="map_canvas"></div>';
    	$sData .= '</div>';
    
    
    	//markers
    	$sData .= '<div id="'.$APP_NAME.'_location_wrap" >';
  
    		$counter=0;
    		
    		foreach($aCity as $val){
    			$sData .='<div class="'.$APP_NAME.'_marker_con_'.$counter.'"  style="display:none;" >';
    			$sData .='<input type="text"  value="'.$val['loc'].' ('.$val['lat'].','.$val['lng'].','.$val['marker'].')" name="'.$APP_NAME.'_marker[]"   />';
    			$sData .='</div>';
    			$counter++;
    		}
    	
    	$sData .= '</div>';
    	
    	$sData .= '<div class="'.$APP_NAME.'_hidden_values" style="display:none;" >';
    	$sData .= '<input type="hidden"  id="APP_NAME" value="'.$APP_NAME.'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_maptype" value="'.$aUserSetting['map_type'].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_zoom" value="'.$aUserSetting['zoom'].'" />';
    	$sData .= "<input type='text' class='".$APP_NAME."_state' value='".$aUserSetting['state']."' />";
    	$sData .= '<input type="text"  class="'.$APP_NAME.'_lat" value="'.$aCity[$iLen][lat].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_lng" value="'.$aCity[$iLen][lng].'" />';
    	
    	$sData .= '<input type="text" class="'.$APP_NAME.'_price_to" value="'.$aPrice[0].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_price_from" value="'.$aPrice[1].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_bed" value="'.$aSlideshow_opt['bed'].'" />';
    	$sData .= '<input type="text" class="'.$APP_NAME.'_bath" value="'.$aSlideshow_opt['bath'].'" />';
    	$sData .= '</div>';
    	
    	/*slideshow/dialogbox container*/
    	$sData .= '<div class="'.$APP_NAME.'_design_container" style="display:none;" ></div>';
    	
    	$this->assign(ucwords($APP_NAME),$sData);
    
    }
}
