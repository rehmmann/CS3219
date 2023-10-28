const Pool = require('pg').Pool
const crypto = require('crypto');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_HOST == 'localhost' ? 5432 : process.env.DB_PORT,
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
    const { email, password } = request.body
    if (!email || !password) {
        response.status(422).send('Unprocessable Entity');
        return
    }
    const [salt, hashedPassword] = createHash(password);
    pool.query('INSERT INTO users (email, password, salt) VALUES ($1, $2, $3) RETURNING * ', [email, hashedPassword, salt], 
    (error, results) => {
        if (error && error.code === '23505') {
            // Duplicate entry error
            return response.status(409).json({ error: 'User already exists!' });
        }
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
    
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { email, password } = request.body

  const [salt, hashedPassword] = createHash(password);

    pool.query(
        'UPDATE users SET email = $1, password = $2, salt = $3 WHERE id = $4',
        [email, hashedPassword, salt, id],
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

const changePassword = (request, response) => {
    const id = parseInt(request.params.id)
    const { oldPassword, newPassword } = request.body
    var oldSalt = '';
    const [salt, hashedPassword] = createHash(newPassword);
    pool.query('SELECT * FROM users WHERE id = $1', [id],  
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length == 0) {
            return response.status(404).json({ error: 'Account not found!'});
        }
        
        oldSalt = results.rows[0].salt;
        const hashedOldPassword = checkHash(String(oldSalt), String(oldPassword));

        pool.query('SELECT * FROM users WHERE id = $1 AND password = $2', [id, hashedOldPassword],  
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.rows.length == 0) {
                return response.status(404).json({ error: 'Wrong Password!', results: results.rows, salt: oldSalt, hashedPassword: hashedOldPassword });
            }

            pool.query(
                'UPDATE users SET password = $1, salt = $2 WHERE id = $3',
                [hashedPassword, salt, id],
                (error, results) => {
                    if (error && error.code === '23505') {
                        // Duplicate entry error
                        return response.status(409).json({ error: 'Duplicate entry' });
                    }
                    if (error) {
                        console.error('Error executing query:', error);
                    return response.status(500).json({ error: 'Internal Server Error' });
                    }
                    response.status(200).json({ message: 'Password changed successfully!'});
                }
            )
        })
    });
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
                email: user.email,
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
  changePassword,
}
