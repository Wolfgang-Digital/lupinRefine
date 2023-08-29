import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ addTask }) => {
	const [title, setTitle] = useState('');
	const [duration, setDuration] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && duration && date) {
			const newTask = {
				title,
				duration,
				date,
			};
			addTask(newTask);
			setTitle('');
			setDuration('');
			setDate('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<TextField
				label='Duration'
				value={duration}
				onChange={(e) => setDuration(e.target.value)}
				required
			/>
			<TextField
				label='Date'
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>
			<Button type='submit' variant='contained' color='primary'>
				Add Task
			</Button>
		</form>
	);
};

export default TaskForm;
