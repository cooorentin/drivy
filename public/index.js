'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

/*
function convertDate(str){
	var re = /[0-9]+/g;
	var result = re[Symbol.match](str);
	
	var dateLoc = new Date(result(0), result(1), result(2));
	return dateLoc;
}
*/

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

function getDays(beginDate, returnDate)
{
	var begin = new Date(beginDate).getTime();
	var end = new Date(returnDate).getTime()
	
	//convert in days
	var nbDays = ((end - begin)/86400000)+1; 
	return nbDays;
}

function calculatePrice(rentals)
{
	var nbCars = cars.length;
	var pricePD;
	var pricePK;
	var nbDay = getDays(rentals.pickupDate,rentals.returnDate);
	var nbKm = rentals.distance;
	for(var i=0; i<nbCars; i++)
	{
		if(rentals.carId == cars[i].id)
		{
			pricePD = cars[i].pricePerDay;
			pricePK = cars[i].pricePerKm;
		}
	}
	// à vérifier
	var priceDay;
	var ppd1 = pricePD - (0.1*pricePD);
	var ppd4 = pricePD - (0.3*pricePD);
	var ppd10 = pricePD - (0.5*pricePD);
	
	if(nbDay = 1)
	{
		priceDay = pricePD;
	}
	else if(nbDay >1 && nbDay<=4)
	{
		priceDay = pricePerDay + ((nbDay-1) * ppd1);
	}
	else if(nbDay>4 && nbDay<=10)
	{
		priceDay = pricePerDay + (3 * ppd1) + ((nbDay-4) * ppd4);
	}
	else if(nbDay > 10) 
	{
		priceDay = pricePerDay + (3 * ppd1) + (6 * ppd4) + ((nbDay-10) * ppd10);
	}
	
	var price = priceDay + (nbKm * pricePK);
	return price;
}

for(var i=0; i<3; i++)
{
	rentals[i].price = calculatePrice(rentals[i]);
}

// Exercise 3
function calculateCommission(rental)
{
	var rentalPrice = rental.price;
	var commission = (0.3)*rentalPrice;
	var insurance = commission/2;
	var nbDay = getDays(rental.pickupDate,rental.returnDate);
	var assistance = nbDay; // 1€ per day 
	var drivy = commission - (insurance + assistance);
	
	rental.commission.insurance = insurance;
	rental.commission.assistance = assistance;
	rental.commission.drivy = drivy;
}

// update
for(var i=0; i<3; i++)
{
	calculateCommission(rentals[i]);
}

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications)