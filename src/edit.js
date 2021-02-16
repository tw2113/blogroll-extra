import { __ } from '@wordpress/i18n';

/**
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';

import {
	PanelBody,
	Placeholder,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

export default function Edit( props ) {

	const {
		attributes: {
			orderby,
			order,
			limit,
			category,
			category_name,
			hide_invisible,
			show_updated,
			categorize,
			show_description,
			title_li,
			title_before,
			title_after,
			roll_class,
			category_before,
			category_after,
			category_orderby,
			category_order,
		},
		setAttributes,
	} = props;

	function onChangeHideInvisible() {
		setAttributes( { hide_invisible: ! hide_invisible } );
	}

	function onChangeShowUpdated() {
		setAttributes( { show_updated: ! show_updated } );
	}

	function onChangeCategorize() {
		setAttributes( { categorize: ! categorize } );
	}

	function onChangeShowDescription() {
		setAttributes( { show_description: ! show_description } );
	}

	return (
		<div {...useBlockProps()}>
			{ (
				<Placeholder icon={ 'book' } label="Placeholder" />
			) }
			<InspectorControls>
				<PanelBody
					title={ __( 'Blogroll Arguments', 'blogroll-extra' ) }
				>
					<SelectControl
						label="Order"
						value={ order }
						help="Whether to order bookmarks in ascending or descending order."
						options={ [
							{ label: 'ASC', value: 'ASC' },
							{ label: 'DESC', value: 'DESC' },
						] }
						onChange={order => setAttributes({order})}
					/>

					<ToggleControl
						label="Hide invisible"
						help="Whether to show or hide links marked as 'invisible'"
						checked={ !! hide_invisible }
						onChange={ onChangeHideInvisible }
					/>

					<ToggleControl
						label="Show updated"
						help="Whether to display the time the bookmark was last updated."
						checked={ !! show_updated }
						onChange={ onChangeShowUpdated }
					/>

					<ToggleControl
						label="Categorize"
						help="Whether to show links listed by category or in a single column."
						checked={ !! categorize }
						onChange={ onChangeCategorize }
					/>

					<ToggleControl
						label="Show description"
						help="Whether to show the bookmark descriptions."
						checked={ !! show_description }
						onChange={ onChangeShowDescription }
					/>

					<TextControl
						label="Order By"
						help="How to order the links by. Accepts post fields. Default 'name'"
						value={ orderby }
						onChange={orderby => setAttributes({orderby})}
					/>

					<TextControl
						label="Limit"
						help="Amount of bookmarks to display. Accepts 1+ or -1 for all."
						value={ limit }
						onChange={ limit => setAttributes({limit})}
					/>

					<TextControl
						label="Category"
						help="Comma-separated list of category IDs to include links from."
						value={ category }
						onChange={ category => setAttributes({category})}
					/>

					<TextControl
						label="Category Name"
						help="Category to retrieve links for by name."
						value={ category_name }
						onChange={ category_name => setAttributes({category_name})}
					/>

					<TextControl
						label="Title Li"
						help="What to show before the links appear."
						value={ title_li }
						onChange={ title_li => setAttributes({title_li})}
					/>

					<TextControl
						label="Title before"
						help="The HTML or text to prepend to the $title_li string."
						value={ title_before }
						onChange={ title_before => setAttributes({title_before})}
					/>

					<TextControl
						label="Title after"
						help="The HTML or text to append to the $title_li string."
						value={ title_after }
						onChange={ title_after => setAttributes({title_after})}
					/>

					<TextControl
						label="Class"
						help="The CSS class to use for the $title_li."
						value={ roll_class }
						onChange={ roll_class => setAttributes({roll_class})}
					/>

					<TextControl
						label="Category before"
						help="The HTML or text to prepend to $title_before if $categorize is true. String must contain '%id' and '%class' to inherit the category ID and the $class argument used for formatting in themes."
						value={ category_before }
						onChange={ category_before => setAttributes({category_before})}
					/>

					<TextControl
						label="Category after"
						help="The HTML or text to append to $title_after if $categorize is true."
						value={ category_after }
						onChange={ category_after => setAttributes({category_after})}
					/>

					<TextControl
						label="Category order by"
						help="How to order the bookmark category based on term scheme if $categorize is true."
						value={ category_orderby }
						onChange={ category_orderby => setAttributes({category_orderby})}
					/>

					<TextControl
						label="Category order"
						help="Whether to order categories in ascending or descending order if $categorize is true."
						value={ category_order }
						onChange={ category_order => setAttributes({category_order})}
					/>


				</PanelBody>
			</InspectorControls>
		</div>
	);
}
