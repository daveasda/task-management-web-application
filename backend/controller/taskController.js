import db from '../config/db.js';

export const createTask = async (req, res) => {

    const { title, description, status, created_by, assigned_to, created_at } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO task (title, description, status, created_by, assigned_to, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, status, created_by, assigned_to, created_at]
        );

        res.status(201).json({
            task: result.rows[0],
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

export const viewUserTasks = async (req, res) => {

    const {userId} = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM task WHERE created_by = $1 ORDER BY created_at ASC',
            [userId]
        );
        res.status(200).json({
            task: result.rows
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

export const updateTaskStatus = async (req, res) => {

    const { taskId } = req.params;
    const { status } = req.body;

    try {

        const result = await db.query(
            `UPDATE task
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, taskId]
        );

        res.status(200).json({
            task: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};