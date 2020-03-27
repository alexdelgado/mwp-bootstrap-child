<?php

/**
 * Image URL
 * 
 * Displays the full path of the given image.
 * 
 * @param string $path Relative path of the image
 */
function bs_img_url( $path = null ) {
	echo esc_url( get_stylesheet_directory_uri() . $path );
}

/**
 * Image Tag
 * 
 * Displays an image tag with the given image params.
 * 
 * @param string $path Relative path of the image
 * @param string $alt Descriptive image text
 */
function bs_img_tag( $path = null, $alt = null ) {
	printf('<img src="%s", alt="%s">', esc_url( get_stylesheet_directory_uri() . $path ), $alt );
}
