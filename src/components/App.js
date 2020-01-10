import React, { Component } from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {sort} from "../actions";
import styled from "styled-components";

const  ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const  HeaderContainer = styled.div`
  font-family: Roboto;
  background-color: #B37B2D;
  text-align: "center";
`

const  TrelloContainer = styled.div`  
  background-image: url("https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png");
  background-position: 100% 15px;
  background-repeat: no-repeat;
  background-size: 80px 30px;
  cursor: pointer;
  display: inline-block;
  height: 30px;
  width: 80px 30px;
  padding: 15px;
  opacity: 0.5 px;
  padding-left: 100px;
`

const  BoardContainer = styled.div`
  font-family: Roboto;
  padding: 15px;
`

class App extends Component {

  onDragEnd = (result) => {
    const { destination, source, draggableId, type} = result;

    if(!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      ))
  }

  render() {
    const { lists } = this.props;
    return(
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <div className="App">
          <HeaderContainer>
            <TrelloContainer></TrelloContainer>
          </HeaderContainer> 
          <BoardContainer>
            <h2 style={{color: "white", fontWeight: "bold"}}>My firts Trello Board</h2>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <ListContainer
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                >
                  { lists.map((list, index) => 
                      <TrelloList 
                        listId={list.id} 
                        key={list.id} 
                        title = {list.title} 
                        cards = {list.cards}
                        index={list.index}
                      />)  }
                  {provided.placeholder}
                  <TrelloActionButton addType={'list'}/>
                </ListContainer>
              )}
            </Droppable> 
          </BoardContainer>  
        </div>
      </DragDropContext>  
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists 
})

export default connect (mapStateToProps)(App);
