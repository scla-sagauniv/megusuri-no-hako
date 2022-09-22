import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../components/Card';
// import { defaultTaskDefinition } from '../constants';
// import { useFireStore } from '../hooks/useFireStore';

const Main = ({ setShowDeleteModal, selectTaskId, data, setData }) => {
  //const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
  // const [data, setData] = useState();
  // const { getFireStoreList, data: userList } = useFireStore();

  useEffect(() => {
    // getFireStoreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log('userList', userList);
  //   // setData(userList);
  //   // console.log('tasks', userList.tasks);
  // }, [userList]);

  useEffect(() => {
    // firestoreのデータが入ったことを確認
    console.log('firestore', data);
  }, [data]);

  const onDragEnd = (result) => {
    console.log(result);

    //行き先が不明な場合終了する
    if (!result.destination) return;
    const { source, destination } = result;

    //動かし始めたcolumnが違うcolumnに移動したら
    if (source.droppableId !== destination.droppableId) {
      //動かし始めたcolmunの配列の番号を取得
      const sourceColIndex = Object.keys(data).find(
        (key) => key === source.droppableId,
      );

      //動かし終わったcolmunの配列の番号を取得
      const destinationColIndex = Object.keys(data).find(
        (key) => key === destination.droppableId,
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      //動かし始めたタスクに所属していたカラムの中のタスクをすべて取得
      //後でsplice関数でその動かし始めたタスクを削除するため
      //sourceTaskに配列をコピーしておく(破壊操作を後でするため)
      const sourceTask = [...sourceCol.tasks];

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
      const sourceColIndex = Object.keys(data).find(
        (key) => key === source.droppableId,
      );
      const sourceCol = data[sourceColIndex];

      const sourceTask = [...sourceCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      sourceTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;

      setData(data);
    }
  };

  //データが存在しない時はフォームを表示しない（空タグを表示）
  if (!data) return <></>;

  return (
    <>
      {data ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='trello'>
            {Object.keys(data).map((key) => {
              const section = data[key];
              const id = section.id;
              return (
                <Droppable key={key} droppableId={key}>
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
                        {section.tasks.map((task, index) => {
                          console.log('inner map', task);
                          return (
                            <Draggable
                              draggableId={String(task.uuid)}
                              index={index}
                              key={task.uuid}
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
                                  <Card
                                    id={task.uuid}
                                    priority={task.priority}
                                    title={task.title}
                                    handleClick={setShowDeleteModal}
                                    selectTask={selectTaskId}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <div
                          className={
                            id !== 4 ? '' : 'done-botomm-section-title'
                          }
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
      ) : (
        <h1>処理中</h1>
      )}
    </>
  );
};

export default Main;
