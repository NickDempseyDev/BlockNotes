import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Editor from '../components/Editor';

const HomeScreen = () => {

	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState();
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchPrivateDate = async () => {
		  const config = {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		  };
	
		  try {
			const { data } = await axios.get("/api/notes/getallnotes", config);
			await setNotes(data.data);
			await setCurrentNote(data.data[0]);
		  } catch (error) {
			localStorage.removeItem("authToken");
			setError(true);
		  }
		};
	
		fetchPrivateDate();
		

	  }, []);

	return (
		<div>
			
			{error ? <button onClick={() => {window.location = "/login"}}>Login</button> : <Editor note={currentNote}/>}
		</div>
	)
}

export default HomeScreen;