const { deleteTest, getTestById, editTest } = require("@/controller/testcontroller");

export async function DELETE(req,context)
{
    const {id} = await context.params;
    return deleteTest(id);
}
export async function GET(req,context)
{
    const {id} = await context.params;
    return getTestById(id);
}
export async function PUT(req,context)
{
    const {id} = await context.params;
    return editTest(req,id);
}