import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  PlusCircle,
  MessageSquare,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  LayoutDashboard,
  Globe,
} from "lucide-react";
import { useAuthUser } from "../features/auth";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const { logout } = useAuthUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const currentUser = {
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    userName: "Ana Pérez",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-orange-300 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Inicio"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              InterConnect
            </span>
          </Link>

          {isAuthenticated ? (
            <>
              {/* Search Bar - Centered */}
              <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar eventos, grupos o personas..."
                    className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 border-l border-gray-300">
                    <MapPin className="h-5 w-5 text-gray-400 ml-2" />
                    <span className="ml-1 text-sm text-gray-500">Cali</span>
                  </div>
                </form>
              </div>

              {/* Navigation Icons */}
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-orange-600 relative transition-colors"
                  aria-label="Crear grupo"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Crear grupo</span>
                </button>

                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-orange-600 relative transition-colors"
                  aria-label="Mensajes"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Mensajes</span>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                </button>

                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-orange-600 relative transition-colors"
                  aria-label="Notificaciones"
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notificaciones</span>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                </button>

                {/* Language Selector */}
                <div className="relative hidden lg:block">
                  <button
                    className="flex items-center text-gray-600 hover:text-orange-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Idioma"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="ml-1 text-sm">ES</span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-1 focus:outline-none group"
                    aria-expanded={isDropdownOpen}
                    aria-label="Menú de usuario"
                  >
                    <img
                      src={currentUser.profilePicture}
                      alt={`Perfil de ${currentUser.userName}`}
                      className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-orange-200 transition-colors"
                    />
                    <span className="hidden lg:inline-block text-sm font-medium text-gray-700">
                      {currentUser.userName}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 bg-transparent z-40"
                        onClick={closeDropdown}
                        aria-hidden="true"
                      ></div>
                      <div
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100"
                        onMouseLeave={closeDropdown}
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser.userName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            ana.perez@ejemplo.com
                          </p>
                        </div>

                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2 text-gray-500" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          Mi perfil
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <Settings className="h-4 w-4 mr-2 text-gray-500" />
                          Configuración
                        </Link>
                        <Link
                          to="/help"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                          Ayuda
                        </Link>

                        <div className="border-t border-gray-100 my-1"></div>

                        <button
                          onClick={() => {
                            closeDropdown();
                            logout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <button className="hidden sm:flex items-center text-gray-600 hover:text-orange-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-sm">ES</span>
              </button>

              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-orange-600 hover:to-pink-600 shadow-sm transition-all transform hover:scale-105"
              >
                Regístrate
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Search - Only visible on small screens */}
        {isAuthenticated && (
          <div className="pb-3 px-2 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
