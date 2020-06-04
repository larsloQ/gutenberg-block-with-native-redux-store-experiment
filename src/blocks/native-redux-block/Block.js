/* eslint-disable no-undef */
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;

/* store related
 * instead of wordpress compose we use native redux store
 * const { compose } = wp.compose; // this is wordpress way
 */
import { connect } from "react-redux"; // this is redux way
/* store action / action creators  */
import { fetchData, resetData } from "../../store/actions/demoStore.js";

import Inspector from "../../components/Inspector";
import "./editor.scss";
/* eslint-disable react/prefer-stateless-function */
class Block extends Component {
	componentDidMount() {}
	render() {
		const props = this.props;
		const { attributes } = props;
		const { apples, bananas, grapes } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<Inspector {...props} />
				</InspectorControls>
				<Fragment>
					<p>Apples: {apples}</p>
					<p>Bananas: {bananas}</p>
					<p>Grapes: {grapes}</p>
				</Fragment>
			</Fragment>
		);
	}
}

/* 
	bind action dispatch to props, so that you can dispatch them e.g. via
	props.onFetchData() 
*/
const mapDispatchToProps = (dispatch, block) => {
	return {
		onFetchData: () => {
			dispatch(fetchData(block.clientId));
		},
		onResetData: () => {
			dispatch(resetData(block.clientId));
		},
	};
};

/* 
	native redux mapStateToProps / selects
*/
const mapStateToProps = (state, block) => {
	console.log("Block mapStateToProps (state, block obj): ", state, block);
	if (state[block.clientId]) {
		block.setAttributes({
			grapes: state[block.clientId].grapes,
			bananas: state[block.clientId].bananas,
			apples: state[block.clientId].apples,
		});
	}
	return {};
};

/* 
	react-redux connect our block
*/
export default connect(mapStateToProps, mapDispatchToProps)(Block);
