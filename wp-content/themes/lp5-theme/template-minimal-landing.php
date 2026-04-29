<?php
/**
 * Template Name: Minimal Landing Page
 * Description: A clean, minimal layout with no header navigation or footer widgets.
 */

get_header();
?>

<style>
    /* Hide the standard header for this template */
    .site-header { display: none !important; }
    .site-footer { border-top: none !important; }
</style>

<main id="primary" class="site-main">
    <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
        <?php
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
        ?>
    </div>
</main>

<?php get_footer(); ?>
