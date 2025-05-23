
export const cookieData = (req,res)=>{
  res.cookie("name","vivek")
  console.log(req.cookies)
  res.send("done")
}