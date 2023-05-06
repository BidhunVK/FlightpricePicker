 console.log(data.body.fares[startDate].airline);

                console.log(data.body.onwardflights.flights[0].airline);
                console.log(data.body.onwardflights.flights[0].hops[0].flightNumber);
                console.log(data.body.onwardflights.flights[0].price[0].price);
                
                for (const date in data.body.fares) {
                    console.log(`${date}: ${data.body.fares[date].airline} - ${data.body.fares[date].fare}`);
                }

                const flights = data.body.onwardflights.flights;
                for (let i = 0; i < flights.length; i++) {
                const flight = flights[i];
                const airlineName = flight.airline;
                const flightNumber = flight.hops[0].flightNumber;
                const price = flight.price[0].price;

                console.log(`Flight ${i+1}: ${airlineName} - Flight Number: ${flightNumber} - Price: ${price}`);
                 }