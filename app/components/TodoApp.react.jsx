/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import React from 'react';
import TodoStore from '../stores/TodoStore';

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getTodoState();
  }

    getTodoState() {
        return {
            allTodos: TodoStore.getAll(),
            areAllComplete: TodoStore.areAllComplete()
        };
    }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  };

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  };

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {
    this.setState(this.getTodoState());
  };

}
