<?php get_header(); ?>

	<main class="container-fluid">
		<?php
			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post();
					get_template_part( 'template-parts/content', get_post_type() );
				}
			} else {
				get_template_part( 'template-parts/content', 'none' );
			}
		?>
		<div id="root"></div>
	</main>

<?php get_footer();
