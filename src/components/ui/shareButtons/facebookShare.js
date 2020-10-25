import React from 'react';
import PropTypes from 'prop-types';

import './shareButtons.css';


export class FacebookShare extends React.Component {
    componentDidMount() {
        window.fbAsyncInit = this.loadFacebookScript(document, 'script', 'facebook-jssdk');
    }

    loadFacebookScript(d, s, id) {
        let js = d.getElementsByTagName(s)[0];
        const fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) return;

        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0';
        fjs.parentNode.insertBefore(js, fjs);
    }

    createURL() {
        /* won't work with localhost */
        const { url } = this.props;
        const searchParams = new URLSearchParams();
        searchParams.set('u', url);
        searchParams.set('src', 'sdkpreparse');

        return `https://www.facebook.com/sharer/sharer.php?${searchParams.toString()}`;
    }


    render() {
        const { url } = this.props;

        return (
            <div className='shareButton'>
                <div
                    className='fb-share-button'
                    data-href={url}
                    data-layout='button'
                    data-size='large'
                    data-mobile-iframe='true'
                >
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={this.createURL()}
                        className='fb-xfbml-parse-ignore'
                    >
                        Share
                    </a>
                </div>
            </div>
        );
    }
}

FacebookShare.propTypes = {
    url: PropTypes.string,
};

FacebookShare.defaultProps = {
    url: '',
};
