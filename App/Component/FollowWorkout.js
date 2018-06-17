import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setFollowWorkout } from '../Action';
import ViewStyle from '../Style/ViewStyle';
import WorkoutDetail from './WorkoutDetail';
import {
    getTime,
    formatAvgPace
} from '../Util/MovementStatistics';

class FollowWorkout extends Component {

    constructor(props) {

        super(props);

        this.state = {};
    }

    goBack() {

        this.props.navigation.navigate('SearchWorkouts');
    }

    followWorkout() {

        this.props.onFollowWorkout(this.props.workout.route);
        this.props.navigation.navigate('Workout');
    }

    render() {

        const workout = this.props.workout;

        const screen = new ViewStyle()
            .flex(1)
            .flexDirection('column')
            .alignItems('stretch')
            .custom({backgroundColor: '#fff'})
            .build();
        const header = new ViewStyle()
            .flex(1)
            .build();
        const workoutScreen = new ViewStyle()
            .flex(5)
            .flexDirection('column')
            .alignItems('stretch')
            .build();
        const buttons = new ViewStyle()
            .flex(1)
            .flexDirection('row')
            .justifyContent('space-between')
            .alignItems('center')
            .build();

        return (
            <View style={screen}>
                <Header
                    style={header}
                    leftComponent={{ icon: 'address', type: 'entypo', color: '#fff' }}
                    centerComponent={{ text: 'Follow Workout', style: { color: '#fff', fontSize: 22, fontWeight: '500' } }} 
                    backgroundColor='#000' />

                <WorkoutDetail 
                    workoutStyle={workoutScreen}
                    name={workout.name}
                    time={getTime(workout.statistics.time)}
                    distance={workout.statistics.distance}
                    maxSpeed={workout.statistics.maxSpeed}
                    avgSpeed={workout.statistics.avgSpeed}
                    minSpeed={workout.statistics.minSpeed}
                    maxAltitude={workout.statistics.maxAltitude}
                    minAltitude={workout.statistics.minAltitude}
                    avgPace={formatAvgPace(workout.statistics.avgPace)}
                    temperature={workout.statistics.temperature}
                    route={workout.route} />

                <View style={buttons}>
                    <Button
                        backgroundColor='black'
                        title='Back'
                        onPress={() => this.goBack()} />
                    <Button
                        backgroundColor = 'black'
                        title='Follow'
                        onPress={() => this.followWorkout()} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    onFollowWorkout: setFollowWorkout,
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowWorkout);
