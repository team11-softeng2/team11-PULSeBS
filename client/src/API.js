/*
async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/login.php', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            response.json().then((obj) => { 
                console.log(obj);
                if(obj === 0 ) {
                    reject(obj);
                } else {
                    resolve(obj);    
                }
            })
            .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) });
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function logout(){
	return new Promise((resolve, reject) => {
        fetch('http://localhost:80/project1/server/api/logout.php')
        .then((response) => {
			if(response.ok){
				resolve();
			}
			else{
				reject();
			}
       })
       .catch((err) => { 
      		 reject(err); 
       });
    });
}
*/

const API = {
    /*userLogin, logout*/
};
export default API;
