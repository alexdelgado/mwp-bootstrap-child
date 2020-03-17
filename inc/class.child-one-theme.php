<?php

class Child_One_Theme extends WP_Bootstrap_Theme {

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
			filemtime( get_stylesheet_directory() . '/dist/css/theme.min.css' )
		);

		wp_enqueue_script(
			'wp-bootstrap-theme',
			get_stylesheet_directory_uri() .'/dist/js/theme.min.js',
			array(),
			filemtime( get_stylesheet_directory() . '/dist/js/theme.min.js' ),
			true
		);

		$variables = array(
			'search' => array(
				'label' => _x( 'Search for:', 'label' ),
				'placeholder' => esc_attr_x( 'Search …', 'placeholder' ),
				'value' => get_search_query()
			)
		);

		wp_localize_script( 'wp-bootstrap-theme', 'wpBootstrap', $variables );

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
