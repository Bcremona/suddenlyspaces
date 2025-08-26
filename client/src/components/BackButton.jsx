import logo from "../assets/back-svgrepo-com.svg";

export default function BackButton() {

    const goBack = () => {
        window.history.back();
    };

  return (
    <button
      onClick={goBack}
      className="fixed top-20 left-4 z-50 text-white bg-gray-100 hover:bg-gray-200 hover:scale-110 transition-all px-3 py-1 rounded-md backdrop-blur-md"
    >
        <img src={logo} alt="Back" className="h-5 w-5 inline mr-1" />
    </button>
  );
}