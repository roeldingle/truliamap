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
     
	#data to insert
	$aData = array(
		'idx' => '',
		'seq' => $iSeq,
		'map_type' => $aArgs['get_map_type'],
    	'state' => $aArgs['get_state'],
    	'city' => json_encode($aArgs['get_city']),
    	'display_type' => $aArgs['get_display']

	
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
