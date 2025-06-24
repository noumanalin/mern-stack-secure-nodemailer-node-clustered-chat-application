


export const register = async (req, res)=> {
    try {
        return res.status(200).json({success:true, message:"testing register route"})
    } catch (error) {
        console.log(`❌ auth register controller error = ${error}`)
        return res.status(500).json({success:false, error:error.message||error})
    }
}