import Navbar from "./layouts/Navbar";
import Home from "./components/Home";
import ThreeCard from "./components/ThreeCard";
import Register from "./components/Register";
import DownloadApp from "./components/DownloadApp";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Home />
        <ThreeCard />
        <div className="h-10 bg-white" />
        <Register/>
        <DownloadApp/>
        <Footer/>
      </main>
    </div>
  );
}

export default App;