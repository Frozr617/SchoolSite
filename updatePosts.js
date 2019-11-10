const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./posts.db', sqlite.OPEN_READ, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected');
});
function updatePosts() {
    
}
