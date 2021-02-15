import { __ } from '@wordpress/i18n';

/**
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';

import {
	PanelBody,
	Placeholder,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( props ) {

	const {
		attributes: {
			order,
			hide_invisible,
			show_updated,
			categorize,
			show_description,
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


				</PanelBody>
			</InspectorControls>
		</div>
	);
}
