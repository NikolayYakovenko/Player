import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Home } from '../home';


describe('Check Home component', () => {
    const props = {
        children: <div>First test</div>,
    };

    test('should be selectable by class "wrapper"', () => {
        const wrapper = shallow(<Home {...props} />);
        expect(wrapper.is('.wrapper')).toBe(true);
    });

    test('should render without throwing an error', () => {
        const wrapper = shallow(<Home {...props} />);
        expect(wrapper
            .contains(<div className='wrapper'><div>First test</div></div>))
            .toBe(true);
    });

    test('renders children when passed in', () => {
        const wrapper = shallow(<Home {...props}><p>Hello</p></Home>);
        expect(wrapper.contains(<p>Hello</p>)).toBe(true);
    });

    test('renders correctly', () => {
        const rendered = renderer.create(<Home {...props} />);
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});

