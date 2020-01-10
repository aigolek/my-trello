import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`

const TrelloList = ({title, cards, listId, index}) => {

  return(
    <Draggable draggableId={String(listId)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps} 
          ref={provided.innerRef} 
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listId)} type="card">
            {provided => (
              <div
                {...provided.droppableProps} 
                ref={provided.innerRef} 
              >
                <h3>{title}</h3>
                {cards.map((card, index) => (
                  <TrelloCard 
                    id={card.id} 
                    key={card.id} 
                    text={card.text} 
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <TrelloActionButton 
                  listId={listId} 
                  addType={'card'}
                />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  )
};
  
export default TrelloList;