import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const PriceArrows = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Path d="M331.5,357V178.5h-51V357H204l102,102l102-102H331.5z M153,0L51,102h76.5v178.5h51V102H255L153,0z"
            fill={'#ffffff'}/>
        </Svg>
    );
};
