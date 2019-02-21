<?php
/*
Plugin Name:  FLS-MOZAIKA Custom settings 
Plugin URI:   
Description:  Управление подписками через мета-тэги пользователей и настройки логин-скрина WP.
Version:      0.0.1
Author:       Borzug
Author URI:   
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  wporg
Domain Path:  /languages
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

register_meta('user', 'subscriber', array(
    'type' => 'boolean',
    'show_in_rest' => true,
    'description' => 'A meta key associated with a boolean meta value.',
    'single' => true
));

function my_custom_login() {
    echo '<link rel="stylesheet" type="text/css" href="/wp-content/plugins/fls-wp-custom-settings/login-screen.css" />';
}
add_action('login_head', 'my_custom_login');

function my_login_logo_url() {
    return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );
    
function my_login_logo_url_title() {
    return 'Журнал "Иностранные языки в школе"';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );