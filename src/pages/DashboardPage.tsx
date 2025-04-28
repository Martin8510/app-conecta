import React from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { CalendarDays, Share2, ArrowRight, MoreHorizontal } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) return null;

  const upcomingEvents = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200",
      title: "Taller de Cocina Italiana",
      details: "15 Nov | Centro Comunitario",
      time: "18:00 - 20:00",
      category: "Gastronomía",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200",
      title: "Club de Lectura Semanal",
      details: "17 Nov | Online",
      time: "19:00 - 21:00",
      category: "Literatura",
    },
  ];

  const myGroups = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1575728256505-768d29253f00?w=200",
      name: "Amantes del Senderismo",
      details: "Próxima salida: Sábado",
      members: 24,
      newPosts: 3,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=200",
      name: "Fotografía Urbana",
      details: "Reunión: Jueves 7 PM",
      members: 18,
      newPosts: 5,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      fecha: "Dom 27 Abril",
      evento: "Casa del Dragón",
      lugar: "Cali, CO",
      asistentes: 20,
      image: "https://i.ibb.co/2tTWtXr/house-of-dragon.jpg",
      status: "confirmado",
    },
    {
      id: 2,
      fecha: "Lun 28 Abril",
      evento: "Paradigma en analítica",
      lugar: "Lima, PE",
      asistentes: 36,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
      status: "pendiente",
    },
  ];

  const renderCalendar = () => {
    const today = new Date();
    const days = 30;
    const currentDay = today.getDate();

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Noviembre 2024
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <CalendarDays className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-3">
          {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {Array.from({ length: days }).map((_, i) => (
            <div
              key={i}
              className={`rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer 
                ${
                  i + 1 === currentDay
                    ? "bg-indigo-600 text-white font-bold shadow-md"
                    : i + 1 < currentDay
                    ? "text-gray-400"
                    : "text-gray-700 hover:bg-gray-100"
                }
                transition-all duration-200`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors">
            <span>Ver todos los eventos</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            ¡Hola, <span className="text-indigo-600">{user.userName}</span>! 👋
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mt-2 max-w-2xl mx-auto">
            Aquí tienes un resumen de tu actividad, grupos y próximos eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lateral */}
          <div className="space-y-6">
            {renderCalendar()}

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Próximos eventos
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.details}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tus grupos
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {myGroups.map((group) => (
                  <div
                    key={group.id}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {group.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {group.details}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">
                          {group.members} miembros
                        </span>
                        {group.newPosts > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {group.newPosts} nuevos
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Principal */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Actividades recientes
                </h2>
                <div className="flex items-center gap-3">
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    Todos
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    Confirmados
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    Pendientes
                  </button>
                </div>
              </div>
              <div className="space-y-5">
                {recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all bg-gradient-to-r from-white to-gray-50"
                  >
                    <div className="flex items-start gap-4 w-full sm:w-auto">
                      <img
                        src={act.image}
                        alt={act.evento}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 truncate">
                            {act.evento}
                          </p>
                          {act.status === "confirmado" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Confirmado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pendiente
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {act.fecha} • {act.lugar}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-normal">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(act.asistentes, 5))].map(
                            (_, i) => (
                              <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 1}`}
                                alt={`Asistente ${i + 1}`}
                                className="w-6 h-6 rounded-full border-2 border-white"
                              />
                            )
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {act.asistentes} asistentes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
                  <span>Cargar más actividades</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sección adicional de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    Eventos este mes
                  </h3>
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-1">
                  +2 respecto al mes pasado
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    Grupos activos
                  </h3>
                  <div className="p-2 rounded-lg bg-green-50 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-500 mt-1">
                  3 con actividad reciente
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    Próximos eventos
                  </h3>
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500 mt-1">
                  1 requiere confirmación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
