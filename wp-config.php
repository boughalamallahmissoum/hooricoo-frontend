<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'landing-page5' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ')2CtbZF Oi350#QPGef.-M+>c<-m-<AH?Pg>jhV4qhn#6(%@ |]y[,ALKWaVpDvx' );
define( 'SECURE_AUTH_KEY',  'g_hWteXA;S.6eBF{{h5xr#wL*JNRtv}aNicE]M8v.E`)C~z/T+`NV;qY;T$d)5wU' );
define( 'LOGGED_IN_KEY',    'zkJi8v-nQMI 7-]=0_|]A%A=1I/>}]5wC*Kh $|j&0tc@CwR1Cr#J)!F>jPGTPSu' );
define( 'NONCE_KEY',        ':<nrR~K`}E2wL>mb78z|^p}>^op,84Yw|62SLW#w/Rmdj(5`_8}g}f/:imK2@+7D' );
define( 'AUTH_SALT',        'CAOC+s /.WnG=4lwzln#L5zt7:?0A/xk?bWnV,o^o17+z-?~+OnA&4]puxpn2e:?' );
define( 'SECURE_AUTH_SALT', 'P8U8&C:]THI$8?-`jd4VHc#u4M<E].S(s^43:UTu?R_i{{BGOXlW9<_wnyV:INCL' );
define( 'LOGGED_IN_SALT',   'LEI{*&Z1CG.G:GY:^/x%3:y:Mg(6c+8KaS4JDpkQYPJDMcqyZq~%-iCw#fyvu* 2' );
define( 'NONCE_SALT',       'm!x&Ip18T9]p_$886#^!Hf7wiYwoxzSeX:aZ(w}]ZvzH[[-/OwHzwQZiyS dHrh{' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'lp5_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
