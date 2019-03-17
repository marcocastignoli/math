json web token

user -> login request { username: marco, password: 13245 }

check if username and pwd are in db


creates a token 


jwt.generate({
    user_id: 1
})  // ad09u91u23912_98231xnu23[adjiajd9u1

SECRET_KEY

    - Header
        type of the hashing algorithm (the library cares about it)
    - Payload
        { user_id:  1, exp: 1273981748 }
    - Signature
        (the library cares about it)
        SECRET_KEY + header + payload + (time)

reply with the token (ad09u91u23912_98231xnu23[adjiajd9u1)


GET /list
Header
Authentication ad09u91u23912_98231xnu23[adjiajd9u1

jwt.check(ad09u91u23912_98231xnu23[adjiajd9u1)
// { user_id:  1 }