<?php

class Bootstrap_Child_Rest_Api {
	static $instance = false;

	protected $namespace = 'mwp/v1';

	protected $endpoints = array(
		'search' => '/search'
	);

	protected $post_types = array(
		'post',
		'page'
	);
	
	public function __construct() {
		$this->_add_actions();
		$this->_add_filters();
	}

	/**
	 * Register Rest Routes
	 * 
	 * Registers our custom REST API routes.
	 */
	public function register_rest_routes() {
		register_rest_route(
			$this->namespace,
			$this->endpoints['search'], 
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'search_callback' ),
			)
		);
	}

	/**
     * Search Callback
	 * 
	 * Retrieves a collection of posts.
     *
     * @param WP_REST_Request $request Full details about the request.
	 * 
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
	public function search_callback( WP_REST_Request $request ) {
		$request['page'] = ( $request['page'] ? $request['page'] : '0' );
		$response = new WP_REST_Posts_Controller( 'post' );
		
		return $response->get_items( $request );
	}
	
	/**
	 * Rest Post Query
	 *
	 * Change the WordPress '/posts' REST API query to include multiple post types.
	 * 
	 * @param array Key value array of query var to query value.
	 * @param WP_REST_Request The request used.
	 * 
	 * @return array Array containing query vars and their values.
	 */
	public function rest_post_query( $args, $request ) {

		if ( $request->get_param( 'search' ) ) {
			$args['post_type'] = $this->post_types;
		}

		return $args;
	}

	/**
	 * REST Authentication Errors
	 * 
	 * Prevents unauthorized access to the REST API.
	 * 
	 * @param WP_Error|null|bool $errors WP_Error if authentication error, null if authentication method wasn't used, true if authentication succeeded.
	 * 
	 * @return @param WP_Error|null|bool WP_Error if authentication error, null if authentication method wasn't used, true if authentication succeeded.
	 */
	public function rest_authentication_errors( $error ) {

		if ( ! empty( $error ) ) {
			return $error;
		}

		if ( ! defined( 'WP_DEBUG' ) && ! is_user_logged_in() ) {

			if ( ! in_array( $this->_get_current_route(), $this->_get_routes() ) ) {
				return new WP_Error( 'forbidden_access', 'Access denied', array( 'status' => 403 ) );
			}

		}

		return $error;
	}

	/**
	 * Enqueue Assets
	 *
	 * Enqueues the necessary css and js files when the theme is loaded.
	 */
	public function enqueue_assets() {
		$variables = array(
			'search' => array(
				'label'       => _x( 'Search for:', 'label' ),
				'placeholder' => esc_attr_x( 'Search …', 'placeholder' ),
				'url'         => get_rest_url( null, $this->_get_route( $this->endpoints['search'] ) ),
				'value'       => get_search_query()
			)
		);

		wp_localize_script( 'wp-bootstrap-theme', 'wpBootstrap', $variables );
	}

	/**
	 * Singleton
	 * 
	 * @return Bootstrap_Child_Rest_Api A single instance of the current class.
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
	 * Defines all the WordPress actions used by this theme.
	 */
	protected function _add_actions() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'rest_post_query', array( $this, 'rest_post_query' ), 10, 2 );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Add Filters
	 *
	 * Defines all the WordPress filters used by this theme.
	 */
	protected function _add_filters() {
		add_filter( 'json_enabled', '__return_false' );
		add_filter( 'json_jsonp_enabled', '__return_false' );

		add_filter( 'rest_authentication_errors', array( $this, 'rest_authentication_errors' ) );
	}

	/**
	 * Get Current Route
	 *
	 * @return string The current REST API route.
	 */
	protected function _get_current_route() {
		$rest_route = $GLOBALS['wp']->query_vars['rest_route'];
	
		return ( empty( $rest_route ) || '/' == $rest_route ) ? $rest_route : untrailingslashit( $rest_route );
	}

	/**
	 * Get Route
	 * 
	 * @return string The route containing the given endpoint.
	 */
	protected function _get_route( $endpoint ) {
		return "/{$this->namespace}{$endpoint}";
	}

	/**
	 * Get Routes
	 * 
	 * @return array An array containing all the routes registered by this class.
	 */
	protected function _get_routes() {
		$routes = array();

		foreach( $this->endpoints as $endpoint ) {
			array_push( $endpoints, $this->_get_route( $endpoint ) );
		}

		return $routes;
	}
}
