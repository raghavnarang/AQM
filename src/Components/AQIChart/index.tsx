import { ResponsiveBar } from "@nivo/bar";
import { useContext } from "react";
import { AQIContext } from "../../App";
import { getAQIColor, RequestStatus } from "../../utils";
import style from './chart.module.css';

const AQIChart: React.FC = () => {
    const { status, data } = useContext(AQIContext);

    if (status === RequestStatus.LOADING) {
        return <p>Loading...</p>;
    }

    const chartKeys = Object.keys(data);
    const chartData = chartKeys.map(city => ({
        city,
        AQI: data[city].aqi.toFixed(2),
    }));

    const getColor = (city: any) => getAQIColor(city.data.AQI);

    return <div className={style.chart}>
        <ResponsiveBar
            data={chartData}
            keys={['AQI']}
            indexBy='city'
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={getColor}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "City",
                legendPosition: "middle",
                legendOffset: 40,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "AQI",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            axisRight={null}
            axisTop={null}
            layers={["grid", "axes", "bars", "markers", "legends"]}
        /></div>;
}

export default AQIChart;