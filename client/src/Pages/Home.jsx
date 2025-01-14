import ResponsiveAppBar from "../components/AppBar";

function Home()
{
    return (<>
        <ResponsiveAppBar />
        <form method="post" action="/user/sendMail">
            <input type="email" name="email" placeholder="Enter Email id" />
            <input type="submit" value='Send Mail'/>
        </form>
    </>);
}

export default Home;