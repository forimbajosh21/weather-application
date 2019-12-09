function kelvinToCelsius(kelvin) {
    return parseInt(kelvin - 273.15);
}

function kelvinToFarenheight(kelvin) {
    return parseInt((kelvin - 273.15) * 1.8 + 32);
}

export { kelvinToCelsius, kelvinToFarenheight };
