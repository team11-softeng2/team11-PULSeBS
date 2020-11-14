import API from '../API';

test("getBookableLectures", async () => {
    let data = undefined;
    await API.getBookableStudentLectures(1).then((lectures) => data = lectures);
    expect(data.length).toBeGreaterThanOrEqual(0);
  });