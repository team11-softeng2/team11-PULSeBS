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
                /*
                if(obj === 0 ) {        //Da modificare in base a quanto ritorna il server. Sarebbe utile che ritorni l'id o anche nome e cognome la visualizzare, e il ruolo
                    reject(obj);
                } else {
                    resolve(obj);    
                }
                */
               resolve(obj);
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
        if (lectures === 0){
        	return [];
        }
        return lectures;
    } else {
        let err = {status: response.status, errorObj: lectures};
        throw err; 
    }
}

//Ritorna le prenotazioni effettuate dagli studenti per la lezione indicata (teacher side)
async function getBooking(lectureId) {
    const url = "http://localhost/server/bookedStudentsForLecture" + lectureId;
    const response = await fetch(url);
    const booking = await response.json();
    if(response.ok) {
        return booking;
    } else {
        let err = {status: response.status, errorObj: booking};
        throw err; 
    }
}

// API to retrieve all the bookings of a student
async function getStudentBookings(studentId) {
    const url = "http://localhost/server/studentBookings/" + studentId;
    const response = await fetch(url);
    const booking = await response.json();
    if(response.ok) {
        if (booking === 0){
        	return [];
        }
        return booking;
    } else {
        let err = {status: response.status, errorObj: booking};
        throw err; 
    }
}

//API per prenotare un posto a lezione
async function bookASeat(lectureId, studentId, date) {
    const url = "http://localhost/server/insertLecture"                  
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: JSON.stringify({
            idLesson: lectureId,
            idUser: studentId,
            date: date}),
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

// API to retrieve all the lectures of a teacher
async function getTeacherLectures(teacherID){
    const url = "test"   //da definire
    const response = await fetch(url);
    const booking = await response.json();
    if(response.ok) {
        return lectures;
    } else {
        let err = {status: response.status, errorObj: lectures};
        throw err; 
    }
}

async function deleteBooking(bookingId) {
    const url = "http://localhost/server/updateBooking/" + bookingId;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: JSON.stringify({
            }),
        }).then((response) => {
            if (response.ok) {
                resolve(0);
            } else {
                reject({errore: "Error in deleting a booking"});
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

const API = {
    userLogin, logout, getBookableStudentLectures, getBooking, getStudentBookings, bookASeat, deleteBooking
};
export default API;
