const request=require('postman-request');
const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hlbGRvcjc3IiwiYSI6ImNrbWdkMnU0cTMxZWoycHM5Z3lzMG95YnkifQ.keQL9ZssBSLTa9vG0-kqyQ&limit=1';
     request({url:url,json:true},(error,response)=>{
         if(error)
         {
             callback('Services unavailable',undefined)
         }
         else if(response.body.features.length===0)
         {
             callback('Location not found, Try another search',undefined)
         }
         else{
            callback(undefined,{
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                locus:response.body.features[0].place_name
            })
         }
     })

}

module.exports=geocode;