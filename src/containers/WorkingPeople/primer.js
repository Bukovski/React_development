const { createStore, combineReducers } = Redux;
const { Provider, connect } = ReactRedux;

const data = [
  { product: 'Bread', category: 'Food', price: 1 },
  { product: 'F. Dostoyevsky "Crime and Punishment"', category: 'Books', price: 8 },
  { product: 'iPhone', category: 'Electronics', price: 699 },
  { product: 'Milk', category: 'Food', price: 2 },
  { product: 'TV', category: 'Electronics', price: 1099 }
];

const tools = [
  {
    name: 'react',
    url: 'https://facebook.github.io/react/'
  },
  {
    name: 'stylus',
    url: 'http://stylys-lang.com'
  },
  {
    name: 'redux',
    url: 'https://github.com/reactjs/redux'
  }
];

const initialStateTable = {
  elements: data.map((element, i) => {
    return Object.assign({}, element, { id: i, selected: false });
  }),
  selected: false,
  edited: false,
  filter: {
    by: null,
    order: false
  },
  lastAction: null
};

// Action creators
const remove = (id) => ({
  type: 'REMOVE',
  id
});

const select = (id) => ({
  type: 'SELECT',
  id
});

const order = (by) => ({
  type: 'ORDER',
  by
});

const selectAll = () => ({
  type: 'SELECT_ALL'
});

const reset = () => ({
  type: 'RESET'
});

const undo = () => ({
  type: 'UNDO'
});

const redo = () => ({
  type: 'REDO'
});

const rewind = (count) => ({
  type: 'REWIND',
  count
});

// Reducer
const table = (state = initialStateTable, action) => {
  var element, elements, selected, order, name, lastAction;
  
  switch (action.type) {
    
    case 'SELECT_ALL':
      lastAction = Object.assign({}, action);
      return Object.assign({}, state, { selected: !state.selected, edited: true, lastAction }, {
        elements: state.elements.map((el) => {
          return Object.assign({}, el, { selected: !state.selected });
        })
      } );
    case 'REMOVE':
      elements = state.elements.filter((el) => el.id !== action.id);
      selected = elements.every(el => el.selected == true);
      lastAction = Object.assign({}, action);
      
      return Object.assign({}, state, { edited: true, elements, selected, lastAction });
    case 'SELECT':
      element = state.elements.filter((el) => el.id == action.id)[0];
      name = element.product;
      lastAction = Object.assign({}, action);
      elements = state.elements.map(el => {
        if (el.id == action.id) {
          return Object.assign({}, el, { selected: !el.selected });
        }
        return el;
      });
      selected = elements.every(el => el.selected == true);
      
      return Object.assign({}, state, { elements, selected, edited: true, lastAction });
    case 'ORDER':
      order = (state.filter.by == action.by.toLowerCase()) ? !state.filter.order : false;
      lastAction = Object.assign({}, action);
      return Object.assign({}, state, { edited: true, lastAction }, {
        filter: {
          by: action.by,
          order
        }
      });
    default:
      return state;
  }
}

const undoable = (reducer) => {
  const initialState = {
    past: [],
    present: reducer(initialStateTable, {}),
    future: []
  }
  
  return function(state = initialState, action) {
    const { past, present, future } = state;
    
    switch (action.type) {
      case 'UNDO':
        if (past.length > 0) {
          let newFuture = [ present, ...future ];
          let previous = past[past.length - 1];
          let newPast = past.slice(0, past.length - 1);
          return {
            past: newPast,
            present: previous,
            future: newFuture
          }
        }
        
        return initialState;
      
      case 'REDO':
        if (future.length > 0) {
          let next = future[0];
          let newFuture = future.slice(1);
          
          return {
            future: newFuture,
            present: next,
            past: [...past, present]
          }
        }
        
        return state;
      
      case 'REWIND':
        previous = past[past.length - action.count];
        newPast = past.slice(0, past.length - action.count);
        return {
          past: newPast,
          present: previous
        }
      
      case 'RESET':
        return initialState;
      
      default:
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [ ...past, present ],
          present: newPresent,
          future: []
        }
      
    }
  }
}

// Store
const undoableTable = undoable(table);
let store = createStore(undoableTable);

// Conponents
const SVG = ({ use, ...other }) => {
  return (
    <svg {...other}>
      <use xlinkHref={use} />
    </svg>
  );
}

const Checkbox = ({ onSelect, isSelected }) => {
  let className = `TableControl TableControl--checkbox${isSelected ? ' isActive' : ''}`;
  
  return (
    <span onClick={onSelect}><SVG use='#star' className={className} /></span>
  );
}

const Cell = ({ type, children }) => {
  var base = 'Table-cell';
  var className = type ? `${base} ${base}--${type}` : base;
  
  return (
    <td className={className}>{children}</td>
  );
}

const HeadCell = ({ type, children, isActive }) => {
  var base = 'Table-headCell';
  var className = type ? `${base} ${base}--${type}${isActive ? ' isActive' : ''}` : base;
  
  return (
    <th className={className}>{children}</th>
  );
}

const Control = ({ onClick, type, className, text, children }) => {
  let cls = type ? `${className} ${className}--${type}` : base;
  let icon = type ? (<SVG use={`#action-${type}`} className={`${className}-icon`} />) : null;
  let msg = text ? (<span className={`${className}-text`}>{text}</span>) : null;
  
  return (
    <span className={cls} onClick={onClick}>{icon}{msg}{children}</span>
  );
}

Control.defaultProps = { className: 'TableControl' }

const TableRow = ({ element, onDelete, onSelect, isSelected }) => {
  let className = `Table-row${isSelected ? ' isSelected' : ''}`;
  
  return (
    <tr className={className}>
      <Cell type='index'>{element.id + 1}</Cell>
      <Cell type='checkbox'><Checkbox onSelect={onSelect} isSelected={isSelected} /></Cell>
      <Cell type='product'>{element.product}</Cell>
      <Cell type='category'>{element.category}</Cell>
      <Cell type='price'>{`$${element.price}`}</Cell>
      <Cell><Control onClick={onDelete} type='delete'></Control></Cell>
    </tr>
  );
}

const Sorting = ({ text, onClick, order }) => {
  var sign;
  switch (order) {
    case true:
      sign = <SVG use='#triangle-down' className='TableControl-icon TableControl-icon--sorting' />;
      break;
    case false:
      sign = <SVG use='#triangle-up' className='TableControl-icon TableControl-icon--sorting' />;
      break;
    default:
      sign = <SVG use='#triangle-up' className='TableControl-icon TableControl-icon--sorting isHidden' />;
      break;
  }
  
  return (
    <span className='TableControl TableControl--sorting' onClick={onClick}><span className='TableControl-text'>{text}</span>{sign}</span>
  );
}

const TableHead = ({ isActive }) => {
  return (
    <thead>
    <tr>
      <HeadCell isActive={isActive == 'id'} type='index'><SortingContainer by='id' text='#' /></HeadCell>
      <HeadCell type='checkbox'><CheckboxHead /></HeadCell>
      <HeadCell isActive={isActive == 'product'} type='product'><SortingContainer by='product' text='Product' /></HeadCell>
      <HeadCell isActive={isActive == 'category'} type='category'><SortingContainer by='category' text='Category' /></HeadCell>
      <HeadCell isActive={isActive == 'price'} type='price'><SortingContainer by='price' text='Price' /></HeadCell>
      <HeadCell type='controls'></HeadCell>
    </tr>
    </thead>
  );
}

const Colon = ({ type, active }) => {
  let base = 'Table-colon';
  var className = `${base} ${base}--${type}`;
  if (active) {
    className = `${className} isActive`;
  }
  
  return (
    <col className={className}></col>
  );
}

const Colons = ({ colons, active }) => {
  return (
    <colgroup className='Table-colons'>
      {colons.map((colon, i) => <Colon type={colon}
                                       key={i}
                                       active={active == colon} />)}
    </colgroup>
  );
}

const Table = ({ elements, isVisible, onDelete, onSelect, isActive }) => {
  let colons = ['id', 'checkbox', 'product', 'category', 'price', 'controls'];
  let table = (
    <table className='Table'>
      <ColonsContainer colons={colons} />
      <TableHead isActive={isActive} />
      <tbody>
      {elements.map((el) => {
        return <TableRow element={el}
                         key={el.id}
                         isSelected={el.selected}
                         onSelect={() => { onSelect(el.id)}}
                         onDelete={() => { onDelete(el.id) }} />
      })}
      </tbody>
    </table>
  );
  let emptyDiv = (
    <div className='Restore'><span className='Restore-text'>Nothing to show!</span><Restore type='reset' className='Control' text='Reset' /></div>
  );
  
  return (
    <div className='TableContainer'>
      <h1 className='TableContainer-head'>Table Sorting</h1>
      <h2 className='TableContainer-subhead'>With Undo/Redo and History</h2>
      {isVisible ? table : emptyDiv}
    </div>
  );
}

const Info = ({ title, children }) => {
  return (
    <section className='Info'>
      <h3 className='Info-head'><span>{title}</span></h3>
      <div className='Info-content'>{children}</div>
    </section>
  );
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
  }
  
  handleEvent(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.keyCode) {
        case 90:
          this.props.onUndo();
          break;
        case 89:
          this.props.onRedo();
          break;
        case 82:
          e.preventDefault();
          this.props.onReset();
          break;
        default:
          break;
      }
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleEvent);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEvent);
  }
  
  render() {
    const redo = this.props.redoable ? (
      <div className='ControlContainer'>
        <Control type='redo'
                 className='Control'
                 onClick={this.props.onRedo}
                 text='Redo'><Hotkeys keys={[ 'Ctrl', 'Y' ]}/></Control>
      </div>
    ) : null;
    
    return (
      <Info title='Controls'>
        <div className='ControlsWrap'>
          <div className='ControlContainer'>
            <Control type='reset'
                     className='Control'
                     onClick={this.props.onReset}
                     text='Reset'><Hotkeys keys={[ 'Ctrl', 'R' ]}/></Control>
          </div>
          <div className='ControlContainer'>
            <Control type='undo'
                     className='Control'
                     onClick={this.props.onUndo}
                     text='Undo'><Hotkeys keys={[ 'Ctrl', 'Z' ]}/></Control>
          </div>
          {redo}
        </div>
      </Info>
    );
  }
}

const Footer = ({ isVisible }) => {
  let content = !isVisible ? null : (
    <div className='Footer-content'>
      <SnapshotsContainer />
      <ControlsContainer />
    </div>
  );
  
  return (
    <div className='Footer'>{content}</div>
  );
}

const Hotkey = ({ children }) => {
  return (
    <span className='Hotkey'>{children}</span>
  );
}

const Hotkeys = ({ keys }) => {
  return (
    <nav className='Hotkeys'>
      {keys.map((key, i, keys)  => {
        return (
          <div className='Hotkey-wrap'>
            <Hotkey>{key}</Hotkey>
            { i < keys.length - 1 ? <span className='Hotkey-divider'>+</span> : null}
          </div>
        );
      })}
    </nav>
  );
}

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
    this.state = {
      tool: null
    }
  }
  
  handleMove(value) {
    this.setState({ tool: value });
  }
  
  render() {
    return (
      <div className='Tools'>
        <div className='Tools-text'>{this.props.msg}</div>
        <nav className='Tools-list'>
          {tools.map(tool => <a onMouseOver={this.handleMove.bind(this, tool.name)}
                                target='_blank'
                                className={`Tools-item Tools-item--${tool.name}`}
                                href={tool.url}><SVG use={`#${tool.name}`} /></a>)}
        </nav>
        <div className='Tools-text'>{this.state.tool}</div>
      </div>
    );
  }
}

// Containers
const orderElements = (elements, by, order) => {
  var $elements = elements.slice();
  var sortingFunction = (a, b) => {
    var $a = a[by];
    var $b = b[by];
    if (typeof $a === 'string' || typeof $b === 'string') {
      $a = $a.toLowerCase();
      $b = $b.toLowerCase();
    }
    
    if ($a <= $b) return -1;
    return 1;
  };
  
  if (by) {
    $elements = $elements.sort(sortingFunction);
    
    if (order) {
      $elements.reverse()
    }
  }
  
  return $elements;
}

const TableContainer = connect(
  (state) => ({
    elements: orderElements(state.present.elements, state.present.filter.by, state.present.filter.order),
    isVisible: state.present.elements.length > 0,
    isActive: state.present.filter.by
  }),
  (dispatch) => ({
    onDelete: (id) => {
      dispatch(remove(id));
    },
    onSelect: (id) => {
      dispatch(select(id));
    }
  })
)(Table);

const ColonsContainer = connect(
  (state) => ({
    active: state.present.filter.by
  }),
  null
)(Colons);

const SortingContainer = connect(
  (state, ownProps) => {
    var order;
    if (ownProps.by == state.present.filter.by) {
      order = state.present.filter.order ? true : false;
    } else {
      order = null;
    }
    
    return {
      order
    }
  },
  (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(order(ownProps.by));
    }
  })
)(Sorting);

const CheckboxHead = connect(
  (state) => ({
    isSelected: state.present.selected
  }),
  (dispatch) => ({
    onSelect: () => {
      dispatch(selectAll())
    }
  })
)(Checkbox);

// Snapshots
const Snapshot = ({ icon, message, isActive }) => {
  let className = `Snapshot${isActive ? ' isActive' : ''}`;
  let iconClassName = `Snapshot-icon Snapshot-icon--${icon}`;
  
  return (
    <li className={className}>
      <div className={iconClassName}><SVG use={`#${icon}`} /></div>
      <div className='Snapshot-message'>{message}</div>
    </li>
  );
}

const Snapshots = ({ snapshots }) => {
  return (
    <Info title='Last actions'>
      <ul className='Snapshots'>
        {snapshots.map((snapshot, i) => <Snapshot icon={snapshot.icon}
                                                  isActive={i == 0}
                                                  key={i}
                                                  message={snapshot.message} />)}
      </ul>
    </Info>
  );
}

const getSnapshot = (state, prevState) => {
  let icon, message, name, element;
  
  if (state.lastAction !== null) {
    switch (state.lastAction.type) {
      case 'SELECT_ALL':
        icon = 'star';
        message = `All elements ${state.selected ? 'starred' : 'unstarred'}`;
        break;
      case 'SELECT':
        icon = 'star';
        element = state.elements.filter(el => el.id == state.lastAction.id)[0];
        let isSelected = element.selected;
        message = `Element "${element.product}" ${isSelected ? 'starred' : 'unstarred'}`;
        break;
      case 'REMOVE':
        element = prevState.elements.filter(el => el.id == state.lastAction.id)[0];
        icon = 'action-delete';
        message = `Element "${element.product}" removed`;
        break;
      case 'ORDER':
        icon = state.filter.order ? 'triangle-down' : 'triangle-up';
        message = `Sorted by ${state.filter.by} with ${state.filter.order ? 'descending' : 'ascending'} order`;
        break;
      default:
        icon = 'none';
        message = 'Something happened';
        break;
    }
    
    return { icon, message };
  }
  
  return {};
}

const getSnapshots = (state) => {
  let snapshots = [];
  let length = state.past.length;
  snapshots.push(getSnapshot(state.present, state.past[length - 1]));
  
  
  if (length > 1) {
    
    for (let i = 1; i <= length - 1; i++) {
      snapshots.push(getSnapshot(state.past[length - i], state.past[length - i - 1]));
    }
    
  }
  
  if (snapshots.length <= 10) {
    return snapshots;
  } else {
    return snapshots.slice(0, 10)
  }
  
  return snapshots;
}

const SnapshotsContainer = connect(
  (state) => ({
    snapshots: getSnapshots(state)
  }),
  null
)(Snapshots);

const ControlsContainer = connect(
  (state) => ({
    redoable: state.future.length > 0
  }),
  (dispatch) => ({
    onUndo: () => {
      dispatch(undo())
    },
    onRedo: () => {
      dispatch(redo())
    },
    onReset: () => {
      dispatch(reset())
    }
  })
)(Controls);

const FooterContainer = connect(
  (state) => ({
    isVisible: state.past.length > 0
  }),
  null
)(Footer);

const Restore = connect(
  null,
  (dispatch) => ({
    onClick: () => {
      dispatch(reset());
    }
  })
)(Control);

const App = () => {
  return (
    <div className='TableSorting'>
      <TableContainer />
      <FooterContainer />
      <Tools tools={tools} msg='Made with' />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('table')
);