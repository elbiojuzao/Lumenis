import React, { useState } from 'react';
import { Search, Calendar, ExternalLink, Eye, EyeOff } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { mockWebPages } from '../../data/products';

const WebPages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [webPages, setWebPages] = useState(mockWebPages);
  
  // Filter web pages based on search term
  const filteredPages = webPages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Toggle page visibility
  const handleToggleVisibility = (pageId: string) => {
    setWebPages(pages => 
      pages.map(page => 
        page.id === pageId 
          ? { ...page, isPublic: !page.isPublic } 
          : page
      )
    );
  };
  
  return (
    <AdminLayout currentPage="web-pages">
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">User Web Pages</h1>
          
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pages by title or content"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          {/* Web Pages Table */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {filteredPages.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPages.map((page) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          User ID: {page.userId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {new Date(page.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleToggleVisibility(page.id)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              page.isPublic ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {page.isPublic ? (
                              <>
                                <Eye size={12} className="mr-1" />
                                Public
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} className="mr-1" />
                                Draft
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {page.isPublic && (
                            <a 
                              href={page.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                            >
                              View Page
                              <ExternalLink size={14} className="ml-1" />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No web pages found matching your criteria</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Note: For content moderation purposes, this view is read-only with limited actions. Content management must follow the platform's guidelines.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WebPages;