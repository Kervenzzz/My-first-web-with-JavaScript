function greetingResponse(){
    const request = new XMLHttpRequest();

    request.addEventListener('load',() => {
        console.log(request.response)
    });

    request.open('GET','https://supersimplebackend.dev/greeting');
    request.send()
};
//greetingResponse()

function greetingFetch() {
    fetch('https://supersimplebackend.dev/greeting').then((response) => {
        return response.text()
    }).then((message) => {
        console.log(message)
    })

};
//greetingFetch()

async function greetingAsync() {
    const request = await fetch('https://supersimplebackend.dev/greeting');

    console.log(await request.text());
}

//greetingAsync()


async function greetingAsyncPost() {
    const request = await fetch('https://supersimplebackend.dev/greeting',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({name: "kervens dorvilus"})
    });

    console.log( await request.text());
};
//greetingAsyncPost()

async function getAmazon() {
    try {
        const request = await fetch('https://amazon.com');

        console.log(await request.json());
    } catch (error) {
        console.log(error);
    }
    
}
//getAmazon()

async function asyncPostError() {
    try {
        const request = await fetch('https://supersimplebackend.dev',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
        });
    
        if(request.status >= 400){
            throw request
        }
    } catch (error) {
        if(error.status === 400){
            let response = await error.json()
            console.log(response.errorMessage )
        }else {
            console.log('Network error. Please try again later.')
        }
    }
};
//asyncPostError()