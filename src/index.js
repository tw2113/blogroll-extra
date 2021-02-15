import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
export default registerBlockType( 'tw2113/blogroll-extra', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,
	title: __( 'Blogroll Extra', 'blogroll-extra' ),
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'blogroll-extra'
	),
	attributes: {
		order: {
			type: 'string',
		},
		hide_invisible: {
			type: 'boolean',
		},
		show_updated: {
			type: 'boolean',
		},
		categorize: {
			type: 'boolean',
		},
		show_description: {
			type: 'boolean',
		},
	},
	category: 'widgets',
	icon: 'book-alt',
	edit: Edit,
	save: () => {
		return null;
	},
} );
