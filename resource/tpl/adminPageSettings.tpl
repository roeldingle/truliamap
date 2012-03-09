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
	
	
	<table border="1" cellspacing="0" class="table_input_vr">
	<colgroup>
		<col width="110px" />
		<col width="*" />
	</colgroup>
	
	<!-- app id -->
	<tr>
		<th><label >App id </label></th>
		<td >
			<?php echo ucwords($APP_NAME);?>
		</td>
	</tr>
	
	<!-- type -->
	<tr>
		<th><label >Widget Type </label></th>
		<td class="tulia_select">
			
			<p>
				<input type="radio" class="radio_btn" style="float:left;width:auto"  <?php if($aUserSetting['type']== "map"){ echo "checked";} ?>  name="<?php echo $APP_NAME;?>_type" id="<?php echo $APP_NAME;?>_show_map" value="map" /><label style="float:left;margin:0 10px 0 5px" for="<?php echo $APP_NAME;?>_show_map">Map</label>
				<input type="radio" class="radio_btn" style="float:left;width:auto"  <?php if($aUserSetting['type'] == "slide"){ echo "checked";} ?> name="<?php echo $APP_NAME;?>_type" id="<?php echo $APP_NAME;?>_show_slide" value="slide" /><label style="float:left;margin:0 10px 0 5px" for="<?php echo $APP_NAME;?>_show_slide">Slideshow</label>
				<input type="radio" class="radio_btn" style="float:left;width:auto"  <?php if($aUserSetting['type'] == "calc"){ echo "checked";} ?> name="<?php echo $APP_NAME;?>_type" id="<?php echo $APP_NAME;?>_show_calc" value="calc" /><label style="float:left;margin:0 10px 0 5px" for="<?php echo $APP_NAME;?>_show_calc">Calculator</label>
			</p>
			<br /><br />
		</td>
	</tr>
	
	<tr>
		<td colspan="2"  >
			<div id="<?php echo $APP_NAME;?>_wrap" class="hid_clas">
				<div id="<?php echo $APP_NAME;?>_mapcontainer">
					<div id="map_canvas"></div>	
				</div>		
			</div>
		</td>
	</tr>
	
	<!-- map type -->
	<tr>
		<td colspan="2" >
			<table id="<?php echo $APP_NAME;?>_map_options" class="hid_clas" >
				<tr>
					<th><label>Map Type</label></th>
					<td class="tulia_select">
						<select id="<?php echo $APP_NAME;?>_maptype"  name="<?php echo $APP_NAME;?>_maptype"  >
							<option <?php echo ($aUserSetting['map_type'] == "Normal") ? "selected" : "" ;?> >Normal</option>
							<option <?php echo ($aUserSetting['map_type'] == "Satellite") ? "selected" : "" ;?> >Satellite</option>
							<option <?php echo ($aUserSetting['map_type'] == "Hybrid") ? "selected" : "" ;?> >Hybrid</option>
							<option <?php echo ($aUserSetting['map_type'] == "Terrain") ? "selected" : "" ;?> >Terrain</option>
						</select>
					</td>
				</tr>
	
				<!-- zoom -->
				<tr>
					<th><label>Zoom</label></th>
					<td class="tulia_select">
						<select id="<?php echo $APP_NAME;?>_zoom"  name="<?php echo $APP_NAME;?>_zoom"  >
						
							<?php for($x=1;$x<=15;$x++){?>
							<option value="<?php echo $x;?>" <?php echo ($aUserSetting['zoom'] == $x) ? "selected" : "" ;?> ><?php echo $x;?></option>
							<?php }?>
						</select>
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
								<div class="add_location" id="<?php echo $APP_NAME;?>_marker_con_<?php echo $counter;?>" style="width:700px;height:30px;" >
									<img src="/_sdk/img/truliamap/truliamap_icon_small.png" class="truliamap_icon_marker" />
									<input type="text"  value="<?php echo $val['loc'];?>(<?php echo $val['lat'];?>,<?php echo $val['lng'];?>)" readonly name="<?php echo $APP_NAME;?>_marker[]"  class="textbox" value="" style="float:left;width:350px;margin-top:3px" />
									<a  href="javascript:adminPageSettings.remove_marker(<?php echo $counter;?>);"  ><img src="/_sdk/img/<?php echo $APP_NAME;?>/close_btn.png" class="close_btn" style="float:left;margin-top:4px;margin-left:5px;vertical-align:middle;display:inline-block" /></a>	
								</div>
							<?php $counter++; } ?>
							</div>
						</span>
					</td>				
				</tr>
				<tr>
					<td></td>
					<td><a href="javascript:void(0);" class="<?php echo $APP_NAME;?>_search_btn btn_nor_01 btn_width_st1" style="width:352px;margin-left:25px" id="<?php echo $APP_NAME;?>_btn_search" >Search</a></td>
				</tr>				
			</table>
		</td>
	</tr>
	
	<!-- size -->
	<tr  id="<?php echo $APP_NAME;?>_widget_size" class="hid_clas" >
		<th><label>Widget size</label></th>
		<td>
			<select id="<?php echo $APP_NAME;?>_size" >
				<option value="180" <?php if($aUserSetting['size'] == 180){echo "selected";} ?> >Small (180x300)</option>
				<option value="300" <?php if($aUserSetting['size'] == 300){echo "selected";} ?> >Medium (300x300)</option>
				<option value="450" <?php if($aUserSetting['size'] == 450){echo "selected";} ?> >Large (450x300)</option>
			</select>
		</td>
	</tr>
	
	<!-- options -->
	<tr  id="slideshow_options" class="hid_clas">
		
		<th><label>Widget options</label></th>
		
		<td>
		
		<table >
		
			<tr id="<?php echo $APP_NAME;?>_slide_search_loc"  >
			<td  >City : </td>
			<td>
			<input type="text" class="<?php echo $APP_NAME;?>_slide_city" style="width:350px;" value="<?php echo $aCity[0]['loc']."(".$aCity[0]['lat'].",".$aCity[0]['lng'].")";?>" readonly /> 
			<input type="button" style="width:100px;" class="<?php echo $APP_NAME;?>_search_btn" value="Search" />
			</td>
			
			</tr>
		
			<tr>
				<td >Show : </td>
				<td>
					<p><input type="radio" class="radio_btn" onclick="adminPageSettings.show_option();" <?php if($aSlideshow_opt['show']== "0"){ echo "checked";} ?>  name="<?php echo $APP_NAME;?>_show" id="<?php echo $APP_NAME;?>_show1" value="0" /><label for="<?php echo $APP_NAME;?>_show1">All Properties Listed in Trulia</label> <br /></p>
					<p><input type="radio" class="radio_btn" onclick="adminPageSettings.show_option();" <?php if($aSlideshow_opt['show'] != "0"){ echo "checked";} ?> name="<?php echo $APP_NAME;?>_show" id="<?php echo $APP_NAME;?>_show2" value="1" /><label for="<?php echo $APP_NAME;?>_show2">Only My Properties in Trulia</label> <br /></p>
					<p><label class="profile_id">Profile ID: </label><input value="<?php echo ($aSlideshow_opt['show']== "0")?"0":$aSlideshow_opt['show']; ?>" type="text" id="<?php echo $APP_NAME;?>_user_id" style="width:100px;" class="input_text" />
					<span style="font-style:italic;font-size:11px;" >*Log-In to Trulia and find your Profile ID in your 'Profile' page.</span></p>
					<p style="margin-left:20px;"><span style="font-style:italic;font-size:11px;" >Example: Profile Link: http://www.trulia.com/profile/id/4049455  (<u>4049455</u> is your Profile ID)</span></p>
				</td>
			</tr>
			
			<tr>
				<td>Slideshow speed: </td>
				<td>
					<select id="<?php echo $APP_NAME;?>_speed" >
						<option value="3" <?php if($aSlideshow_opt['speed'] == "3"){ echo "selected";} ?> >Every 3 sec.</option>
						<option value="5" <?php if($aSlideshow_opt['speed'] == "5"){ echo "selected";} ?>>Every 5 sec.</option>
						<option value="10" <?php if($aSlideshow_opt['speed'] == "10"){ echo "selected";} ?>>Every 10 sec.</option>
						<option value="0" <?php if($aSlideshow_opt['speed'] == "0"){ echo "selected";} ?>>Dont animate</option>
						
					</select>
					
				</td>
			</tr>
			
		
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

<div>
<input type="checkbox" id="<?php echo $APP_NAME;?>_agree" /> &nbsp; I agree to Trulia's <a target="_blank" href="http://www.trulia.com/terms" >Terms & Conditions</a> of use

</div>

<div class="tbl_lb_wide_btn">
		<input type="button" value="Save" class="btn_apply" onclick="adminPageSettings.setting_submit()" />
		<a href="#" class="add_link" title="Reset to default" onclick="devTools.reset_default()" >Reset to Default</a>
</div>

<!--form for reset-->
<form method="POST" action="<?php echo $sUrl;?>" name="<?php echo $APP_NAME;?>_form_reset" id="<?php echo $APP_NAME;?>_form_reset" ><input type="hidden" name="<?php echo $APP_NAME;?>_reset" value="true" /></form>

<!--popupbox-->
<div class="<?php echo $APP_NAME;?>_popupbox" id="<?php echo $APP_NAME;?>_popupbox" style="width: 350px; z-index: 10002; left: 766px; top: 394px;display:none;">
	<div class="admin_popup_contents">
	
			<div >
				<p style="text-align:left;" >
				State <select id="<?php echo $APP_NAME;?>_states"  name="<?php echo $APP_NAME;?>_states"  >
							<?php 
								foreach($aStates as $key=>$val){
									$bSelected = ($aUserSetting['state'] == $val['stateCode'])?"selected":"";
									echo '<option value="'.$val['stateCode'].'" '.$bSelected.' >'.$val['name'].'</option>';
								}
							?>
				</select>
				</p>
				<p style="text-align:left;">
				City &nbsp; <input type="text" style="width:150px;margin:0" id="<?php echo $APP_NAME;?>_search_key" />
				<input type="button" value="search" style="width:60px;height:20px;margin:0;" onclick="adminPageSettings.search();" />
				</p>
			</div>
			
			
			<div class="search_state_container"></div>
			<div class="pagi"></div>
			<br />
			<div><a href="javascript:adminPageSettings.add_city();" class="btn_ly" title="Add City" >Add City</a></div>
	</div>	
</div>

</body>
</html>
