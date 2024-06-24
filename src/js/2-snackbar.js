
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const delayInput = form.elements['delay'];
    const delay = parseInt(delayInput.value);
    const stateInput = form.elements['state'];
    const state = stateInput.value;

    const promise = new Promise((resolve, reject)=> {
        setTimeout(()=> {
            if (state === "fulfilled") {
                resolve(delay);
            }else {
                reject(delay);
            }
        }, delay);
    });
    promise.then(delay => {
        iziToast.show({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            messageColor: '#fff',
            position: "center",
            titleColor: '#fff',
            titleSize: '16px',
            backgroundColor: '#59a10d',
            progressBar: '#326101',
        });
    })
.catch(delay => {
    iziToast.show({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'center',
        messageColor: '#fff',
        titleColor: '#fff',
        titleSize: '16px',
        backgroundColor: '#ef4040',
        progressBar: '#51b1b',
    });
});
});