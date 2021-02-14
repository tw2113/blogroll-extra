<?php
/**
 * Plugin Name:     Blogroll Extra
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     blogroll-extra
 *
 * @package         create-block
 */
namespace tw2113;

function blogroll_extra_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "tw2113/blogroll-extra" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'tw2113-blogroll-extra-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'tw2113-blogroll-extra-block-editor', 'blogroll-extra' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'tw2113-blogroll-extra-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		[],
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'tw2113-blogroll-extra-block',
		plugins_url( $style_css, __FILE__ ),
		[],
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'tw2113/blogroll-extra',
		[
			'editor_script' => 'tw2113-blogroll-extra-block-editor',
			'editor_style'  => 'tw2113-blogroll-extra-block-editor',
			'style'         => 'tw2113-blogroll-extra-block',
			'render_callback' => __NAMESPACE__ . '\construct_bookmarks_list',
			'attributes' => [
				'order' => [
					'default' => 'ASC'
				]
			]
		]
	);
}
add_action( 'init', __NAMESPACE__ . '\blogroll_extra_block_init' );

function construct_bookmarks_list( $attributes ) {
	return wp_list_bookmarks(
		[
			'order' => $attributes['order'],
			'echo' => false,
		]
	);
}
