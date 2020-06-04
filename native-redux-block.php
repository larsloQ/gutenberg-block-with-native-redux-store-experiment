<?php
/**
 *
 * @author      larslo, (edited the base plugin from Jesús Olazagoitia (@goiblas))
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Native Redux Block Demo
 * Description: A demo of how-to use a native redux block in gutenberg
 * Version:     0.0.1
 * Author:      larslo 
 * Author URI:  https://larslo.de
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if( !defined( 'ABSPATH' ) ) die();

require_once(__DIR__."/NativeReduxBlock.php");
// Initialize plugin
\Yours\Demo\NativeReduxBlock::instance();