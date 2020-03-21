<?php get_header(); ?>

	<main class="container-fluid">
		<section class="hero" style="background-image:url(<?php echo get_stylesheet_directory_uri() ?>/img/bruno-van-der-kraan-6P-dSJbcvow-unsplash.jpg)">
			<div class="container">
				<h2>Hero Title</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</section>
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
	</main>

<?php get_footer();
