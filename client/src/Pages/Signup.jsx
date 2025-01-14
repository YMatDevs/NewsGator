
function Signup()
{
    return (<>
        <form class="signup-form">
            <h2>Sign Up</h2>
            <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
            </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Create a password" required />
            </div>
            <button type="submit">Sign Up</button>
            <div class="options">
            <span>Already have an account?</span>
            <a href="/login">Login</a>
            </div>
        </form>
    </>);
}

export default Signup;