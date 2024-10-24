

"use client";
import React, { useEffect, useState } from 'react';

export default function GestionProjet() {
  const [nomProjet, setNomProjet] = useState('');
  const [id,  setProjectId] = useState(null);
  const [Project, setProject] = useState([]);
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
const[essai ,setessai]=useState(false);
  const [nomDev, setNomDev] = useState('');
const [nomConcepteur, setNomConcepteur] = useState('');
const [nomDesigner, setNomDesigner] = useState('');

  

  const [tacheDev, setTacheDev] = useState('développeur');
  const [deadlineDev, setDeadlineDev] = useState('');
  const [devs, setDevs] = useState([]);
  const [IDdevs, setIDdevs] = useState('');
  
  const [tacheConcepteur, setTacheConcepteur] = useState('concepteur');
  const [deadlineConcepteur, setDeadlineConcepteur] = useState('');
  const [IDConcepteur, setIDConcepteur] = useState('');
  
  const [tacheDesigner, setTacheDesigner] = useState('designer');
  const [deadlineDesigner, setDeadlineDesigner] = useState('');
  const [IDDesigner, setIDDesigner] = useState('');
  
  const [message, setMessage] = useState('');


  const fetchAvailableUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/available/project');
      const data = await response.json();
      setDevs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs disponibles:', error);
    }
  };

  useEffect(() => {
    fetchAvailableUsers();
  }, []);
  
    const fetchProject = async () => {
      try {
        const response = await fetch('http://localhost:3001/projet/liste/table_project');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projetData = {
      id,
      nomProjet,
      description,
      dateDebut,
      dateFin,
      taches: [
        { nom: tacheDev, deadline: deadlineDev,id:IDdevs,description:description },
        { nom: tacheConcepteur, deadline: deadlineConcepteur,id:IDConcepteur,description:description },
        { nom: tacheDesigner, deadline: deadlineDesigner,id:IDDesigner,description:description },
      ],
    };

    try {
      const response = await fetch('http://localhost:3001/projet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projetData),
      });

      if (response.ok) {
        setMessage('Projet et tâches ajoutés avec succès');
  
        setNomProjet('');
        setDescription('');
        setDateDebut('');
        setDateFin('');
  
        setDeadlineDev('');
        setessai(false);
        setDeadlineConcepteur('');
        setNomDev('');
        
        setNomConcepteur('');
        setNomDesigner('');
        setDeadlineDesigner('');
        setIDDesigner('');
        setIDConcepteur('');
        setIDdevs('');
        setProjectId(null);
        fetchProject();

      } else {
        setMessage('Erreur lors de l\'ajout du projet et des tâches');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de l\'envoi des données');
    }
  };

  const handleDelete = async (project_id) => {
    try {
      const response = await fetch(`http://localhost:3001/projet/${project_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Utilisateur supprimé avec succès');
        fetchProject();
      } else {
        setMessage('Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      setMessage('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  
 
const modifier = (project) => {
  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  };

  setessai(true);
  setNomProjet(project.project_name);
  setDescription(project.description);
  setDateDebut(formatDateTimeLocal(project.start_date));
  setDateFin(formatDateTimeLocal(project.end_date));
  setProjectId(project.project_id);


  const devTask = project.tasks.find(task => task.task_name === 'développeur');
  const concepteurTask = project.tasks.find(task => task.task_name === 'concepteur');
  const designerTask = project.tasks.find(task => task.task_name === 'designer');

  // Développeur
  setIDdevs(devTask ? devTask.user_id : '');
  setDeadlineDev(devTask ? formatDateTimeLocal(devTask.deadline) : '');
  setNomDev(devTask ? devs.find(user => user.user_id === devTask. userUserId)?.name || 'Utilisateur inconnu' : '');

  // Concepteur
  setIDConcepteur(concepteurTask ? concepteurTask.user_id : '');
  setDeadlineConcepteur(concepteurTask ? formatDateTimeLocal(concepteurTask.deadline) : '');
  setNomConcepteur(concepteurTask ? devs.find(user => user.user_id === concepteurTask.userUserId)?.name || 'Utilisateur inconnu' : '');
  console.log(devTask.user_id, devs);

  // Designer
  setIDDesigner(designerTask ? designerTask.user_id : '');
  setDeadlineDesigner(designerTask ? formatDateTimeLocal(designerTask.deadline) : '');
  setNomDesigner(designerTask ? devs.find(user => user.user_id === designerTask.userUserId)?.name || 'Utilisateur inconnu' : '');
};




  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Ajouter un nouveau projet</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Projet */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nom du projet :</label>
          <input
            type="text"
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date de début :</label>
          <input
            type="datetime-local"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date de fin :</label>
          <input
            type="datetime-local"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>

    
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Deadline Développeur :</label>
          <input
            type="datetime-local"
            value={deadlineDev}
            onChange={(e) => setDeadlineDev(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Responsable Développeur :</label>
          <div className="mb-4">
          <select
  value={IDdevs}
  onChange={(e) => setIDdevs(e.target.value)}
  className="w-full p-2 border rounded text-gray-800"
>
  <option value="">{nomDev || "Sélectionner un développeur"}</option>
  {devs.length === 0 ? (
    <option value="">aucun</option>
  ) : (
    devs.map((user) => (
      <option key={user.user_id} value={user.user_id}>
        {user.name}
      </option>
    ))
  )}
</select>

</div>

        </div>

        {/* Tâche Concepteur */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Deadline Concepteur :</label>
          <input
            type="datetime-local"
            value={deadlineConcepteur}
            onChange={(e) => setDeadlineConcepteur(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Responsable Concepteur :</label>
          <select
            value={IDConcepteur}
            onChange={(e) => setIDConcepteur(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
           
          >
       <option value="">{nomConcepteur || "Sélectionner un concepteur"}</option>
            {devs.length === 0 ? (
              <option value="">aucun</option>
            ) : (
              devs.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Tâche Designer */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Deadline Designer :</label>
          <input
            type="datetime-local"
            value={deadlineDesigner}
            onChange={(e) => setDeadlineDesigner(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Responsable Designer :</label>
          <select
            value={IDDesigner}
            onChange={(e) => setIDDesigner(e.target.value)}
            className="w-full p-2 border rounded text-gray-800"
    
          >
             <option value="">{nomDesigner || "Sélectionner un designer"}</option>
            {devs.length === 0 ? (
              <option value="">aucun</option>
            ) : (
              devs.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Ajouter le projet et les tâches
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}


      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 className="text-2xl font-bold mb-4 text-blue-500">Project</h2>

  <table className="min-w-full bg-white border-collapse">
    <thead>
      <tr>
        <th className="border px-4 py-2 text-left">Nom du projet</th>
        <th className="border px-4 py-2 text-left">Description</th>
        <th className="border px-4 py-2 text-left">Date de début</th>
        <th className="border px-4 py-2 text-left">Date de fin</th>
        <th className="border px-4 py-2 text-left">Tâches</th>
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {Project.length === 0 ? (
        <tr>
          <td className="border px-4 py-2 text-center" colSpan={6}>
            Aucun projet disponible ce mois-ci
          </td>
        </tr>
      ) : (
        Project.map((project) => (
          <tr key={project.project_id} className="border-t">
            <td className="border px-4 py-2">{project.project_name}</td>
            <td className="border px-4 py-2">{project.description}</td>
            <td className="border px-4 py-2">{project.start_date}</td>
            <td className="border px-4 py-2">{project.end_date}</td>
            <td className="border px-4 py-2">
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.task_id}>
                    {task.task_name} - Assigné à : {task.user ? task.user.name : 'Non assigné'}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => modifier(project)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(project.project_id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}
