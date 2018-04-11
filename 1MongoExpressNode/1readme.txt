1+2. Environment: node + Express
3. PUG / Jade View Engine: (indentation), views/.pug, layout
4. MongoDB: AdminCmd, Mongoose
5. Add article Form
6. Bower & Bootstrap: Bower-> (npm for Client side/Front End)+ .bowerrc, jade to html
7. Update + delete: deleting from Client side main.js -> from app.js need to res.send()
8. Messaging & Validation: express-messages, express-session, connect-flash, express-validator, routes
9. User Registration: install bcrypt + new mongoose model + new routes file(with post/get) + new views + new
10. Login: install passport, passport-local + new folder /config with passport strategy (passport.js + database.js)
	passport.js -> export fcn(passport){ passport.use(...), SERIALIZE, DESERIALIZE}
11. Access Control: add article only if you're logged in + cant access the link manually (fcn: ensureAuthenticated)

push notification chrome -> powiadomienia na pulpicie