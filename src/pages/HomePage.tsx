import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import events from "../assets/images/eventos.jpg";
import groups from "../assets/images/grupo.jpg";
import outputs from "../assets/images/reunio-grupal.jpg";
// Define your RootState type if not already globally available
// import { RootState } from '../redux/store'; // Example path

const HomePage: React.FC = () => {
  // Assuming RootState is defined elsewhere and accessible
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user); // Keep for debugging if needed

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      {" "}
      {/* Slightly lighter background, increased vertical padding */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {" "}
        {/* Slightly wider max-width, added lg padding */}
        {/* Hero Section */}
        <div className="text-center mb-16">
          {" "}
          {/* Added bottom margin */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            {" "}
            {/* Larger font sizes, improved leading, bottom margin */}
            Conecta y Crece: Donde tus Pasiones se Transforman en Amistades
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {" "}
            {/* Larger text size on md, bottom margin, centered max-width */}
            Descubre eventos, grupos y actividades para compartir y disfrutar
            con personas que comparten tus intereses.
          </p>
          <div className="flex justify-center gap-6">
            {" "}
            {/* Increased gap */}
            <Link
              to="/login"
              className="inline-block bg-black text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out shadow-md" // Larger padding, rounded-lg, added font-semibold, transition, shadow
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="inline-block bg-red-400 text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out shadow-md" // Changed orange color to 500, text-white, larger padding, rounded-lg, added font-semibold, transition, shadow
            >
              Regístrate
            </Link>
          </div>
        </div>
        {/* Central Illustration */}
        <div className="mt-12 flex justify-center mb-16">
          {" "}
          {/* Increased top and bottom margin */}
          <img
            src={events}
            alt="Ilustración comunidad"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl" // Increased max-width on different breakpoints
          />
        </div>
        {/* Features Section */}
        <div className="mt-16">
          {" "}
          {/* Adjusted top margin */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {" "}
            {/* Larger heading, centered, bottom margin */}
            Descubre lo que puedes hacer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {" "}
            {/* Increased gap */}
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
              {" "}
              {/* More padding, more rounded, larger shadow, hover effect, flex column, center text */}
              {/* Icon or small image can go here */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {" "}
                {/* Larger title, bottom margin */}
                Conéctate con tus Intereses
              </h3>
              <p className="text-base text-gray-700 mb-6">
                {" "}
                {/* Larger text, changed text color, bottom margin */}
                Explora actividades según tus hobbies y pasatiempos favoritos y
                encuentra personas con las mismas pasiones.
              </p>
              {/*               <Link
                to="/register" // Consider linking to a discover/groups page
                className="mt-auto inline-block bg-red-600 text-white text-md font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow" // Red 600, rounded-lg, added font-semibold, transition, shadow, mt-auto for sticky button at bottom
              >
                Explorar grupos
              </Link> */}
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
              {" "}
              {/* More padding, more rounded, larger shadow, hover effect, flex column, center text */}
              {/* Icon or small image can go here */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {" "}
                {/* Larger title, bottom margin */}
                Participa en Eventos Locales
              </h3>
              <p className="text-base text-gray-700 mb-6">
                {" "}
                {/* Larger text, changed text color, bottom margin */}
                Descubre qué está pasando en tu zona y asiste a actividades que
                te apasionan para conocer gente nueva.
              </p>
              {/*               <Link
                to="/register" // Consider linking to a discover/events page
                className="mt-auto inline-block bg-teal-600 text-white text-md font-semibold px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out shadow" // Teal 600, rounded-lg, added font-semibold, transition, shadow, mt-auto
              >
                Ver eventos
              </Link> */}
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
              {" "}
              {/* More padding, more rounded, larger shadow, hover effect, flex column, center text */}
              {/* Icon or small image can go here */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {" "}
                {/* Larger title, bottom margin */}
                Crea y Comparte tus Propias Experiencias
              </h3>
              <p className="text-base text-gray-700 mb-6">
                {" "}
                {/* Larger text, changed text color, bottom margin */}
                Organiza tus propios eventos y crea grupos para reunir a
                personas con intereses afines y hacer crecer la comunidad.
              </p>
              {/*            <Link
                to="/register" // Consider linking to a create event/group page
                className="mt-auto inline-block bg-indigo-600 text-white text-md font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow" // Indigo 600, rounded-lg, added font-semibold, transition, shadow, mt-auto
              >
                Publicar actividad
              </Link> */}
            </div>
          </div>
        </div>
        {/* Latest Events Section (as in Example 3) */}
        <div className="mt-20">
          {" "}
          {/* Increased top margin */}
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {" "}
            {/* Larger heading, centered, bottom margin */}
            Últimos Eventos Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {" "}
            {/* Increased gap */}
            {/* Event Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col">
              {" "}
              {/* More padding, more rounded, larger shadow, hover effect, flex column */}
              <img
                src={groups}
                alt="Evento 1"
                className="rounded-lg mb-4 object-cover h-48 w-full" // More rounded image, bottom margin, object-cover, fixed height, full width
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {" "}
                {/* Larger title, bottom margin */}
                Caminata al aire libre
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {" "}
                {/* Added flex-grow to push button down */}
                Únete a nuestra caminata ecológica este fin de semana. Conecta
                con amantes de la naturaleza en un entorno único.
              </p>
              {/*               <Link
                to="/register" // Consider linking to the actual event page
                className="mt-auto inline-block bg-orange-500 text-white text-md font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out shadow text-center" // Orange 500, rounded-lg, added font-semibold, transition, shadow, mt-auto, centered text
              >
                Inscribirse
              </Link> */}
            </div>
            {/* Event Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col">
              {" "}
              {/* More padding, more rounded, larger shadow, hover effect, flex column */}
              <img
                src={outputs}
                alt="Evento 2"
                className="rounded-lg mb-4 object-cover h-48 w-full" // More rounded image, bottom margin, object-cover, fixed height, full width
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {" "}
                {/* Larger title, bottom margin */}
                Tarde de guitarra y fogata
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {" "}
                {/* Added flex-grow */}
                Comparte una velada musical al atardecer y conoce nuevos amigos
                entre acordes y canciones en un ambiente relajado.
              </p>
              {/*               <Link
                to="/register" // Consider linking to the actual event page
                className="mt-auto inline-block bg-orange-500 text-white text-md font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out shadow text-center" // Orange 500, rounded-lg, added font-semibold, transition, shadow, mt-auto, centered text
              >
                Inscribirse
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
