import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Filter = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Path
                d="M178.5,382.5h102v-51h-102V382.5z M0,76.5v51h459v-51H0z M76.5,255h306v-51h-306V255z"
                fill={'#ffffff'} />
        </Svg>
    );
};
