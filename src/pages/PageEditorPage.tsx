import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image, Type, Eye, ArrowLeft } from 'lucide-react';
import { mockWebPages } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { nanoid } from 'nanoid';

const PageEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Image options for demo
  const sampleImages = [
    'https://images.pexels.com/photos/3194518/pexels-photo-3194518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];
  
  useEffect(() => {
    if (id) {
      // Find the page by ID
      const page = mockWebPages.find(p => p.id === id);
      
      if (page) {
        setTitle(page.title);
        setContent(page.content);
        setImageSrc(page.imageSrc);
        setIsPublic(page.isPublic);
      } else {
        navigate('/my-pages');
      }
    } else {
      // New page - set defaults
      setTitle('');
      setContent('');
      setImageSrc(sampleImages[0]);
      setIsPublic(false);
    }
  }, [id, navigate]);
  
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for your page');
      return;
    }
    
    if (!content.trim()) {
      alert('Please enter some content for your page');
      return;
    }
    
    if (!imageSrc) {
      alert('Please select an image for your page');
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      if (id) {
        // Update existing page
        const updatedPage = {
          id,
          userId: currentUser?.id || '',
          title,
          content,
          imageSrc,
          isPublic,
          createdAt: mockWebPages.find(p => p.id === id)?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          url: `/users/${currentUser?.username}`
        };
        
        // In a real app, save to database
        console.log('Updated page:', updatedPage);
      } else {
        // Create new page
        const newPage = {
          id: nanoid(),
          userId: currentUser?.id || '',
          title,
          content,
          imageSrc,
          isPublic,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          url: `/users/${currentUser?.username}`
        };
        
        // In a real app, save to database
        console.log('Created page:', newPage);
      }
      
      setIsSaving(false);
      navigate('/my-pages');
    }, 1000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/my-pages')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-1" />
            Voltar para minhas paginas
          </button>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                previewMode 
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Eye size={16} className="mr-2" />
              {previewMode ? 'Sair Pré-visualização' : 'Pré-visualização'}
            </button>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white flex items-center ${
                isSaving 
                  ? 'bg-purple-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Salvar pagina
                </>
              )}
            </button>
          </div>
        </div>
        
        {previewMode ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-60 overflow-hidden">
              <img 
                src={imageSrc} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{title || 'Untitled Page'}</h1>
              <div className="prose max-w-none">
                {content ? (
                  <p className="text-gray-700 whitespace-pre-line">{content}</p>
                ) : (
                  <p className="text-gray-400 italic">No content yet...</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Type size={16} className="mr-2" />
                Page Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your page"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="p-6 border-b">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Image size={16} className="mr-2" />
                Cover Image
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sampleImages.map((src, index) => (
                  <div 
                    key={index}
                    onClick={() => setImageSrc(src)}
                    className={`relative cursor-pointer rounded-md overflow-hidden h-24 ${
                      imageSrc === src ? 'ring-2 ring-purple-500' : 'hover:opacity-80'
                    }`}
                  >
                    <img 
                      src={src} 
                      alt={`Option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {imageSrc === src && (
                      <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-b">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Page Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="Write about yourself, your business, or your portfolio..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
            
            <div className="p-6">
              <div className="flex items-center">
                <input
                  id="public"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="public" className="ml-2 block text-sm text-gray-700">
                  Marcar como pagina publica
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Quando publicar, esta pagina podera ser acessanda utilizando o link: 
                <span className="font-mono text-gray-700">
                  /users/{currentUser?.username}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditorPage;