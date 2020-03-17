<?php

class Child_One_Walker_Nav_Menu extends WP_Bootstrap_Walker_Nav_Menu {

	/**
	 * Filters the CSS classes applied to a menu item's list item element.
	 *
	 * @since 3.0.0
	 * @since 4.1.0 The `$depth` parameter was added.
	 *
	 * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
	 * @param WP_Post  $item    The current menu item.
	 * @param stdClass $args    An object of wp_nav_menu() arguments.
	 * @param int      $depth   Depth of menu item. Used for padding.
	 */
	public function nav_menu_css_class( $classes, $item, $args, $depth ) {

		if ( ! empty( $classes ) ) {

			foreach ( $classes as $i => $class ) {
				if ( preg_match( '/btn|icon-|lni-|js-|menu-|screen-reader-text/', $class, $matches ) ) {
					unset($classes[$i]);
				}
			}
		}

		return $classes;
	}

	/**
	 * Singleton
	 *
	 * Returns a single instance of this class.
	 */
	public static function singleton() {

		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Determines whether the given input contains any icon classes.
	 *
	 * @param string $class CSS class applied to a menu item's `<li>` element.
	 */
	protected function _has_icon_class( $class ) {
		return preg_match( '/icon-|lni-/', $class );
	}
}
