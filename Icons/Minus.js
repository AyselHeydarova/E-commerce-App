import React from 'react';
import Svg, {Rect} from 'react-native-svg';

export const Minus = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Rect y="128" width="298.667" height="42.667"
                  fill={'#ffffff'}
            />
        </Svg>
    );
};
