import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import * as scale from 'd3-scale'
import MotionMapper from '../Util/MotionMapper'
import { getTime } from '../Util/MovementStatistics';

class HBarChart extends React.PureComponent {

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

    getLabel(activity) {

        let name;

        switch (activity) {
        case MotionMapper.WALKING:
            name = 'Walking';
            break;
        case MotionMapper.RUNNING:
            name = 'Running';
            break;
        case MotionMapper.BIKING:
            name = 'Biking';
            break;
        default:
            name = 'Unknown';
            break;
        }

        return name;
    }

    getData() {

        return this.props.data
            .map((d) => ({
                value: d.value,
                label: this.getLabel(d.activity),
                svg: { fill: this.getColor(d.activity) }
            })
        );
    }

    render() {

        const data = this.getData();

        const CUT_OFF = 20
        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((d, index) => (
                <Text
                    key={ index }
                    x={ d.value > CUT_OFF ? x(0) + 10 : x(d.value) + 10 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ d.value > CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {getTime(d.value)}
                </Text>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', height: 170, paddingVertical: 16 }}>
                <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[ index ].label}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={data}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.5}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL}/>
                    <Labels/>
                </BarChart>
            </View>
        )
    }

}

export default HBarChart