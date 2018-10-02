INSERT INTO users
    (auth_id, icon)
VALUES
    ($1, $2)
    returning *;