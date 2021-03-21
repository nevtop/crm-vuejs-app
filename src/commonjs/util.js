export const getConfig = function (...input) {
    const config = {}
    config['_action'] = input[0]
    config['_method'] = input[1]
    config['_url'] = input[2]
    config['_data'] = input[3]
    config['_params'] = input[4]
    config['_headers'] = input[5]
    return config
}

export const mapper = function (source, target) {
    const temp = {}
    for (let key in target) {
        temp[key] = source[key]
    }
    return temp
}

export const getTimeValue = function (epochTime) {
    if (epochTime == null) {
        return '00:00'
    }
    const dt = new Date(epochTime)
    const hr = (dt.getHours() < 10 ? '0' : '') + dt.getHours();
    const min = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    return hr + ':' + min
}

export const calculateScheduleDate = function (scheduleDate, timeValue) {
    if (scheduleDate == null || timeValue == null) {
        return 0;
    }

    const dt = new Date(scheduleDate)
    dt.setHours(0)
    dt.setMinutes(0)
    dt.setSeconds(0)
    dt.setMilliseconds(0)

    const arr = timeValue.split(':');
    const millis = (parseInt(arr[0])*60 + parseInt(arr[1]))*60*1000
    return dt.getTime() + millis;
}

export const convertToStandardString = function (val) {
    const words = val.split('_');
    const result = []
    for (let word of words) {
        result.push(word[0] + word.substring(1).toLowerCase())
    }
    return result.join(' ')
}