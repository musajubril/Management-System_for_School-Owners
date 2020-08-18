var express = require('express');
var router = express.Router();
const cors = require('cors')
const getAge = require('get-age')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const key = process.env.SECRET_KEY || 'secret'
router.use(cors())
const Student = require('../models/Students')
const Result = require('../models/Result')
const Teacher = require('../models/Teacher')
const News = require('../models/News')
const User = require('../models/User')
const Bill = require('../models/Bill')
const StudentBill = require('../models/StudentBill')
const Chat = require('../models/Chat')
const Receipt = require('../models/Receipt')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
router.get('/products', (req,res)=>{
  const decode = jwt.verify(req.headers['authorization'],key)
  Product.find({category:'General', category:decode.clas, school_id:decode.school_id})
    .then(products=>{
      res.json(products)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/cart',(req,res)=>{
  const decode = jwt.verify(req.headers['authorization'],key)
  Cart.find({category:'General', category:decode.clas, school_id:decode.school_id, student_id:decode.student_id})
    .then(cart=>res.json(cart))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/product/:product_id',(req,res)=>{
  Product.findOne({product_id: req.params.product_id, school_id:decode.school_id})
    .then(product=>res.json(product))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/cart',async(req,res)=>{
  const total = Number(req.body.price) * Number(req.body.quantity)
  const newCartProduct = new Cart({
    name:req.body.name,
    price:req.body.price,
    detail:req.body.detail,
    category:req.body.category,
    image:req.body.image,
    school_id:req.body.school_id,
    student_id:req.body.student_id,
    quantity:req.body.quantity,
    status:'pending',
    product_id:req.body.product_id,
    total
  })
    newCartProduct.save()
      .then(res.json({msg:'Item Added to cart'}))
})
router.get('/cart/:id',(req,res)=>{
  Cart.findByID({_id:req.params.id})
    .then(cart=>res.json(cart))
})
router.post('/cart/:id',(req,res)=>{
  const total = Number(req.body.price) * Number(req.body.quantity)
  Cart.findByIDAndUpdate({_id:req.params.id}, {
    $set: {
      quantity:req.body.quantity,
      total
    }
  }, {
    new: true,
    runValidators: true,
    upsert: true,
    returnOriginal: false,
    returnNewDocument: true
  }).exec()
    .then(res.json('Item Updated Successfully'))
})
router.delete('/cart/:id',(req,res)=>{
  Cart.findByIDAndDelete({_id:req.params.id})
    .then(res.json({msg:'Item Successfully Deleted'}))
})
router.get('/students',  (req, res) =>{
    var decode = jwt.verify(req.headers['authorization'], key)
    Student.find({school_id:decode.school_id,status:'registered'})
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.get('/student_left',  (req, res) =>{
    var decode = jwt.verify(req.headers['authorization'], key)
    Student.find({school_id:decode.school_id,status:'deleted'})
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.get('/teacher_left',  (req, res) =>{
    var decode = jwt.verify(req.headers['authorization'], key)
    Teacher.find({school_id:decode.school_id,status:'deleted'})
        .then(teachers => res.json(teachers))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.get('/teachers',  (req, res) =>{
    var decode = jwt.verify(req.headers['authorization'], key)
    Teacher.find({school_id:decode.school_id,status:'registered'})
        .then(teachers => res.json(teachers))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/student',async(req,res)=>{
  var age = getAge(req.body.date)
  var student = await Student.find({school_id:req.body.school_id})
  var stud = Number(student.length)
  var sid = stud + 1
  var student_id = req.body.school_id+'_STD_0'+sid
  var newStudent = new Student({
    status:'registered',
    name:req.body.name,
    surname:req.body.surname,
    clas:req.body.clas,
    department:req.body.department,
    gender:req.body.gender,
    religion:req.body.religion,
    date:req.body.date,
    sog:req.body.sog,
    lga:req.body.lga,
    student_id,
    school_id:req.body.school_id,
    address:req.body.address,
    pname:req.body.pname,
    psurname:req.body.psurname,
    email:req.body.email,
    number:req.body.number,
    paddress:req.body.paddress,
    age:age
  })
  newStudent.save()
   .then(student => res.json({msg:student.surname+' '+student.name+"'s Registration Successfully Completed"}))
   .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/teacher',async(req,res)=>{
  var teacher = await Teacher.find({school_id:req.body.school_id})
  var stud = Number(teacher.length) || 0
  var teach = stud + 1

  var teacher_id = 'ID_'+req.body.school_id+'_TCH_0'+teach
  var newTeacher = new Teacher({
    name:req.body.name,
    surname:req.body.surname,
    clas:req.body.clas,
    gender:req.body.gender,
    teacher_id,
    status:'registered',
    school_id:req.body.school_id,
    address:req.body.address,
    email:req.body.email,
    number:req.body.number
  })
  Teacher.findOne({
    clas:req.body.clas,
    status:'registered'
})
    .then(teacher=>{
        if(!teacher){
            Teacher.create(newTeacher)
                .then(teacher => res.json({msg:teacher.surname+' '+teacher.name+"'s Registration Successfully Completed"}))
                .catch(err => res.status(400).json('Error: ' + err))
        }else{
            res.json({error:'A Teacher Has been Placed in '+teacher.clas})
        }
    })
    .catch(err=>{
        res.send('error' + err)
    })

})
router.post('/news',async(req,res)=>{
  var newNews = new News({
    title:req.body.title,
    content:req.body.content,
    school_id:req.body.school_id,
    day:req.body.day,
    month:req.body.month,
    image:req.body.image
  })
  try {
      const news = await newNews.save();
      if (!news) throw Error('Something went wrong when uploading the news');

      res.status(200).json(news);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  })
  router.get('/news', (req,res)=>{
    var decode = jwt.verify(req.headers['authorization'], key)
    News.find({school_id:decode.school_id})
      .sort({date:-1})
    .then(news => res.json(news))
    .catch(err => res.status(400).json('Error: ' + err))
  })
  router.get('/news/:id',(req,res)=>{
    News.findById({_id:req.params.id})
      .then(news=>res.json(news))
      .catch(err => res.status(400).json('Error: ' + err))
  })
  router.post('/news/:id',async(req,res)=>{
    var update = {
      title:req.body.title,
      content:req.body.content,
      image:req.body.image
    }

    try {
        const info = News.findByIdAndUpdate({_id:req.params.id }, {
            $set: update
        }, {
            new: true,
            runValidators: true,
            upsert: true,
            returnOriginal: false,
            returnNewDocument: true
        }).exec()
        if (!info) throw Error('Something went wrong when updating the news');

        res.status(200).json(info);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
  })
router.delete('/news/:id',(req,res)=>{
  News.findByIdAndDelete({_id:req.params.id})
    .then(()=>(res.json('News Deleted')))
})

router.get('/result/:student_id', (req,res)=>{
    Result.find({student_id:req.params.student_id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/student/:student_id', (req,res)=>{
    Student.findOne({student_id:req.params.student_id})
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/teacher/:teacher_id', (req,res)=>{
    Teacher.findOne({teacher_id:req.params.teacher_id})
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/teacher/:teacher_id',(req,res)=>{
    var status = 'deleted'
    var update = {status}
    Teacher.findOneAndUpdate({teacher_id:req.params.teacher_id }, {
        $set: update
    }, {
        new: true,
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec()
    .then(res.json('Teacher Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/updatestudent/:student_id',(req,res)=>{
    var age = getAge(req.body.date)
    var name=req.body.name
    var surname=req.body.surname
    var clas=req.body.clas
    var department=req.body.department
    var gender=req.body.gender
    var religion=req.body.religion
    var date=req.body.date
    var sog=req.body.sog
    var lga=req.body.lga
    var address=req.body.address
    var pname=req.body.pname
    var psurname=req.body.psurname
    var email=req.body.email
    var number=req.body.number
    var paddress=req.body.paddress
    var update={
        name,
        surname,
        clas,
        department,
        gender,
        religion,
        date,
        sog,
        lga,
        address,
        pname,
        psurname,
        email,
        number,
        paddress
    }
    Student.findOneAndUpdate({
        student_id: req.params.student_id
    }, {
        $set: update
    }, {
        new: true,
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec()
    .then(res.json('Teacher Info Updated'))
    .catch(err => res.status(400).json('Error: ' + err))

})
router.post('/updateteacher/:teacher_id',(req,res)=>{
    var name=req.body.name
    var surname=req.body.surname
    var clas=req.body.clas
    var gender=req.body.gender
    var address=req.body.address
    var email=req.body.email
    var number=req.body.number
    var update = {name,surname,clas,gender,address,email,number}
    Teacher.findOne({clas:req.body.clas})
      .then(teacher=>{
        if(!teacher){
          Teacher.findOneAndUpdate({
            teacher_id: req.params.teacher_id
          }, {
            $set: update
          }, {
            new: true,
            runValidators: true,
            upsert: true,
            returnOriginal: false,
            returnNewDocument: true
          }).exec()
          .then(res.json('Teacher Info Updated'))
          .catch(err => res.status(400).json('Error: ' + err))
        }
        else{
          res.json(teacher=>{msg:'A teacher has been registered in'+teacher.clas})
        }
            })
})
router.post('/student/:student_id',(req, res) => {
    var status = 'deleted'
    var update = {status}
    Student.findOneAndUpdate({student_id:req.params.student_id }, {
        $set: update
    }, {
        new: true,
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec()
    .then(res.json('Student Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
  });

  router.get('/1sttermresult/:student_id', (req,res)=>{
  var decode = jwt.verify(req.headers['authorization'],key)
  Result.find({student_id:req.params.student_id,term:'1st Term',school_id:decode.school_id})
  .then(result => res.json(result))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/2ndtermresult/:student_id', (req,res)=>{
  var decode = jwt.verify(req.headers['authorization'],key)
  Result.find({student_id:req.params.student_id,term:'2nd Term',school_id:decode.school_id})
  .then(result => res.json(result))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/3rdtermresult/:student_id', (req,res)=>{
  var decode = jwt.verify(req.headers['authorization'],key)
  Result.find({student_id:req.params.student_id,term:'3rd Term',school_id:decode.school_id})
  .then(result => res.json(result))
  .catch(err => res.status(400).json('Error: ' + err))
})



router.post('/signup', async(req,res)=>{
  const today = new Date()
  var skul = await User.find()
  var school = Number(skul.length) + 1
  var school_id = 'SCH_0'+school
  const userData ={
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      school_id:school_id,
      created:today
  }
  User.findOne({
      email:req.body.email
  })
      .then(user=>{
          if(!user){
              bcrypt.hash(req.body.password,10,(err,hash)=>{
                  userData.password=hash
                  User.create(userData)
                      .then(user=>{
                          res.json({msg:'Sign Up Successful'})
                      })
                      .catch(err=>{
                          res.send('error' + err)
                      })
              })
          }else{
              res.json({error:'User Already exist'})
          }
      })
      .catch(err=>{
          res.send('error' + err)
      })
})

router.post('/login',(req,res)=>{
  User.findOne({email:req.body.email})
      .then(user=>{
          if(user){
              if(bcrypt.compareSync(req.body.password, user.password)){
                  const payload = {
                      _id : user._id,
                      name: user.name,
                      email: user.email,
                      school_id:user.school_id
                  }
                  let token = jwt.sign(payload, key)
                  res.send(token)
              }else{
                  res.json({error: 'Passwords do not match'})
              }
          }else{
              res.json({error: 'User does not exist'})
          }
      })
      .catch(err=>{
          res.send('error' + err)
      })
})
router.post('/bill',async(req,res)=>{
  var decode = jwt.verify(req.headers['authorization'], key)
  var newBill = new Bill({
    clas:req.body.clas,
    fees:req.body.fees,
    uniform:req.body.uniform,
    exerciseBooks:req.body.exerciseBooks,
    pricePerBook:req.body.pricePerBook,
    textBooks:req.body.textBooks,
    school_id:decode.school_id,
    totalTextBookPrice:req.body.totalTextBookPrice
  })
  await Bill.findOne({
    clas:req.body.clas,
    school_id:decode.school_id
})
    .then(bill=>{
        if(!bill){
            Bill.create(newBill)
                .then(bill => {res.json({msg:"Bill for "+bill.clas+" created Successfully",bill})
                console.log(bill)
              })
                .catch(err => res.status(400).json('Error: ' + err))
        }else{
            res.json({error:'A Bill Has been created for '+bill.clas,nothing:{nothing:'empty'}})
        }
    })
    .catch(err=>{
        res.send('error' + err)
    })
})
router.get('/bill',(req,res)=>{
  var decode = jwt.verify(req.headers['authorization'], key)
  Bill.find({school_id:decode.school_id})
  .then(bill => res.json(bill))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/bill/:id',(req,res)=>{
  Bill.findById({_id:req.params.id})
    .then(bill=>res.json(bill))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/bill/:id',async(req,res)=>{
  var update = {
    fees:req.body.fees,
    uniform:req.body.uniform,
    exerciseBooks:req.body.exerciseBooks,
    pricePerBook:req.body.pricePerBook,
    textBooks:req.body.textBooks,
    totalTextBookPrice:req.body.totalTextBookPrice
  }

  try {
      const info = Bill.findByIdAndUpdate({_id:req.params.id }, {
          $set: update
      }, {
          new: true,
          runValidators: true,
          upsert: true,
          returnOriginal: false,
          returnNewDocument: true
      }).exec()
      if (!info) throw Error('Something went wrong when updating the bill');

      res.status(200).json(info);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
})
router.delete('/bill/:id',(req,res)=>{
Bill.findByIdAndDelete({_id:req.params.id})
  .then(()=>(res.json('Bill Deleted')))
})
router.post('/studentbill',async(req,res)=>{
  var decode = jwt.verify(req.headers['authorization'], key)
  var student = await Student.find({school_id:decode.school_id})
  var stud = Number(student.length)
  var sid = stud + 1
  var student_id = decode.school_id+'_STD_0'+sid
  var newReceipt = new Receipt({
    student_id,
    clas:req.body.clas,
    amountPaid:req.body.amountPaid,
    fees:req.body.fees,
    school_id:decode.school_id,
    name:req.body.name,
    surname:req.body.surname,
    schoolName:decode.name
  })
  newReceipt.save()
  var newStudentBill = new StudentBill({
    student_id,
    clas:req.body.clas,
    amountPaid:req.body.amountPaid,
    fees:req.body.fees,
    status:req.body.status,
    school_id:decode.school_id,
    name:req.body.name,
    surname:req.body.surname,
    reg:true
  })
  try {
      const studentBill = await newStudentBill.save();
      if (!studentBill) throw Error('Something went wrong when uploading the studentBill');

      res.status(200).json(studentBill);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
})
router.get('/classbill/:clas',async(req,res)=>{
  await Bill.findOne({clas:req.params.clas})
  .then(bill=>res.json(bill))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/studentbill',(req,res)=>{
  var decode = jwt.verify(req.headers['authorization'], key)
  StudentBill.find({school_id:decode.school_id,status:'debtor'})
  .then(studentBill => res.json(studentBill))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/paid',(req,res)=>{
  var decode = jwt.verify(req.headers['authorization'], key)
  StudentBill.find({school_id:decode.school_id,status:'paid'})
  .then(studentBill => res.json(studentBill))
  .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/studentbill/:student_id',(req,res)=>{
  StudentBill.findOne({student_id:req.params.student_id})
    .then(bill=>res.json(bill))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.get('/receipt/:student_id',(req,res)=>{
  Receipt.find({student_id: req.params.student_id})
  .sort({date:-1})
    .then(receipt=>res.json(receipt))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/studentbill/:student_id',async(req,res)=>{
var decode = jwt.verify(req.headers['authorization'], key)
  var update = {
    clas:req.body.clas,
    amountPaid:req.body.amountPaid,
    fees:req.body.fees,
    status:req.body.status,
    name:req.body.name,
    surname:req.body.surname
  }
  var d = new Date();
  var day = d.getDate()
  var year = d.getFullYear()
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var month = months[d.getMonth()];
  var newReceipt = new Receipt({
    student_id:req.params.student_id,
    clas:req.body.clas,
    paidAmount:req.body.paidAmount,
    fees:req.body.fees,
    school_id:decode.school_id,
    name:req.body.name,
    surname:req.body.surname,
    schoolName:decode.name,
    day,
    month,
    year,
    amountPaid:req.body.amountPaid
  })
  newReceipt.save()
  try {
      const info = StudentBill.findOneAndUpdate({student_id:req.params.student_id }, {
          $set: update
      }, {
          new: true,
          runValidators: true,
          upsert: true,
          returnOriginal: false,
          returnNewDocument: true
      }).exec()
      if (!info) throw Error('Something went wrong when updating the bill');

      res.status(200).json(info);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
})
router.post('/deletebill/:student_id',(req,res)=>{
  StudentBill.findOneAndUpdate({student_id:req.params.student_id}, {
      $set: {reg:false}
  }, {
      new: true,
      runValidators: true,
      upsert: true,
      returnOriginal: false,
      returnNewDocument: true
  }).exec()
  .then(res.json('Bill Deleted'))
})
router.post('/chat',async(req,res)=>{
var date = new Date()
var decode = jwt.verify(req.headers['authorization'], key)
  var newChat = new Chat({
    sender_id:req.body.sender_id,
    message:req.body.message,
    school_id:decode.school_id,
    date,
    name:req.body.name
  })
  try {
      const chat = await newChat.save();
      if (!chat) throw Error('Something went wrong when uploading the chat');

      res.status(200).json(chat);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  })
  router.get('/chat', (req,res)=>{
    var decode = jwt.verify(req.headers['authorization'], key)
    Chat.find({school_id:decode.school_id})
      .sort({date:1})
    .then(chat => res.json(chat))
    .catch(err => res.status(400).json('Error: ' + err))
  })
module.exports = router;
