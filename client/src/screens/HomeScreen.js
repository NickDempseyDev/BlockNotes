import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Editor from '../components/Editor';

const HomeScreen = () => {

	const [notes, setNotes] = useState([{blocks: ""}]);
	const [currentNote, setCurrentNote] = useState();
	const [error, setError] = useState(false);

	useEffect(async () => {
		const fetchPrivateDate = async () => {
		  const config = {
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		  };
	
		  try {
			const data = (await axios.get("/api/notes/getallnotes", config)).data.data;
			console.log("GET ", data);
			setNotes(data);
			setCurrentNote(data[1]);
		  } catch (error) {
			localStorage.removeItem("authToken");
			setError(true);
		  }
		};
	
		fetchPrivateDate();
		

	  }, []);

	return (
		<div>
			{error ? <button onClick={() => {window.location = "/login"}}>Login</button> : currentNote ? <Editor note={currentNote}/> : null}
		</div>
	)
}

export default HomeScreen;