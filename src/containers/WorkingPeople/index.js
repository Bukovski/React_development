import React, { Component } from 'react';
import faker from 'faker';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newWorker, fakeWorkers, searchWorker } from '../../actions'

import './style.css';
import Pagination from './Pagination';
import AddNewWorker from './AddNewWorker';

import SearchInput from './SearchInput';



/*
1.+ Дан массив с работниками. У каждого работника есть имя, фамилия, зарплата. Выведите
 этих работников на экран в виде таблицы. Сделайте так, чтобы работников можно было
 посортировать по любой колонке этот таблицы.
2.+ Сделайте так, чтобы работников можно было посортировать по любой колонке этот таблицы.
3.+ Под таблице сделайте форму, с помощью которой в таблицу можно будет добавить нового
 работника. В этой форме имя, фамилия, зарплата будут инпутами, а пол - селектом,
 в котором можно будет выбрать один из двух вариантов.
4.+ Выведите этих работников на экран в виде таблицы. Причем выведите только первых 10 работников,
 а над таблицей сделайте ссылки: 1, 2, 3, 4 и так далее. По нажатию на каждую ссылку
 в таблице будет отображаться заданный десяток работников. Ссылки над таблицей должны
 сгенерироваться автоматически исходя из количества работников.
  */
class WorkingPeople extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
      
      pageOfItems: [],
      directionOfSort: 'DESC',
    }
  };
  
  componentWillMount () {
    this.buildFakeUser(25); //faker users
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { workers } = this.props;
    
    if (workers !== prevProps.workers) {
  
      this.setState({
        searchResult: workers //it is copy array for search
      })
    }
  }
  
  
  buildFakeUser(records) {
    const { workers, fakeWorkers } = this.props;

    const newFakeData = [];
    const lastElem = workers.length + 1;
    
    const fakeData = (id) => {
      return {
        id: id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        salary: faker.random.number(5000),
        gender: faker.random.arrayElement(['male', 'female']),
      }
    };
    
    for(let i = 0; i < records; i++) {
      newFakeData.push(fakeData(lastElem + i ))
    }
    
    fakeWorkers(newFakeData)
  }
  
  //sort
  compareBy(key) {
    const direction = this.state.directionOfSort;
    
    return function (a, b) {
      if (direction === 'ASC') {
        return (a[key] > b[key]) - (a[key] < b[key]);
      }
      return (a[key] < b[key]) - (a[key] > b[key]);
    };
  }
  
  sortBy(key) {
    const { directionOfSort, searchResult } = this.state;
    
    let arrayCopy = [...searchResult];
    arrayCopy.sort(this.compareBy(key));
    
    this.setState({
      searchResult: arrayCopy,
      directionOfSort: (directionOfSort === 'ASC') ? 'DESC' : 'ASC'
    });
  }
  
  //pagination
  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems: pageOfItems }); // update state at new items(10{...})
  };
  
  //search
  liveSearch = (event) => {
    const { workers } = this.props;
    
    function objectContains (str) {
      return (obj) => {
        return (obj.firstName + obj.lastName + obj.salary).toLowerCase().includes(str)
      }
    }
    
    function filterSearch (data, filterString) {
      return (filterString !== '') ? data.filter(objectContains(filterString.toLowerCase())) : data;
    }
    
    this.setState({
      searchResult: filterSearch(workers, event.target.value)
    })
  };
  
  //add new note
  createNewWorker = (data) => {
    const { newWorker, workers } = this.props;
    const items = data.valueForm;
  
    newWorker(workers.length + 1, items.firstName, items.lastName, items.salary, items.gender);
  };
  
  
  render() {
    const { workers } = this.props;
    const { pageOfItems, searchResult } = this.state;
    
    const listWorker = pageOfItems.map(elem => {
      return <tr key={ elem.id }>
        <td>{ elem.id }</td><td>{ elem.firstName }</td><td>{ elem.lastName}</td>
        <td>{ elem.salary }</td><td>{ elem.gender }</td>
      </tr>
    });
    
    return(
      <div>
        <SearchInput liveSearch={ this.liveSearch } />
        
        <table className="table table-striped">
          <thead>
          <tr>
            <th onClick={ () => this.sortBy('id') }>№</th>
            <th onClick={ () => this.sortBy('firstName') }>First name</th>
            <th onClick={ () => this.sortBy('lastName') }>Last name</th>
            <th onClick={ () => this.sortBy('salary') }>Salary</th>
            <th onClick={ () => this.sortBy('gender') }>gender</th>
          </tr>
          </thead>
          <tbody>
            { listWorker }
          </tbody>
        </table>
        
        { (searchResult.length) ?
          <Pagination items={ searchResult } onChangePage={ this.onChangePage } pageSize={10}/>
          : '' }
  
        <AddNewWorker createNewWorker={ this.createNewWorker }/>
        
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    workers: state.tableWorkers.workers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newWorker: bindActionCreators(newWorker, dispatch),
    fakeWorkers: bindActionCreators(fakeWorkers, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkingPeople);
