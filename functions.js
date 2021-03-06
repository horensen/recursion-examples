'use strict';

/*
 *	Returns the sum of all the numbers in the array.
 *	numbers: An array containing only numbers.
 */
function sum(numbers) {
	switch (numbers.length) {
		case 0:
			return 0;
			break;
		case 1:
			return numbers[0];
			break;
	}

	return numbers.shift() + sum(numbers);
}

/*
 *	Prints out the seconds left each line until 0 and finally a given message.
 *	seconds: Initial integer number to start counting down
 *	message: Message to print when seconds is zero
 */
function countdown(seconds, message) {
	let i = seconds;
	let refreshIntervalId = setInterval(function() {
		console.log(i);
		if (--i < 0) {
			console.log(message);
			clearInterval(refreshIntervalId);
		}
	}, 1000);
}

/*
 *	Returns a number in the Fibonnaci sequence.
 *	p: a position in the Fibonnaci sequence
 */
function fibonnaci(p) {
	if (p < 0) {
		throw new Error('Cannot perform factorial operation on negative number');
	} else if (p > 45) {
		throw new Error('Unable to determine large number beyond the 45th position');
	}

	return p === 0 || p === 1 ? p : fibonnaci(p - 1) + fibonnaci(p - 2);
}

/*
 *	Returns the factorial of a number.
 *	n: a number between 0 and 170
 */
function factorial(n) {
	if (n < 0) {
		throw new Error('Cannot perform factorial operation on negative number');
	} else if (n > 170) {
		throw new Error('Unable to calculate large factorials beyond 170!');
	}

	return n === 1 || n === 0 ? 1 : n * factorial(n - 1);
}


/*
 *	Returns an array of indexes of an array a containing the target value n.
 *	a: an array of ascending integers or alphabetically arranged words, but not mixed
 *	n: n is the target value to find in the array
 */
function binarySearch(a, n) {
	let result = [];

	// If array is empty, stop and return no result.
	if (a.length === 0) {
		return result;
	}

	function binarySearchRecursive(a, n, left, right) {

		// If left index is greater than right index, stop searching.
		if (left > right) {
			return result;
		}

		// Get the middle index.
		let mid = Math.round(left + ((right - left) / 2));
		
		// If the target interger n is found,
		if (a[mid] === n) {
			// push this index into result.
			result.push(mid);

			// Find n in both left and right directions starting from mid position.
			function linearSearchRecursive(a, n, nextLeft, nextRight) {
				
				let continueLinearSearchRecursive = false;

				if (a[nextLeft] === n) {
					result.push(nextLeft);
					continueLinearSearchRecursive = true;
				}

				if (a[nextRight] === n) {
					result.push(nextRight);
					continueLinearSearchRecursive = true;
				}

				if (continueLinearSearchRecursive) {
					linearSearchRecursive(a, n, nextLeft - 1, nextRight + 1);
				}
			}

			linearSearchRecursive(a, n, mid - 1, mid + 1);
		} else {
			// Otherwise, continue searching.
			if (n < a[mid]) {
				binarySearchRecursive(a, n, left, mid - 1);
			} else {
				binarySearchRecursive(a, n, mid + 1, right);
			}
		}
	}

	binarySearchRecursive(a, n, 0, a.length - 1);

	return result.sort();
}


/*
 *	Find all the possible combination of numbers that meets the target.
 *	@param {Array} [numbers] Array of numbers.
 *	@param {Number} [target] The target integer.
 *	@param {Boolean} [allowSlightAboveTarget] If true, a subset sum can be minimally above target, else must be equal to target.
 *	@return {Array} All the subsets, each subset is an Object containing index and subset.
 */
function subsetsOfTargetSum(numbers, target, allowSlightAboveTarget) {
	var originalLengthOfNumbers = numbers.length;

	function findSubsets(numbers, target, subset, indexes) {
		var total = sum(subset);
		var canAddToResponse = allowSlightAboveTarget ? (total >= target) : (total === target);

		// If target is met, depending on whether allowed to exceed target slightly,
		if (canAddToResponse) {
			// Add this subset into the response along with other useful information.
			response.push({
				indexes: indexes.slice(0, indexes.length),
				subset: subset.slice(0, subset.length),
				sum: total
			});	// do not remove slice, else an empty array gets pushed in.
		}

		// If total did not reach target,
		if (total < target) {
			for (var i in numbers) {
				// Add current number and its index from original array.
				subset.push(numbers[i]);
				indexes.push(parseInt(i) + (originalLengthOfNumbers - numbers.length));

				// Take the rest of the numbers to the right.
				var otherNumbersToTheRight = numbers.slice(parseInt(i) + 1, numbers.length);

				// Continue to find the subset recursively.
				findSubsets(otherNumbersToTheRight, target, subset, indexes);
				
				// Done with findSubsets. Reaching this line means that the subset either
				// equals or exceeds the target, so pop the last number n and its index i away.
				subset.pop();
				indexes.pop();
			}
		}
	}

	var response = [];
	findSubsets(numbers, target, [], []);
	return response;
}
