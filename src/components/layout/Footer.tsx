import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, PenSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <PenSquare size={24} className="text-purple-400" />
              <span className="ml-2 text-xl font-bold">Lumenis</span>
            </div>
            <p className="text-gray-300">
              Criando lindas lembranças memorias e vendendo podutos de qualidade desde 2025.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition duration-150">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition duration-150">
                  Comprar
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition duration-150">
                  Minha conta
                </Link>
              </li>
              <li>
                <Link to="/page-editor" className="text-gray-300 hover:text-white transition duration-150">
                  Criar pagina de homenagem
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150">
                  Politica de envio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150">
                Politica de extorno
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150">
                  Politica de Privacidade
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nossos Contatos</h3>
            <address className="not-italic space-y-2 text-gray-300">
              <p className="flex items-center">
                <MapPin size={18} className="mr-2 text-purple-400" />
                123 Lumenis Street, Digital
              </p>
              <p className="flex items-center">
                <Phone size={18} className="mr-2 text-purple-400" />
                +55 (41) 9 9123-4567
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 text-purple-400" />
                LumenisContato@Lumenis.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Lumenis - Lembranças e Memórias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;