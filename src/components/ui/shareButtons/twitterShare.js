import React from 'react';
import PropTypes from 'prop-types';

import './shareButtons.css';


export class TwitterShare extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        hashtags: PropTypes.string,
    }

    static defaultProps = {
        text: '',
        hashtags: '',
    }

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
        searchParams.set('text', this.props.text);

        if (this.props.hashtags.length) {
            searchParams.set('hashtags', this.props.hashtags.replace(' ', ''));
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
