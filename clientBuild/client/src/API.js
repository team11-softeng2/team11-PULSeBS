async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost/server/src/api/Login.php', {    
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            response.json().then((obj) => { 
                console.log(obj);
                if(obj === 0 ) {        //Da modificare in base a quanto ritorna il server. Sarebbe utile che ritorni l'id o anche nome e cognome la visualizzare, e il ruolo
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
        fetch('http://localhost:80/server/api/logout.php')      //Da verificare
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

//Ritorna le lezioni prenotabili dallo studente
async function getBookableStudentLectures(studentId) {
    const url = "http://localhost/server/bookableLessons/" + studentId;
    const response = await fetch(url);
    const lectures = await response.json();
    if(response.ok) {
        console.log(lectures);
        return lectures;
    } else {
        let err = {status: response.status, errorObj: lectures};
        throw err; 
    }
}

//Ritorna le prenotazioni effettuate per la lezione indicata
async function getBooking(lectureId) {
    const url = "test"                  //Da definire
    const response = await fetch(url);
    const booking = await response.json();
    if(response.ok) {
        return booking;
    } else {
        let err = {status: response.status, errorObj: booking};
        throw err; 
    }
}

//API per prenotare un posto a lezione
async function bookASeat(lectureId, studentId) {
    const url = "test"                  //Da definire
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({lectureId: lectureId, studentId: studentId}),
    });
    
    try{
        const resJ = await response.json();
        if(response.ok) {
		    return resJ;
		} else {
		    let err = {status: response.status, errorObj: resJ};
		    throw err; 
		}
    }
    catch(e){
        console.log("Error in booking a seat: " + e);
        return 0;   //meaning: no new customer
    }
}

const API = {
    userLogin, logout, getBookableStudentLectures, getBooking, bookASeat
};
export default API;
