import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls} from "@wordpress/block-editor";
import { PanelBody, PanelRow, SelectControl } from "@wordpress/components";
import { addFilter } from '@wordpress/hooks';
import { RangeControl, ColorPalette } from '@wordpress/components';
import {select} from "@wordpress/data";


const borderInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return(props) => {
		let divStyles = {
			borderStyle: props.attributes.borderStyle || 'none',
			borderWidth: props.attributes.borderWidth + 'px' || 'none',
			borderRadius: props.attributes.borderRadius + 'px' || 'none',
			borderColor: props.attributes.borderColor || 'none',
		}
		let settings = select('core/editor').getEditorSettings();

		return(
			<Fragment>
				<div className="wp-block" style={divStyles}>
					<BlockEdit {...props} />
				</div>
				<InspectorControls>
					<PanelBody title="Border Controlss" initialOpen={false}>
						<PanelRow>
							<SelectControl
							label="border Style"
							value={props.attributes.borderStyle}
							options={[
								{label: 'none', value: 'none'},
								{label: 'Solid', value: 'solid'},
								{label: 'Dashed', value: 'dashed'},
								{label: 'Dotted', value: 'dotted'},
							]}
							onChange={(value)=>{
								props.setAttributes({
									borderStyle: value
								})
							}}
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label="Border Width"
								value={ props.attributes.borderWidth }
								onChange={ ( value ) => props.setAttributes( {
									borderWidth: value
								} ) }
								min={ 0.5 }
								max={ 5 }
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label="Border radius"
								value={ props.attributes.borderRadius }
								onChange={ ( value ) => props.setAttributes( {
									borderRadius: value
								} ) }
								min={ 0 }
								max={ 50 }
							/>
						</PanelRow>
						<PanelRow>
							<ColorPalette
								value={props.attributes.borderColor}
								onChange={(color)=>{props.setAttributes({borderColor: color})}}
								colors={
									settings.colors
								}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

			</Fragment>
			)
	}
}, 'borderInspectorControls')

addFilter('editor.BlockEdit', 'rs-blockfolder/border-control/inspector-controls', borderInspectorControls)
