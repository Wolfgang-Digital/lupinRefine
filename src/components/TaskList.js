import React from 'react';

const TaskList: React.FC<{ activeTab: number }> = ({ activeTab }) => {
	// Sample task data for different tabs
	const tasksByTab = [
		[
			{ id: 1, title: 'Caseys Furniture', description: 'Social' },
			{ id: 2, title: 'The Night Sky', description: 'PPC' },
			{ id: 3, title: 'The Night Sky', description: 'PPC' },
			{ id: 4, title: 'HomeSecure', description: 'Analytics' },
			{ id: 5, title: 'Zurich Insurance', description: 'Analytics' },
			{ id: 6, title: 'Littlewoods', description: 'PPC' },
		],
		[
			{ id: 1, title: 'ZERO', description: 'Analytics' },
			{ id: 2, title: 'Actavo', description: 'PPC' },
			{ id: 3, title: 'Arnotts', description: 'PPC' },
			{ id: 4, title: 'Bannon Jewellers', description: 'Analytics' },
			{ id: 5, title: 'BodySlims', description: 'PPC' },
			{ id: 6, title: 'Corcorans Furniture', description: 'Analytics' },
		],
		[
			{ id: 1, title: 'Wolfgang Digital', description: 'Admin' },
			{
				id: 2,
				title: 'Wolfgang Digital',
				description: 'Employer Branding',
			},
			{ id: 3, title: 'Wolfgang Digital', description: 'Reforest' },
			{ id: 4, title: 'Wolfgang Digital', description: 'Trainer Role' },
			{
				id: 5,
				title: 'Wolfgang Digital',
				description: 'Wolfgang Academy',
			},
			{
				id: 6,
				title: 'Wolfgang Digital',
				description: 'Wolfgang Marketing',
			},
		],
	];

	// Get the tasks for the current active tab
	const tasks = tasksByTab[activeTab - 1] || [];

	return (
		<div>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						<strong>{task.title}</strong>
						<p>{task.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
