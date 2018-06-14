import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import ViewStyle from '../Style/ViewStyle';
import MapStyle from '../Style/MapStyle';
import MotionMapper from '../Util/MotionMapper';
import RouteService from '../Service/RouteService';

class Track extends Component {

    constructor(props) {
        
        super(props);

        this.markerId = 0;
        this.routeService = new RouteService();
        this.state = {
            users: []
        };
    }

    componentDidMount() {

        this.locationUpdateInterval = setInterval(() => {

            navigator.geolocation.getCurrentPosition(async (location) => {

                let { latitude, longitude } = location.coords;
                let result = await this.routeService.getUsersLocation({ latitude, longitude }, this.props.token);
                this.setState({
                    users: result.data || []
                });
            });
        }, 5000);
    }

    componenetWillUnmount() {

        clearInterval(this.locationUpdateInterval);
    }

    getColor(activity) {

        let color;

        switch (activity) {
        case MotionMapper.WALKING:
            color = '#ed445e';
            break;
        case MotionMapper.RUNNING:
            color = '#5562d6';
            break;
        case MotionMapper.BIKING:
            color = '#5eed7b';
            break;
        default:
            color = '#000000';
            break;
        }

        return color;
    }

    render() {

        const screen = new ViewStyle()
            .flex(1)
            .build();
        const header = new ViewStyle()
            .flex(1)
            .build();
        const map = new ViewStyle()
            .flex(9)
            .custom({
                marginLeft: 1
            })
            .build();
        const details = new ViewStyle()
            .flex(3)
            .flexDirection('column')
            .justifyContent('flex-start')
            .build();
        const detailsList = new ViewStyle()
            .custom({
                marginLeft: 10,
                marginRight: 10
            })
            .build();

        return (
            <View style={screen}>
                <Header
                    style={header}
                    leftComponent={{ icon: 'my-location', type: 'material', color: '#fff' }}
                    centerComponent={{ text: 'Track workouts', style: { color: '#fff', fontSize: 22, fontWeight: '500' } }} 
                    backgroundColor='#000' />
                <MapView 
                    style={map}
                    customMapStyle={MapStyle}
                    cacheEnabled={true}>
                    {
                        this.state.users
                            .map(u => (
                                <MapView.Marker
                                    key={this.markerId++}
                                    title={u.username}
                                    coordinate={{latitude: u.location[0], longitude: u.location[1]}}
                                    pinColor={this.getColor(u.activity)}
                                />
                            ))
                    }
                </MapView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.UserState.get('accessToken')
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
