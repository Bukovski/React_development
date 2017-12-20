import React, { Component } from 'react';
import faker from 'faker';

import './style.css';
import Pagination from './Pagination';
import AddNewWorker from './AddNewWorker';

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
      workers: [
        {id: 1, firstName: 'John', lastName: 'Dou', salary: 100, gender: 'male'},
        {id: 2, firstName: 'Alessa', lastName: 'Gelespi', salary: 150, gender: 'female'},
        {id: 3, firstName: 'Donald', lastName: 'Duck', salary: 130, gender: 'male'},
        {id: 4, firstName: 'Joey', lastName: 'Tribiany', salary: 205, gender: 'male'}
      ],
      directionOfSort: 'DESC',
      
      pageOfItems: [],
      
      searchCopy: [],
      
      valueFirstName: '',
      valueLastName: '',
      valueSalary: '',
      
      selectId: 'male'
    }
  };
  
  componentWillMount () {
    this.buildFakeUser(25); //faker users
  }
  
  componentDidMount() {
    this.setState({
      searchCopy: this.state.workers //it is copy array for search
    })
  }
  
  
  buildFakeUser(records) {
    const { workers } = this.state;
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
    
    this.setState({
      workers: workers.concat(newFakeData)
    });
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
    const { directionOfSort, searchCopy } = this.state;
    
    let arrayCopy = [...searchCopy];
    arrayCopy.sort(this.compareBy(key));
    
    this.setState({
      searchCopy: arrayCopy,
      directionOfSort: (directionOfSort === 'ASC') ? 'DESC' : 'ASC'
    });
  }
  
  //pagination
  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems: pageOfItems }); // update state at new items(10{...})
  };
  
  //search
  liveSearch = (event) => {
    const { workers } = this.state;
    const dataSearch = event.target.value.toLowerCase();
    const result = workers.filter((elem) => {
      const searchName = elem.firstName.toLowerCase();
      const searchLastName= elem.lastName.toLowerCase();
      
      return (searchName.includes(dataSearch) || searchLastName.includes(dataSearch));
    });
    
    this.setState({
      searchCopy: (result.length) ? result : workers
    });
  };
  
  //add new note
  addNewWorker(event) {
    event.preventDefault();
    
    const { workers, searchCopy } = this.state;
    const { valueFirstName, valueLastName, valueSalary, selectId } = this.state;
    
    workers.push({id: workers.length + 1, firstName: valueFirstName,
      lastName: valueLastName, salary: valueSalary, gender: selectId});
    
    this.setState({
      workers,
      searchCopy,
      valueFirstName: '',
      valueLastName: '',
      valueSalary: ''
    });
  }
  
  
  render() {
    const { pageOfItems, searchCopy,
      valueFirstName, valueLastName,
      valueSalary, selectId } = this.state;
    
    //console.log('++--', pageOfItems);
    
    const listWorker = pageOfItems.map(elem => {
      return <tr key={ elem.id }>
        <td>{ elem.id }</td><td>{ elem.firstName }</td><td>{ elem.lastName}</td>
        <td>{ elem.salary }</td><td>{ elem.gender }</td>
      </tr>
    });
    
    return(
      <div>
        
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search" onChange={ this.liveSearch }/>
          <div className="input-group-addon">
            <i className="glyphicon glyphicon-search"></i>
          </div>
        </div>
        
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
        
        <Pagination items={ searchCopy } onChangePage={ this.onChangePage } pageSize={10}/>
        
        <AddNewWorker valueFirstName={ valueFirstName }
                      valueLastName={ valueLastName }
                      valueSalary={ valueSalary }
                      onChangeFirstName={ (event) => this.setState({valueFirstName: event}) }
                      onChangeLastName={ (event) => this.setState({valueLastName: event}) }
                      onChangeSalary={ (event) => this.setState({valueSalary: event}) }
                      addWorkerSubmit={ this.addNewWorker.bind(this) }
        
                      selectItem={['male', 'female']}
                      selectValue={ selectId }
                      selectChange={ (event) => this.setState({selectId: event.target.value}) }
        />
      
      </div>
    );
  }
}

export default WorkingPeople;
