import React, { Component } from 'react';
import { View, Switch } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { resetWorkout } from '../Action';
import ViewStyle from '../Style/ViewStyle';
import WorkoutDetail from './WorkoutDetail';
import {
    getTime,
    getDistance,
    getMaxAltitude,
    getMinAltitude,
    getMaxSpeed,
    getAvgSpeed,
    getMinSpeed,
    getAvgPace,
    partitionRouteByActivity,
    getAvgPaceInSeconds
} from '../Util/MovementStatistics';
import RouteService from '../Service/RouteService';

class SaveWorkout extends Component {

    constructor(props) {

        super(props);

        this.routeService = new RouteService();
        this.state = {
            public: true
        };
    }

    discardWorkout() {
        
        this.props.onWorkoutReset();
        this.props.navigation.navigate('Workout');
    }

    async saveWorkout() {

        let workout = Object.assign({}, {
            username: '',
            route: partitionRouteByActivity(this.props.route),
            statistics: {
                time: this.props.time,
                startTime: Number.parseInt(Date.now() / 1000),
                endTime: Number.parseInt(Date.now() / 1000),
                distance: Number.parseFloat(getDistance(this.props.route)),
                maxSpeed: Number.parseFloat(getMaxSpeed(this.props.movementData)),
                avgSpeed: Number.parseFloat(getAvgSpeed(this.props.movementData)),
                minSpeed: Number.parseFloat(getMinSpeed(this.props.movementData)),
                maxAltitude: Number.parseFloat(getMaxAltitude(this.props.movementData)),
                minAltitude: Number.parseFloat(getMinAltitude(this.props.movementData)),
                avgPace: getAvgPaceInSeconds(this.props.time, this.props.route),
                temperature: this.props.weather.temperature
            },
            isPublic: this.state.public
        });

        let result = await this.routeService.saveWorkout(workout, this.props.token);
        
        if (result.success) {
            this.props.onWorkoutReset();
            this.props.navigation.navigate('Workout')
        }
        else {
            this.setState({ error: result.message });
        }
    }

    render() {

        const screen = new ViewStyle()
            .flex(1)
            .flexDirection('column')
            .alignItems('stretch')
            .custom({backgroundColor: '#fff'})
            .build();
        const header = new ViewStyle()
            .flex(1)
            .build();
        const workout = new ViewStyle()
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
                    leftComponent={{ icon: 'save', color: '#fff' }}
                    centerComponent={{ text: 'Save Workout', style: { color: '#fff', fontSize: 22, fontWeight: '500' } }} 
                    backgroundColor='#000' />

                <WorkoutDetail 
                    workoutStyle={workout}
                    time={getTime(this.props.time)}
                    distance={getDistance(this.props.route)}
                    maxSpeed={getMaxSpeed(this.props.movementData)}
                    avgSpeed={getAvgSpeed(this.props.movementData)}
                    minSpeed={getMinSpeed(this.props.movementData)}
                    maxAltitude={getMaxAltitude(this.props.movementData)}
                    minAltitude={getMinAltitude(this.props.movementData)}
                    avgPace={getAvgPace(this.props.time, this.props.route)}
                    temperature={this.props.weather.temperature}
                    route={partitionRouteByActivity(this.props.route)} />

                <View style={buttons}>
                    <Icon
                        name='delete'
                        color='black'
                        type='material-community'
                        raised
                        size={25}
                        onPress={() => this.discardWorkout()} />
                    <Icon
                        name='content-save'
                        color='black'
                        type = 'material-community'   
                        raised         
                        size={30}
                        onPress={() => this.saveWorkout()} />
                    <View>
                        <Text>Public</Text>
                        <Switch
                            value={this.state.public}
                            onValueChange={() => this.setState({public: !this.state.public})} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.UserState.get('accessToken'),
    time: state.Route.get('time'),
    route: state.Route.get('route'),
    movementData: state.Route.get('movementData'),
    weather: state.Route.get('weather')
});

const mapDispatchToProps = {
    onWorkoutReset: resetWorkout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveWorkout);