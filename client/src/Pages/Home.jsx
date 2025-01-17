import axios from 'axios';
import { useEffect, useState } from 'react';

function Home()
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

     const [isSubscribed, setIsSubscribed] = useState(false);

     const handleSave = () => {
    console.log(`Subscription status saved: ${isSubscribed ? 'Subscribed' : 'Unsubscribed'}`);
    // Add logic to save subscription status to the server or local storage
  };


  const handleToggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  async function logout() {
     try {
      const response = await axios.post("auth/logout");
      alert(response.data); 
      window.location.replace('/auth');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  async function handleSendArticles() {
    // API call or function to send 5 random articles
    console.log("Sending 5 random articles...");

     try {
      const response = await axios.post("content/sendMail");
      alert(response.data); // Display success message
    } catch (error) {
      console.error("Error sending mail:", error);
      alert("Failed to send mail. Please try again.");
    }
  };

    useEffect(() => {
        axios
            .get('/checkAuth?', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                setIsAuthenticated(true);
                console.log('user is logged in');
                } else {
                    setIsAuthenticated(false);
                    window.location.replace('/auth');
                }
                setLoading(false);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setLoading(false);
            });


    }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>You are not authorized to view this page. Please Login</div>;



    return (<>
         <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="../../croc-ico.png" alt="Company Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-semibold">NewsGator</h1>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={logout}>Logout</button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold mb-6">Newsletter Subscription</h2>
        
        {/* Subscribe/Unsubscribe Toggle */}
        <div className="mb-6">
          <label className="text-lg font-semibold">Subscribe to Newsletter:</label>
          <div 
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${isSubscribed ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={handleToggle}
          >
            <div className={`w-6 h-6 bg-white rounded-full transform transition-all duration-300 ${isSubscribed ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg mb-6 hover:bg-gray-600 transition-colors"
        >
          Save
        </button>

        {/* Send Articles Button */}
        <button
          onClick={handleSendArticles}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send 5 Random Articles
        </button>
      </main>
    </div>
    </>);
}

export default Home;    