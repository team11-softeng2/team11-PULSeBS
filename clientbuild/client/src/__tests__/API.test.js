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
    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(result3).toBe(0);
    expect(result4).toEqual({idUser:1,userName:"calogero",password:"test",role:"student",name:"Calogero Pisano", email:"student@pulsebs.it"});
});

test("getBooking", async () => {
    let data = await API.getBooking(3);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getTeacherLectures", async () => {
    let data = await API.getTeacherLectures(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getFullLectures", async () => {
    let data = await API.getFullLectures(1);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getCoursesOfTeacher", async () => {
    let data = await API.getCoursesOfTeacher(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getBookingStatisticsByLesson", async () => {
    let data = await API.getBookingStatisticsByLesson(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getBookingStatisticsByWeek", async () => {
    let data = await API.getBookingStatisticsByWeek(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getBookingStatisticsByMonth", async () => {
    let data = await API.getBookingStatisticsByMonth(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getCancellationsStatisticsByMonth", async () => {
    let data = await API.getCancellationsStatisticsByMonth(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getCancellationsStatisticsByWeek", async () => {
    let data = await API.getCancellationsStatisticsByWeek(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getCancellationsStatisticsByLesson", async () => {
    let data = await API.getCancellationsStatisticsByLesson(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("getAllCourses", async () => {
    let data = await API.getAllCourses(2);
    expect(data.length).toBeGreaterThanOrEqual(0);
});

test("logout", async() => {
    let result = await API.logout();
    expect(result).toBe(0);
});

test("getTeacherStatistics", async () => {
    //Return 0
    const mockSuccessResponse = 0;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getTeacherStatistics(2, 'L.idLesson', 2);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    //Return array result
    const mockSuccessResponse2 = [];
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    data = await API.getTeacherStatistics(2, 'L.idLesson', 2);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    global.fetch.mockClear();
});

test("bookASeat", async () => {
    const mockSuccessResponse = 0;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.bookASeat(2, 1, "2020-10-10 10:00:00");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/insertLecture');
    global.fetch.mockClear();
});

test("deleteBooking", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.deleteBooking(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/updateBooking/1');
    global.fetch.mockClear();
});

test("deleteLecture", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.deleteLecture(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/deleteLecture/1');
    global.fetch.mockClear();

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    await API.deleteLecture(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/deleteLecture/1');
    global.fetch.mockClear();
});

test("changeToOnline", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.changeToOnline(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToOnline/1');
    global.fetch.mockClear();

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    await API.changeToOnline(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToOnline/1');
    global.fetch.mockClear();
});