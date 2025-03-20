
import { NextRequest, NextResponse} from "next/server"
import sharp from "sharp"
import fs from "fs"
import path from "path"
export  async function POST(req:NextRequest){
  
    try{
        const {imagePath}= await req.json()
        if(!imagePath){
            return NextResponse.json({error:"No image path provided"})
        }
        const inputFilePath=path.join(process.cwd(),"public",imagePath)
        const outputDir=path.join(process.cwd(),"public","dzi_output")
        if (!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir,{recursive:true})

        }
        const dziFilePath=path.join(outputDir,"image")
        await sharp(inputFilePath)
            .tile({
                size:256,
                overlap:2,
                layout:"dz"
            })
            .toFile(dziFilePath)
            return NextResponse.json({
                success:true,
                dziPath:"/dzi_output/image.dzi",
            })
    } catch(error){
        console.log("error generating DZI:",error);
        return NextResponse.json({error:"Internal server error"})
    }
}