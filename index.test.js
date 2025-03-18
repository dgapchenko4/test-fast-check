import {removeDuplicates, sortNumbers, sumPositiveNumbers, groupByParity, findCommonElements} from './arrayUtils.js';
import fc from 'fast-check';
describe('tests', () => {
    test('remove duplicates', () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (arr) => {
            const uniqueArr = removeDuplicates(arr);
            const uniqueElements = [...new Set(arr)];
            return uniqueArr.length === uniqueElements.length;
          })
        );
      });
      test('sort numbers', () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (arr) => {
            const sortedArr = sortNumbers(arr);
            for (let i = 1; i < sortedArr.length; i++) {
              if (sortedArr[i - 1] > sortedArr[i]) {
                return false;
              }
            }
            return sortedArr.length === arr.length && sortedArr.every((item) => arr.includes(item));
          })
        );
      });
      test('sum positive numbers', () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (arr) => {
            const sum = sumPositiveNumbers(arr);
            const expectedSum = arr.filter(num => num > 0).reduce((acc, num) => acc + num, 0);
            return sum === expectedSum;
          })
        );
      });
      test('group by parity', () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (arr) => {
            const grouped = groupByParity(arr);
            return (
              grouped.even.every(num => num % 2 === 0) &&
              grouped.odd.every(num => num % 2 !== 0)
            );
          })
        );
      });
      test('find common elements', () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (arr1, arr2) => {
            const common = findCommonElements(arr1, arr2);
            return common.every(item => arr1.includes(item) && arr2.includes(item));
          })
        );
      });
});