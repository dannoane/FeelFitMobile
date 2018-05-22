import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import MotionMapper from './../../Util/MotionMapper';

class Activity extends Component {

    constructor(props) {
        super(props);
    }

    getIcon() {

        switch (this.props.activity) {
            case MotionMapper.WALKING:
                return 'walk';
            case MotionMapper.RUNNING:
                return 'run';
            case MotionMapper.BIKING:
                return 'bike';
            default:
                return 'human-handsdown';
        }
    }

    render() {

        const icon = this.getIcon();

        return (
            <View style={this.props.style}>
                <Icon 
                    name={icon} 
                    color='black'
                    type={'material-community'}
                    size={60} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    activity: state.Route.activity
});

export default connect(mapStateToProps, {})(Activity);
