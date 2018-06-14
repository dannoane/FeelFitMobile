import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import MotionMapper from '../Util/MotionMapper'

class Chart extends React.PureComponent {

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

    getName(activity) {

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
            .filter(d => d.amount > 0)
            .map((d, i) => ({
                key: i,
                amount: d.amount,
                name: this.getName(d.activity),
                svg: { fill: this.getColor(d.activity) }
            })
        );
    }

    render() {

        const data = this.getData();

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={15}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.name}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'70%'}
                innerRadius={10}
            >
                <Labels/>
            </PieChart>
        )
    }

}

export default Chart