import * as Font from 'expo-font';
import MetropolisRegular from '../assets/fonts/Metropolis-Regular.otf';
import MetropolisBold from '../assets/fonts/Metropolis-Bold.otf';
import MetropolisMedium from '../assets/fonts/Metropolis-Medium.otf';


export const loadFonts = ()=>{
    return Font.loadAsync({
        MetropolisRegular,
        MetropolisBold,
        MetropolisMedium
    });
};

export const FONT_FAMILIES = {
    regular: "MetropolisRegular",
    medium: "MetropolisMedium",
    bold: "MetropolisBold",
};

