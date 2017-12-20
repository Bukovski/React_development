import React, { Component as ReactComponent } from 'react'

//принимает компонент, отдает обернутый компонент
export default (OriginalComponent) =>
  class PostOpenWrapped extends ReactComponent {
    state = {
      isOpen: false
    };
    
    toggleOpen = (event) => {
      event.preventDefault();
      this.setState({ isOpen: !this.state.isOpen }) //скрыть открыть статью
    };
    
    render() {
      return <OriginalComponent { ...this.props } //принимаем все данные которые обернули
                                { ...this.state } //передаем isOpen: false
                                toggleOpen={ this.toggleOpen }/> //передаем функцию как обычный props
    }
  }