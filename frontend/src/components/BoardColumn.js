import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Title from "./common/Title";
import Button from "./common/Button";
import BoardItemForm from "./BoardItemForm";
import BoardColumnInnerList from "./BoardColumnInnerList";
import BoardDeleteColumnForm from "./BoardDeleteColumnForm";

import "../styles/Modal.css";

const Container = styled.div`
  width: 400px;
  margin: 1em;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  box-shadow: 2px 2px 1px lightgrey;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  padding: 8px;
  margin-bottom: 0 !important;
`;

const CardList = styled.div`
  padding: 1em;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export default class BoardColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateColumnModal: false,
      openDeleteColumnModal: false
    };

    this.onOpenCreateColumnModal = this.onOpenCreateColumnModal.bind(this);
    this.onOpenDeleteColumnModal = this.onOpenDeleteColumnModal.bind(this);
    this.onCloseCreateColumnModal = this.onCloseCreateColumnModal.bind(this);
    this.onCloseDeleteColumnModal = this.onCloseDeleteColumnModal.bind(this);
  }

  onOpenCreateColumnModal() {
    this.setState({ openCreateColumnModal: true });
  }

  onOpenDeleteColumnModal() {
    this.setState({ openDeleteColumnModal: true });
  }

  onCloseCreateColumnModal() {
    this.setState({ openCreateColumnModal: false });
  }

  onCloseDeleteColumnModal() {
    this.setState({ openDeleteColumnModal: false });
  }

  render() {
    const { openCreateColumnModal, openDeleteColumnModal } = this.state;
    const { column, items, index, boardItemsCount } = this.props;

    return (
      <Draggable draggableId={column.id} index={index}>
        {providedDraggable => (
          <Container
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            innerRef={providedDraggable.innerRef}
          >
            <ColumnHeader>
              <StyledTitle className="is-5">{column.title}</StyledTitle>

              <ButtonContainer>
                <Button
                  className="is-success is-rounded is-small"
                  onClick={this.onOpenCreateColumnModal}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button
                  className="is-danger is-rounded is-small"
                  onClick={this.onOpenDeleteColumnModal}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </ButtonContainer>

              <Modal
                open={openCreateColumnModal}
                onClose={this.onCloseCreateColumnModal}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <BoardItemForm
                  columnId={column.id}
                  boardItemsCount={boardItemsCount}
                />
              </Modal>

              <Modal
                open={openDeleteColumnModal}
                onClose={this.onCloseDeleteColumnModal}
                center
                classNames={{ modal: "custom-modal" }}
              >
                <BoardDeleteColumnForm />
              </Modal>
            </ColumnHeader>
            <Droppable droppableId={column.id} type="item">
              {(providedDroppable, snapshot) => (
                <CardList
                  innerRef={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <BoardColumnInnerList items={items} />
                  {providedDroppable.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}