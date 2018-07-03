import React, { Component } from 'react';
import { Dimensions, View, Switch, ScrollView } from 'react-native';
import { Header, Text, List, ListItem, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import ViewStyle from '../Style/ViewStyle';
import MapStyle from '../Style/MapStyle';
import { detailTitleStyle, detailValueStyle } from '../Style/FontStyle';
import MotionMapper from '../Util/MotionMapper';
import { setWorkoutName } from '../Action';

let mapPolylineId = 0;

class WorkoutDetail extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            name: 'New Workout'
        };
    }

    buildList() {

        return [{
                icon: {
                    name: 'road-variant',
                    type: 'material-community'
                },
                title: 'Distance',
                value: this.props.distance
            },
            {
                icon: {
                    name: 'timer',
                    type: 'material-community'
                },
                title: 'Time',
                value: this.props.time
            },
            {
                icon: {
                    name: 'speedometer',
                    type: 'material-community'
                },
                title: 'Maximum Speed',
                value: this.props.maxSpeed
            },
            {
                icon: {
                    name: 'speedometer',
                    type: 'material-community'
                },
                title: 'Average Speed',
                value: this.props.avgSpeed
            },
            {
                icon: {
                    name: 'speedometer',
                    type: 'material-community'
                },
                title: 'Minimum Speed',
                value: this.props.minSpeed
            },
            {
                icon: {
                    name: 'mountains',
                    type: 'foundation'
                },
                title: 'Maximum Altitude',
                value: this.props.maxAltitude
            },
            {
                icon: {
                    name: 'mountains',
                    type: 'foundation'
                },
                title: 'Minimum Altitude',
                value: this.props.minAltitude
            },
            {
                icon: {
                    name: 'timer-sand',
                    type: 'material-community'
                },
                title: 'Average Pace',
                value: this.props.avgPace
            },
            {
                icon: {
                    name: 'thermometer-lines',
                    type: 'material-community'
                },
                title: 'Temperature',
                value: this.props.temperature + '°'
            }
        ];
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

    mapSegmentsToPolylines(segment) {

        if (!segment) {
            return;
        }

        let color = this.getColor(segment.activity);
        mapPolylineId += 1;

        return (<MapView.Polyline
            key={mapPolylineId}
            strokeWidth={3}
            strokeColor={color}
            lineCap={'butt'}
            lineJoin={'round'}
            coordinates={segment.polyline.map(e => ({latitude: e.point[0], longitude: e.point[1]}))}
            geodesic={true} />
        );
    }

    getCoordinates() {

        let coords = [];
        this.props.route
            .forEach(seg => {
                if (seg && seg.polyline) {
                    seg.polyline.forEach(p => coords.push({
                        latitude: p.point[0],
                        longitude: p.point[1]
                    }));
                }
            });

        return coords;
    }

    render() {

        const list = this.buildList();

        const workoutMap = new ViewStyle()
            .flex(2)
            .custom({
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10
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
            <View style={this.props.workoutStyle}>
                <MapView 
                    style={workoutMap}
                    customMapStyle={MapStyle}
                    cacheEnabled={true}
                    ref={(ref) => this.mapRef = ref}
                    onLayout={() => {
                        let coordinates = this.getCoordinates();
                        if (coordinates && coordinates.length > 0) {
                            this.mapRef.fitToCoordinates(coordinates, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true });
                        }
                    }}>

                    {
                        this.props.route
                            .map(seg => this.mapSegmentsToPolylines(seg))
                    }
                </MapView>

                <View style={details}>
                    <Text h4 style={{color: '#000', textAlign: 'center'}}>Details</Text>

                    <ScrollView>
                        <List
                            containerStyle={detailsList}>
                            {
                                this.props.name === undefined ? 
                                (<ListItem
                                    hideChevron={true}
                                    key={-1}
                                    title='Name'
                                    titleStyle={detailTitleStyle}
                                    leftIcon={{name: 'rename-box', type: 'material-community', color: '#000'}}
                                    textInputStyle={Object.assign({}, detailValueStyle, {paddingTop: 0, paddingBottom: 0, marginVertical: 3.5})}
                                    textInput={true}
                                    textInputValue={this.state.name}
                                    textInputOnChangeText={(name) => { this.setState({name}); this.props.onWorkoutName(name); } } />) :
                                (<ListItem
                                    hideChevron={true}
                                    key={-1}
                                    title='Name'
                                    titleStyle={detailTitleStyle}
                                    rightTitle={this.props.name}
                                    rightTitleStyle={detailValueStyle}
                                    leftIcon={{name: 'rename-box', type: 'material-community', color: '#000'}} />)
                            }

                            {
                                list.map((item, i) => (
                                    <ListItem
                                        hideChevron={true}
                                        key={i}
                                        title={item.title}
                                        titleStyle={detailTitleStyle}
                                        rightTitle={item.value + ''}
                                        rightTitleStyle={detailValueStyle}
                                        leftIcon={{name: item.icon.name, type: item.icon.type, color: '#000'}} />
                                    )
                                )
                            }
                        </List>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    onWorkoutName: setWorkoutName,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDetail);
