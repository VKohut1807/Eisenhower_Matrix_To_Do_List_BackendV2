const fs = require('fs');
class basicElements {
    fileImgPath = `${__dirname}/../public/img/`
    allowedMimetypes = ["image/png", "image/jpg", "image/jpeg"]

    allowedItem(arrItems, item) {
        return arrItems.includes(item);
    }
    deleteFile(name, path) {
        fs.unlink(path + name, err => {
            if (err) {
                console.log(err);
            }
            console.log(`File ${name} has been Deleted`);
        })
    }
    randomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}
module.exports = new basicElements();