<?php

// WordPress Theme Settings
require_once( get_template_directory() .'/inc/class.wp-bootstrap-theme.php' );
require( 'inc/class.child-one-theme.php' );
add_action( 'init', array( 'child_one_theme', 'singleton' ) );
add_action( 'after_setup_theme', array( 'wp_bootstrap_theme', 'setup_theme' ) );
