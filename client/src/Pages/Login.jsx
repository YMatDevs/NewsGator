


function Login()
{
    return (<>
        <form className="login-form" method="post" action='/user/login'>
            <h1>Welcome Back</h1>
            <input type='email' placeholder="Email Address" required autoComplete="off" name="email"></input>
            <input type='password' placeholder="Password" required name="password"></input>
            <input type='submit' value='Sign in'></input>
            <p><i>Dont have an account?</i></p>
            <a href="/signup">Sign up</a>
        </form>
    </>);
}

export default Login;