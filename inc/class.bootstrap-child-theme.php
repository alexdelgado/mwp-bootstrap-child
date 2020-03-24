<?php

class Bootstrap_Child_Theme extends WP_Bootstrap_Theme {

	/**
	 * Enqueue Assets
	 *
	 * Enqueues the necessary css and js files when the theme is loaded.
	 */
	public function enqueue_assets() {
		wp_enqueue_style(
			'wp-bootstrap-theme',
			get_stylesheet_directory_uri() .'/dist/css/theme.min.css',
			array(),
			( defined( 'WP_DEBUG' ) ? null : filemtime( get_stylesheet_directory() . '/dist/css/theme.min.css' ) )
		);

		wp_enqueue_script(
			'wp-bootstrap-theme',
			get_stylesheet_directory_uri() .'/dist/js/theme.min.js',
			array(),
			( defined( 'WP_DEBUG' ) ? null : filemtime( get_stylesheet_directory() . '/dist/js/theme.min.js' ) ),
			true
		);
	}

	/**
	 * Singleton
	 *
	 * Returns a single instance of the current class.
	 */
	public static function singleton() {

		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}
