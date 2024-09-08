const asyncHandler= (requestHandler)=> async(req, res, next)=>{
    try{
        await requestHandler(req, res, next);
    }
    catch(err){
        console.log("Error caught in asyncHandler", err);
        
        res.status(err.statusCode || 500)
        .json({
            error: err
        });
    }
};

export default asyncHandler;