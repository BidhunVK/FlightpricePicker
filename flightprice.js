
const readline = require("readline-sync");
var flightNameArr = []
const flightNumberArr = []
const flightpriceArr = []
const fs = require('fs');



async function fetchFlightDetailsPaytm() {
    // const startDate = '2023-05-03';
    // const endDate = '2024-04-28';
    const startDate = readline.question('Enter start date (YYYYMMDD):');
    // const endDate = readline.question('Enter end date (YYYY-MM-DD):');

    // const url=`https://travel.paytm.com/api/a/flights/v1/get_fares?adults=1&children=0&infants=0&class=E&client=web&destination=DEL&end_date=${startDate}&source=IXC&start_date=${startDate}`
    // const url=`https://travel.paytm.com/api/flights/v2/search?accept=combination&enable={%22handBaggageFare%22:true,%22paxWiseConvFee%22:true,%22minirules%22:true}&adults=1&children=0&class=E&client=web&departureDate=${startDate}&origin=IXC&infants=0&destination=DEL`;
    const url = `https://travel.paytm.com/api/flights/v2/search?accept=combination&enable={%22handBaggageFare%22:true,%22paxWiseConvFee%22:true,%22minirules%22:true}&adults=1&children=0&class=E&client=web&departureDate=${startDate}&origin=IXC&infants=0&destination=DEL`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();


        // console.log(data.body.fares[startDate].airline);

        // console.log(data.body.onwardflights.flights[0].airline);
        // console.log(data.body.onwardflights.flights[0].hops[0].flightNumber);
        // console.log(data.body.onwardflights.flights[0].price[0].price);

        // for (const date in data.body.fares) {
        //     console.log(`${date}: ${data.body.fares[date].airline} - ${data.body.fares[date].fare}`);
        // }

        const flights = data.body.onwardflights.flights;
        for (let i = 0; i < flights.length; i++) {
            const flight = flights[i];
            const airlineName = flight.airline;
            flightNameArr.push(airlineName)
            const flightNumber = flight.hops[0].flightNumber;
            flightNumberArr.push(flightNumber)
            const price = flight.price[0].price;
            flightpriceArr.push(price)
            

            console.log(`Flight ${i+1}: ${airlineName} - Flight Number: ${flightNumber} - Price: ${price}`);
        }
        
        const csv = "Sl No,Flight Name,Flight Number,Paytm Price\n" + flightNameArr.map((name, index) => [index+1,name, flightNumberArr[index], flightpriceArr[index]].join(',')).join('\n');
        

        fs.writeFileSync('flights.csv', csv);
        




    } catch (error) {
        console.log(error)
    }
}



fetchFlightDetailsPaytm()

// async function fetchFlightDetailsBookingDotCom(){
//     const startDate = readline.question('Enter start date (YYYY-MM-DD):');
//     const url=``
// }



