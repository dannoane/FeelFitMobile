import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import MotionMapper from './../../Util/MotionMapper';

export default class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {icon: 'human-handsdown'};
    }

    componentDidMount() {
        this.setIcon();        
    }

    setIcon() {

        switch (this.activity) {
            case MotionMapper.WALKING:
                this.setState({icon: 'walk'});
            case MotionMapper.RUNNING:
                this.setState({icon: 'run'});
            case MotionMapper.BIKING:
                this.setState({icon: 'bike'});
        }
    }

    render() {

        return (
            <View style={this.props.style}>
                <Icon 
                    name={this.state.icon} 
                    color='black'
                    type={'material-community'}
                    size={60} />
            </View>
        )
    }
}
