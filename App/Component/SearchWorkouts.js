import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Switch, Picker } from 'react-native';
import { SearchBar, Button, FormInput, Text, Slider, Divider, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from '../Style/ViewStyle';
import RouteService from '../Service/RouteService';
import { getTime } from '../Util/MovementStatistics';

class SearchWorkouts extends Component {

    constructor(props) {

        super(props);

        this.routeService = new RouteService();
        this.state = {
            username: '',
            location: '',
            radius: 10,
            activity: 3,
            userLocation: false,
            loading: false,
            workouts: []
        };
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
        this.setState({workouts: []});

        let username = this.state.username;
        let radius = this.state.radius * 1000;
        let activity = this.state.activity;
        let location;

        if (this.userLocation) {
            location = await this.getLocation();
        }
        else {
            location = await this.getLocationByName(this.state.location);
        }

        let result = await this.routeService.search({username, location, radius, activity}, this.props.token);
        
        if (result.success) {
            this.setState({workouts: result.data});
        }

        this.setState({loading: false});
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
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })} />
                        {
                            this.state.userLocation ? (<View/>) : 
                            (<FormInput
                                containerStyle={{flex: 1}}
                                placeholder="Location..."
                                value={this.state.location}
                                onChangeText={(location) => this.setState({ location })} />)
                        }
                    </View>

                    <View style={searchItem}>
                        <Picker
                            selectedValue={this.state.activity}
                            style={{flex: 1}}
                            onValueChange={(activity) => this.setState({activity})}>
                            <Picker.Item label="Walking" value="1" />
                            <Picker.Item label="Running" value="2" />
                            <Picker.Item label="Biking" value="3" />
                        </Picker>
                        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', marginRight: 10}}>
                            <Slider
                                style={{flex: 1}}
                                minimumValue={0.5}
                                maximumValue={50}
                                step={0.5}
                                value={this.state.radius}
                                onValueChange={(radius) => this.setState({radius})} />
                            <Text>Radius: {this.state.radius} km</Text>
                        </View>
                    </View>

                    <View style={searchItem}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text>My Location</Text>
                            <Switch
                                value={this.state.userLocation}
                                onValueChange={() => this.setState({userLocation: !this.state.userLocation})} />
                        </View>
                        <Button
                            containerViewStyle={{flex: 1}}
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
                            this.state.workouts.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.name}
                                subtitle={`Distance: ${item.statistics.distance} km  Time: ${getTime(item.statistics.time)}`}
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
});

export default connect(mapStateToProps, {})(SearchWorkouts);