<?php
class apiGetLocations extends Controller_Api
{
	
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
         usbuilder()->init($this, $aArgs);
        
      //  $sSearch = str_replace(" ","%20",$aArgs['get_search']);
      $sState = $aArgs['get_state'];
        
        $sUrl = "http://api.trulia.com/webservices.php?library=LocationInfo&function=getCitiesInState&state=".$sState."&apikey=veedc6ryhzw9dqdnwqbvxap8";
       	
        $xmlFile = common()->downloadXmlFile($sUrl);
        
        $sDataFile = new SimpleXmlElement($xmlFile);
        
        $sData = json_encode($sDataFile);
        
        $aDataContent = json_decode($sData,true);
        
        $aReturn = array_slice($aDataContent['response']['LocationInfo']['city'],0,10);
		
		return  $aReturn;
        
    }
    
   
}



