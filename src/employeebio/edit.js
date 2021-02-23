/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	PlainText,
	RichText,
	InspectorControls
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {PanelBody, PanelRow, SelectControl} from "@wordpress/components";


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function edit({attributes, setAttributes}) {
//export default function edit(props) {
	//let attributes = props.attributes;
	//let {attributes, setAttributes} = props;

	return (
		<div { ...useBlockProps({className: attributes.theme}) }>
			<InspectorControls>
				<PanelBody title="light or dark theme" initalOpen={true}>
					<PanelRow>
						<SelectControl
							label={__('Theme')}
							value={attributes.theme}
							onChange={(theme)=> {setAttributes({theme})}}
							options={[
								{value: 'light', label: 'light theme'},
								{value: 'dark', label: 'dark theme'},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={__('toggle bio')}
							value={attributes.bioToggle}
							onChange={(bioToggle)=> {setAttributes({bioToggle})}}
							options={[
								{value: 'off', label: 'bio off'},
								{value: 'on', label: 'bio on'},
							]}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={__('toggle picture border radius')}
							value={attributes.picRadius}
							onChange={(picRadius)=> {setAttributes({picRadius})}}
							options={[
								{value: 'radiusOff', label: 'radius off'},
								{value: 'radiusOn', label: 'radius on'},
							]}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
				<div className="cardHeader">
					<div>
					<h4>Add picture here: </h4>
					<div className={attributes.picRadius}>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image']}
								onSelect={(img) => setAttributes({imgUrl: img.sizes.thumbnail.url})}
								render={({open})=> <img src={attributes.imgUrl} onClick={open}/>}
							/>
						</MediaUploadCheck>
					</div>
					</div>
					<div>
						<h4>Employees Name: </h4>
						<PlainText
							className="name"
							value={attributes.name}
							onChange={(name) => setAttributes ({name})}
							placeholder="John Doe"
						/>
					</div>
				</div>
				<div className={attributes.bioToggle}>
					<h4>Bio: </h4>
					<PlainText
						tagName="div"
						className="bio"
						value={attributes.bio}
						onChange={(bio) => setAttributes({bio})}
						placeholder={__('Employee Bio')}
					/>
				</div>



		</div>
	);
}
