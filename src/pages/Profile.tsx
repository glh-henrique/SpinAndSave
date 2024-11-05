import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [aptoNumber, setAptoNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfileDoc = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
          [Query.equal("userId", user!.id)]
        );

        if (userProfileDoc.documents.length > 0) {
          const userProfileData = userProfileDoc.documents[0];
          setAptoNumber(userProfileData.aptoNumber);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className=" flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfil</h2>

        {user ? (
          <div className="text-left space-y-4">
            <p className="text-lg"><strong>Nome:</strong> {user.name}</p>
            <p className="text-lg"><strong>E-mail:</strong> {user.email}</p>
            <p className="text-lg"><strong>Número do Apartamento:</strong> {aptoNumber ? aptoNumber : 'Não tem nada cadastrado'}</p>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Carregando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
