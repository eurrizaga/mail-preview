import React from 'react';

export default class ExampleContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
    }
    /*
    static propTypes = {
        content: React.PropTypes.string.isRequired,
        stylesheets: React.PropTypes.arrayOf(React.PropTypes.string),
    };
    */
    /**
     * Called after mounting the component. Triggers initial update of
     * the iframe
     */
    componentDidMount() {
        this._updateIframe();
    }

    /**
     * Called each time the props changes. Triggers an update of the iframe to
     * pass the new content
     */
    componentDidUpdate() {
        this._updateIframe();
    }

    /**
     * Updates the iframes content and inserts stylesheets.
     * TODO: Currently stylesheets are just added for proof of concept. Implement
     * and algorithm which updates the stylesheets properly.
     */
    _updateIframe() {
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        //const head = document.getElementsByTagName('head')[0];
        document.body.innerHTML = this.props.content;
        /*
        this.props.stylesheets.forEach(url => {
            const ref = document.createElement('link');
            ref.rel = 'stylesheet';
            ref.type = 'text/css';
            ref.href = url;
            head.appendChild(ref);
        });
        */
    }

    /**
     * This component renders just and iframe
     */
    render() {
        return <iframe title="PreviewMail" className="height-100" ref="iframe"/>
    }
}



    