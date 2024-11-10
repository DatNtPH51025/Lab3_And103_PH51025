const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

const COMMON = require('./COMMON');
const uri = COMMON.uri;
const mongoose = require('mongoose');
const userModel = require('./userModel');
const apiMobile = require('./api');

app.use('/api', apiMobile);
app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let users = await userModel.find();

    console.log(users);

    res.send(users);

})

app.post('/add_user', async (req, res) => {
    await mongoose.connect(uri);
    let use = req.body;
    console.log(use)
    let kq = await userModel.create(use);
    console.log(kq);
    let users = await userModel.find();
    res.send(users);
});

app.delete('/xoa/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        const result = await userModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send('Không tìm thấy người dùng để xóa');
        }
        res.send('Xóa thành công');
    } catch (error) {
        res.status(500).send('Lỗi xóa người dùng: ' + error.message);
    }
});

app.put('/update/:ten', async (req, res) => {
    try {
        let tenUser = req.params.ten;
        console.log('Tên cần cập nhật:', tenUser);
        let tenUserMoi = tenUser + ' Haha';
        const result = await userModel.updateOne({ ten: tenUser }, { ten: tenUserMoi });
        if (result.matchedCount === 0) {
            return res.status(404).send('Không tìm thấy người dùng để cập nhật');
        }
        let users = await userModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Lỗi cập nhật người dùng: ' + error.message);
    }
});

// app.get('/add_user', async (req, res) => {
//     await mongoose.connect(uri);

//     let use = {
//         "ma": "PH49065",
//         "ten": "Minh",
//         "tuoi": 21,
//         "lop": "MD19304",
//         "nganh": "UDPM"
//     }
    
//     console.log(use)

//     let kq = await userModel.create(use);
//     console.log(kq);

//     let users = await userModel.find();

//     res.send(users);

// })

// app.get('/xoa/:id', async (req, res) => {
//     await mongoose.connect(uri);

//     let id = req.params.id;
//     console.log(id);

//     // xu ly loi khi id khong dung
//     await userModel.deleteOne({_id: id});

//     res.redirect('../')
// }) 

// app.get('/update/:ten', async (req, res) => {
//     await mongoose.connect(uri);

//     console.log('Ket noi DB thanh cong');

//     let tenUser = req.params.ten;
//     console.log(tenUser);

//     let tenUserMoi = tenUser + ' Phien ban moi 2024';

//     await userModel.updateOne({ten: tenUser}, {ten: tenUserMoi});

//     let tens = await userModel.find({});

//     res.send(tens);
// })
