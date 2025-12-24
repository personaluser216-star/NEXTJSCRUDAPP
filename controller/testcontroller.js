import { connectMongoDB } from "@/lib/mongodb";
import testmodel from "@/models/testmodel";
import { NextResponse } from "next/server";

export const addTest = async (req)=>
{
    try {
        const {course,description} = await req.json();
        if(!course || !description)
        {
            return NextResponse.json(
                {
                    message:"course and description are required."
                },{status:400}
            );
        }
        await connectMongoDB();

        await testmodel.create({course,description});
        return NextResponse.json(
            {
                message:"test Data are added succesfully"
            },
            {status:200}
        );
    } catch (error) {
        return NextResponse.json({
            message:"Failed to test"
        },{status:500})
    }
}
export const getTest = async()=>
{
    try {
        await connectMongoDB();
        const result = await testmodel.find().sort({
            createdAt:-1,
        });
        return NextResponse.json({data:result},{status:200})
    } catch (error) {
        return NextResponse.json({message:500})
    }
}
export  const deleteTest = async (id) =>
{
    try {
        await connectMongoDB();
        await testmodel.findByIdAndDelete(id);

        return NextResponse.json({message:"test data delete succesfully.."},{status:200})
    } catch (error) {
        return NextResponse.json({message:"does not deleted data"})
    }
}
export const getTestById = async (id)=>
{
    try {
        await connectMongoDB();
        const data = await testmodel.findById(id);

        if(!data)
        {
            return NextResponse.json({message:"test data not found"})
        }
        return NextResponse.json({data},{status:200})
    } catch (error) {
        return NextResponse.json({message:"does not get data by Id"})
    }
}
export const editTest = async(req,id)=>
{
    try {
        const {course,description} = await req.json()
        if(!course || !description)
        {
            return NextResponse.json({message:"course and description are required.."},{status:400})

        }
        await connectMongoDB();

        await testmodel.findByIdAndUpdate(id,{
            course,description
        },
    {
        new:true
    });
    return NextResponse.json({
        message:"test data updated succesfully"
    },{status:200})
    } catch (error) {
       return NextResponse.json({
        message:"failed to update data"
       },{status:500}) 
    }
}