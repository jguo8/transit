import express from 'express'
import fetch from 'node-fetch'
import 'dotenv/config'

// const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.send('This has CORS enabled 🎈')
})

app.get('/getBusTime', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    const apiKey = process.env.API_KEY
    // const trainApiKey = process.env.TRAIN_API_KEY
    // const homeRt = '8'
    // const homeStpid = '18009'    
    
    const homeRt = '22' //night
    const homeStpid = '1830' //night clark wellington


    // http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=5d079faf650c47d19df4a49b9780b35f&rt=red&outputType=JSON

    const apiUrl = 'http://www.ctabustracker.com/bustime/api/v2/getpredictions?key=' +
        apiKey + "&rt=" + homeRt + "&stpid=" + homeStpid + '&format=json'

    // const apiUrl = 'https://api.npms.io/v2/search?q=react'

    // let jsonT = 'called here'

    // const response = fetch(apiUrl)
    //   .then(response => response.json())
    //   .then(data => jsonT = data)

    const fetch_reponse = await fetch(apiUrl)
    const json_response = await fetch_reponse.json()

    // const jsonObj = JSON.parse(json)

    const mock_response = {
        "bustime-response": {
            "prd": [
                {
                    "tmstmp": "20220106 19:16",
                    "typ": "A",
                    "stpnm": "Madison & Jefferson",
                    "stpid": "456",
                    "vid": "1111",
                    "dstp": 7095,
                    "rt": "20",
                    "rtdd": "20",
                    "rtdir": "Westbound",
                    "des": "Austin",
                    "prdtm": "20220106 01:10",
                    "tablockid": "20 -813",
                    "tatripid": "1040747",
                    "dly": false,
                    "prdctdn": "3",
                    "zone": ""
                },
                {
                    "tmstmp": "20220106 19:16",
                    "typ": "A",
                    "stpnm": "Madison & Jefferson",
                    "stpid": "456",
                    "vid": "2222",
                    "dstp": 7095,
                    "rt": "20",
                    "rtdd": "8",
                    "rtdir": "Northbound",
                    "des": "Austin",
                    "prdtm": "20220106 02:37",
                    "tablockid": "20 -813",
                    "tatripid": "1040747",
                    "dly": false,
                    "prdctdn": "7",
                    "zone": ""
                },
                {
                    "tmstmp": "20220106 19:16",
                    "typ": "A",
                    "stpnm": "Madison & Jefferson",
                    "stpid": "456",
                    "vid": "3333",
                    "dstp": 7095,
                    "rt": "20",
                    "rtdd": "20",
                    "rtdir": "Eastbound",
                    "des": "Twenty east last stop",
                    "prdtm": "20220106 3:41",
                    "tablockid": "20 -813",
                    "tatripid": "1040747",
                    "dly": false,
                    "prdctdn": "15",
                    "zone": ""
                },

            ]
        }
    }

    const response = parseJson(json_response['bustime-response'].prd)

    // console.log(json)
    // res.send(json)    

    console.log(response)
    res.send(response)

    // res.send({
    //     time: 'adfasd',
    //     money: '178326'
    // })
    //   res.send(response)

    // res.send('This has CORS enabled 🎈')

    function parseJson(json) {
        let result = []
        if(!!json) {
            json.map(data => result.push({
                busId: data.vid,
                route: data.rt,
                direction: data.rtdir.substring(0, data.rtdir.indexOf('bound')),
                destination: data.des,
                currentTime: data.tmstmp,
                arrivalTime: data.prdtm,
                eta: data.prdctdn,
            }))
        }

        console.log(result)
        
        return result
    }
})

app.listen(8080, () => {
    console.log('listening on port 8080')
    console.log('|')
    console.log('|')
    console.log('|')
    console.log('=')
})