import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Plus = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"
            fill={'#ffffff'}
            />
        </Svg>
    );
};
