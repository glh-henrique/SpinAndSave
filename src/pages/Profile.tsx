import React, { useEffect, useState } from 'react';
import { account, databases } from '../appwrite';


const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get();
        const profile = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
          user.$id
        );
        setUserProfile(profile);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      {userProfile ? (
        <div>
          <p><strong>Nome:</strong> {userProfile.name}</p>
          <p><strong>E-mail:</strong> {userProfile.email}</p>
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
