export const getConfig = (...input) => {
    const config = {}
    config['_action'] = input[0]
    config['_method'] = input[1]
    config['_url'] = input[2]
    config['_data'] = input[3]
    config['_params'] = input[4]
    config['_headers'] = input[5]
    return config
} 