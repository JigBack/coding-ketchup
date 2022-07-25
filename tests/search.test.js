const search = require("../src/search");
const data = require("../src/data");

describe("Search Test", () => {
  test(`Can find users by id`, () => {
    const results = search(data, {
      id: 1,
    });
    expect(results[0].id).toEqual(1);
  });

  test(`Will handle dot notation in paths correctly`, () => {
    const results = search(data, {
      "settings.live": true,
    });
    expect(results.length).toBe(3);
  });

  test(`When a blank query array is specified it will return all data`, () => {
    // Not sure if there is a reason you use [] in this test rather than {}, I've added another test case with {} used instead
    const results = search(data, []);
    expect(results.length).toBe(5);
  });

  test(`When a blank query object is specified it will return all data`, () => {
    const results = search(data, {});
    expect(results.length).toBe(5);
  });

  test(`Handle multiple search paths as a logical AND`, () => {
    const results = search(data, {
      "settings.live": true,
      name: "Bill",
    });
    expect(results[0]).toHaveProperty("name", "Bill");
    expect(results[0]).toHaveProperty("settings.live", true);
  });

  test(`When a query object specifies a path that is undefined in the data`, () => {
    const results = search(data, {
      "settings.live.current": true,
    });
    expect(results.length).toBe(0);
  });
});
