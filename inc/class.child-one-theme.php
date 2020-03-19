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
				'label'       => _x( 'Search for:', 'label' ),
				'placeholder' => esc_attr_x( 'Search …', 'placeholder' ),
				'url'         => get_rest_url(null, 'wp/v2/posts'),
				'value'       => get_search_query()
			)
		);

		wp_localize_script( 'wp-bootstrap-theme', 'wpBootstrap', $variables );

	}

	/**
	 * Rest Post Query
	 *
	 * Change the WordPress '/posts' REST API query to include multiple post types.
	 */
	public function rest_post_query( $args, $request ) {

		if ( $request->get_param( 'search' ) ) {
			$args['post_type'] = ['post', 'page'];
		}

		return $args;
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

	/**
	 * Add Actions
	 *
	 * Defines all the WordPress actions and filters used by this theme.
	 */
	protected function _add_actions() {
		parent::_add_actions();

		add_action( 'rest_post_query', array( $this, 'rest_post_query' ), 10, 2 );
	}
}
