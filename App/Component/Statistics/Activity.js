import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default class Activity extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={this.props.style}>
                <Text h2>{this.props.activity}</Text>
            </View>
        )
    }
}
