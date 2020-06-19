import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ListViewChanger = ({width,height}) => {
    return (
        <Svg height={height} viewBox="0 0 512 512" width={width}>
            <Path
                d="M0,267.75h102v-102H0V267.75z M0,395.25h102v-102H0V395.25z M0,140.25h102v-102H0V140.25z M127.5,267.75h306v-102h-306
			V267.75z M127.5,395.25h306v-102h-306V395.25z M127.5,38.25v102h306v-102H127.5z"
                fill={'#ffffff'} />
        </Svg>
    );
};
