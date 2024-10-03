import path from "path"
// define addres / path of root folder (mendefinisikan jalan)
const ROOT_DIRECTORY = `${path.join( __dirname,`../`)}`
// __dirname : mendapatkan posisi dari folder pada file ini (config.ts) -> pada folder "src"
// "../" : mundur satu folder ke belakang


export { ROOT_DIRECTORY }