import React, {Component} from 'react';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../style/colors";
import {styles} from "../commons/filters";

class Slider extends Component {
    state = {
        values: [0, 500],
    };

    multiSliderValuesChange = (values) => {
        this.setState({
            values,
        });
    };
    render() {
        return (
            <View style={styles.sliderContainer}>
                <Text style={[styles.title,{position:'absolute',left:0,}]}>${this.state.values[0]}</Text>
                <Text style={[styles.title,{position:'absolute',right:0,}]}>${this.state.values[1]}</Text>
                <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    sliderLength={280}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={1000}
                    step={1}
                    
                />


            </View>
        );
    }
}

export default Slider;
