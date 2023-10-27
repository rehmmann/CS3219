const Pool = require('pg').Pool
const crypto = require('crypto');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const createHash = (password) => {
    // Creating a unique salt for a particular user
    const salt = crypto.randomBytes(16).toString('hex');
 
    // Hashing user's salt and password with 1000 iterations,
    // 64 length and sha512 digest
    const hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
    
    return [salt, hash];
}

const checkHash = (salt, password) => { 
    // Hashing user's salt and password with 1000 iterations,
    // 64 length and sha512 digest
    const hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
    
    return hash;
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', 
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], 
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length == 0) {
            return response.status(404).json({ error: 'Not Found' });
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, email, password, role } = request.body
    if (!username || !email || !password) {
        response.status(422).send('Unprocessable Entity');
        return
    }
    const [salt, hashedPassword] = createHash(password);

    if (role) {
        pool.query('INSERT INTO users (username, email, password, role, salt) VALUES ($1, $2, $3, $4, $5) RETURNING * ', [username, email, hashedPassword, role, salt], 
        (error, results) => {
            if (error && error.code === '23505') {
                // Duplicate entry error
                return response.status(409).json({ error: 'User already exists!' });
            }
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}, username: ${results.rows[0].username}`)
        })
    } else {
        pool.query('INSERT INTO users (username, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING * ', [username, email, hashedPassword, salt], 
        (error, results) => {
            if (error && error.code === '23505') {
                // Duplicate entry error
                return response.status(409).json({ error: 'User already exists!' });
            }
            if (error) {
                console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
            }
            response.status(201).send();
        })
    }

}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password } = request.body

  const [salt, hashedPassword] = createHash(password);

    pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3, salt = $4 WHERE id = $5',
        [username, email, hashedPassword, salt, id],
        (error, results) => {
            if (error && error.code === '23505') {
                // Duplicate entry error
                return response.status(409).json({ error: 'Duplicate entry' });
            }
            if (error) {
                console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], 
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const loginUser = (request, response) => {

    const {email, password} = request.body

    var salt = '';

    pool.query('SELECT * FROM users WHERE email = $1', [email],  
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length == 0) {
            return response.status(404).json({ error: 'Account not found!'});
        }
        salt = results.rows[0].salt;
        const hashedPassword = checkHash(String(salt), String(password));

        pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, hashedPassword],  
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.rows.length == 0) {
                return response.status(404).json({ error: 'Wrong Password!', results: results.rows, salt: salt, hashedPassword: hashedPassword });
            }
            const user = results.rows[0];
            const responseBody = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
            response.status(200).json(responseBody);
        })
    });
    
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
}