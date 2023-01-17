// Test using chai
import chai from "chai";
import chaiHttp from "chai-http";
import "../src/server.js";

const server = "http://localhost:3000";

chai.use(chaiHttp);

// Add a book -> Only for moderators or admins

describe("Add a book", () => {
  it("should signin with an account and add a book", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@gmail.com",
        password: "admin",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .post("/api/books")
          .set("x-access-token", token)
          .set("Content-Type", "application/json")
          .send({
            title: "El señor de los anillos",
            author: "J.R.R. Tolkien",
            description: "La historia de Frodo Bolsón y sus amigos",
            pages: 1000,
            year: 1954,
            image: "https://Test.jpg",
          })
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.title, "El señor de los anillos");
            chai.assert.equal(res.body.author, "J.R.R. Tolkien");
            chai.assert.equal(
              res.body.description,
              "La historia de Frodo Bolsón y sus amigos"
            );
            chai.assert.equal(res.body.pages, 1000);
            chai.assert.equal(res.body.year, 1954);
            done();
          });
      });
  });
});

// Test for getBooks
describe("Get all books", () => {
  it("should signin with an account and get all users", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "harvey@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .get("/api/books")
          .set("x-access-token", token)
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isArray(res.body);
            chai.assert.isObject(res.body[0]);
            done();
          });
      });
  });
});

// Invalid Test for getBookById
describe("Get incorrect book by id", () => {
  it("should signin with an account and get a book that id doesnt exist", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "harvey@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .get("/api/books/5f9f5b5b9b9b9b9b9b9b9b9b")
          .set("x-access-token", token)
          .end((err, res) => {
            chai.assert.equal(res.status, 404);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.Error, "Book not found");
            done();
          });
      });
  });
});

// Valid Test for getBookById
describe("Get book by id", () => {
  it("should signin with an account and get book by id", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "harvey@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .get("/api/books/63c3349458ca497c911f6a42")
          .set("x-access-token", token)
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body._id, "63c3349458ca497c911f6a42");
            done();
          });
      });
  });
});

// // Get book by year and with pages greater than 150

describe("Get book by year and with pages greater than 150", () => {
  it("should signin with an account and get book by year and with pages greater than 150", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "dona@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .get("/api/books/?year=1926")
          .set("x-access-token", token)
          .set("filter", "pages:gt:150")
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isArray(res.body);
            chai.assert.equal(res.body[0].year, 1926);
            done();
          });
      });
  });
});

// Update book by id -> only moderator or admin can update
describe("Update book by id", () => {
  it("should signin with an account and update book by id", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@gmail.com",
        password: "admin",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .patch("/api/books/63c356b0b96da8841e980638")
          .set("x-access-token", token)
          .set("Content-Type", "application/json")
          .send({
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            year: 1926,
            pages: 180,
          })
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isObject(res.body);
            chai.assert.equal(res.body.title, "The Great Gatsby");
            done();
          });
      });
  });
});

// Delete book by id -> only admin can delete
describe("Delete book by id", () => {
  it("should signin with an account and delete book by id", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@gmail.com",
        password: "admin",
      })
      .end((err, res) => {
        const token = res.body.token; // -> header = x-access-token
        chai
          .request(server)
          .get("/api/books/?title=El señor de los anillos")
          .set("x-access-token", token)
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.isArray(res.body);
            chai.assert.equal(res.body[0].title, "El señor de los anillos");
            chai
              .request(server)
              .delete("/api/books/" + res.body[0]._id)
              .set("x-access-token", token)
              .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.isObject(res.body);
                chai.assert.equal(res.body.title, "El señor de los anillos");
                done();
              });
          });
      });
  });
});
