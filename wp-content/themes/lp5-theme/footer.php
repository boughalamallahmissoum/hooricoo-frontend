	<footer id="colophon" class="site-footer" style="padding: 80px 20px; border-top: 1px solid var(--glass-border); margin-top: 80px;">
		<div class="container" style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
            <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
                <?php dynamic_sidebar( 'footer-1' ); ?>
            <?php else : ?>
                <div class="footer-branding">
                    <h3 class="gradient-text" style="font-size: 24px; margin-bottom: 15px;"><?php bloginfo( 'name' ); ?></h3>
                    <p style="color: var(--text-muted);">High-performance landing pages and professional web solutions.</p>
                </div>
                <div class="footer-copy">
                    <p style="color: var(--text-muted);">&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
                </div>
            <?php endif; ?>
		</div><!-- .container -->
        <div style="text-align: center; margin-top: 60px; font-size: 14px; opacity: 0.6;">
            Built with <span style="color: #ef4444;">&hearts;</span> by Boughalamallah Missoum
        </div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
