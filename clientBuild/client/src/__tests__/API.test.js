import API from '../API';

test("getBookableLectures", async () => {
    let data = await API.getBookableStudentLectures(1);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getStudentBookings", async () => {
    let data = await API.getStudentBookings(1);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("userLogin", async () => {
    let result1 = undefined;
    let result2 = undefined;
    let result3 = undefined;
    let result4 = undefined;
    try {
        result1 = await API.userLogin("error", "error");         //Wrong username and password
        result2 = await API.userLogin("calogero", "error");         //Wrong password
        result3 = await API.userLogin("error", "test");         //Wrong username
        result4 = await API.userLogin("calogero", "test");         //Correct username and password
    } 
    catch(err) {
        console.log(err);
    }
    console.log(result4);
    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(result3).toBe(0);
    expect(result4).toEqual({idUser:1,userName:"calogero",password:"test",role:"student",name:"Calogero Pisano", email:"s273791@studenti.polito.it"});
});

test("getBooking", async () => {
    let data = await API.getBooking(3);
    expect(data.length).toBeGreaterThan(0);
});

test("getTeacherLectures", async () => {
    let data = await API.getTeacherLectures(2);
    expect(data.length).toBeGreaterThan(0);
});

test("logout", async() => {
    let result = await API.logout();
    expect(result).toBe(0);
});

//Il test prova ad eliminare una prenotazione con un id non esistente e riceve 0
test("deleteBooking", async () => {
    let result = await API.deleteBooking(9999999999);
    expect(result).toBe(0);
});