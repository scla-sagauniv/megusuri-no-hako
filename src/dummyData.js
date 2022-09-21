import { v4 as uuidv4 } from 'uuid';

const dummyData = [
  {
    id: 'test1',
    title: '未着手',
    tasks: [
      {
        id: 'test1_1',
        title: 'Reactの勉強',
        priority: 1,
      },
      {
        id: 'test1_2',
        title: 'Youtubeで勉強',
        priority: 2,
      },
      {
        id: 'test1_3',
        title: '散歩',
        priority: 3,
      },
    ],
  },
  {
    id: 'test2',
    title: '進行中',
    tasks: [
      {
        id: 'test2_1',
        title: '読書',
        priority: 4,
      },
      {
        id: 'test2_2',
        title: '転職活動',
      },
    ],
  },
  {
    id: 4,
    title: '完了',
    tasks: [
      {
        id: 'test3_1',
        title: 'コーディング',
      },
    ],
  },
];

export default dummyData;
