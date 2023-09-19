const { foodModel } = require("../models/foods-model");
const multer = require("multer");



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path+extname(file.originalname));
    }
})

const updateImg = async (req, res) => {
  try {
    const { id } = req.params;
    const img=req.body.img;
    // const updateImg=await foodModel.findByIdAndUpdate(id,{img:req.file.filename},{new:true})
    console.log(req.body.file);
    
    res.status(200).send({
      status: true,
      message: "updated!!",
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};



module.exports = {
 
    updateImg,
  storage
};
