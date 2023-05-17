import Message from "../models/Message.js";
export const addMessage=async(req,res,next)=>{
    try{
       const {from,to,message}=req.body;
       const data=await Message.create({
        message:{text:message},
        users:[from,to],
        sender:from,
       });
       if(data) return res.json({msg:"Message Added Successfully"})
       return res.json({msg:"failed to add message"})
    }
    catch(err){
        next(err)
    }
}
export const getAllMessage=async(req,res,next)=>{
    try{
        const {from,to}=req.body;
        const messages=await Message.find({
            users:{
                $all:[from,to]
            }
        })
        .sort({updatedAt:1})
        const projectedMessages=messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            }
        })
        res.json(projectedMessages)
    }
    catch(err){
        next(err)
    }
}	
