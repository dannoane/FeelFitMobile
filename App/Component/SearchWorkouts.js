import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Switch, Picker } from 'react-native';
import { SearchBar, Button, FormInput, Text, Slider, Divider, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from '../Style/ViewStyle';
import RouteService from '../Service/RouteService';
import { getTime } from '../Util/MovementStatistics';
import { 
    setSearchUsername, 
    setSearchLocation,
    setRadius,
    setSearchActivity,
    setUserLocation,
    setFoundWorkouts
} from '../Action';

class SearchWorkouts extends Component {

    constructor(props) {

        super(props);

        this.routeService = new RouteService();
        this.state = { loading: false };
    }

    async getLocation() {

        const result = new Promise(resolve => {
            navigator.geolocation.getCurrentPosition((data) => {
                const { latitude, longitude } = data.coords;
                resolve({ latitude, longitude });
            },
            (err) => {
                console.log(err.message);
            },
            { enableHighAccuracy: true });
        });

        return await result;
    }

    async getLocationByName(name) {

        let result = await await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyDgaPH4T9fBygnUvJmGTH1GbzSI9GKa2ng`);
        result = await result.json();

        if (result.results.length == 0) {
            return {
                latitude: 47.06667,
                longitude: 21.93333
            };
        }
        else {
            let location = result.results[0].geometry.location;
            
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        }
    }

    async search() {

        this.setState({loading: true});
        this.props.onWorkouts([]);

        let username = this.props.username;
        let radius = this.props.radius * 1000;
        let activity = this.props.activity;
        let location;

        if (this.props.userLocation) {
            location = await this.getLocation();
        }
        else {
            location = await this.getLocationByName(this.props.location);
        }

        let result = await this.routeService.search({username, location, radius, activity}, this.props.token);
        
        if (result.success) {
            this.props.onWorkouts(result.data);
        }

        this.setState({loading: false});
    }

    mapCodeToActivity(activity) {

        switch (activity) {
            case 1:
                return 'Walking';
            case 2:
                return 'Running';
            case 3:
                return 'Biking';
            default:
                return 'Unknown';
        }
    } 

    getActivities(workout) {

        let activities = [];

        for (let seg of workout.route) {
            if (!activities.includes(seg.activity)) {
                activities.push(seg.activity);
            }
        }

        return activities
            .map(a => this.mapCodeToActivity(a))
            .join(', ');
    }

    showWorkout(workout) {

        this.props
            .navigation
            .navigate('FollowWorkout', { workout });
    }

    render() {

        const screen = new ViewStyle()
            .flex(1)
            .flexDirection('column')
            .custom({backgroundColor: '#fff'})
            .build();
        const searchArea = new ViewStyle()
            .flex(1)
            .flexDirection('column')
            .build()
        const searchItem = new ViewStyle()
            .flex(1)
            .flexDirection('row')
            .alignItems('center')
            .justifyContent('space-between')
            .build();
        const searchedItems = new ViewStyle()
            .flex(3)
            .flexDirection('column')
            .build();

        return (
            <KeyboardAvoidingView enabled={false} style={screen}>
                <View style={searchArea}>
                    <View style={searchItem}>
                        <FormInput
                            containerStyle={{flex: 1}}
                            placeholder="Username..."
                            value={this.props.username}
                            onChangeText={(username) => this.props.onUsername(username)} />
                        {
                            this.props.userLocation ? (<View/>) : 
                            (<FormInput
                                containerStyle={{flex: 1}}
                                placeholder="Location..."
                                value={this.props.location}
                                onChangeText={(location) => this.props.onLocation(location)} />)
                        }
                    </View>

                    <View style={searchItem}>
                        <Picker
                            mode='dropdown'
                            selectedValue={this.props.activity}
                            style={{flex: 1, marginLeft: 11}}
                            itemStyle={{fontWeight: '400'}}
                            onValueChange={(activity) => this.props.onActivity(activity)}>
                            <Picker.Item label="Walking" value="1" />
                            <Picker.Item label="Running" value="2" />
                            <Picker.Item label="Biking" value="3" />
                        </Picker>
                        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', marginRight: 10}}>
                            <Slider
                                style={{flex: 1, marginLeft: 19, marginRight: 4}}
                                minimumValue={0.5}
                                maximumValue={50}
                                step={0.5}
                                value={this.props.radius}
                                onValueChange={(radius) => this.props.onRadius(radius)} />
                            <Text style={{
                                marginLeft: 19,
                                fontWeight: '400'}}>
                                Radius: {this.props.radius} km
                            </Text>
                        </View>
                    </View>

                    <View style={searchItem}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{fontWeight: '400'}}>
                                My Location
                            </Text>
                            <Switch
                                value={this.props.userLocation}
                                onValueChange={() => this.props.onUserLocation()} />
                        </View>
                        <Button
                            containerViewStyle={{flex: 1}}
                            icon={{name: 'search', type: 'material'}}
                            rounded
                            backgroundColor='black'
                            disabled={this.state.loading}
                            title='Search'
                            onPress={() => this.search()} />
                    </View>

                    <Divider style={{ height: 3, backgroundColor: 'black' }} />
                </View>

                <View style={searchedItems}>
                    <List>
                        {
                            this.props.workouts.map((item, i) => (
                            <ListItem
                                key={i}
                                title={`${item.name}`}
                                titleStyle={{fontWeight: '600', fontSize: 23}}
                                rightTitle={`${item.statistics.distance} km`}
                                rightTitleStyle={{fontWeight: '600', fontSize: 20}}
                                subtitle={`Time: ${getTime(item.statistics.time)}\n${this.getActivities(item)}\nUser: ${item.username}`}
                                subtitleNumberOfLines={3}
                                onPress={() => this.showWorkout(item) }
                            />
                            ))
                        }
                    </List>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.UserState.get('accessToken'),
    username: state.Global.get('username'),
    location: state.Global.get('location'),
    radius: state.Global.get('radius'),
    activity: state.Global.get('activity'),
    userLocation: state.Global.get('userLocation'),
    workouts: state.Global.get('foundWorkouts')
});

const mapDispatchToProps = {
    onUsername: setSearchUsername,
    onLocation: setSearchLocation,
    onRadius: setRadius,
    onActivity: setSearchActivity,
    onUserLocation: setUserLocation,
    onWorkouts: setFoundWorkouts
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWorkouts);