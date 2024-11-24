const Discord = require('discord.js')
const client = new Discord.Client()
const https = require('https')
const config = require('./config.json')

client.on('ready', function() {
    console.log("ready to go")
})


client.on('message', msg => {
    if(msg.author.bot) return;
    let slt = /^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/
    let ctt = msg.content
    //const re = new RegExp('^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)')
    var options = {
        hostname: "api.musicallydown.live",
        port: 443,
        path: "/get-data",
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    }

  
    // console.log(ctt.match(slt)[0]);

    // fetch version

    // fetch('https://api.musicallydown.live/get-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify({
    //             'url': ctt.match(slt)[0]
    //         }),  
    //     }).then((response) => {
    //         if (response.ok) {
    //             return response.json()
    //         }
    //     }).then((JSONres) =>{
    //         console.log(JSONres['no_watermark_url']);
            
    //         client.users.cache.get(msg.author.id).send({
    //             files: [{
    //                 attachment: JSONres['no_watermark_url'],
    //                 name: Date.now().toString() + ".mp4"
    //             }]
    //         })
            
    //     }).catch((error) => {
    //         console.error("Fetch error: ", error.message);
    //     })
     

    
    var req = https.request(options, (res) => {
        let data = "";
        res.on('data', function(body) {
            data+=body.toString()
        })
        res.on('end', () => {            
            client.users.cache.get(msg.author.id).send({
                files: [{
                    attachment: JSON.parse(data)['no_watermark_url'],
                    name: Date.now().toString() + ".mp4"
                }]
            })          
        }).on('error', (e) => {
                console.error(e);
        })
    })

    req.write(JSON.stringify({
        'url':   ctt.match(slt)[0]
    }))
    req.end()


})

client.login(config.BOT_TOKEN)
