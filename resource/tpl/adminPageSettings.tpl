<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>

<!-- hidden values -->
<input type="hidden"  id="APP_NAME" value="<?php echo $APP_NAME;?>" />
<input type="hidden" id="SEQ" value="<?php echo $iSeq;?>" /><!--pluginurl-->

		
<form name="<?php echo $APP_NAME;?>_form" id="googlemapmark_form"  method="POST">
	<div id="<?php echo $APP_NAME;?>_wrap">
		<div id="<?php echo $APP_NAME;?>_mapcontainer">
			<div id="map_canvas"></div>	
		</div>		
	</div>
	
	<table border="1" cellspacing="0" class="table_input_vr">
	<colgroup>
		<col width="115px" />
		<col width="*" />
	</colgroup>
	
	<!-- map type -->
	<tr>
		<th><label>Map Type</label></th>
		<td>
			<select id="<?php echo $APP_NAME;?>_maptype"  name="<?php echo $APP_NAME;?>_maptype"  >
				<option <?php echo ($aUserSetting['map_type'] == "Normal") ? "selected" : "" ;?> >Normal</option>
				<option <?php echo ($aUserSetting['map_type'] == "Satellite") ? "selected" : "" ;?> >Satellite</option>
				<option <?php echo ($aUserSetting['map_type'] == "Hybrid") ? "selected" : "" ;?> >Hybrid</option>
				<option <?php echo ($aUserSetting['map_type'] == "Terrain") ? "selected" : "" ;?> >Terrain</option>
			</select>
		</td>
	</tr>
	
	<!-- statese -->
	<tr>
		<th><label>State</label></th>
		<td>
			<select id="<?php echo $APP_NAME;?>_states"  name="<?php echo $APP_NAME;?>_states"  >
				<?php 
				
					foreach($aStates as $key=>$val){
						
						$bSelected = ($aUserSetting['state'] == $val['stateCode'])?"selected":"";
						
						echo '<option value="'.$val['stateCode'].'" '.$bSelected.' >'.$val['name'].'</option>';
						
					}
				
				
				?>
			</select>
			
			<a href="javascript:adminPageSettings.search_state();" class="btn_nor_01 btn_width_st1" id="<?php echo $APP_NAME;?>_btn_search" >Search</a>
		</td>
	</tr>
	
	
	
	
	
	<!-- set markers -->
	<tr>
		<th><label for="module_label">City</label></th>
		<td>	
			
			<span class="location"  >
				
				
				
				<!-- container for the locations -->
				<div id="<?php echo $APP_NAME;?>_location_wrap" >
				
				<!-- loop the array containing the marker data -->
					
				<?php  $counter = 0; foreach($aCity as $val){ ?>
					<div class="add_location" id="<?php echo $APP_NAME;?>_marker_con_<?php echo $counter;?>" style="width:700px;height:40px;" >
						<input type="text"  value="<?php echo $val['loc'];?>(<?php echo $val['lat'];?>,<?php echo $val['lng'];?>)" readonly name="<?php echo $APP_NAME;?>_marker[]"  class="textbox" value="" style="float:left;width:350px;margin-top:3px" />
						<a  href="javascript:adminPageSettings.remove_marker(<?php echo $counter;?>);"  ><img src="/_sdk/img/<?php echo $APP_NAME;?>/close_btn.png" class="close_btn" style="float:left;margin-top:4px;margin-left:5px;vertical-align:middle;display:inline-block" /></a>	
					</div>
				<?php $counter++; } ?>
				
				
				
				</div>
				
			</span>
		</td>				
	</tr>	
	
	<!-- map type -->
	<tr>
		<th><label>Display type</label></th>
		<td>
		<span class="display_position" >
			<p class="left"><input type="radio" name="<?php echo $APP_NAME;?>_display_type" value="0" <?php if($aUserSetting['display_type'] == 0){ echo "checked";} ?> />Slideshow</p>
			<p class="right"><input type="radio" name="<?php echo $APP_NAME;?>_display_type" value="1" <?php if($aUserSetting['display_type'] == 1){ echo "checked";} ?> />Carousel</p>
		</span>
			
		</td>
	</tr>
	
	
	
	</tbody></table>
	
</form>
<div class="tbl_lb_wide_btn">
		<input type="button" value="Save" class="btn_apply" onclick="adminPageSettings.setting_submit()" />
		<a href="#" class="add_link" title="Reset to default" onclick="adminPageSettings.reset_default()" >Reset to Default</a>
</div>



<!--form for reset-->
<form method="POST" action="<?php echo $sUrl;?>" name="<?php echo $APP_NAME;?>_form_reset" id="<?php echo $APP_NAME;?>_form_reset" ><input type="hidden" name="<?php echo $APP_NAME;?>_reset" value="true" /></form>



<div class="<?php echo $APP_NAME;?>_popupbox" id="<?php echo $APP_NAME;?>_popupbox" style="width: 350px; z-index: 10002; left: 766px; top: 394px;display:none;">
	<div class="admin_popup_contents">
			<div class="search_state_container"></div>
			<br />
			<div><a href="javascript:adminPageSettings.add_city();" class="btn_ly" title="Add City" >Add City</a></div>
	</div>	
</div>

</body>
</html>
