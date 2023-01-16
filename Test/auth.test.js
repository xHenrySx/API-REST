// Test using chai
import chai from 'chai';
import chaiHttp from 'chai-http';
import "../src/server.js";

const server = "http://localhost:3000";

chai.use(chaiHttp);

// Valid Sign up
describe("Valid Sign up", () => {
    it("Should return 200 and the user with name test", (done) => {
        chai.request(server)
        .post("/api/auth/signup")
        .send({
            username: "test",
            email: "test@gmail.com",
            password: "test"
        })
        .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.username, "test");
            done();
        });
    });
});

// Invalid Sign up
describe("Invalid Sign up", () => {
    it("Should return 400 and error message", (done) => {
        chai.request(server)
        .post("/api/auth/signup")
        .send({
            username: "test",
            email: "test@gmail.com",
            password: "test"
        })
        .end((err, res) => {
            chai.assert.equal(res.status, 400);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.message, "Username already exists");
            console.log(res.body);
            done();
        });
    });
});

// Valid Sign in
describe("Valid Sign in", () => {
    it("Should return 200 and the user with name test", (done) => {
        chai.request(server)
        .post("/api/auth/signin")
        .send({
            email: "test@gmail.com",
            password: "test"
        })
        .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.username, "test");
            done();
        });
    });
});

// Invalid Sign in
describe("Invalid Sign in", () => {
    it("Should return 400 and error message", (done) => {
        chai.request(server)
        .post("/api/auth/signin")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .end((err, res) => {
            console.log(res.body);
            chai.assert.equal(res.status, 401);
            chai.assert.isObject(res.body); 
            chai.assert.equal(res.body.message, "Invalid password"); 
            done();
        });
    });
});