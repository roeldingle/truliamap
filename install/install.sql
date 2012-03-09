CREATE TABLE IF NOT EXISTS `truliamap_settings` (
				  `idx` int(11) NOT NULL auto_increment,
				  `seq` int(11) NOT NULL,
				  `map_type` varchar(10) NOT NULL,
				  `zoom` int(11) NOT NULL,
				  `state` varchar(10) NOT NULL,
				  `city` TEXT NOT NULL,
				  `slideshow_option` TEXT NOT NULL,
				  PRIMARY KEY  (`idx`)
				) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;