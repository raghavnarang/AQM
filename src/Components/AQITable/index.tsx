import moment from "moment";
import { useContext } from "react";
import { AQIContext } from "../../App";
import { getAQIColor, RequestStatus } from "../../utils";
import style from './table.module.css';

const AQITable: React.FC = () => {
    const { status, data, selectedCities: cities, selectCities } = useContext(AQIContext);

    if (status === RequestStatus.LOADING) {
        return <p>Loading...</p>;
    }

    const setCity = (city: string, checked: boolean) => {
        if (checked) {
            selectCities(cities.includes(city) ? cities : [...cities, city]);
        } else {
            selectCities(cities.filter(c => c !== city));
        }
    };

    return <table className={style.table}>
        <thead>
            <tr>
                <th>Select</th>
                <th>City</th>
                <th>Current AQI</th>
                <th>Last Updated</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(data).map(city => {
                const time = moment(data[city].time);
                const minuteAgo = moment().subtract(5, 'minute');
                const color = getAQIColor(data[city].aqi);

                return <tr key={city}>
                    <td>
                        <input
                            type="checkbox"
                            checked={cities.includes(city)}
                            onChange={e => setCity(city, e.target.checked)}
                        />
                    </td>
                    <td>{city}</td>
                    <td style={{ backgroundColor: color, fontWeight: 'bold' }}>{data[city].aqi.toFixed(2)}</td>
                    <td>{time.isAfter(minuteAgo) ? time.fromNow() : time.format('HH:mm a')}</td>
                </tr>
            })}
        </tbody>
    </table>;
}

export default AQITable;