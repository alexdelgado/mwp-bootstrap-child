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

<footer class="container-fluid"></footer>

<?php wp_footer(); ?>
</body>
</html>
