import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";

const Main = () => {
	//const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
	const [data, setData] = useState(dummyData);

	//質問１.resultは引数ですか？(中身はdraggableId。Trueつまりresultが存在する場合？)
	const onDragEnd = result => {
		console.log(result);
		//質問２.このif文の処理内容について(予想：result.destinationがfalseだったらreturn?)
		if (!result.destination) return;
		const { source, destination } = result;

		//動かし始めたcolumnが違うcolumnに移動したら
		if (source.droppableId !== destination.droppableId) {
			//動かし始めたcolmunの配列の番号を取得
			const sourceColIndex = data.findIndex(e => e.id === source.droppableId);
			console.log(sourceColIndex);
			//動かし終わったcolmunの配列の番号を取得
			const destinationColIndex = data.findIndex(
				e => e.id === destination.droppableId
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
			const sourceColIndex = data.findIndex(e => e.id === source.droppableId);
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
	const todoNameRef = useRef();
	const [count, setCount] = useState(0);
	const handleAddTodo = () => {
		const name = todoNameRef.current.value;
		setCount(count + 1);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='trello'>
				{data.map(section => (
					<Droppable key={section.id} droppableId={section.id}>
						{provided => (
							<div
								className='trello-section'
								ref={provided.innerRef}
								{...provided.droppableProps}>
								<div className='trello-section-title'>
									{section.title} <button onClick={handleAddTodo}> + </button>
								</div>
								<input type='text' ref={todoNameRef} />
								<div className='trello-section-content'>
									{section.tasks.map((tasks, index) => (
										<Draggable
											draggableId={tasks.id}
											index={index}
											key={tasks.id}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														...provided.draggableProps.style,
														opacity: snapshot.isDragging ? "0.3" : "1"
													}}>
													<Card>{tasks.title}</Card>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							</div>
						)}
					</Droppable>
				))}
			</div>
		</DragDropContext>
	);
};

export default Main;
