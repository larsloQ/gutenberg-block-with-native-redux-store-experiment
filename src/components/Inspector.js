/* eslint-disable no-undef */
const { Fragment } = wp.element;
const { PanelBody, Button } = wp.components;

/* 
    mapDispatchToProps adds the actions to props
    which you we can use here. 
*/
function Inspector (props) {
    /* eslint-disable react/sort-comp */
        return (
            <Fragment>
                <PanelBody>
                    <Button
                        onClick={() => {
                            props.onFetchData();
                        }}
                        isPrimary={true}
                    >
                        Get Data
                    </Button>
                    <Button
                        isSecondary={true}
                        onClick={() => {
                            props.onResetData();
                        }}
                    >
                        Reset Data
                    </Button>
                </PanelBody>
            </Fragment>
        );
}

export default Inspector;
