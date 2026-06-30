const loginUser = async (req,res) => {
    const {email,password} = req.body;
    res.json({
        message: `User: ${email} Password: ${password} Login Successfully.`,
        success: true
    })
}

module.exports = {
    loginUser
}