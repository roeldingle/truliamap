<?php
class common
{
	/*extends the modelExec*/
	function modelExec()
	{
		return getInstance('modelExec');
	}
	
	/*extends the modelGet*/
	function modelGet()
	{
		return getInstance('modelGet');
	}
	
	function getStates(){
		
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
	
	/*download xml file*/
	function downloadXmlFile($path)
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
	
	/*search the curl*/
	function search_arr($aArrData,$sSearch){
		
		$pattern = '/^'.$sSearch.'/i';
		$aReturn = array();
		
		foreach($aArrData as $key=>$val){
			
			if(preg_match($pattern, $val['name'], $matches, PREG_OFFSET_CAPTURE)){
				array_push($aReturn,$val);
			}
			
		}
		
		
		return $aReturn;
	
	}
	
}