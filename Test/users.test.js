// Test using chai
import chai from "chai";
import chaiHttp from "chai-http";
import "../src/server.js";

const server = "http://localhost:3000";

chai.use(chaiHttp);

// Create a user -> Only for admins
describe("Create a user and deleted it", () => {
  it("should signin with an account and create a user", (done) => {
    chai
      .request(server)
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@gmail.com",
        password: "admin",
      })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.status, 200);
        chai.assert.isObject(res.body);

        chai
          .request(server)
          .post("/api/users")
          .set("x-access-token", token)
          .set("Content-Type", "application/json")
          .send({
            username: "edge",
            email: "edge@gmail.com",
            password: "edge",
          })
          .end((err, res) => {
            chai.assert.equal(res.status, 200);
            chai.assert.equal(res.body.username, "edge");

            // Delete the user
            chai
              .request(server)
              .delete("/api/users/" + res.body._id)
              .set("x-access-token", token)
              .set("Content-Type", "application/json")
              .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.equal(
                  res.body.message,
                  "User deleted successfully"
                );
                done();
              });
          });
      });
  });
});
