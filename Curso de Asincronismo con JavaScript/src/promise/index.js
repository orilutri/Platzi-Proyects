//promesa1
const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('Hey!');
        }else {
            reject('Ooooops!');
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.log(err));


//promesa2    
const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve('True');
            }, 2000);
        }else {
            const error = new Error('Ooops!');
            reject(error);
        }
    });
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.log(err));


//promesas al mismo tiempo o encadenadas
Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log('Array of results', response);
    })
    .catch(err => {
        console.log(err);
    })    