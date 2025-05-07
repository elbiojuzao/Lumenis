import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockWebPages } from '../data/products';

const PublicWebPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      const userPage = mockWebPages.find(p => p.isPublic && p.url === `/users/${username}`);
      
      if (userPage) {
        setPage(userPage);
      }
      
      setLoading(false);
    }, 500);
  }, [username]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!page) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pagina não encontrada</h1>
        <p className="text-gray-600 mb-8 text-center">
          A pagina que você procura não existe.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
        >
          Retornar ao inicio
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="h-60 md:h-80 overflow-hidden">
        <img 
          src={page.imageSrc} 
          alt={page.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg -mt-20 p-8 relative">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{page.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{page.content}</p>
          </div>
        </div>
        
        {/* Additional sections could be added here */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Esta homenagem é criada pelo Lumenis page builder.
          </p>
          <a href="/" className="text-sm text-purple-600 hover:text-purple-800">
            Crie sua homenagem →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicWebPage;