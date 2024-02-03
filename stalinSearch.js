function stalinSort(arr) {
  if (arr.length <= 1) {
      return arr;
  }

  let sortedArray = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
      if (arr[i] >= sortedArray[sortedArray.length - 1]) {
          sortedArray.push(arr[i]);
      }
  }

  return sortedArray;
}