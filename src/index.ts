import express from "express"; 
import  jwt  from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config"; 
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json()); 


app.post("/api/v1/signup" , async (req, res) =>{
 const username = req.body.username;
 const password = req.body.password;

  try {
    await UserModel.create({
        username: username,
        password: password
    })
    res.json({
        message: "User signed up"
    })
      
  } catch(e) {
       res.json(411).json({
        message: "User already exists"
       })
  }
})

app.post("/api/v1/signin" ,async (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
     username,
     password
  })

  if(existingUser) {
     const token = jwt.sign({
         id: existingUser.id
     }, JWT_PASSWORD)

      res.json({
         token 
      })
  } else{
       res.status(403).json({
         message : "Incorrect credentials"
       })
  }


 
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type; 

 await ContentModel.create({
      link, 
      type,
      //@ts-ignore
      userId: req.userId,
      tags: [],

  })
   res.json({
     message: "Content added"
  }) 


})

app.get("/api/v1/content", userMiddleware, async (req, res) =>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId : userId
    })
     res.json({
       content
     })
})


app.listen(3000); 

