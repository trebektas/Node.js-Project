import app from "../routes.js";
import supertest from "supertest";

const request = supertest(app);

describe("check statusCode /movie", () => {
  it("statusCode should be 200 for the get request (getMovies)", async () => {
    const getResponse = await request.get('/movie');
    expect(getResponse.statusCode).toBe(200);
  });


  it("statusCode should be 200 for the post request (addMovie) with a true structure", async () => {
    const postResponse = await request.post('/movie').send({
      title:"The Intouchables",
      director:"Olivier Nakache",
      release_date:"2012-03-22"
  });
    expect(postResponse.statusCode).toBe(200);
  });


  it("statusCode should be 400 for the post request (addMovie) with a wrong structure", async () => {
    const postResponse = await request.post('/movie').send({
      movie:"The Intouchables",
      director:"Olivier Nakache",
      release_date:"2012-03-22"
  });
    expect(postResponse.statusCode).toBe(400);
  });
});


describe("check statusCode /movie/:id", () => {
  it("statusCode should be 200 for the get request (searchMovie) with a true id", async () => {
    const getResponse = await request.get('/movie/ea1ab288-2365-4381-a9f2-729330d00df2');
    expect(getResponse.statusCode).toBe(200);
  });


  it("statusCode should be 404 for get request (searchMovie) when movie not found", async () => {
    const getResponse = await request.get('/movie/12345');
    expect(getResponse.statusCode).toBe(404);
  });
  
  
  it("statusCode should be 200 for the delete request with a true id", async () => {
    const deleteResponse = await request.delete('/movie/ea1ab288-2365-4381-a9f2-729330d00df2');
    expect(deleteResponse.statusCode).toBe(200);
  });
  
  
  it("statusCode should be 404 for the post request with a wrong id", async () => {
    const deleteResponse = await request.delete('/movie/111111');
    expect(deleteResponse.statusCode).toBe(404);
  });
});