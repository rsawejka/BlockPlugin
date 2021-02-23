import {__} from "@wordpress/i18n";
import {PanelColorSettings} from "@wordpress/block-editor";
import {select} from "@wordpress/data";

export class RSColorPanel extends React.Component{

	render(){
		let {attributes, setAttributes} = this.props;
		//let {attributes, setAttributes, initalOpen} = this.props;
		let settings = select('core/editor').getEditorSettings();

		return (
			<PanelColorSettings
			title={__('color settings test')}
			initalOpen={this.props.initialOpen || false}
			//initalOpen={initalOpen}
			colorSettings={[
				{
					value: attributes.backgroundColor,
					onChange: (color) => {setAttributes({backgroundColor: color})},
					label: __('background color'),
				},
				{
					value: attributes.textColor,
					onChange: (color) => {setAttributes({textColor: color})},
					label: __('text color'),
					colors: [
						...settings.colors,
						{name: 'white', slug: 'white', color: '#fff'}
					]
				},
			]}
		/>
		);
	}
}
