const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, email, password, role } = request.body
    if (role) {
        pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING * ', [username, email, password, role], 
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}, username: ${results.rows[0].username}`)
        })
    } else {
        pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING * ', [username, email, password], 
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with id: ${results.rows[0].id}, username: ${results.rows[0].username}`)
        })
    }

}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password } = request.body

    pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4',
        [username, email, password, id],
        (error, results) => {
            if (error) {
                throw error
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
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}