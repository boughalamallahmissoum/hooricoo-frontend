<?php
/**
 * LP5 Premium Landing Page functions and definitions
 */

if ( ! function_exists( 'lp5_theme_setup' ) ) :
    function lp5_theme_setup() {
        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus( array(
            'menu-1' => esc_html__( 'Primary', 'lp5-theme' ),
        ) );

        // Switch default core markup for search form, comment form, and comments
        // to output valid HTML5.
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ) );
    }
endif;
add_action( 'after_setup_theme', 'lp5_theme_setup' );

/**
 * Enqueue scripts and styles.
 */
function lp5_theme_scripts() {
    // Theme Stylesheet
    wp_enqueue_style( 'lp5-theme-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Google Fonts: Inter
    wp_enqueue_style( 'lp5-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', array(), null );

    // Theme Toggle Script
    wp_enqueue_script( 'lp5-theme-toggle', get_template_directory_uri() . '/assets/js/theme-toggle.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'lp5_theme_scripts' );

/**
 * Elementor Compatibility
 */
function lp5_add_elementor_support() {
    add_theme_support( 'elementor-full-width' );
}
add_action( 'after_setup_theme', 'lp5_add_elementor_support' );

/**
 * Register widget area.
 */
function lp5_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar', 'lp5-theme' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', 'lp5-theme' ),
        'before_widget' => '<section id="%1$s" class="widget glass" style="padding: 20px; margin-bottom: 30px;">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title" style="font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid var(--glass-border); padding-bottom: 10px;">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer', 'lp5-theme' ),
        'id'            => 'footer-1',
        'description'   => esc_html__( 'Add footer widgets here.', 'lp5-theme' ),
        'before_widget' => '<section id="%1$s" class="widget">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title" style="font-size: 18px; margin-bottom: 15px;">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'lp5_widgets_init' );

/**
 * Customizer Additions
 */
function lp5_customize_register( $wp_customize ) {
    // Add Branding Section
    $wp_customize->add_section( 'lp5_branding', array(
        'title'    => __( 'Theme Settings', 'lp5-theme' ),
        'priority' => 30,
    ) );

    // Accent Color
    $wp_customize->add_setting( 'lp5_accent_color', array(
        'default'   => '#6366f1',
        'transport' => 'refresh',
    ) );

    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'lp5_accent_color', array(
        'label'    => __( 'Accent Color', 'lp5-theme' ),
        'section'  => 'lp5_branding',
        'settings' => 'lp5_accent_color',
    ) ) );
}
add_action( 'customize_register', 'lp5_customize_register' );

/**
 * Output Customizer CSS
 */
function lp5_customizer_css() {
    $accent = get_theme_mod( 'lp5_accent_color', '#6366f1' );
    ?>
    <style type="text/css">
        :root {
            --primary-color: <?php echo $accent; ?>;
            --primary-hover: <?php echo $accent; ?>dd;
        }
    </style>
    <?php
}
add_action( 'wp_head', 'lp5_customizer_css' );

/**
 * Redirect WooCommerce Order Received page to headless frontend Thank You page.
 */
function lp5_redirect_to_headless_thank_you() {
    if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url( 'order-received' ) ) {
        global $wp;
        $order_id = isset( $wp->query_vars['order-received'] ) ? $wp->query_vars['order-received'] : 0;
        
        $frontend_url = 'https://hooricoo-frontend-snowy.vercel.app/thank-you';
        if ( $order_id ) {
            $frontend_url = add_query_arg( 'order', $order_id, $frontend_url );
        }
        
        wp_redirect( $frontend_url );
        exit;
    }
}
add_action( 'template_redirect', 'lp5_redirect_to_headless_thank_you' );
