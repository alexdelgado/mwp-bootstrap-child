<?php

// WordPress Theme Settings
require( get_template_directory() .'/inc/class.wp-bootstrap-theme.php' );
add_action( 'after_setup_theme', array( 'wp_bootstrap_theme', 'setup_theme' ) );

require( 'inc/class.bootstrap-child-theme.php' );
add_action( 'init', array( 'bootstrap_child_theme', 'singleton' ) );

// Accessible WordPress Menus
require( get_template_directory() .'/inc/class.wp-bootstrap-walker-nav-menu.php' );
require( 'inc/class.bootstrap-child-walker-nav-menu.php' );
