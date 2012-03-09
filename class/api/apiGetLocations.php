<?php
class apiGetLocations extends Controller_Api
{
	
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
         usbuilder()->init($this, $aArgs);
        
	      $sState = $aArgs['get_state'];
	      $sSearch = $aArgs['get_search_key'];
        
        $sUrl = "http://api.trulia.com/webservices.php?library=LocationInfo&function=getCitiesInState&state=".$sState."&apikey=veedc6ryhzw9dqdnwqbvxap8";
       	
        $xmlFile = common()->downloadXmlFile($sUrl);
        
        $sDataFile = new SimpleXmlElement($xmlFile);
       
        $sData = json_encode($sDataFile);
        
        $aDataContent = json_decode($sData,true);
        
  
        $aCity = common()->search_arr($aDataContent['response']['LocationInfo']['city'],$sSearch);
        
        $aReturn['data'] = (count($aCity) > 0)? $aCity: false;
       
		return  $aReturn;
        
    }
    
   
}



