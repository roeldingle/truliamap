<?php
class apiExec extends Controller_Api
{
	
	
    protected function post($aArgs)
    {

        require_once('builder/builderInterface.php');
        usbuilder()->init($this->Request->getAppID(), $aArgs);
        
     /*sequence*/
		$iSeq = $aArgs['get_seq'];
        
        $oExec = new modelExec;
        $oGet = new modelGet;
     
	#data to insert get_slideshow_opt: slideshow_opt
	$aData = array(
		'idx' => '',
		'seq' => $iSeq,
		'map_type' => $aArgs['get_map_type'],
		'zoom' => $aArgs['get_zoom'],
    	'state' => $aArgs['get_state'],
    	'city' => json_encode($aArgs['get_city']),
    	'slideshow_option' => json_encode($aArgs['get_slideshow_opt'])

	
		);
	
    $bSeqExist = $oGet->getRow(2,"seq =".$iSeq);
     
     if(empty($bSeqExist)){
     	$aResult = $oExec->insertData(2,$aData);
     }else{
        $dDeleted = $oExec->deleteData(2,"seq =".$iSeq);
        if($dDeleted === true){
        	$aData['idx'] = $bSeqExist['idx'];
        	$aResult = $oExec->insertData(2,$aData);
        }else{
        	$aResult = "false";
        }
     } 
	
	return $aResult;
        
    }
    
  
}
