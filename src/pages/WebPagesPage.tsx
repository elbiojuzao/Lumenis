import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, EyeOff, Plus, Calendar, Clock, ExternalLink } from 'lucide-react';
import { mockWebPages, WebPage } from '../data/products';
import { useAuth } from '../contexts/AuthContext';

const WebPagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [userPages, setUserPages] = useState<WebPage[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentUser) {
      // Filter pages for current user
      const pages = mockWebPages.filter(page => page.userId === currentUser.id);
      setUserPages(pages);
    }
  }, [currentUser]);
  
  const handleTogglePublic = (pageId: string) => {
    setUserPages(pages => 
      pages.map(page => 
        page.id === pageId 
          ? { ...page, isPublic: !page.isPublic } 
          : page
      )
    );
  };
  
  const handleDeletePage = (pageId: string) => {
    setUserPages(pages => pages.filter(page => page.id !== pageId));
    setShowConfirmDelete(null);
  };
  
  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Minhas homenagens</h1>
          <Link 
            to="/page-editor"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-150 flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Criar nova homenagem
          </Link>
        </div>
        
        {userPages.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Homenagens
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ultima atualização
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userPages.map(page => (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={page.imageSrc} 
                              alt={page.title} 
                              className="h-10 w-10 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{page.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {page.content.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          page.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {page.isPublic ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {new Date(page.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {new Date(page.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-3">
                          {page.isPublic && (
                            <a 
                              href={page.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                              title="View page"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button 
                            onClick={() => handleTogglePublic(page.id)}
                            className={`${
                              page.isPublic ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'
                            }`}
                            title={page.isPublic ? 'Unpublish' : 'Publish'}
                          >
                            {page.isPublic ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <Link 
                            to={`/page-editor/${page.id}`}
                            className="text-purple-600 hover:text-purple-800"
                            title="Edit page"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => setShowConfirmDelete(page.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete page"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Delete confirmation */}
                        {showConfirmDelete === page.id && (
                          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="p-3">
                              <p className="text-sm text-gray-700 mb-2">Excluir esta homengaem?</p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setShowConfirmDelete(null)}
                                  className="inline-flex justify-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() => handleDeletePage(page.id)}
                                  className="inline-flex justify-center px-3 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none"
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Não temos nem uma homenagem ainda.</h2>
            <p className="text-gray-600 mb-6">
              Crie sua primeira Homenagem.
            </p>
            <Link 
              to="/page-editor"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
            >
              <Plus size={18} className="mr-2" />
              Criar sua primeira homenagem.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebPagesPage;