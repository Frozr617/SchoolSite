CREATE TABLE IF NOT EXISTS posts (
    post_number INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    main_text TEXT,
    photos TEXT
) ENGINE=INNODB;

INSERT INTO posts (post_number, title, main_text, photos) VALUES ( 3, 'TEst', 'This is a testing inserting in database', '/home/max/Documents/Coding/Java/Projects/Presentation-Automation-Script/thing.jpeg
' );
