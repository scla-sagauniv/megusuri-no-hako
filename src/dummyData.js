import { v4 as uuidv4 } from 'uuid';

const dummyData = [
  {
    id: 'test1',
    title: '未着手',
    tasks: [
      {
        id: 'test1',
        title: 'Reactの勉強',
        priority: 1,
      },
      {
        id: 'test2',
        title: 'Youtubeで勉強',
        priority: 2,
      },
      {
        id: 'test3',
        title: '散歩',
        priority: 3,
      },
    ],
  },
  {
    id: 'test1',
    title: '進行中',
    tasks: [
      {
        id: 'test4',
        title: '読書',
        priority: 4,
      },
      {
        id: 'test5',
        title: '転職活動',
      },
    ],
  },
  {
    id: 4,
    title: '完了',
    tasks: [
      {
        id: 'test6',
        title: 'コーディング',
      },
    ],
  },
];

const data = {
  pending: [
    {
      id: 'test',
      title: 'task',
      priority: 3,
    },
    {
      id: 'test',
      title: 'task',
      priority: 3,
    },
  ],
  active: [
    {
      id: 'test',
      title: 'task',
      priority: 3,
    },
  ],
  done: [
    {
      id: 'test',
      title: 'task',
      priority: 3,
    },
  ],
};

export default dummyData;
