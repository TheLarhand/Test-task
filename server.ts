import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
const db = router.db;

server.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.get("profile").value();

    if (user && user.email === email) {
        res.jsonp({
            success: true,
            data: { token: "fb566635a66295da0c8ad3f467c32dcf" },
        });
    } else {
        res.status(401).jsonp({ success: false, error: "Invalid credentials" });
    }
});

server.use(auth);
server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running on port 3000");
});
