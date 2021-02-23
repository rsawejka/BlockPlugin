<?php
/**
 * Plugin Name:     Test
 * Description:     Test block
 * Version:         0.1.0
 * Author:          Ryan Sawejka
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     rs-blockfolder
 *
 * @package         rs-blockfolder
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function rs_blockfolder_rs_blockfolder_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "rs-blockfolder/rs-blockfolder" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'rs-blockfolder-rs-blockfolder-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'rs-blockfolder-rs-blockfolder-block-editor', 'rs-blockfolder' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'rs-blockfolder-rs-blockfolder-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'rs-blockfolder-rs-blockfolder-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'rs-blockfolder/rs-blockfolder',
		array(
			'editor_script' => 'rs-blockfolder-rs-blockfolder-block-editor',
			'editor_style'  => 'rs-blockfolder-rs-blockfolder-block-editor',
			'style'         => 'rs-blockfolder-rs-blockfolder-block',
		)
	);
}
add_action( 'init', 'rs_blockfolder_rs_blockfolder_block_init' );
