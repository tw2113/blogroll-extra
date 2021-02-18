<?php
/**
 * Plugin Name:     Blogroll Extra
 * Description:     WordPress Blogroll, block edition
 * Version:         0.1.0
 * Author:          Michael Beckwith
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     blogroll-extra
 *
 * @package         tw2113-blogroll-extra
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
				'orderby' => [
					'type' => 'string',
					'default' => 'name',
				],
				'order' => [
					'type' => 'string',
					'default' => 'ASC',
				],
				'roll_limit' => [
					'type' => 'string',
					'default' => '-1',
				],
				'category' => [
					'type' => 'string',
				],
				'category_name' => [
					'type' => 'string',
				],
				'hide_invisible' => [
					'type' => 'boolean',
					'default' => true,
				],
				'show_updated' => [
					'type' => 'boolean',
					'default' => false,
				],
				'categorize' => [
					'type' => 'boolean',
					'default' => true,
				],
				'show_description' => [
					'type' => 'boolean',
					'default' => false,
				],
				'title_li' => [
					'type' => 'string',
					'default' => 'Bookmarks',
				],
				'title_before' => [
					'type' => 'string',
					'default' => '<h2>',
				],
				'title_after' => [
					'type' => 'string',
					'default' => '</h2>',
				],
				'roll_class' => [
					'type' => 'string',
					'default' => 'linkcat',
				],
				'category_before' => [
					'type' => 'string',
					'default' => '<li id="%id" class="%class">',
				],
				'category_after' => [
					'type' => 'string',
					'default' => '</li>',
				],
				'category_orderby' => [
					'type' => 'string',
					'default' => 'name',
				],
				'category_order' => [
					'type' => 'string',
					'default' => 'ASC',
				],
			],
		]
	);
}
add_action( 'init', __NAMESPACE__ . '\blogroll_extra_block_init' );

function construct_bookmarks_list( $attributes ) {
	$args = [];
	$args = [
		'echo' => false,
	];
	$attributes = array_filter( $attributes );
	foreach ( $attributes as $attribute => $attribute_value ) {
		// need to handle custom because `class` is a reserved keyword in js
		if ( 'roll_class' === $attribute ) {
			$args['class'] = $attribute_value;
		} else if ( 'roll_limit' === $attribute ) {
			// need to handle cause `limit` alone fails to work for me.
			$args['limit'] = $attribute_value;
		} else {
			$args[ $attribute ] = $attribute_value;
		}
	}

	return wp_list_bookmarks(
		$args
	);
}
