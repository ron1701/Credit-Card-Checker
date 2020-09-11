// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const sumArray = (array)=> {
	
	let result = 0;  // the sum of the array members
	
	for( let i = 0; i < array.length; i++){
		
		result += array[i];
	}
	
	return result;
}


const validateCred = (array)=> {
	let luhn = []; //We will manipulate members of array, then copy them here
	
	let parity = array.length % 2; /* Must be 1 or 0, we don't care which. Equality to this will tell us whether
	to simply copy the element to luhn of whether to double it and possibly subtract 9 */
	
	for( let i = array.length - 1 ; i >= 0 ; i--){
		//console.log(`${i}`)
		//console.log(array[i]);
		
		if ( i % 2 != parity){
			
			luhn.push(array[i])
		}
		
		else {
			
			if (array[i] * 2 <= 9){
				
				luhn.push(array[i] * 2)
				
			}
			else { luhn.push((array[i] * 2) - 9)}
		}
		
		
		
	} // end for 
	
	//console.log(luhn);
	
	const sumOfLuhn = sumArray(luhn)
	
	//console.log(sumOfLuhn);
	
	if (sumOfLuhn % 10 === 0) {
		return true;
	}
	else {
		return false;
	}
} // end validateCred


//console.log(validateCred(invalid1));








const findInvalidCards = (nestedArr)=> {
	
	let invalidCards = []; //This array will be populated with the arrays representing bad cards
	
	for( let i = 0; i < nestedArr.length; i++){
		
		if( validateCred(nestedArr[i]) === false) {
			
			invalidCards.push(nestedArr[i])
		}
		
	} // end for
	
	return invalidCards
}// end findInvalidCards

//console.log(findInvalidCards(batch));  // get the array of invalid cards

const badCards = findInvalidCards(batch);

//console.log(badCards.length);
//badCards.push([9,5,3,8]);  // since the test data doesn't have CC's from invalid companies, we are adding one.

const idInvalidCardCompanies = (nestedArr)=> {
	
	let invalidCardCompanies = [];
	
	for ( let i = 0; i < nestedArr.length; i++){
		
		let coID = nestedArr[i][0];  // get the first number, this identifies cc type
		let coName =''; // the switch will populate the with company name
		
		switch(coID) {
			
			case 3: {
				coName = 'Amex (American Express';
				break;
			}
			
			case 4: {
				coName = 'Visa';
				break;
			}
			
			case 5: {
				coName = 'Mastercard';
				break;
			}
			
			case 6: {
				coName = 'Discover';
				break;
			}
			
			default: {
				console.log(`Company not found for ${nestedArr[i]}`)
				break;
			}
		} //end switch
		
		if (invalidCardCompanies.indexOf(coName) === -1) {  //The company name has not been previously written
			invalidCardCompanies.push(coName)
		}
		
		
	} //end for
	
	return invalidCardCompanies
} // end idInvalidCardCompanies


// console.log(idInvalidCardCompanies(badCards));





