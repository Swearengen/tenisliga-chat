export const getUrlValues = () => {
    let values: {[key: string]: string} = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        values[key] = value;
        return value
    });
    return values;
}

export const getUrlParam = (parameter: string, defaultvalue: string | undefined = undefined ) => {
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlValues()[parameter];
        }
    return urlparameter;
}