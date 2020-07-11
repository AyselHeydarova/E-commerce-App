import React, { Component } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { TouchableWithoutFeedback, Text, View } from "react-native";
import { COLORS } from "../style/colors";
import { styles } from "../Screens/filters";

class Slider extends Component {
  state = {
    values: [0, 100],
  };

    multiSliderValuesChange = (values) => {
        this.setState({
            values,
        });
    };
// ()=>this.navigation.navigate("Filters", {
//     startValue:this.state.values[0],
//     endValue:this.state.values[1]
// })
    render() {
        return (
                <>
                    <Text style={[styles.title, {position: 'absolute', left: 0,}]}>${this.state.values[0]}</Text>
                    <Text style={[styles.title, {position: 'absolute', right: 0,}]}>${this.state.values[1]}</Text>
                    <MultiSlider
                        values={[this.state.values[0], this.state.values[1]]}
                        sliderLength={300}
                        onValuesChange={this.multiSliderValuesChange}
                        min={0}
                        max={2000}
                        step={1}

                    />
                    </>
        );
    }
}

export default Slider;
