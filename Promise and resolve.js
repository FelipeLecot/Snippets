function myPromiseA() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Promise resolved'), 1000);
    });
}

const createDeferred =  (fnc) => {
  let resolvedValue
  let resolveWrapper
  const myNewFunction = () => {
    let secondPromise = new Promise ((resolve, reject) => {
      resolveWrapper = resolve
    });
    let origialPromise = new Promise(async (resolve, reject) => {
      resolvedValue = await fnc();
      resolve(resolvedValue)
      console.log("Called Me")
    });
    return Promise.all([origialPromise, secondPromise]).then((results) => results[0])
  }
  myNewFunction.resolve = () => {resolveWrapper()};
  return myNewFunction
}

// call createDeferred with the original function as the parameter, the
// resulting object is a `Function` with additional `resolve`/`reject` methods
const myDeferredFn1 = createDeferred(myPromiseA);

myDeferredFn1()
.then(result => console.log('Deferred Promise 1 resolved with result => ', result))
.catch(err => console.error('Deferred Promise 1 rejected with error => ', err));

setTimeout(() => myDeferredFn1.resolve(), 2000);