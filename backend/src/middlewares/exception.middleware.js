export default function exceptionHandler(error, req, res, next) {
   
    res.status(error.status || 500).json({
        error: error.message,
        name: error.name
    })
}