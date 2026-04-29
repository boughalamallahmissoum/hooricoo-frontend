<?php
/**
 * The template for displaying 404 pages (not found)
 */

get_header();
?>

<main id="primary" class="site-main">
    <section class="error-404 not-found" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">
        <div class="container">
            <h1 style="font-size: 120px; font-weight: 800; line-height: 1;" class="gradient-text">404</h1>
            <h2 style="font-size: 32px; margin: 20px 0;">Oops! That page can't be found.</h2>
            <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
                It looks like nothing was found at this location. Maybe try a search?
            </p>
            
            <div style="max-width: 400px; margin: 0 auto 40px;">
                <?php get_search_form(); ?>
            </div>

            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-premium">Back to Home</a>
        </div>
    </section>
</main>

<?php
get_footer();
