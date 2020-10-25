import React from 'react';
import PropTypes from 'prop-types';

import './shareButtons.css';


export class TwitterShare extends React.Component {
    componentDidMount() {
        window.twttr = this.loadTwitterScript(document, 'script', 'twitter-wjs');
    }

    loadTwitterScript(d, s, id) {
        let js = d.getElementsByTagName(s)[0];
        const fjs = d.getElementsByTagName(s)[0];
        const t = window.twttr || {};
        if (d.getElementById(id)) return t;

        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = (f) => {
            t._e.push(f);
        };
        return t;
    }

    createURL() {
        const url = 'https://twitter.com/intent/tweet';
        const searchParams = new URLSearchParams();
        const { text, hashtags } = this.props;
        searchParams.set('text', text);

        if (hashtags.length) {
            searchParams.set('hashtags', hashtags.replace(' ', ''));
        }

        return `${url}?${searchParams.toString()}`;
    }


    render() {
        return (
            <div className='shareButton'>
                <a
                    className='twitter-share-button'
                    href={this.createURL()}
                    data-size='large'
                >
                    Tweet
                </a>
            </div>
        );
    }
}

TwitterShare.propTypes = {
    text: PropTypes.string,
    hashtags: PropTypes.string,
};

TwitterShare.defaultProps = {
    text: '',
    hashtags: '',
};
