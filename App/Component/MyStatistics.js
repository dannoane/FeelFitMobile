import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Button, Text, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import ViewStyle from '../Style/ViewStyle';
import RouteService from '../Service/RouteService';
import Chart from './Chart';
import BarChart from './BarChart';

const styles = StyleSheet.create({
  head: {  height: 40,  backgroundColor: '#dcdfe5'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#dcdfe5' },
  row: {  height: 28  },
  text: { 
      textAlign: 'center',
      fontFamily: 'sans-serif-condensed',
      lineHeight: 20
  },
  titleText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed'
  },
  headerText: {
      color: 'black',
      fontSize: 25,
      fontWeight: '400',
      textDecorationLine: 'underline',
      fontFamily: 'sans-serif-condensed',
  },
  indicatorName: {
      color: 'black',
      fontSize: 17,
      fontWeight: '200',
      fontFamily: 'sans-serif-condensed',
  },
  dateText: {
      color: 'black',
      fontWeight: '300',
      fontFamily: 'sans-serif-condensed',
  }
});

class MyStatistics extends Component {

    constructor(props) {
        
        super(props);

        let endDate = moment();
        let startDate = endDate.subtract(7, 'days');

        this.routeService = new RouteService();
        this.state = {
            statistics: undefined,
            startDate: `${startDate.year()}-${startDate.month()}-${startDate.date()}`,
            endDate: `${endDate.year()}-${endDate.month()}-${endDate.date()}`,
            loading: false
        };
    }

    async getStatistics() {

        this.setState({loading: true});

        let requestBody = {
            startDate: moment(this.state.startDate).unix(),
            endDate: moment(this.state.endDate).unix()
        };

        let result = await this.routeService.getStatistics(requestBody, this.props.token);
        if (result.success) {
            this.setState({statistics: result.data});
            this.setState({hasStatistics: true});
        }

        this.setState({loading: false});
    }

    tableHead() {

        return ['', 'Min', 'Avg', 'Max'];
    }

    tableTitle() {

        return ['Walk', 'Run', 'Bike'];
    }

    tableData() {

        let stats = this.state.statistics;

        return [
            [stats.minWalkingDistance, stats.avgWalkingDistance, stats.maxWalkingDistance],
            [stats.minRunningDistance, stats.avgRunningDistance, stats.maxRunningDistance],
            [stats.minBikingDistance, stats.avgBikingDistance, stats.maxBikingDistance],
        ]
        .map(row => row.map(col => col.toFixed(2)));
    }

    getDistanceChartData() {

        let stats = this.state.statistics;

        return [
            {
                amount: stats.totalWalkingDistance,
                activity: 1
            },
            {
                amount: stats.totalRunningDistance,
                activity: 2
            },
            {
                amount: stats.totalBikingDistance,
                activity: 3
            }
        ];
    }

    getTimeChartData() {

        let stats = this.state.statistics;

        return [
            {
                value: stats.timeWalking,
                activity: 1
            },
            {
                value: stats.timeRunning,
                activity: 2
            },
            {
                value: stats.timeBiking,
                activity: 3
            }
        ];
    }

    render() {

        let stats = this.state.statistics;

        const screen = new ViewStyle()
            .flex(1)
            .build();
        const header = new ViewStyle()
            .flex(1)
            .build();
        const form = new ViewStyle()
            .flex(1)
            .flexDirection('row')
            .justifyContent('space-between')
            .alignItems('center')
            .custom({
                marginTop: 10,
                marginBottom: 10
            })
            .build();
        const statisticsView = new ViewStyle()
            .flex(8)
            .flexDirection('column')
            .build();
        const statisticsItem = new ViewStyle()
            .flex(1)
            .flexDirection('column')
            .build();
        const statisticsHeader = new ViewStyle()
            .flex(1)
            .custom({
                marginLeft: 5
            })
            .build();
        const statisticsItemComponent = new ViewStyle()
            .flex(5)
            .flexDirection('row')
            .justifyContent('space-between')
            .alignItems('center')
            .build();
        const statisticsItemSubcomponent = new ViewStyle()
            .flex(1)
            .custom({
                marginLeft: 5
            })
            .build();

        return (
            <View style={screen}>
                <Header
                    style={header}
                    leftComponent={{ icon: 'chart-arc', type: 'material-community', color: '#fff' }}
                    centerComponent={{ text: 'Statistics', style: { color: '#fff', fontSize: 22, fontWeight: '500' } }} 
                    backgroundColor='#000' />
                
                <View style={form}>
                    <DatePicker
                        date={this.state.startDate}
                        mode='date'
                        placeholder='Start date'
                        format="YYYY-MM-DD"
                        maxDate={this.state.endDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        },
                        dateText: styles.dateText
                        }}
                        onDateChange={(startDate) => {this.setState({startDate})}}
                    />

                    <DatePicker
                        date={this.state.endDate}
                        mode='date'
                        placeholder='End date'
                        format="YYYY-MM-DD"
                        minDate={this.state.startDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        },
                        dateText: styles.dateText
                        }}
                        onDateChange={(endDate) => {this.setState({endDate})}}
                    />

                    <Button
                        rounded
                        backgroundColor='black'
                        title='Show'
                        disabled={this.state.loading}
                        onPress={() => this.getStatistics() } />
                </View>

                <Divider style={{ height: 2, backgroundColor: 'black' }} />

                {
                    !this.state.hasStatistics ? 
                    (<View style={statisticsView}></View>) :
                    (<View style={statisticsView}>
                        <View style={statisticsItem}>
                            <View style={statisticsHeader}>
                                <Text style={styles.headerText}>Distance:</Text>
                            </View>

                            <View style={statisticsItemComponent}>
                                <View style={statisticsItemSubcomponent}>
                                    <Table>
                                        <Row data={this.tableHead()} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.titleText}/>
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={this.tableTitle()} style={styles.title} heightArr={[28,28]} textStyle={styles.titleText}/>
                                            <Rows data={this.tableData()} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                                        </TableWrapper>
                                    </Table>
                                </View>
                                <View style={statisticsItemSubcomponent}>
                                    <Chart data={this.getDistanceChartData()} />
                                </View>
                            </View>
                        </View>
                        
                        <Divider style={{ height: 2, backgroundColor: 'black' }} />

                        <View style={statisticsItem}>
                            <View style={statisticsHeader}>
                                <Text style={styles.headerText}>Time:</Text>
                            </View>

                            <View style={statisticsItemComponent}>
                                <View style={statisticsItemSubcomponent}>
                                    <BarChart data={this.getTimeChartData()} />
                                </View>
                            </View>
                        </View>

                        <Divider style={{ height: 2, backgroundColor: 'black' }} />

                        <View style={statisticsItem}>
                            <View style={statisticsHeader}>
                                <Text style={styles.headerText}>Other stats:</Text>
                            </View>

                            <View style={statisticsItemComponent}>
                                <View style={statisticsItemSubcomponent}>
                                    <Text style={styles.indicatorName}>Minimum speed: {stats.minSpeed.toFixed(1)} km/h</Text>
                                    <Text style={styles.indicatorName}>Average speed: {stats.avgSpeed.toFixed(1)} km/h</Text>
                                    <Text style={styles.indicatorName}>Maximum speed: {stats.maxSpeed.toFixed(1)} km/h</Text>
                                    <Text style={styles.indicatorName}>Minimum altitude: {stats.minAltitude} m</Text>
                                    <Text style={styles.indicatorName}>Maximum altitude: {stats.maxAltitude} m</Text>
                                </View>
                                <View style={statisticsItemSubcomponent}>

                                </View>
                            </View>
                        </View>
                    </View>)
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.UserState.get('accessToken')
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyStatistics);
