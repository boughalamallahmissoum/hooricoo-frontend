<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
	<header id="masthead" class="site-header glass" style="position: sticky; top: 0; z-index: 1000; margin: 20px; padding: 15px 30px;">
		<div class="container" style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
			<div class="site-branding">
				<?php
				if ( is_front_page() && is_home() ) :
					?>
					<h1 class="site-title" style="font-size: 24px; font-weight: 700;"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="gradient-text"><?php bloginfo( 'name' ); ?></a></h1>
					<?php
				else :
					?>
					<p class="site-title" style="font-size: 24px; font-weight: 700;"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="gradient-text"><?php bloginfo( 'name' ); ?></a></p>
					<?php
				endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
					)
				);
				?>
			</nav><!-- #site-navigation -->
            
            <div class="header-cta" style="display: flex; gap: 15px; align-items: center;">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme"></button>
                <a href="#contact" class="btn-premium">Get Started</a>
            </div>
		</div>
	</header><!-- #masthead -->
