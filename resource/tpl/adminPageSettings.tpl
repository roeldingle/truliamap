<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head></head>
<body>

<!-- hidden values -->
<input type="hidden"  id="APP_NAME" value="<?php echo $APP_NAME;?>" />
<input type="hidden" id="SEQ" value="<?php echo $iSeq;?>" /><!--pluginurl-->

<input type="hidden"  id="<?php echo $APP_NAME;?>_lat" value="<?php echo $iLat;?>" />
<input type="hidden" id="<?php echo $APP_NAME;?>_lng" value="<?php echo $iLng;?>" />

		
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
	
	<!-- state -->
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
		<th><label>Slideshow options</label></th>
		<td>
		<!-- 
		<span class="display_position" >
			<p class="left"><input type="radio" name="<?php echo $APP_NAME;?>_display_type" value="0" <?php if($aUserSetting['display_type'] == 0){ echo "checked";} ?> />Slideshow</p>
			<p class="right"><input type="radio" name="<?php echo $APP_NAME;?>_display_type" value="1" <?php if($aUserSetting['display_type'] == 1){ echo "checked";} ?> />Carousel</p>
		</span>
		
		 -->
		<br />
		
		<table>
			<tr>
				<td>Price : </td>
				<!--  -->
				<td>
					<select id="<?php echo $APP_NAME;?>_price_to" >
						<option value="0" <?php if((int)$aPrice[0] == 0){ echo "selected";} ?> >Any</option>
						<?php $price = 20000; while($price <= 10000000){?>
						<option value="<?php echo $price;?>" <?php if((int)$aPrice[0] == $price){ echo "selected";} ?> ><?php echo "$".number_format($price);?></option>
						<?php $price = $price + 30000; } ?>
					</select>
					
					to
					
					<select id="<?php echo $APP_NAME;?>_price_from" >
						<option value="0" <?php if((int)$aPrice[1] == 0){ echo "selected";} ?> >Any</option>
						<?php $price = 20000; while($price <= 10000000){?>
						<option value="<?php echo $price;?>" <?php if((int)$aPrice[1] == $price){ echo "selected";} ?> ><?php echo "$".number_format($price);?></option>
						<?php $price = $price + 30000; } ?>
					</select>
				</td>
			</tr>
			
			<tr>
				<td>Bedroom : </td>
				<td>
					<select id="<?php echo $APP_NAME;?>_bed" >
						<option value="0" <?php if($aSlideshow_opt['bed'] == "0"){ echo "selected";} ?> >Any</option>
						<option value="1" <?php if($aSlideshow_opt['bed'] == "1"){ echo "selected";} ?>>1+</option>
						<option value="2" <?php if($aSlideshow_opt['bed'] == "2"){ echo "selected";} ?>>2+</option>
						<option value="3" <?php if($aSlideshow_opt['bed'] == "3"){ echo "selected";} ?>>3+</option>
						<option value="4" <?php if($aSlideshow_opt['bed'] == "4"){ echo "selected";} ?>>4+</option>
						<option value="5" <?php if($aSlideshow_opt['bed'] == "5"){ echo "selected";} ?>>5+</option>
					</select>
					
				</td>
			</tr>
			
			<tr>
				<td>Bathroom : </td>
				<td>
					<select id="<?php echo $APP_NAME;?>_bath" >
						<option value="0" <?php if($aSlideshow_opt['bath'] == "0"){ echo "selected";} ?> >Any</option>
						<option value="1" <?php if($aSlideshow_opt['bath'] == "1"){ echo "selected";} ?>>1+</option>
						<option value="2" <?php if($aSlideshow_opt['bath'] == "2"){ echo "selected";} ?>>2+</option>
						<option value="3" <?php if($aSlideshow_opt['bath'] == "3"){ echo "selected";} ?>>3+</option>
						<option value="4" <?php if($aSlideshow_opt['bath'] == "4"){ echo "selected";} ?>>4+</option>
						<option value="5" <?php if($aSlideshow_opt['bath'] == "5"){ echo "selected";} ?>>5+</option>
					</select>
					
				</td>
			</tr>
		
		
		</table>
			
		</td>
	</tr>
	
	</tbody>
	</table>
</form>

<div class="tbl_lb_wide_btn">
		<input type="button" value="Save" class="btn_apply" onclick="adminPageSettings.setting_submit()" />
		<a href="#" class="add_link" title="Reset to default" onclick="devTools.reset_default()" >Reset to Default</a>
</div>

<!--form for reset-->
<form method="POST" action="<?php echo $sUrl;?>" name="<?php echo $APP_NAME;?>_form_reset" id="<?php echo $APP_NAME;?>_form_reset" ><input type="hidden" name="<?php echo $APP_NAME;?>_reset" value="true" /></form>

<!--popupbox-->
<div class="<?php echo $APP_NAME;?>_popupbox" id="<?php echo $APP_NAME;?>_popupbox" style="width: 350px; z-index: 10002; left: 766px; top: 394px;display:none;">
	<div class="admin_popup_contents">
			<div class="search_state_container"></div>
			<br />
			<div><a href="javascript:adminPageSettings.add_city();" class="btn_ly" title="Add City" >Add City</a></div>
	</div>	
</div>

</body>
</html>
