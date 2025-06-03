import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  Heart,
  Code,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  HelpCircle,
  Shield,
} from "lucide-react";

const Footer: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const communityLinks = [
    { name: "Eventos destacados", href: "#featured" },
    { name: "Grupos populares", href: "#groups" },
    { name: "Foros de discusión", href: "#forums" },
    { name: "Crea tu evento", href: "#create-event" },
  ];

  const companyLinks = [
    { name: "Sobre nosotros", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Carreras", href: "#careers" },
    { name: "Socios", href: "#partners" },
  ];

  const supportLinks = [
    { name: "Centro de ayuda", href: "#help" },
    { name: "Preguntas frecuentes", href: "#faq" },
    { name: "Políticas", href: "#policies" },
    { name: "Reportar problema", href: "#report" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg mr-3">
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
              <span className="text-xl font-bold text-white">InterConnect</span>
            </div>
            <p className="text-sm">
              Conectando personas con intereses comunes a través de eventos y
              grupos locales.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces de comunidad */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-400" />
              Comunidad
            </h3>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de empresa */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              Empresa
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de soporte */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-orange-400" />
              Soporte
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {user && (
              <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold mr-2">
                  {user.userName.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm">Hola, {user.userName}</span>
              </div>
            )}

            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} InterConnect. Todos los derechos
              reservados.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center text-xs">
              <Shield className="h-4 w-4 mr-1 text-gray-400" />
              <a href="#" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-white transition-colors">
                Términos
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <Code className="h-4 w-4 mr-1" />
              Hecho con pasión en Latinoamérica
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
