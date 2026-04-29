<?php
/**
 * The template for displaying archive pages
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container" style="max-width: 1000px; margin: 60px auto; padding: 0 20px;">
        <header class="page-header" style="margin-bottom: 60px; text-align: center;">
            <?php
            the_archive_title( '<h1 class="page-title gradient-text" style="font-size: 48px;">', '</h1>' );
            the_archive_description( '<div class="archive-description" style="color: var(--text-muted); margin-top: 10px;">', '</div>' );
            ?>
        </header>

        <div class="posts-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) :
                    the_post();
                    ?>
                    <article class="glass" style="padding: 20px; transition: var(--transition); cursor: pointer;" onclick="window.location='<?php the_permalink(); ?>'">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div style="border-radius: 8px; overflow: hidden; margin-bottom: 15px;">
                                <?php the_post_thumbnail( 'medium_large', array( 'style' => 'width: 100%; height: 200px; object-fit: cover;' ) ); ?>
                            </div>
                        <?php endif; ?>
                        <h2 style="font-size: 20px; margin-bottom: 10px;"><?php the_title(); ?></h2>
                        <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 15px;">
                            <?php echo get_the_date(); ?>
                        </div>
                        <div style="font-size: 15px;">
                            <?php the_excerpt(); ?>
                        </div>
                    </article>
                    <?php
                endwhile;

                the_posts_navigation();

            else :
                get_template_part( 'template-parts/content', 'none' );
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
