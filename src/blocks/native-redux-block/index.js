/* eslint-disable no-undef */
/* eslint-disable react/display-name */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { Provider } from 'react-redux';


/* init store */
import { initStore } from '../../store/demoStore.js';
const myStore = initStore();

/* make sure to wrap the store around the whole editor block, with a provider, use combine in Block.js
like so, see edit() :
	<Provider store={getStore()}>
		<Block {...props} />
	</Provider>
*/


import Block from './Block';
import attributes from './attributes';
import icon from './icon';

import './editor.scss';

const blocknamespace = 'yours-demo';
const blockname = 'native-redux-block-demo';
const block = blocknamespace+'/'+blockname;

export default registerBlockType( block , {
	title: __('DEMO OF A NATIVE REDUX STORE IN EDITOR', 'yours'),
	description: __('A redux store boilerplate for you block', 'yours'),
	category: 'embed',
	keywords: [
		__( 'map', 'yours' ),
		__( 'leaflet', 'yours' ),
		__( 'redux', 'yours' )
	],
	icon,
	supports: {
		html: false,
		align: ['wide', 'full']
	},
	attributes,
	edit: props => (
		<Provider store={myStore}>
			<Block
				{...props}
			/>
		</Provider>
	),
	save: () => {}
});
