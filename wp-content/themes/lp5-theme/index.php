<?php
get_header();
?>

<main id="primary" class="site-main">

	<?php
	if ( have_posts() ) :

		if ( is_home() && ! is_front_page() ) :
			?>
			<header>
				<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
			</header>
			<?php
		endif;

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-content">
                    <?php
                    the_content();
                    ?>
                </div><!-- .entry-content -->
            </article><!-- #post-<?php the_ID(); ?> -->
            <?php
		endwhile;

		the_posts_navigation();

	else :
        ?>
        <section class="no-results not-found" style="padding: 100px 20px; text-align: center;">
            <h2 class="gradient-text">Nothing Found</h2>
            <p>It seems we can't find what you're looking for.</p>
        </section>
        <?php
	endif;
	?>

</main><!-- #main -->

<?php
get_footer();
