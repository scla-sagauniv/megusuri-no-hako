import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dummyData from '../dummyData';
import Card from '../components/Card';
import { useFireStore } from '../hooks/useFireStore';

const Main = () => {
  //const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
  const [data, setData] = useState(dummyData);
  const { getFireStoreList, data: testData } = useFireStore();

  useEffect(() => {
    getFireStoreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('title', testData);
    // console.log('tasks', testData.tasks);
  }, [testData]);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    //動かし始めたcolumnが違うcolumnに移動したら
    if (source.droppableId !== destination.droppableId) {
      //動かし始めたcolmunの配列の番号を取得
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      console.log(sourceColIndex);
      //動かし終わったcolmunの配列の番号を取得
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId,
      );
      console.log(destinationColIndex);

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      //動かし始めたタスクに所属していたカラムの中のタスクをすべて取得
      //後でsplice関数でその動かし始めたタスクを削除するため
      //sourceTaskに配列をコピーしておく(破壊操作を後でするため)
      const sourceTask = [...sourceCol.tasks];
      console.log(sourceTask);

      //動かし始めたタスクに所属していたカラムの中のタスクをすべて取得
      //後でsplice関数でその動かし始めたタスクを追加するため
      const destinationTask = [...destinationCol.tasks];
      console.log(destinationTask);

      //前のカラムから削除
      const [removed] = sourceTask.splice(source.index, 1);
      //後のカラムに追加
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    } else {
      //同じカラム内でのタスクの入れかえ
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];
      console.log(sourceCol);
      const sourceTask = [...sourceCol.tasks];
      console.log(sourceTask);
      const [removed] = sourceTask.splice(source.index, 1);
      sourceTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;

      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='trello'>
        {data.map((section) => {
          const id = section.id;
          return (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div
                  className={id !== 4 ? 'trello-section' : 'done-section'}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className={
                      id !== 4
                        ? 'trello-section-title'
                        : 'done-top-section-title'
                    }
                  >
                    {section.title}
                  </div>
                  <div className='trello-section-content'>
                    {section.tasks.map((tasks, index) => {
                      const priority = tasks.priority;
                      return (
                        <Draggable
                          draggableId={tasks.id}
                          index={index}
                          key={tasks.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.3' : '1',
                              }}
                            >
                              <Card priority={priority} title={tasks.title} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    <div
                      className={id !== 4 ? '' : 'done-botomm-section-title'}
                    ></div>

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Main;
