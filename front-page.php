<?php get_header(); ?>

	<main class="main">
		<section class="hero" style="background-image: url(<?php bs_img_url('/img/ave-calvar-dmwHW74iUzk-unsplash.jpg'); ?>)">
			<div class="hero__content">
				<h2>Hero Title</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</section>
		<section class="featured">
			<div class="container">
				<div class="featured__image">
					<?php bs_img_tag('/img/mohamed-nohassi-odxB5oIG_iA-unsplash.jpg', 'person standing at edge of beach at sunset') ?>
				</div>
				<div class="play-btn">
					<div class="lni lni-play"></div>
				</div>
			</div>
		</section>
	</main>

<?php get_footer();
