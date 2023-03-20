let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require('chai').expect;
const should = require('chai').should;

//Assertian Style
chai.should();
chai.use(chaiHttp);
const url = 'http://localhost:3000/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidmljZW50ZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR5N3hTZmxnQVFVdDJUejAxL3R5WFJlWHFDWEZVSUNZTFE4dXZxclpXTVVrQ0syOXlGVThkTyIsImlkUm9sZSI6M30sImlhdCI6MTY3OTI3NTg1OX0.y8RoxqNpbXcnwP5Bn8Wj-Vp4GDnr4vaWiL1MVttzMmo';
const email = 'vicente@gmail.com';

describe('Users API', () => {

        /**
     * Test  GET token
     */
        describe("GET api/users/email/password", ()=>{
            it("It expect GET a token with user credentials", (done)=>{
                chai.request(url)
                    .get(`api/v1/users/login/${email}/${"0601x-2Vic"}`)
                    .end((err,response)=>{
                        console.log(response.body);
                        expect(response).to.have.status(200);
                        expect(response.body).to.be.a('string');
                        done();
                    })
            })
        })
    /**
     Test Get route
     */
    describe("GET api/users", ()=>{
        it("It expect GET all the users", (done)=>{
            chai.request(url)
                .get('api/v1/users')
                .set({ "auth-token": `${token}` })
                .end((err,response)=>{
                    console.log(response.body);
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.a('array');
                    
                    done();
                })
        })
    })

    /**
     * Test the GET (by email) route
     */
    describe("GET api/users/email", ()=>{
        it("It expect GET an especific user by email", (done)=>{
            chai.request(url)
                .get(`api/v1/users/${email}`)
                .set({ "auth-token": `${token}` })
                .end((err,response)=>{
                    console.log(response.body);
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.a('object');
                    done();
                })
        })
    })
    /**
     * Test the POST user 
     */
    describe("POST api/users/", ()=>{
        it("It expect insert a new user", (done)=>{
            chai.request(url)
                .post(`api/v1/users/`)
                .send({
                    "name": "Test 1",
                    "englishLevel": "B1",
                    "knowledge": "React JS. Vue JS",
                    "idRole": 3,
                    "email": "test@gmail.com",
                    "password": "12345",
                    "cvUrl": "http://c123456"
                })
                .set({ "auth-token": `${token}` })
                .end((err,response)=>{
                    console.log(response.body);
                    expect(response).to.have.status(201);
                    expect(response.body).to.be.a('object');
                    done();
                })
        })
    })

    /**
     * Test the PUT user
     */
    describe("PUT api/users/idUser", ()=>{
        it("It expect update an existent user", (done)=>{
            chai.request(url)
                .put(`api/v1/users/${1}`)
                .send({
                    "name": "Vicente Mata Velasco",
                    "englishLevel": "C1",
                    "knowledge": "React JS. Angular JS",
                    "idRole": 3,
                    "email": "vicente@gmail.com",
                    "password": "0601x-2Vic",
                    "cvUrl": "http://c1234567"
                })
                .set({ "auth-token": `${token}` })
                .end((err,response)=>{
                    console.log(response.body);
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.a('object');
                    done();
                })
        })
    })

    /**
     * Test the DELETE user
     */
    describe("DELETE api/users/idUser", ()=>{
        it("It should DELETE an especific user by idUser", (done)=>{
            chai.request(url)
                .del(`api/v1/users/${11}`)
                .set({ "auth-token": `${token}` })
                .end((err,response)=>{
                    console.log(response.body);
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.a('string');
                    done();
                })
        })
    })
})
