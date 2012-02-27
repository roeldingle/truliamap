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
       	$sApiKey = "veedc6ryhzw9dqdnwqbvxap8";
        
       	$sGetMarkersUrl = sUrl+sApiKey;
        
        $xmlFile = $this->downloadXmlFile($sUrl);
        
        $sDataFile = new SimpleXmlElement($xmlFile);
        
        $sData = json_encode($sDataFile);
        
        $aDataContent = json_decode($sData,true);
		
		return  $aDataContent['response']['LocationInfo']['city'];
        
    }
    
 	public function downloadXmlFile($path)
     {
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL,$path);
    	curl_setopt($ch, CURLOPT_FAILONERROR,1);
    	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    	$retValue = curl_exec($ch);
    	curl_close($ch);
    
    	return $retValue;
    }
}



