const request=require('postman-request');

const weathercode=(address,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=07d226986076368d273451ecc3c63ae2&query='+address+'';
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Weather services not available',undefined);
        }
        else if(response.body.error)
        {
            callback('Location not found, Try another search',undefined);
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0] +' .Currently it is '+response.body.current.temperature+' degrees out and  it feels like '+response.body.current.feelslike+' degrees');
        }
    })
}

module.exports=weathercode;