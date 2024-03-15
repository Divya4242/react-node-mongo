db.createUser(
    {
        user: "roott",
        pwd: "examplee",
        roles: [
            {
                role: "readWrite",
                db: "my_db"
            }
        ]
    }
);
db.createCollection("test");