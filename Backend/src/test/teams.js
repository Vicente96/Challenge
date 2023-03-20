let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
const should = require('chai').should;

//Assertian Style
chai.should();
chai.use(chaiHttp);
const url = 'http://localhost:3000/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidmljZW50ZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR5N3hTZmxnQVFVdDJUejAxL3R5WFJlWHFDWEZVSUNZTFE4dXZxclpXTVVrQ0syOXlGVThkTyIsImlkUm9sZSI6M30sImlhdCI6MTY3OTI3NTg1OX0.y8RoxqNpbXcnwP5Bn8Wj-Vp4GDnr4vaWiL1MVttzMmo';

describe("Teams API", () => {
  /*
     Test Get all teams
  */
  describe("GET api/teams", () => {
    it("It expect GET all the teams", (done) => {
      chai
        .request(url)
        .get("api/v2/teams")
        .set({ "auth-token": `${token}` })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("array");
          done();
        });
    });
  });
  /*
    Test the GET (by idTeam) route
   */
  describe("GET api/v2/teams/idTeam", () => {
    it("It expect GET an especific team by idTeam", (done) => {
      chai
        .request(url)
        .get(`api/v2/teams/${1}`)
        .set({ "auth-token": `${token}` })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          done();
        });
    });
  });

    /*
    Test  GET  idTeam  when there isn´t data
   */
    describe("GET api/v2/teams/idTeam", () => {
        it("It expect a message (No data) when the idTeam nonexist", (done) => {
          chai
            .request(url)
            .get(`api/v2/teams/${55}`)
            .set({ "auth-token": `${token}` })
            .end((err, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.be.a("string");
              done();
            });
        });
      });

  /**
   * Test the PUT team
   */
  describe("PUT api/v2/teams/idTeam", () => {
    it("It expect update an existent team", (done) => {
      chai
        .request(url)
        .put(`api/v2/teams/${3}`)
        .send({
            "description": "Test Update 3",
            "idAccount": 3
        })
        .set({ "auth-token": `${token}` })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          done();
        });
    });
  });

     /**
   * Test the POST user
   */
     describe("POST api/teams/", () => {
        it("It expect insert a new team", (done) => {
          chai
            .request(url)
            .post(`api/v2/teams/`)
            .send({
                "description": "Test Update 44",
                "idAccount": 3
            })
            .set({ "auth-token": `${token}` })
            .end((err, response) => {
              expect(response).to.have.status(201);
              expect(response.body).to.be.a("object");
              done();
            });
        });
      });

   /**
   * Test the DELETE team
   */
   describe("DELETE api/teams/idTeam", () => {
    it("It should DELETE an especific team by idTeam", (done) => {
      chai
        .request(url)
        .get("api/v2/teams/7")
        .set({ "auth-token": `${token}` })
        .end((err, response) => {
            const idTeam = response.body.idTeam;
          expect(response.body).to.be.a("object");
          expect(response).to.have.status(200);
          chai
            .request(url)
            .del(`api/v2/teams/${idTeam}`)
            .set({ "auth-token": `${token}` })
            .end((err, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.be.a("string");
              done();
            });
        });
    });
  });



})