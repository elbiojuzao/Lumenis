import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerification, currentUser } = useAuth();
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }
    
    const verifyToken = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Verification failed');
      }
    };
    
    verifyToken();
  }, [searchParams, verifyEmail]);
  
  const handleResendVerification = async () => {
    if (!currentUser || isResending) return;
    
    setIsResending(true);
    try {
      await resendVerification();
      setError('A new verification email has been sent');
      setTimeout(() => setIsResending(false), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend verification email');
      setIsResending(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === 'verifying' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Verificando seu email...</h2>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Email verified successfully!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Seu email foi verificado. Você agora pode usar tudo que esta disponivel para sua conta.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Ir para perfil.
              </button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Falha na verificação de Email.</h2>
              <p className="mt-2 text-sm text-red-600">{error}</p>
              {currentUser && !currentUser.emailVerificado && (
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="mt-6 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                      Enviando...
                    </>
                  ) : (
                    'Resend verification email'
                  )}
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Retornarao inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;