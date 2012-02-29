<?php
class adminPageSettings extends Controller_Admin
{

	protected $oGet;

    protected function run($aArgs)
    {

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
    	$sGooglemaps_url = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true';
    	$this->externalJS($sGooglemaps_url);
    	
    	$this->importJS("Googlemaps");
    	$this->importJS("devTools");
    	$this->importJS(__CLASS__);
    	$this->importCSS(__CLASS__);
    	
    	/*save form validator*/
    	usbuilder()->validator(array('form' => $APP_NAME.'_popup_form'));
    	
    	/*sequence*/
    	$iSeq = $aArgs['seq'];
    	$this->assign('iSeq', $iSeq);
    	
    	/*set the user setting*/
    	$aUserSetting = $this->oGet->getRow(2,"seq =".$iSeq);
    	
    	
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
    	$aSlideshow_opt = json_decode($aUserSetting['slideshow_option'],true);
    	
    	$aPrice = explode("+",$aSlideshow_opt['price']);
    	
    	$iLen = (count($aCity)-1);
    	$this->assign('iLat', $aCity[$iLen][lat]);
    	$this->assign('iLng', $aCity[$iLen][lng]);
    	
    	$this->assign("aUserSetting",$aUserSetting);
    	$this->assign("aCity",$aCity);
    	$this->assign("aStates",common()->getStates());
    	$this->assign("aSlideshow_opt",$aSlideshow_opt);
    	$this->assign("aPrice",$aPrice);
    	
    	/*set the template*/
    	$this->view(__CLASS__);

    }
    
    public function getStates(){
    	
    	$sUrl = "http://api.trulia.com/webservices.php?library=LocationInfo&function=getStates&apikey=";
    	$sApiKey = "veedc6ryhzw9dqdnwqbvxap8";
    	
    	$sGetStatesUrl = $sUrl.$sApiKey;
    	
    	$xmlFile = $this->downloadXmlFile($sGetStatesUrl);
    	
    	$sDataFile = new SimpleXmlElement($xmlFile);
    	
    	$sData = json_encode($sDataFile);
    	
    	$aDataContent = json_decode($sData,true);
    	
    	return  $aDataContent['response']['LocationInfo']['state'];
    	
    	
    }
    
    public function getState(){
    	
    	$sStates = '
    	[{"name":"Alabama","stateCode":"AL"},
    	{"name":"Alaska","stateCode":"AK"},
    	{"name":"Arizona","stateCode":"AZ"},
    	{"name":"Arkansas","stateCode":"AR"},
    	{"name":"California","stateCode":"CA"},
    	{"name":"Colorado","stateCode":"CO"},
    	{"name":"Connecticut","stateCode":"CT"},
    	{"name":"Delaware","stateCode":"DE"},
    	{"name":"District Of Columbia","stateCode":"DC"},
    	{"name":"Florida","stateCode":"FL"},
    	{"name":"Georgia","stateCode":"GA"},
    	{"name":"Hawaii","stateCode":"HI"},
    	{"name":"Idaho","stateCode":"ID"},
    	{"name":"Illinois","stateCode":"IL"},
    	{"name":"Indiana","stateCode":"IN"},
    	{"name":"Iowa","stateCode":"IA"},
    	{"name":"Kansas","stateCode":"KS"},
    	{"name":"Kentucky","stateCode":"KY"},
    	{"name":"Louisiana","stateCode":"LA"},
    	{"name":"Maine","stateCode":"ME"},
    	{"name":"Maryland","stateCode":"MD"},
    	{"name":"Massachusetts","stateCode":"MA"},
    	{"name":"Michigan","stateCode":"MI"},
    	{"name":"Minnesota","stateCode":"MN"},
    	{"name":"Mississippi","stateCode":"MS"},
    	{"name":"Missouri","stateCode":"MO"},
    	{"name":"Montana","stateCode":"MT"},
    	{"name":"Nebraska","stateCode":"NE"},
    	{"name":"Nevada","stateCode":"NV"},
    	{"name":"New Hampshire","stateCode":"NH"},
    	{"name":"New Jersey","stateCode":"NJ"},
    	{"name":"New Mexico","stateCode":"NM"},
    	{"name":"New York","stateCode":"NY"},
    	{"name":"North Carolina","stateCode":"NC"},
    	{"name":"North Dakota","stateCode":"ND"},
    	{"name":"Ohio","stateCode":"OH"},
    	{"name":"Oklahoma","stateCode":"OK"},
    	{"name":"Oregon","stateCode":"OR"},
    	{"name":"Pennsylvania","stateCode":"PA"},
    	{"name":"Rhode Island","stateCode":"RI"},
    	{"name":"South Carolina","stateCode":"SC"},
    	{"name":"South Dakota","stateCode":"SD"},
    	{"name":"Tennessee","stateCode":"TN"},
    	{"name":"Texas","stateCode":"TX"},
    	{"name":"Utah","stateCode":"UT"},
    	{"name":"Vermont","stateCode":"VT"},
    	{"name":"Virginia","stateCode":"VA"},
    	{"name":"Washington","stateCode":"WA"},
    	{"name":"West Virginia","stateCode":"WV"},
    	{"name":"Wisconsin","stateCode":"WI"},
    	{"name":"Wyoming","stateCode":"WY"}]';
    	
    	$aReturn = json_decode($sStates,true);
    	return $aReturn;
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
