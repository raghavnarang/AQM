export enum AQIColor {
    GOOD = "#55a84f",
    SATISFACTORY = "#a2c853",
    MODERATE = "#fff832",
    POOR = "#f29c32",
    VERYPOOR = "#e93e33",
    SEVERE = "#af2d24"
};

export enum RequestStatus {
    LOADING,
    ERROR,
    OPEN,
    CLOSE
};

export type CityAQI = {
    [city: string]: {
        aqi: number;
        time: string;
    }
}

export type CityLinePoint = {
    x: string;
    y: number;
};

export type MultipleCityLinePoints = {
    [city: string]: CityLinePoint[]
};

export type CityLineData = {
    id: string;
    color: string;
    data: CityLinePoint[]
};

export const getAQIColor = (aqi: number) => {
    return aqi <= 50 ? AQIColor.GOOD
        : aqi <= 100 ? AQIColor.SATISFACTORY
            : aqi <= 200 ? AQIColor.MODERATE
                : aqi <= 300 ? AQIColor.POOR
                    : aqi <= 400 ? AQIColor.VERYPOOR
                        : AQIColor.SEVERE;
}

export const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);