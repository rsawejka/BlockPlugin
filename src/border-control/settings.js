import { addFilter } from '@wordpress/hooks';

const addBorderAttributes = (settings, name) => {
	//settings is the object used to decalre the block\
	// name is the name of the block (if you wanted to apply this only certain blocks)

	//apppend the settings
	settings.attributes.borderStyle = {
		type: 'string',
		default: '',
	}
	settings.attributes.borderWidth= {
		type: 'number',
		default: 2,
	}
	settings.attributes.borderRadius= {
		type: 'number',
		default: 0,
	}
	settings.attributes.borderColor= {
		type: 'string',
		default: '',
	}

	//modify any additional settings

	return settings;
}

addFilter('blocks.registerBlockType', 'rs-blockfolder/border-control/settings', addBorderAttributes);
