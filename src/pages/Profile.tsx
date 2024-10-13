import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Query, Models, ID } from "appwrite";
import { account, databases } from "../appwrite";

interface UserProfile {
	$id: string;
	userId: string;
	email: string;
	name: string;
	familyId?: string; // Pode ser opcional se o usuário não tiver família
}

interface Family {
	$id: string;
	familyName: string;
}

const Profile: React.FC = () => {
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [family, setFamily] = useState<Family | null>(null);
	const [newFamilyName, setNewFamilyName] = useState<string>("");
	const [familyMembers, setFamilyMembers] = useState<UserProfile[]>([]);
	const navigate = useNavigate();

	// Função utilitária para mapear Document para UserProfile
	const documentToUserProfile = (doc: Models.Document): UserProfile => {
		return {
			$id: doc.$id,
			userId: doc.userId as string,
			email: doc.email as string,
			name: doc.name as string,
			familyId: doc.familyId as string,
		};
	};

	// Função utilitária para mapear Document para Family
	const documentToFamily = (doc: Models.Document): Family => {
		return {
			$id: doc.$id,
			familyName: doc.familyName as string,
		};
	};

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				// Obtém o usuário autenticado
				const user = await account.get();

				// Busca o perfil do usuário
				const profileResponse = await databases.getDocument(
					import.meta.env.VITE_APPWRITE_DATABASE_ID,
					import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
					user.$id
				);

				// Mapeia o documento para UserProfile
				const userProfileData = documentToUserProfile(profileResponse);
				setUserProfile(userProfileData);

				// Se o usuário pertence a uma família, busca os dados da família e dos membros
				if (userProfileData.familyId) {
					// Buscar dados da família
					const familyResponse = await databases.getDocument(
						import.meta.env.VITE_APPWRITE_DATABASE_ID,
						import.meta.env.VITE_APPWRITE_FAMILIES_COLLECTION_ID,
						userProfileData.familyId
					);
					setFamily(documentToFamily(familyResponse));

					// Buscar membros da família
					const membersResponse = await databases.listDocuments(
						import.meta.env.VITE_APPWRITE_DATABASE_ID,
						import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
						[Query.equal("familyId", userProfileData.familyId)]
					);

					// Mapeia os documentos para UserProfile
					const familyMembersData: UserProfile[] = membersResponse.documents.map(
						(doc: Models.Document) => documentToUserProfile(doc)
					);
					setFamilyMembers(familyMembersData);
				}
			} catch (error) {
				console.error("Erro ao buscar dados do usuário:", error);
				navigate("/"); // Redireciona para o login se houver erro
			}
		};

		fetchUserProfile();
	}, []);

	// Função para criar uma nova família
	const handleCreateFamily = async () => {
		if (!newFamilyName) {
			alert("Insira um nome para a família.");
			return;
		}

		try {
			// Cria uma nova família
			const newFamily = await databases.createDocument(
				import.meta.env.VITE_APPWRITE_DATABASE_ID,
				import.meta.env.VITE_APPWRITE_FAMILIES_COLLECTION_ID,
				ID.unique(),
				{
					familyName: newFamilyName,
				}
			);

			// Atualiza o perfil do usuário com o familyId da nova família
			await databases.updateDocument(
				import.meta.env.VITE_APPWRITE_DATABASE_ID,
				import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
				userProfile!.$id,
				{ familyId: newFamily.$id }
			);

			// Atualiza o estado local
			setUserProfile({ ...userProfile!, familyId: newFamily.$id });
			setFamily(documentToFamily(newFamily));
			setFamilyMembers([userProfile!]); // O único membro inicialmente é o próprio usuário

			alert("Família criada com sucesso!");
		} catch (error) {
			console.error("Erro ao criar a família:", error);
		}
	};

	if (!userProfile) {
		return <div>Carregando perfil...</div>;
	}

	return (
		<div>
			<h1>Perfil do Usuário</h1>
			<p>
				<strong>Nome:</strong> {userProfile.name}
			</p>
			<p>
				<strong>Email:</strong> {userProfile.email}
			</p>

			<h2>Família</h2>
			{family ? (
				<div>
					<p>
						<strong>Nome da Família:</strong> {family.familyName}
					</p>
					<p>
						<strong>Membros da Família:</strong>
					</p>
					<ul>
						{familyMembers.map((member) => (
							<li key={member.$id}>{member.name || member.email}</li>
						))}
					</ul>
				</div>
			) : (
				<div>
					<h3>Criar Nova Família</h3>
					<input
						type="text"
						value={newFamilyName}
						onChange={(e) => setNewFamilyName(e.target.value)}
						placeholder="Nome da Família"
					/>
					<button onClick={handleCreateFamily}>Criar Família</button>
				</div>
			)}
		</div>
	);
};

export default Profile;
