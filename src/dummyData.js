import { v4 as uuidv4 } from "uuid";

const dummyData = [
	{
		id: uuidv4(),
		title: "今からやること",
		tasks: [
			{
				id: uuidv4(),
				title: "Reactの勉強",
				priority: 1
			},
			{
				id: uuidv4(),
				title: "Youtubeで勉強",
				priority: 2
			},
			{
				id: uuidv4(),
				title: "散歩",
				priority: 3
			}
		]
	},
	{
		id: uuidv4(),
		title: "今後やること",
		tasks: [
			{
				id: uuidv4(),
				title: "読書",
				priority: 4
			},
			{
				id: uuidv4(),
				title: "転職活動"
			}
		]
	},
	{
		id: uuidv4(),
		title: "終わったこと",
		tasks: [
			{
				id: uuidv4(),
				title: "コーディング"
			}
		]
	}
];

export default dummyData;
