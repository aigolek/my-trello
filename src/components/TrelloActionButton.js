import React from "react";
import Icon from "@material-ui/core/Icon";
import TextArea from "react-textarea-autosize";
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import { connect} from "react-redux";
import { addList, addCard } from "../actions";

class TrelloActionButton extends React.Component{
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({formOpen: true})
  }  
  closeForm = e => {
    this.setState({formOpen: false})
  } 
  handleInputChange = e => {
    this.setState({text: e.target.value})
  }
  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if(text){
      this.setState({text: ""});
      dispatch(addList(text));

    }
    return;
  }
  handleAddCard = () => {
    const { dispatch, listId } = this.props;
    const { text } = this.state;

    if(text){
      this.setState({text: ""});
      dispatch(addCard(listId, text)); 

    }
    return;
  }
  renderAddButton = () => {
    const { addType } = this.props;
    const addButtonOpacity = addType === 'list' ? 1 : 0.5;
    const addButtonColor = addType === 'list' ? "white" : "inherit";
    const addButtonBackgroundColor = addType === 'list' ? "rgba(0,0,0,.15)" : 0.5;
    return( 
      <div 
      onClick = {this.openForm}
        style = {{
          ...styles.addButtonContainer, 
          opacity: addButtonOpacity, 
          color: addButtonColor, 
          backgroundColor: addButtonBackgroundColor
        }} >
        <Icon>add</Icon>
        <p>Add another {addType}</p>
      </div>
    )
  }
  renderForm = () => {
    const { addType } = this.props;
    const placeHolder = addType === 'list' ? "Enter list title..." : "Enter a title for this card..." ;
    const addButtonText = addType === 'list' ? "Add List" : "Add Card" ;
    return(
      <div>
        <Card style={{
            overflow:"visible", 
            minHeight:85, 
            minWidth:272, 
            padding:"6px 8px 2px"
          }}>
          <TextArea 
            placeholder={placeHolder}
            autoFocus  
            onBlur = {this.closeForm}
            value = {this.state.text}
            onChange = {this.handleInputChange}
            style = {{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
            }}
          />
        </Card>  
        <div style = {styles.formButtonGroup}>
          <Button 
            onMouseDown={addType === 'list' ? this.handleAddList : this.handleAddCard}
            variant="contained" 
            style={{color: "white", backgroundColor: "#5aac44"}}
          > {addButtonText}  
          </Button>
          <Icon style={{marginLeft: 8, cursor:"pointer"}} >close</Icon>
        </div>
      </div>  
    )
  }
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  addButtonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup:{
    display: "flex",
    inline: "center",
    marginTop: 8
  }
}

export default connect()(TrelloActionButton);