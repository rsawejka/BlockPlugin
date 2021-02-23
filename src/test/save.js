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
import {RichText, useBlockProps} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	let starIcons = Array(5)
		.fill('&#9733;', 0, attributes.stars)
		.join('');
	let divStyles={
		backgroundColor: attributes.backgroundColor,
		color: attributes.textColor,
	}

	return (
		<div { ...useBlockProps.save({style: divStyles}) }>
			<div className="stars">{starIcons}</div>
			<RichText.Content
				tagName="div"
				value={attributes.quote}
				className="quote"
			/>
			<div className="quote-profile">
				<div className="photo">
					<img src={attributes.imgUrl} alt={'Photo of ______'}/>
				</div>
				<div className="text">
					<p className="author">{attributes.author}</p>

					<p className="location">{attributes.location}</p>
				</div>
			</div>
		</div>
	);
}
