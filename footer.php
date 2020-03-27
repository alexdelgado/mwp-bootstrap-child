<section id="js-search-overlay" class="overlay" tabindex="-1" role="dialog" aria-labelledby="aria-search-label" aria-hidden="true">
	<div class="overlay__container" role="document">
		<div class="overlay__header row justify-content-end">
			<button id="js-search-hide" class="overlay__toggle btn--sm btn--transparent" type="button" data-dismiss="modal" aria-label="Close">
				<span class="lni-close"></span>
			</button>
		</div>
		<div class="overlay__body">
			<div class="container">
				<div class="row justify-content-center">
					<h2 id="aria-search-label">Search</h2>
				</div>
				<div id="react-search" class="row justify-content-center"></div>
			</div>
		</div>
	</div>
</section>

<footer class="footer">
	<div class="container">
		<div class="row">
			<div class="col-8">
				<nav>
					<h2><?php echo wp_get_nav_menu_name('footer') ?></h2>
					<?php
						wp_nav_menu(
							array(
								'menu_class' => 'footer-menu',
								'container' => false,
								'items_wrap' => '<ul class="%2$s">%3$s</ul>',
								'theme_location' => 'footer'
							)
						)
					?>
				</nav>
			</div>
			<div class="col-4">
				<section class="subscribe">
					<div class="subscribe__header">
						<h2>Contact Us</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
					</div>
					<form action="" class="subscribe__form">
						<label for="subscribe" class="screen-reader-text">Subscribe to our newsletter</label>
						<input type="text" id="subscribe" class="subscribe__email" placeholder="you@mail.com">
					</form>
					<div class="subscribe__social">
						<a href="#" class="subscribe__network">
							<span class="screen-reader-text">follow us on facebook</span>
							<span class="lni lni-facebook"></span>
						</a>
						<a href="#" class="subscribe__network">
							<span class="screen-reader-text">follow us on instagram</span>
							<span class="lni lni-instagram"></span>
						</a>
						<a href="#" class="subscribe__network">
							<span class="screen-reader-text">follow us on twitter</span>
							<span class="lni lni-twitter"></span>
						</a>
						<a href="#" class="subscribe__network">
							<span class="screen-reader-text">follow us on youtube</span>
							<span class="lni lni-youtube"></span>
						</a>
					</div>
				</section>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
