import { useEffect, useState } from "react";
import moment from "moment";
import { CityAQI, RequestStatus } from "../utils";

type RequestCity = {
    city: string,
    aqi: number
}

const useAQI = (): { status: RequestStatus; data: CityAQI } => {
    const [status, setStatus] = useState<RequestStatus>(RequestStatus.LOADING);
    const [data, setData] = useState<CityAQI>({});

    const addNewCities = (newCities: CityAQI) => (state: CityAQI) => ({ ...state, ...newCities });

    useEffect(() => {
        const socket = new WebSocket("ws://city-ws.herokuapp.com/");
        socket.onopen = function (e) {
            setStatus(RequestStatus.OPEN);
        }
        socket.onmessage = function (e) {
            try {
                const result: RequestCity[] = JSON.parse(e.data);
                const newData: CityAQI = {};
                for (const city of result) {
                    newData[city.city] = {
                        aqi: city.aqi,
                        time: moment().format()
                    }
                }

                setData(addNewCities(newData));
            } catch (err) {
                console.log(`JSON Parse Error for: ${e.data}`);
            }
        }
        socket.onclose = function (e) {
            setStatus(RequestStatus.CLOSE);
        }
        socket.onerror = function (e) {
            setStatus(RequestStatus.ERROR);
            console.log('Websocket Parse Error', e);
            socket.close();
        }

        return () => socket.close();
    }, []);

    const sortedAQIByCity = Object.keys(data).sort().reduce((carry: CityAQI, city) => {
        carry[city] = data[city];
        return carry;
    }, {});

    return { status, data: sortedAQIByCity };
}

export default useAQI;