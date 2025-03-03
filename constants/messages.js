const successJson = (body, msg) => {
    return {
        body : body,
        message : msg,
        hasError : false
    }
}

const Messages = {
    UserNotFound: 'User not found',
    UserHasLoggedOut: 'This user has logged out',
    UserCreatedSuccessfully: 'User created successfully',
    UserFetchedSuccessfully: 'User fetched successfully',
    UserIsNotVerified: 'User is not verified in the system',
    InvalidCredentials: 'Invalid credentials',
    InvalidEmail: 'Please provide a vaild email',
    UserLogoutSuccessfully: 'User logged out successfully',
    LoginSuccessful: 'Login successful',
    TokenDecodeFailure: 'Unable to find x-token in the headers',
    TokenExpired: 'Your access token has been expired',
    OTPSentSuccessfully: 'Otp has been sent successfully',
    UserHasSuc: 'Otp has been sent successfully',
    OTPNotSentForVerification: 'Please hit send-otp api first',
    OTPExpired: 'Your otp has been expired',
    InvalidOtp: 'The otp is invalid',
    UserIsAlreadyVerified: 'This user is already verified',
    OTPVerifiedSuccessfully: 'Otp verified successfully',
    OTPIsRequired: 'Otp is required for verification',
    EmailIsRequired: 'Email is required',
    EmailSentSuccessfully: 'Email sent successfully',
    UsernameIsRequired: 'Username is required',
    UserUpdatedSuccessfully: 'User updated successfully',
}

const errorJson = (msg) => {
    return {
        body : {},
        message : msg,
        hasError : true
    }
}




module.exports = {
    successJson,
    errorJson, 
    Messages,
}