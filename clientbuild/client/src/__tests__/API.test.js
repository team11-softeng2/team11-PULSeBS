import API from '../API';

test("getTeacherStatistics", async () => {
    //Return 0
    const mockSuccessResponse = 0;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getTeacherStatistics(2, 'L.idLesson', 2, 1);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/teacherStatistics/2?filterTime=L.idLesson&filterCourse=2&isAttendance=1');
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
    const mockSuccessResponse3 = [];
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.getTeacherStatistics(2, 'L.idLesson', 2);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
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

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.bookASeat(2, 1, "2020-10-10 10:00:00");
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
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

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.deleteBooking(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.deleteBooking(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
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

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.deleteLecture(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
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

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.changeToOnline(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("getAllStudents", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getAllStudents();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/students');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        let data = await API.getAllStudents();
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getAllStudents();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/students');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getFullLectures", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getFullLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/lecturesWithFullRoom/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getFullLectures(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getFullLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/lecturesWithFullRoom/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getCoursesOfTeacher", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getCoursesOfTeacher(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/teacherCourses/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getCoursesOfTeacher(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getCoursesOfTeacher(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/teacherCourses/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getCancellationsStatisticsByLesson", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getCancellationsStatisticsByLesson(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=1&type=0');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getCancellationsStatisticsByLesson(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getCancellationsStatisticsByLesson(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=1&type=0');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getCancellationsStatisticsByWeek", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getCancellationsStatisticsByWeek(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=1&type=0');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getCancellationsStatisticsByWeek(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getCancellationsStatisticsByWeek(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=1&type=0');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getCancellationsStatisticsByMonth", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getCancellationsStatisticsByMonth(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=1&type=0');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getCancellationsStatisticsByMonth(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getCancellationsStatisticsByMonth(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=1&type=0');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getBookingStatisticsByLesson", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getBookingStatisticsByLesson(1,1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=1&isAttendance=1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getBookingStatisticsByLesson(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getBookingStatisticsByLesson(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=L.idLesson&filterCourse=1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getBookingStatisticsByMonth", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getBookingStatisticsByMonth(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getBookingStatisticsByMonth(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getBookingStatisticsByMonth(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year,monthOfYear&filterCourse=1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getBookingStatisticsByWeek", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getBookingStatisticsByWeek(1, 1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=1&isAttendance=1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getBookingStatisticsByWeek(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getBookingStatisticsByWeek(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookingStatistics/?filterTime=year_month_week&filterCourse=1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getAllCourses", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getAllCourses();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/courses');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getAllCourses();
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getAllCourses();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/courses');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getTeacherLectures", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getTeacherLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/scheduledLecturesForTeacher/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getTeacherLectures(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getTeacherLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/scheduledLecturesForTeacher/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getWaitingBookings", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getWaitingBookings(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/waitingLessons/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getWaitingBookings(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getWaitingBookings(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/waitingLessons/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getStudentBookings", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getStudentBookings(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/studentBookings/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getStudentBookings(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getStudentBookings(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/studentBookings/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getBooking", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getBooking(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookedStudentsForLecture/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getBooking(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getBooking(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookedStudentsForLecture/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("getBookableStudentLectures", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getBookableStudentLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookableLessons/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getBookableStudentLectures(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getBookableStudentLectures(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/bookableLessons/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("logout", async () => {
    //Return array
    const mockSuccessResponse = 0;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.logout();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(data).toBe(0);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.logout();
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //API error server
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.logout();
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("userLogin", async () => {
    //Return array
    const mockSuccessResponse = 0;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.userLogin("test","test");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(data).toBe(0);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.reject(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.userLogin("test","test");
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //API error server
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.userLogin("test","test");
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("getStudentContacts", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getStudentContacts(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/findStudentContacts/1');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getStudentContacts(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getStudentContacts(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/findStudentContacts/1');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("setUpClasses", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const data = await API.setUpClasses({test: "test"});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/setUpEnrollment');
    expect(data).toStrictEqual(["test1", "test2"]);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.setUpClasses({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Server error
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.setUpClasses({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("setUpLectures", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const data = await API.setUpLectures({test: "test"});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/setUpLessons');
    expect(data).toStrictEqual(["test1", "test2"]);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.setUpLectures({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Server error
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.setUpLectures({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("setUpCourses", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const data = await API.setUpCourses({test: "test"});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/setUpCourses');
    expect(data).toStrictEqual(["test1", "test2"]);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.setUpCourses({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Server error
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.setUpCourses({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("setUpProfessors", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const data = await API.setUpProfessors({test: "test"});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/setUpProfessors');
    expect(data).toStrictEqual(["test1", "test2"]);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.setUpProfessors({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Server error
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.setUpProfessors({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("setUpStudents", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const data = await API.setUpStudents({test: "test"});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/setUpStudents');
    expect(data).toStrictEqual(["test1", "test2"]);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.setUpStudents({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Server error
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.setUpStudents({test: "test"});
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("updateAttendance", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.updateAttendance(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/recordStudentPresence/1');
    global.fetch.mockClear();

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.updateAttendance(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.reject({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.updateAttendance(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("getAllClassrooms", async () => {
    //Return array
    const mockSuccessResponse = ["test1", "test2"];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    let data = await API.getAllClassrooms();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/classrooms');
    expect(data.length).toBe(2);
    global.fetch.mockClear();

    //API error
    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    try {
        await API.getAllClassrooms();
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
    
    //Return 0
    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    let data2 = await API.getAllClassrooms();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/classrooms');
    expect(data2).toStrictEqual([]);
    global.fetch.mockClear();
});

test("changeToOnlineByYear", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.changeToOnlineByYear(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToOnlineByYear/1');
    global.fetch.mockClear();

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    await API.changeToOnlineByYear(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToOnlineByYear/1');
    global.fetch.mockClear();

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.changeToOnlineByYear(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});

test("changeToPresenceByYear", async () => {
    const mockSuccessResponse = 1;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    await API.changeToPresenceByYear(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToPresenceByYear/1');
    global.fetch.mockClear();

    const mockSuccessResponse2 = 0;
    const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
    const mockFetchPromise2 = Promise.resolve({
        ok: true,
      json: () => mockJsonPromise2,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise2);
    await API.changeToPresenceByYear(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost/server/changeToPresenceByYear/1');
    global.fetch.mockClear();

    const mockSuccessResponse3 = 0;
    const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
    const mockFetchPromise3 = Promise.resolve({
        ok: false,
      json: () => mockJsonPromise3,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise3);
    try {
        await API.changeToPresenceByYear(1);
        expect(true).toBe(false);
    } catch(e) {
        global.fetch.mockClear();
        expect(true).toBe(true);
    }
});