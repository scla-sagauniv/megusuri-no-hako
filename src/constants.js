import { v4 } from 'uuid';

export const defaultTaskDefinition = {
  todo: {
    id: 1,
    tasks: [
      {
        deadline: '2022-09-23',
        description: '',
        priority: '3',
        title: '未着手のタスク',
        uuid: v4(),
      },
    ],
    title: '未着手',
  },
  progress: {
    id: 2,
    tasks: [
      {
        deadline: '2022-09-22',
        description: '',
        priority: '2',
        title: '進行中のタスク',
        uuid: v4(),
      },
    ],
    title: '進行中',
  },
  done: {
    id: 4,
    tasks: [
      {
        deadline: '2022-09-24',
        description: '',
        priority: '1',
        title: '完了のタスク',
        uuid: v4(),
      },
    ],
    title: '完了',
  },
};
