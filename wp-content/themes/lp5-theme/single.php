<?php
/**
 * The template for displaying all single posts
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="container" style="max-width: 800px; margin: 60px auto; padding: 0 20px;">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header" style="margin-bottom: 40px;">
                    <?php the_title( '<h1 class="entry-title gradient-text" style="font-size: 42px; margin-bottom: 10px;">', '</h1>' ); ?>
                    <div class="entry-meta" style="color: var(--text-muted); font-size: 14px;">
                        <span>Posted on <?php echo get_the_date(); ?></span> | 
                        <span>By <?php the_author(); ?></span>
                    </div>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="post-thumbnail" style="margin-bottom: 40px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                        <?php the_post_thumbnail( 'large', array( 'style' => 'width: 100%; height: auto; display: block;' ) ); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php
                    the_content();
                    ?>
                </div>

                <footer class="entry-footer" style="margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--glass-border);">
                    <div class="post-tags"><?php the_tags( 'Tags: ', ', ' ); ?></div>
                </footer>
            </article>

            <?php
            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
