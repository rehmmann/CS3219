const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_HOST == 'localhost' ? 5432 : process.env.DB_PORT,
})

const getSubmissions = (request, response) => {
    pool.query('SELECT * FROM submissions ORDER BY id ASC', 
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
        }
        response.status(200).json(results.rows)
    })
}

const getAllSubmissionsByUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM submissions WHERE firebaseid = $1', [id], 
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.rows.length == 0) {
                return response.status(404).json({ error: 'Not Found' });
            }
            response.status(200).json(results.rows)
        }
    );
}

const getOneSubmission = (request, response) => {
    const uid = request.params.id
    const questionId = parseInt(request.params.questionId)
    const languageId = parseInt(request.params.languageId)
    if (!uid || typeof questionId == 'undefined' || !languageId) {
        return response.status(400).json({ error: 'Bad Request' });
    }
    pool.query('SELECT * FROM submissions WHERE firebaseid = $1 AND questionid = $2 AND languageid = $3', [uid, questionId, languageId],
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.rows.length == 0) {
                return response.status(404).json({ error: 'No save found' });
            }
            response.status(200).json(results.rows[0])
        }
    );
}

const upsertSubmission = (request, response) => {
    const { uid, questionId, languageId, code} = request.body
    if (!uid || typeof questionId == 'undefined'
         || !languageId || typeof code == 'undefined') {
        console.log(uid, questionId, languageId, code)
        return response.status(400).json({ error: 'Bad Request' });
    }
    pool.query(
        `INSERT INTO submissions (firebaseid, questionid, languageid, code) ` + 
        `VALUES ($1, $2, $3, $4) ON CONFLICT (firebaseid, questionid, languageid) ` + 
        `DO UPDATE SET code = $4, updated_at = to_timestamp(${Date.now()} / 1000.0) ` + 
        `RETURNING *`, 
        [uid, questionId, languageId, code], 
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            response.status(200).json(results.rows)
        }
    );
}

const deleteSubmission = (request, response) => {
    const { submissionId } = request.body
    pool.query('SELECT * FROM submissions WHERE id = $1', [submissionId],
        (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.rows.length == 0) {
                return response.status(404).json({ error: 'Not Found' });
            }
            pool.query('DELETE FROM submissions WHERE id = $1 RETURNING *', [submissionId], 
                (error, res) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return response.status(500).json({ error: 'Internal Server Error' });
                    }
                    response.status(200).json(res.rows)
                }
            );
        }
    )
}

module.exports = {
    getSubmissions,
    getOneSubmission,
    getSubmissionsByFirebaseId: getAllSubmissionsByUser,
    upsertSubmission,
    deleteSubmission,
  }
  