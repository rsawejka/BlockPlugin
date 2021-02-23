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
//import { useBlockProps } from '@wordpress/block-editor';
//import { RichText } from '@wordpress/block-editor';
import {useBlockProps, RichText, MediaUpload, MediaUploadCheck, PlainText,
		InspectorControls} from '@wordpress/block-editor';
import {SelectControl, PanelBody, PanelRow, ColorPalette, ColorPicker} from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
//see all the code in differnt branches
//has some branches master, panel-one, panel-two
export default function edit({attributes, setAttributes}) {
//export default function edit(props) {
	//let attributes = props.attributes;
	//let {attributes, setAttributes} = props;

	//drop down and color palate dont work at same time
	let divStyles={
		backgroundColor: attributes.backgroundColor,
		color: attributes.textColor,
	}
	return (
		<div { ...useBlockProps({style: divStyles}) }>
		<InspectorControls>
			<PanelBody title="basic" initalOpen={true}>
				<PanelRow>
					<p>Background Color</p>
				</PanelRow>

				<PanelRow>

					<ColorPalette
						value={attributes.backgroundColor}
						onChange={(color)=>{setAttributes({backgroundColor: color})}}
						colors={[
							{name: 'Blue', color: '#0000ff'},
							{name: 'Red', color: '#ff0000'},
							{name: 'Green', color: '#00ff00'},
						]}
					/>
				</PanelRow>

				<PanelRow>
					<p>text Color</p>
				</PanelRow>

				<PanelRow>

					<ColorPicker
						value={attributes.textColor}
						onChangeComplete={(color)=>{setAttributes({textColor: color.hex})}}
						disableAlpha
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
			<SelectControl

				label={ __( 'Select a rating:' ) }
				value={ attributes.stars }
				onChange={ ( stars ) => { setAttributes( { stars: parseInt(stars) } ) } }
				options={ [

					{ value: '1', label: '*' },
					{ value: '2', label: '**' },
					{ value: '3', label: '***' },
					{ value: '4', label: '****' },
					{ value: '5', label: '*****' },
				] }
			/>
			<RichText
			tagName="div"
			value={attributes.quote}
			allowedFormats={['core/bold', 'core/italic']}
			onChange={(quote) => setAttributes({quote})}
			placeholder={__('heading...')}
			/>

			<div className="quote-profile">
				<div className="photo">
					<MediaUploadCheck>
						<MediaUpload
						allowedTypes={['image']}
						onSelect={(img) => setAttributes({imgUrl: img.sizes.thumbnail.url})}
						render={({open})=> <img src={attributes.imgUrl} onClick={open}/>}
						/>
					</MediaUploadCheck>
				</div>
				<div className="text">
					<PlainText
						className="author"
						value={attributes.author}
						onChange={(author) => setAttributes ({author})}
						placeholder="Ry sa"
					/>

					<PlainText
						className="location"
						value={attributes.location}
						onChange={(location) => setAttributes ({location})}
						placeholder="wales"
					/>
				</div>
			</div>
		</div>
	);
}
