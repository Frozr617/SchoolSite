CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY,
    title_text VARCHAR(150),
    desc_text TEXT,
    main_text TEXT,
    preview_photo IMAGE,
    photo1 IMAGE,
    photo2 IMAGE,
    photo3 IMAGE,
    photo4 IMAGE,
    day INT,
    month INT,
    year INT
);

